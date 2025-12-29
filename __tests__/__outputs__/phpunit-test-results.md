![Tests failed](https://img.shields.io/badge/tests-10%20passed%2C%202%20failed-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/phpunit/phpunit.xml</a>
**12** tests were completed in **148ms** with **10** passed, **2** failed and **0** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[CLI Arguments](#r0s0)||2❌||140ms|
|[PHPUnit\Event\CollectingDispatcherTest](#r0s1)|2✅|||4ms|
|[PHPUnit\Event\DeferringDispatcherTest](#r0s2)|4✅|||3ms|
|[PHPUnit\Event\DirectDispatcherTest](#r0s3)|4✅|||1ms|
### ❌ <a id="user-content-r0s0" href="#r0s0">CLI Arguments</a>
```
❌ targeting-traits-with-coversclass-attribute-is-deprecated.phpt
	PHPUnit\Framework\PhptAssertionFailedError
❌ targeting-traits-with-usesclass-attribute-is-deprecated.phpt
	PHPUnit\Framework\PhptAssertionFailedError
```
### ✅ <a id="user-content-r0s1" href="#r0s1">PHPUnit\Event\CollectingDispatcherTest</a>
```
PHPUnit.Event.CollectingDispatcherTest
  ✅ testHasNoCollectedEventsWhenFlushedImmediatelyAfterCreation
  ✅ testCollectsDispatchedEventsUntilFlushed
```
### ✅ <a id="user-content-r0s2" href="#r0s2">PHPUnit\Event\DeferringDispatcherTest</a>
```
PHPUnit.Event.DeferringDispatcherTest
  ✅ testCollectsEventsUntilFlush
  ✅ testFlushesCollectedEvents
  ✅ testSubscriberCanBeRegistered
  ✅ testTracerCanBeRegistered
```
### ✅ <a id="user-content-r0s3" href="#r0s3">PHPUnit\Event\DirectDispatcherTest</a>
```
PHPUnit.Event.DirectDispatcherTest
  ✅ testDispatchesEventToKnownSubscribers
  ✅ testDispatchesEventToTracers
  ✅ testRegisterRejectsUnknownSubscriber
  ✅ testDispatchRejectsUnknownEventType
```