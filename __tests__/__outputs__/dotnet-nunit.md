![Tests failed](https://img.shields.io/badge/tests-3%20passed%2C%205%20failed%2C%201%20skipped-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/dotnet-nunit.xml</a>
**9** tests were completed in **230ms** with **3** passed, **5** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[DotnetTests.NUnitV3Tests.dll.DotnetTests.XUnitTests](#r0s0)|3✅|5❌|1⚪|69ms|
### ❌ <a id="user-content-r0s0" href="#r0s0">DotnetTests.NUnitV3Tests.dll.DotnetTests.XUnitTests</a>
```
CalculatorTests
  ✅ Is_Even_Number(2)
  ❌ Is_Even_Number(3)
	  Expected: True
	  But was:  False
	
  ❌ Exception_In_TargetTest
	System.DivideByZeroException : Attempted to divide by zero.
  ❌ Exception_In_Test
	System.Exception : Test
  ❌ Failing_Test
	  Expected: 3
	  But was:  2
	
  ✅ Passing_Test
  ✅ Passing_Test_With_Description
  ⚪ Skipped_Test
  ❌ Timeout_Test
	
```