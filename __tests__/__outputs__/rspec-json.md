![Tests failed](https://img.shields.io/badge/tests-1%20passed%2C%201%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/rspec-json.json|1 ✅|1 ❌|1 ⚪|0ms|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/rspec-json.json</a>
**3** tests were completed in **0ms** with **1** passed, **1** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[./spec/config/check_env_vars_spec.rb](#user-content-r0s0)|1 ✅|1 ❌|1 ⚪|0ms|
### ❌ <a id="user-content-r0s0" href="#user-content-r0s0">./spec/config/check_env_vars_spec.rb</a>
```
CheckEnvVars#call when all env vars are defined behaves like success load
  ❌ CheckEnvVars#call when all env vars are defined behaves like success load fails in assertion
	(#ActiveSupport::BroadcastLogger:0x00007f1007fedf58).debug("All config env vars exist")
	    expected: 0 times with arguments: ("All config env vars exist")
	    received: 1 time with arguments: ("All config env vars exist")
  ✅ CheckEnvVars#call when all env vars are defined behaves like success load logs success message
  ⚪ CheckEnvVars#call when all env vars are defined behaves like success load skips the test
```