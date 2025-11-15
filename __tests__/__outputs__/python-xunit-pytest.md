![Tests failed](https://img.shields.io/badge/tests-6%20passed%2C%202%20failed%2C%202%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/python-xunit-pytest.xml](#user-content-r0)|6 ✅|2 ❌|2 ⚪|19ms|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/python-xunit-pytest.xml</a>
**10** tests were completed in **19ms** with **6** passed, **2** failed and **2** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[pytest](#user-content-r0s0)|6 ✅|2 ❌|2 ⚪|19ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">pytest</a>
```
tests.test_lib
  ✅ test_always_pass
  ✅ test_with_subtests
  ✅ test_parameterized[param1]
  ✅ test_parameterized[param2]
  ⚪ test_always_skip
  ❌ test_always_fail
	assert False
  ⚪ test_expected_failure
  ❌ test_error
	Exception: error
  ✅ test_with_record_property
custom_classname
  ✅ test_with_record_xml_attribute
```