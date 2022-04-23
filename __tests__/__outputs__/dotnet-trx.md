![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%205%20failed%2C%201%20skipped-critical)
## :x: <a id="user-content-r0" href="#r0">DotnetTests.XUnitTests</a>
**11** tests were completed in **1s** with **5** passed, **5** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[DotnetTests.XUnitTests.CalculatorTests](#r0s0)|5:white_check_mark:|5:x:|1:no_entry_sign:|118ms|
### :x: <a id="user-content-r0s0" href="#r0s0">DotnetTests.XUnitTests.CalculatorTests</a>
```
:white_check_mark: Custom Name
:x: Exception_In_TargetTest
	System.DivideByZeroException : Attempted to divide by zero.
:x: Exception_In_Test
	System.Exception : Test
:x: Failing_Test
	Assert.Equal() Failure
	Expected: 3
	Actual:   2
:white_check_mark: Is_Even_Number(i: 2)
:x: Is_Even_Number(i: 3)
	Assert.True() Failure
	Expected: True
	Actual:   False
:white_check_mark: Passing_Test
:white_check_mark: Should be even number(i: 2)
:x: Should be even number(i: 3)
	Assert.True() Failure
	Expected: True
	Actual:   False
:no_entry_sign: Skipped_Test
:white_check_mark: Timeout_Test
```