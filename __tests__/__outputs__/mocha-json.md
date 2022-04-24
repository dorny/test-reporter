![Tests failed](https://img.shields.io/badge/tests-1%20passed%2C%204%20failed%2C%201%20skipped-critical)
## :x: <a id="user-content-r0" href="#r0">fixtures/mocha-json.json</a>
**6** tests were completed in **12ms** with **1** passed, **4** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/main.test.js](#r0s0)|1:white_check_mark:|3:x:||1ms|
|[test/second.test.js](#r0s1)||1:x:|1:warning:|8ms|
### :x: <a id="user-content-r0s0" href="#r0s0">test/main.test.js</a>
```
Test 1
  :white_check_mark: Passing test
Test 1 Test 1.1
  :x: Exception in target unit
	Some error
  :x: Failing test
	Expected values to be strictly equal:
	
	false !== true
	
Test 2
  :x: Exception in test
	Some error
```
### :x: <a id="user-content-r0s1" href="#r0s1">test/second.test.js</a>
```
:warning: Skipped test
:x: Timeout test
	Timeout of 1ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (C:\Users\Michal\Workspace\dorny\test-reporter\reports\mocha\test\second.test.js)
```