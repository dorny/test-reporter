![Tests failed](https://img.shields.io/badge/tests-1%20passed%2C%203%20failed-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/dotnet-xunitv3.trx](#user-content-r0)|1 ✅|3 ❌||267ms|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/dotnet-xunitv3.trx</a>
**4** tests were completed in **267ms** with **1** passed, **3** failed and **0** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[DotnetTests.XUnitV3Tests.FixtureTests](#user-content-r0s0)|1 ✅|1 ❌||18ms|
|[Unclassified](#user-content-r0s1)||2 ❌||0ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">DotnetTests.XUnitV3Tests.FixtureTests</a>
```
❌ Failing_Test
	Assert.Null() Failure: Value is not null
	Expected: null
	Actual:   Fixture { }
	   at DotnetTests.XUnitV3Tests.FixtureTests.Failing_Test() in /_/reports/dotnet/DotnetTests.XUnitV3Tests/FixtureTests.cs:line 25
	   at System.RuntimeMethodHandle.InvokeMethod(Object target, Void** arguments, Signature sig, Boolean isConstructor)
	   at System.Reflection.MethodBaseInvoker.InvokeWithNoArgs(Object obj, BindingFlags invokeAttr)
✅ Passing_Test
```
### ❌ <a id="user-content-r0s1" href="#user-content-r0s1">Unclassified</a>
```
❌ [Test Class Cleanup Failure (DotnetTests.XUnitV3Tests.FixtureTests.Failing_Test)]
❌ [Test Class Cleanup Failure (DotnetTests.XUnitV3Tests.FixtureTests.Passing_Test)]
```