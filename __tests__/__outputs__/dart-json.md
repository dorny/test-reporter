![Tests failed](https://img.shields.io/badge/tests-1%20passed%2C%204%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/dart-json.json|1 ✅|4 ❌|1 ⚪|4s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/dart-json.json</a>
**6** tests were completed in **4s** with **1** passed, **4** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/main_test.dart](#user-content-r0s0)|1 ✅|3 ❌||74ms|
|[test/second_test.dart](#user-content-r0s1)||1 ❌|1 ⚪|51ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">test/main_test.dart</a>
```
Test 1
  ✅ Passing test
Test 1 Test 1.1
  ❌ Failing test
	Expected: <2>
	  Actual: <1>
	
  ❌ Exception in target unit
	Exception: Some error
Test 2
  ❌ Exception in test
	Exception: Some error
```
### ❌ <a id="user-content-r0s1" href="#user-content-r0s1">test/second_test.dart</a>
```
❌ Timeout test
	TimeoutException after 0:00:00.000001: Test timed out after 0 seconds.
⚪ Skipped test
```