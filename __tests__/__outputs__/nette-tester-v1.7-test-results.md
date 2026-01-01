![Tests failed](https://img.shields.io/badge/tests-61%20passed%2C%201%20failed%2C%203%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/nette-tester/tester-v1.7-report.xml](#user-content-r0)|61 ✅|1 ❌|3 ⚪|2s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/nette-tester/tester-v1.7-report.xml</a>
**65** tests were completed in **2s** with **61** passed, **1** failed and **3** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[tester-v1.7-report.xml](#user-content-r0s0)|61 ✅|1 ❌|3 ⚪|2s|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">tester-v1.7-report.xml</a>
```
tests/Framework
  ⚪ Dumper.toPhp.php7.phpt
  ✅ Assert.contains.phpt
  ✅ Assert.count.phpt
  ✅ Assert.equal.phpt
  ✅ Assert.equal.recursive.phpt::testSimple
  ✅ Assert.equal.recursive.phpt::testMultiple
  ✅ Assert.equal.recursive.phpt::testDeep
  ✅ Assert.equal.recursive.phpt::testCross
  ✅ Assert.equal.recursive.phpt::testThirdParty
  ✅ Assert.error.phpt
  ✅ Assert.exception.phpt
  ✅ Assert.false.phpt
  ✅ Assert.match.phpt
  ✅ Assert.match.regexp.phpt
  ✅ Assert.nan.phpt
  ✅ Assert.noError.phpt
  ✅ Assert.same.phpt
  ✅ Assert.null.phpt
  ✅ Assert.true.phpt
  ✅ Assert.truthy.phpt
  ✅ DataProvider.load.phpt
  ✅ Assert.type.phpt
  ✅ DataProvider.parseAnnotation.phpt
  ✅ DataProvider.testQuery.phpt
  ✅ DomQuery.css2Xpath.phpt
  ✅ DomQuery.fromHtml.phpt
  ✅ DomQuery.fromXml.phpt
  ✅ Dumper.dumpException.phpt
  ✅ Dumper.color.phpt
  ✅ Dumper.toLine.phpt
  ✅ Dumper.toPhp.recursion.phpt
  ✅ Dumper.toPhp.phpt
  ✅ FileMock.phpt
  ✅ Helpers.escapeArg.phpt
  ✅ Helpers.parseDocComment.phpt
  ✅ TestCase.annotationThrows.phpt
  ✅ TestCase.annotationThrows.setUp.tearDown.phpt
  ✅ TestCase.annotationThrows.syntax.phpt
  ✅ TestCase.basic.phpt
  ✅ TestCase.dataProvider.generator.phpt
  ✅ TestCase.dataProvider.phpt
  ✅ TestCase.invalidMethods.phpt
  ✅ TestCase.invalidProvider.phpt
  ✅ TestCase.order.error.phpt
  ✅ TestCase.order.errorMuted.phpt
  ✅ TestCase.order.phpt
  ✅ Prevent loop in error handling. The #268 regression. (TestCase.ownErrorHandler.phpt)
tests/CodeCoverage
  ⚪ Collector.start.phpt
  ✅ PhpParser.parse.lines.phpt
  ✅ PhpParser.parse.methods.phpt
  ✅ CloverXMLGenerator.phpt
  ✅ PhpParser.parse.edge.phpt
  ✅ PhpParser.parse.lines-of-code.phpt
  ✅ PhpParser.parse.namespaces.phpt
tests/Runner
  ✅ CommandLine.phpt
  ⚪ HhvmPhpInterpreter.phpt
  ✅ Runner.find-tests.phpt
  ✅ Job.phpt
  ✅ ZendPhpExecutable.phpt
  ✅ Runner.multiple.phpt
  ✅ Runner.edge.phpt
  ✅ Runner.stop-on-fail.phpt
  ❌ Runner.multiple-fails.phpt
	Failed: '... in /Users/izso/Developer/nette/tester/tests/Runner/multiple-fails/...' should match 
	    ... '..., unexpected end of file in %a%testcase-syntax-error.phptx on line ...'
	
	diff '/Users/izso/Developer/nette/tester/tests/Runner/output/Runner.multiple-fails.expected' '/Users/izso/Developer/nette/tester/tests/Runner/output/Runner.multiple-fails.actual'
	
	in tests/Runner/Runner.multiple-fails.phpt(78) Tester\Assert::match()
  ✅ Runner.annotations.phpt
tests/RunnerOutput
  ✅ JUnitPrinter.phpt
```