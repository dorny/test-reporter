![Tests failed](https://img.shields.io/badge/tests-13%20passed%2C%202%20failed%2C%203%20skipped-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/external/dotnet/nunit-test-results.xml</a>
**18** tests were completed in **154ms** with **13** passed, **2** failed and **3** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[mock-assembly.dll](#r0s0)||||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;MockTestFixture](#r0s1)|5✔️|2❌|3✖️|NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;BadFixture](#r0s2)||||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;FixtureWithTestCases](#r0s3)||||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MethodWithParameters](#r0s4)|2✔️|||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;IgnoredFixture](#r0s5)||||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;ParameterizedFixture](#r0s6)||||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ParameterizedFixture(42)](#r0s7)|2✔️|||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ParameterizedFixture(5)](#r0s8)|2✔️|||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;OneTestCase](#r0s9)|1✔️|||NaNms|
|[&nbsp;&nbsp;&nbsp;&nbsp;MockTestFixture](#r0s10)|1✔️|||NaNms|
### ❌ <a id="user-content-r0s1" href="#r0s1">MockTestFixture</a>
```
FailingTest
  ❌ FailingTest
	Intentional failure
InconclusiveTest
  ✔️ InconclusiveTest
MockTest1
  ✔️ MockTest1
MockTest2
  ✔️ MockTest2
MockTest3
  ✔️ MockTest3
MockTest4
  ✖️ MockTest4
MockTest5
  ✖️ MockTest5
NotRunnableTest
  ✖️ NotRunnableTest
TestWithException
  ❌ TestWithException
	System.ApplicationException : Intentional Exception
TestWithManyProperties
  ✔️ TestWithManyProperties
```
### ✔️ <a id="user-content-r0s4" href="#r0s4">MethodWithParameters</a>
```
MethodWithParameters(2,2)
  ✔️ MethodWithParameters(2,2)
MethodWithParameters(9,11)
  ✔️ MethodWithParameters(9,11)
```
### ✔️ <a id="user-content-r0s7" href="#r0s7">ParameterizedFixture(42)</a>
```
Test1
  ✔️ Test1
Test2
  ✔️ Test2
```
### ✔️ <a id="user-content-r0s8" href="#r0s8">ParameterizedFixture(5)</a>
```
Test1
  ✔️ Test1
Test2
  ✔️ Test2
```
### ✔️ <a id="user-content-r0s9" href="#r0s9">OneTestCase</a>
```
TestCase
  ✔️ TestCase
```
### ✔️ <a id="user-content-r0s10" href="#r0s10">MockTestFixture</a>
```
MyTest
  ✔️ MyTest
```