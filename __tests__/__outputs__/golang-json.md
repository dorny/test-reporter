![Tests failed](https://img.shields.io/badge/tests-3%20passed%2C%205%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/golang-json.json|3 ✅|5 ❌|1 ⚪|4s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/golang-json.json</a>
**9** tests were completed in **4s** with **3** passed, **5** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[_/home/james_t/git/test-reporter/reports/go](#user-content-r0s0)|3 ✅|5 ❌|1 ⚪|4s|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">_/home/james_t/git/test-reporter/reports/go</a>
```
✅ TestPassing
❌ TestFailing
	calculator_test.go:19: expected 1+1 = 3, got 2
	
❌ TestPanicInsideFunction
	calculator_test.go:71: caught panic: runtime error: integer divide by zero
	
❌ TestPanicInsideTest
	calculator_test.go:71: caught panic: bad stuff
	
⚪ TestSkipped
	calculator_test.go:45: skipping test
	
❌ TestCases
	
TestCases
  ✅ 1_+_2_=_3
  ✅ 4_+_7_=_11
  ❌ 2_+_3_=_4
	calculator_test.go:62: expected 2 + 3 = 4, got 5
	
```