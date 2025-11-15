![Tests failed](https://img.shields.io/badge/tests-4%20passed%2C%202%20failed%2C%202%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/python-xunit-unittest.xml](#user-content-r0)|4 ✅|2 ❌|2 ⚪|1ms|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/python-xunit-unittest.xml</a>
**8** tests were completed in **1ms** with **4** passed, **2** failed and **2** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[TestAcme-20251114214921](#user-content-r0s0)|4 ✅|2 ❌|2 ⚪|1ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">TestAcme-20251114214921</a>
```
TestAcme
  ✅ test_always_pass
  ✅ test_parameterized_0_param1
  ✅ test_parameterized_1_param2
  ✅ test_with_subtests
  ❌ test_always_fail
	AssertionError: failed
  ❌ test_error
	Exception: error
  ⚪ test_always_skip
  ⚪ test_expected_failure
```