![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%206%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/golang-json.json|5 ✅|6 ❌|1 ⚪|6s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/golang-json.json</a>
**12** tests were completed in **6s** with **5** passed, **6** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[_/home/james_t/git/test-reporter/reports/go](#user-content-r0s0)|5 ✅|6 ❌|1 ⚪|6s|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">_/home/james_t/git/test-reporter/reports/go</a>
```
✅ TestPassing
❌ TestFailing
	calculator_test.go:19: expected 1+1 = 3, got 2
	
❌ TestPanicInsideFunction
	calculator_test.go:76: caught panic: runtime error: integer divide by zero
	
❌ TestPanicInsideTest
	calculator_test.go:76: caught panic: bad stuff
	
⚪ TestSkipped
	calculator_test.go:45: skipping test
	
❌ TestCases
	
TestCases
  ✅ 1_+_2_=_3
  ✅ 4_+_7_=_11
  ❌ 2_+_3_=_4
	calculator_test.go:67: expected 2 + 3 = 4, got 5
	
  ❌ 1_/_2_=_1
	calculator_test.go:67: expected 1 / 2 = 1, got 0
	
  ✅ 9_/_3_=_3
  ✅ 14_/_7_=_2
```