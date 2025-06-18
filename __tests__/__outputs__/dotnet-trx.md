![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%205%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/dotnet-trx.trx](#user-content-r0)|5 ✅|5 ❌|1 ⚪|1s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/dotnet-trx.trx</a>
**11** tests were completed in **1s** with **5** passed, **5** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[DotnetTests.XUnitTests.CalculatorTests](#user-content-r0s0)|5 ✅|5 ❌|1 ⚪|118ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">DotnetTests.XUnitTests.CalculatorTests</a>
```
✅ Custom Name
❌ Exception_In_TargetTest
	System.DivideByZeroException : Attempted to divide by zero.
	   at DotnetTests.Unit.Calculator.Div(Int32 a, Int32 b) in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.Unit\Calculator.cs:line 9
	   at DotnetTests.XUnitTests.CalculatorTests.Exception_In_TargetTest() in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.XUnitTests\CalculatorTests.cs:line 33
❌ Exception_In_Test
	System.Exception : Test
	   at DotnetTests.XUnitTests.CalculatorTests.Exception_In_Test() in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.XUnitTests\CalculatorTests.cs:line 39
❌ Failing_Test
	Assert.Equal() Failure
	Expected: 3
	Actual:   2
	   at DotnetTests.XUnitTests.CalculatorTests.Failing_Test() in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.XUnitTests\CalculatorTests.cs:line 27
✅ Is_Even_Number(i: 2)
❌ Is_Even_Number(i: 3)
	Assert.True() Failure
	Expected: True
	Actual:   False
	   at DotnetTests.XUnitTests.CalculatorTests.Is_Even_Number(Int32 i) in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.XUnitTests\CalculatorTests.cs:line 59
✅ Passing_Test
✅ Should be even number(i: 2)
❌ Should be even number(i: 3)
	Assert.True() Failure
	Expected: True
	Actual:   False
	   at DotnetTests.XUnitTests.CalculatorTests.Theory_With_Custom_Name(Int32 i) in C:\Users\Michal\Workspace\dorny\test-reporter\reports\dotnet\DotnetTests.XUnitTests\CalculatorTests.cs:line 67
⚪ Skipped_Test
✅ Timeout_Test
```