![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%201%20failed%2C%201%20skipped-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[fixtures/open-test-reporting/hierarchy.xml](#user-content-r0)|5 ✅|1 ❌|1 ⚪|4s|
## ❌ <a id="user-content-r0" href="#user-content-r0">fixtures/open-test-reporting/hierarchy.xml</a>
**7** tests were completed in **4s** with **5** passed, **1** failed and **1** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[com.example.EmptySuite](#user-content-r0s0)||||0ms|
|[com.example.PaymentServiceTest](#user-content-r0s1)|3 ✅|1 ❌||3s|
|[com.example.UserServiceTest](#user-content-r0s2)|2 ✅||1 ⚪|1s|
### ❌ <a id="user-content-r0s1" href="#user-content-r0s1">com.example.PaymentServiceTest</a>
```
ValidationTests
  ✅ testValidAmount
  ✅ testInvalidAmount
ProcessingTests
  ✅ testSuccessfulPayment
  ❌ testPaymentTimeout
	org.opentest4j.AssertionFailedError: Payment should complete within 500ms but took 700ms
```
### ✅ <a id="user-content-r0s2" href="#user-content-r0s2">com.example.UserServiceTest</a>
```
✅ testUserCreation
✅ testUserDeletion
⚪ testUserUpdate
```