(function(window, undefined) {

	/*
	 * Simulate the JSUnit Testsuite to collect the available
	 * test pages per Suite
	 */
	window.jsUnitTestSuite = function() {};
	window.jsUnitTestSuite.prototype.getTestPages = function() {
		return this.aPages;
	};
	window.jsUnitTestSuite.prototype.addTestPage = function(sTestPage) {
		this.aPages = this.aPages || [];
		this.aPages.push(sTestPage);
	};
	
	/*
	 * Template for test results
	 */
	var sResultsTemplate = "{{#tests}}" +
							"<div class=\"testResult {{outcome}}\">" +
								"<p>{{header}}</p>" +
									"<ol style=\"display: none\">" +
									"{{#results}}" +
										"<li class=\"{{result.sLiClass}} test\">" +
											"<p style=\"display: inline\">{{result.TestName}} ({{result.Failed}} ,{{result.Passed}} ,{{result.All}}) </p>" +
											"<a href=\"{{result.rerunlink}}\"> Rerun</a>"+
											"<ol>"+
											"{{#result.testmessages}}"+
												"<li class=\"{{classname}} check\">{{message}}" +
												"<br>{{expected}}"+
												"<br>{{actual}}"+
												"<br>{{diff}}"+
												"<br>{{source}}"+
												"</li>"+
											"{{/result.testmessages}}"+
											"</ol>"+
										"</li>" +
									"{{/results}}" +
									"</ol>" +
							"</div>" +
						"{{/tests}}";
	
	/**
	 * Utility class to find test pages and check them for being
	 * a testsuite or a QUnit testpage - also it returns the coverage
	 * results.
	 */
	window.sap = window.sap || {};
	window.sap.ui = window.sap.ui || {};
	window.sap.ui.qunit = window.sap.ui.qunit || {};
	window.sap.ui.qunit.TestRunner = {
		
		checkTestPage: function(sTestPage) {
			
			var oDeferred = jQuery.Deferred();
			
			if (window.console && typeof window.console.log === "function") {
				window.console.log("QUnit: checking test page: " + sTestPage);
			}
			
			// make the test pages server absolute!
			if (sTestPage && sTestPage.slice(0, 1) !== "/") {
				var contextPath = "/" + window.location.pathname.split("/")[1];
				sTestPage = contextPath + "/" + sTestPage;
			}
			
			// check for an existing test page and check for test suite or page
			var that = this;
			jQuery.get(sTestPage).done(function(sData) {
				if (/(window\.suite\s*=|function\s*suite\s*\(\s*\)\s*{)/g.test(sData)) {
					var $frame = jQuery("<iframe>");
					$frame.css("display", "none");
					$frame.one("load", function() {
						that.findTestPages(this).done(function(aTestPages) {
							oDeferred.resolve(aTestPages);
						});
						jQuery(this).remove();
					});
					$frame.attr("src", sTestPage);
					$frame.appendTo(document.body);
				} else {
					oDeferred.resolve([sTestPage]);
				}
			}).fail(function() {
				if (window.console && typeof window.console.error === "function") {
					window.console.error("QUnit: invalid test page: " + sTestPage);
				}
				oDeferred.resolve([]);
			});
			
			return oDeferred.promise();
			
		},
		
		findTestPages: function(oIFrame) {
			
			var oDeferred = jQuery.Deferred();
			try {
				
				var oSuite = oIFrame.contentWindow.suite();
				var aPages = oSuite.getTestPages() || [];
				
				var aTestPagePromises = [];
				for (var i = 0, l = aPages.length; i < l; i++) {
					var sTestPage = aPages[i];
					aTestPagePromises.push(this.checkTestPage(sTestPage));
				}
				
				if (aTestPagePromises.length > 0) {
					jQuery.when.apply(jQuery, aTestPagePromises).then(function() {
						var aTestPages = [];
						var aArgs = Array.prototype.slice.apply(arguments);
						for (var i = 0, l = aArgs.length; i < l; i++) {
							aTestPages = aTestPages.concat(aArgs[i]);
						}
						oDeferred.resolve(aTestPages);
					});
				} else {
					oDeferred.resolve([]);
				}
				
			} catch (ex) {
				if (window.console && typeof window.console.error === "function") {
					window.console.error("QUnit: error in test page: " + sTestPage + ":\n" + ex);
				}
				oDeferred.resolve([]);
			}
			return oDeferred.promise();
			
		},
		
		runTests: function(aTestPages, nBarStep, bInternal) {
			
			if (!bInternal) {
				this._bStopped = false;
			}
			
			// TODO: stop testing
			
			var sTestPage = aTestPages[0];
			
			aTestPages = aTestPages.slice(1);
			
			var oDeferred = jQuery.Deferred();
			
			var that = this;
			if (sTestPage) {
				this.runTest(sTestPage, true, that).then(function(oResult) {
					var nBarwidth = parseFloat(jQuery("div#innerBar")[0].style.width, 10);
					var sNewwidth = nBarwidth + nBarStep + "%";
					jQuery("div#innerBar").width(sNewwidth);
					$("#selectedTests").find("option").each(function(){
						if(	$(this).text() === sTestPage){
							$(this).remove();
						}
					});
					return that.runTests(aTestPages, nBarStep, true);
				}).then(function() {
					oDeferred.resolve();
				});
			} else {
				oDeferred.resolve();
			}
			
			return oDeferred.promise();
			
		},
		
		runTest: function(sTestPage, bInternal, oInst) {


			if (!bInternal) {
				this._bStopped = false;
			}
			
			var oDeferred = jQuery.Deferred();
			
			if (this._bStopped) {
				
				oDeferred.reject(); 
				
			} else {
				
				var $frame = jQuery("<iframe>").css({
					height: "400px",
					width: "100%"
				});
				
				$frame.attr("src", sTestPage);
				$frame.appendTo("div.test-execution");

				var tBegin = new Date();
				var fnCheckSuccess = function() {
					var doc = $frame[0].contentWindow.document;
					var oResult =doc.getElementById("qunit-testresult");
					if (oResult && jQuery(oResult).text().indexOf("completed") >= 0) {
						var $testName = jQuery(doc).find("h1#qunit-header a").text();
						var $results = jQuery(doc).find("ol#qunit-tests > li");
						var oContext = oInst.fnGetTestResults($testName, $results);
						
						$frame.remove();

						var fnTemplate = Handlebars.compile(sResultsTemplate);
						var sHTML = fnTemplate(oContext);
						$testResult = jQuery(sHTML);
						jQuery($testResult[0].children[0]).click(function(){
							jQuery(this.nextSibling).toggle();
						});
						jQuery($testResult[0].children[1]).find("li.test > p").click(function(){
							jQuery(this.parentElement.children[2]).toggle();
						});
						$testResult.appendTo("div.test-reporting");
								
						
						oDeferred.resolve();
						return;
					}
					if (new Date() - tBegin < 300000) {
						setTimeout(fnCheckSuccess, 100);
					} else {
						$frame.remove();
						// TODO: set Test overview visibile
						oDeferred.resolve();
						// TODO: error handling
					}
				};
				
				fnCheckSuccess();
				
			}
			
			return oDeferred.promise();
			
		},
		
		stopTests: function() {
			this._bStopped = true;
		},
		
		hasCoverage: function() {
			return !!window._$jscoverage;
		},
		
		getCoverage: function() {
			return window._$jscoverage;
		},
		
		getTestPageUrl: function() {
			var sTestPageUrlParam = window.location.search.substring(1);
			var sURLVariables = sTestPageUrlParam.split("=");
			if (sURLVariables[0] === "testpage") {
				return sURLVariables[1];
			} else {
				//return "test-resources/sap/ui/core/qunit/testsuite.qunit.html";
				return "test-resources/qunit/testsuite.qunit.html";
			}
		},
		
		fnGetTestResults: function(sTestName, aTestResults) {
			
			// build the context
			var oContext = {
				tests: [{
					header: sTestName,
					outcome: "pass",
					results:[]
				}]
			};
			
			for(var i= 0; i < aTestResults.length; i++){
				
				var $checkItems = $(aTestResults[i]).find("ol > li");
				var aTestMessages = [];
				
				for (var y = 0; y < $checkItems.length; y++) {
					
					var oTestMessage = {message: "", expected: "", actual: "", diff: "", source: "", classname: $checkItems[y].className};
					
					if($checkItems[y].className === "pass") {
					oTestMessage.message = $checkItems[y].innerText;
					} else {
						var $messageSpan = $($checkItems[y]).find("span.test-message");
						oTestMessage.message = $messageSpan[0].innerText;
						
						var $testExpected = $($checkItems[y]).find("tr.test-expected");
						console.log($testExpected);
						if( $testExpected.length > 0) {
							oTestMessage.expected = $testExpected[0].innerText;
						}
						
						var $testActual = $($checkItems[y]).find("tr.test-actual");
						if( $testActual.length > 0) {
							oTestMessage.actual = $testActual[0].innerText;
						}
						
						var $testDiff = $($checkItems[y]).find("tr.test-diff");
						if( $testDiff.length > 0) {
							oTestMessage.diff = $testDiff[0].innerText;
						}
						
						var $testSource = $($checkItems[y]).find("tr.test-source");
						if( $testSource.length > 0) {
							oTestMessage.source = $testSource[0].innerText;
						}
					}
					
					aTestMessages.push(oTestMessage);
				}

				var $test = $(aTestResults[i]).find("strong");
				var sTest = $test[0].innerText;
				
				var sTestName = sTest.split("(");
				var sCounts = sTest.match(/(\d+, \d+, \d+)/)[0].split(", ");
				var sNumFailed = sCounts[0];
				var sNumPassed = sCounts[1];
				var sNumAll = sCounts[2];
				
				$failedTestResult = $(aTestResults[i]);
				var sRerunLink = $failedTestResult[0].children[1].href;
				
				var sLineItemClass = sCounts[0] == "0" ? "pass" : "fail";
				if(sLineItemClass === "fail") {
					oContext.tests[0].outcome = sLineItemClass;
				}
				
				oContext.tests[0].results.push({result:{TestName: sTestName[0], Failed: sNumFailed, Passed: sNumPassed, All: sNumAll, rerunlink: sRerunLink, sLiClass: sLineItemClass, testmessages: aTestMessages }});
				
				var ntotalTests = parseInt(jQuery("div#reportingHeader span.total").text());
				ntotalTests = ntotalTests + parseInt(sCounts[2]);
				jQuery("div#reportingHeader span.total").text(ntotalTests);
				
				var nPassedTests = parseInt(jQuery("div#reportingHeader span.passed").text());
				nPassedTests = nPassedTests + parseInt(sCounts[1]);
				jQuery("div#reportingHeader span.passed").text(nPassedTests);
				
				var nFailedTests = parseInt(jQuery("div#reportingHeader span.failed").text());
				nFailedTests = nFailedTests + parseInt(sCounts[0]);
				jQuery("div#reportingHeader span.failed").text(nFailedTests);
			}

			return oContext;
			
		}
		
	};

})(window);
