![Tests failed](https://img.shields.io/badge/tests-268%20passed%2C%201%20failed-critical)
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/external/flutter/provider-test-results.json|268:white_check_mark:|1:x:||0ms|
## :x: <a id="user-content-r0" href="#r0">fixtures/external/flutter/provider-test-results.json</a>
**269** tests were completed in **0ms** with **268** passed, **1** failed and **0** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/builder_test.dart](#r0s0)|24:white_check_mark:|||402ms|
|[test/change_notifier_provider_test.dart](#r0s1)|10:white_check_mark:|||306ms|
|[test/consumer_test.dart](#r0s2)|18:white_check_mark:|||340ms|
|[test/context_test.dart](#r0s3)|31:white_check_mark:|||698ms|
|[test/future_provider_test.dart](#r0s4)|10:white_check_mark:|||305ms|
|[test/inherited_provider_test.dart](#r0s5)|81:white_check_mark:|||1s|
|[test/listenable_provider_test.dart](#r0s6)|16:white_check_mark:|||353ms|
|[test/listenable_proxy_provider_test.dart](#r0s7)|12:white_check_mark:|||373ms|
|[test/multi_provider_test.dart](#r0s8)|3:white_check_mark:|||198ms|
|[test/provider_test.dart](#r0s9)|11:white_check_mark:|||306ms|
|[test/proxy_provider_test.dart](#r0s10)|16:white_check_mark:|||438ms|
|[test/reassemble_test.dart](#r0s11)|3:white_check_mark:|||221ms|
|[test/selector_test.dart](#r0s12)|17:white_check_mark:|||364ms|
|[test/stateful_provider_test.dart](#r0s13)|4:white_check_mark:|||254ms|
|[test/stream_provider_test.dart](#r0s14)|8:white_check_mark:|||282ms|
|[test/value_listenable_provider_test.dart](#r0s15)|4:white_check_mark:|1:x:||327ms|
### :white_check_mark: <a id="user-content-r0s0" href="#r0s0">test/builder_test.dart</a>
```
ChangeNotifierProvider
  :white_check_mark: default
  :white_check_mark: .value
ListenableProvider
  :white_check_mark: default
  :white_check_mark: .value
Provider
  :white_check_mark: default
  :white_check_mark: .value
ProxyProvider
  :white_check_mark: 0
  :white_check_mark: 1
  :white_check_mark: 2
  :white_check_mark: 3
  :white_check_mark: 4
  :white_check_mark: 5
  :white_check_mark: 6
MultiProvider
  :white_check_mark: with 1 ChangeNotifierProvider default
  :white_check_mark: with 2 ChangeNotifierProvider default
  :white_check_mark: with ListenableProvider default
  :white_check_mark: with Provider default
  :white_check_mark: with ProxyProvider0
  :white_check_mark: with ProxyProvider1
  :white_check_mark: with ProxyProvider2
  :white_check_mark: with ProxyProvider3
  :white_check_mark: with ProxyProvider4
  :white_check_mark: with ProxyProvider5
  :white_check_mark: with ProxyProvider6
```
### :white_check_mark: <a id="user-content-r0s1" href="#r0s1">test/change_notifier_provider_test.dart</a>
```
:white_check_mark: Use builder property, not child
ChangeNotifierProvider
  :white_check_mark: value
  :white_check_mark: builder
  :white_check_mark: builder1
  :white_check_mark: builder2
  :white_check_mark: builder3
  :white_check_mark: builder4
  :white_check_mark: builder5
  :white_check_mark: builder6
  :white_check_mark: builder0
```
### :white_check_mark: <a id="user-content-r0s2" href="#r0s2">test/consumer_test.dart</a>
```
consumer
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
consumer2
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
consumer3
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
consumer4
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
consumer5
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
consumer6
  :white_check_mark: obtains value from Provider<T>
  :white_check_mark: crashed with no builder
  :white_check_mark: can be used inside MultiProvider
```
### :white_check_mark: <a id="user-content-r0s3" href="#r0s3">test/context_test.dart</a>
```
:white_check_mark: watch in layoutbuilder
:white_check_mark: select in layoutbuilder
:white_check_mark: cannot select in listView
:white_check_mark: watch in listView
:white_check_mark: watch in gridView
:white_check_mark: clears select dependencies for all dependents
BuildContext
  :white_check_mark: internal selected value is updated
  :white_check_mark: create can use read without being lazy
  :white_check_mark: watch can be used inside InheritedProvider.update
  :white_check_mark: select doesn't fail if it loads a provider that depends on other providers
  :white_check_mark: don't call old selectors if the child rebuilds individually
  :white_check_mark: selects throws inside click handlers
  :white_check_mark: select throws if try to read dynamic
  :white_check_mark: select throws ProviderNotFoundException
  :white_check_mark: select throws if watch called inside the callback from build
  :white_check_mark: select throws if read called inside the callback from build
  :white_check_mark: select throws if select called inside the callback from build
  :white_check_mark: select throws if read called inside the callback on dependency change
  :white_check_mark: select throws if watch called inside the callback on dependency change
  :white_check_mark: select throws if select called inside the callback on dependency change
  :white_check_mark: can call read inside didChangeDependencies
  :white_check_mark: select cannot be called inside didChangeDependencies
  :white_check_mark: select in initState throws
  :white_check_mark: watch in initState throws
  :white_check_mark: read in initState works
  :white_check_mark: consumer can be removed and selector stops to be called
  :white_check_mark: context.select deeply compares maps
  :white_check_mark: context.select deeply compares lists
  :white_check_mark: context.select deeply compares iterables
  :white_check_mark: context.select deeply compares sets
  :white_check_mark: context.watch listens to value changes
```
### :white_check_mark: <a id="user-content-r0s4" href="#r0s4">test/future_provider_test.dart</a>
```
:white_check_mark: works with MultiProvider
:white_check_mark: (catchError) previous future completes after transition is no-op
:white_check_mark: previous future completes after transition is no-op
:white_check_mark: transition from future to future preserve state
:white_check_mark: throws if future has error and catchError is missing
:white_check_mark: calls catchError if present and future has error
:white_check_mark: works with null
:white_check_mark: create and dispose future with builder
:white_check_mark: FutureProvider() crashes if builder is null
FutureProvider()
  :white_check_mark: crashes if builder is null
```
### :white_check_mark: <a id="user-content-r0s5" href="#r0s5">test/inherited_provider_test.dart</a>
```
:white_check_mark: regression test #377
:white_check_mark: rebuild on dependency flags update
:white_check_mark: properly update debug flags if a create triggers another deferred create
:white_check_mark: properly update debug flags if a create triggers another deferred create
:white_check_mark: properly update debug flags if an update triggers another create/update
:white_check_mark: properly update debug flags if a create triggers another create/update
:white_check_mark: Provider.of(listen: false) outside of build works when it loads a provider
:white_check_mark: new value is available in didChangeDependencies
:white_check_mark: builder receives the current value and updates independently from `update`
:white_check_mark: builder can _not_ rebuild when provider updates
:white_check_mark: builder rebuilds if provider is recreated
:white_check_mark: provider.of throws if listen:true outside of the widget tree
:white_check_mark: InheritedProvider throws if no child is provided with default constructor
:white_check_mark: InheritedProvider throws if no child is provided with value constructor
:white_check_mark: DeferredInheritedProvider throws if no child is provided with default constructor
:white_check_mark: DeferredInheritedProvider throws if no child is provided with value constructor
:white_check_mark: startListening markNeedsNotifyDependents
:white_check_mark: InheritedProvider can be subclassed
:white_check_mark: DeferredInheritedProvider can be subclassed
:white_check_mark: can be used with MultiProvider
:white_check_mark: throw if the widget ctor changes
:white_check_mark: InheritedProvider lazy loading can be disabled
:white_check_mark: InheritedProvider.value lazy loading can be disabled
:white_check_mark: InheritedProvider subclass don't have to specify default lazy value
:white_check_mark: DeferredInheritedProvider lazy loading can be disabled
:white_check_mark: DeferredInheritedProvider.value lazy loading can be disabled
:white_check_mark: selector
:white_check_mark: can select multiple types from same provider
:white_check_mark: can select same type on two different providers
:white_check_mark: can select same type twice on same provider
:white_check_mark: Provider.of has a proper error message if context is null
diagnostics
  :white_check_mark: InheritedProvider.value
  :white_check_mark: InheritedProvider doesn't break lazy loading
  :white_check_mark: InheritedProvider show if listening
  :white_check_mark: DeferredInheritedProvider.value
  :white_check_mark: DeferredInheritedProvider
InheritedProvider.value()
  :white_check_mark: markNeedsNotifyDependents during startListening is noop
  :white_check_mark: startListening called again when create returns new value
  :white_check_mark: startListening
  :white_check_mark: stopListening not called twice if rebuild doesn't have listeners
  :white_check_mark: removeListener cannot be null
  :white_check_mark: pass down current value
  :white_check_mark: default updateShouldNotify
  :white_check_mark: custom updateShouldNotify
InheritedProvider()
  :white_check_mark: hasValue
  :white_check_mark: provider calls update if rebuilding only due to didChangeDependencies
  :white_check_mark: provider notifying dependents doesn't call update
  :white_check_mark: update can call Provider.of with listen:true
  :white_check_mark: update lazy loaded can call Provider.of with listen:true
  :white_check_mark: markNeedsNotifyDependents during startListening is noop
  :white_check_mark: update can obtain parent of the same type than self
  :white_check_mark: _debugCheckInvalidValueType
  :white_check_mark: startListening
  :white_check_mark: startListening called again when create returns new value
  :white_check_mark: stopListening not called twice if rebuild doesn't have listeners
  :white_check_mark: removeListener cannot be null
  :white_check_mark: fails if initialValueBuilder calls inheritFromElement/inheritFromWiggetOfExactType
  :white_check_mark: builder is called on every rebuild and after a dependency change
  :white_check_mark: builder with no updateShouldNotify use ==
  :white_check_mark: builder calls updateShouldNotify callback
  :white_check_mark: initialValue is transmitted to valueBuilder
  :white_check_mark: calls builder again if dependencies change
  :white_check_mark: exposes initialValue if valueBuilder is null
  :white_check_mark: call dispose on unmount
  :white_check_mark: builder unmount, dispose not called if value never read
  :white_check_mark: call dispose after new value
  :white_check_mark: valueBuilder works without initialBuilder
  :white_check_mark: calls initialValueBuilder lazily once
  :white_check_mark: throws if both builder and initialBuilder are missing
DeferredInheritedProvider.value()
  :white_check_mark: hasValue
  :white_check_mark: startListening
  :white_check_mark: stopListening cannot be null
  :white_check_mark: startListening doesn't need setState if already initialized
  :white_check_mark: setState without updateShouldNotify
  :white_check_mark: setState with updateShouldNotify
  :white_check_mark: startListening never leave the widget uninitialized
  :white_check_mark: startListening called again on controller change
DeferredInheritedProvider()
  :white_check_mark: create can't call inherited widgets
  :white_check_mark: creates the value lazily
  :white_check_mark: dispose
  :white_check_mark: dispose no-op if never built
```
### :white_check_mark: <a id="user-content-r0s6" href="#r0s6">test/listenable_provider_test.dart</a>
```
ListenableProvider
  :white_check_mark: works with MultiProvider
  :white_check_mark: asserts that the created notifier can have listeners
  :white_check_mark: don't listen again if listenable instance doesn't change
  :white_check_mark: works with null (default)
  :white_check_mark: works with null (create)
  :white_check_mark: stateful create called once
  :white_check_mark: dispose called on unmount
  :white_check_mark: dispose can be null
  :white_check_mark: changing listenable rebuilds descendants
  :white_check_mark: rebuilding with the same provider don't rebuilds descendants
  :white_check_mark: notifylistener rebuilds descendants
ListenableProvider value constructor
  :white_check_mark: pass down key
  :white_check_mark: changing the Listenable instance rebuilds dependents
ListenableProvider stateful constructor
  :white_check_mark: called with context
  :white_check_mark: pass down key
  :white_check_mark: throws if create is null
```
### :white_check_mark: <a id="user-content-r0s7" href="#r0s7">test/listenable_proxy_provider_test.dart</a>
```
ListenableProxyProvider
  :white_check_mark: throws if update is missing
  :white_check_mark: asserts that the created notifier has no listener
  :white_check_mark: asserts that the created notifier has no listener after rebuild
  :white_check_mark: rebuilds dependendents when listeners are called
  :white_check_mark: update returning a new Listenable disposes the previously created value and update dependents
  :white_check_mark: disposes of created value
ListenableProxyProvider variants
  :white_check_mark: ListenableProxyProvider
  :white_check_mark: ListenableProxyProvider2
  :white_check_mark: ListenableProxyProvider3
  :white_check_mark: ListenableProxyProvider4
  :white_check_mark: ListenableProxyProvider5
  :white_check_mark: ListenableProxyProvider6
```
### :white_check_mark: <a id="user-content-r0s8" href="#r0s8">test/multi_provider_test.dart</a>
```
MultiProvider
  :white_check_mark: throw if providers is null
  :white_check_mark: MultiProvider children can only access parent providers
  :white_check_mark: MultiProvider.providers with ignored child
```
### :white_check_mark: <a id="user-content-r0s9" href="#r0s9">test/provider_test.dart</a>
```
:white_check_mark: works with MultiProvider
Provider.of
  :white_check_mark: throws if T is dynamic
  :white_check_mark: listen defaults to true when building widgets
  :white_check_mark: listen defaults to false outside of the widget tree
  :white_check_mark: listen:false doesn't trigger rebuild
  :white_check_mark: listen:true outside of the widget tree throws
Provider
  :white_check_mark: throws if the provided value is a Listenable/Stream
  :white_check_mark: debugCheckInvalidValueType can be disabled
  :white_check_mark: simple usage
  :white_check_mark: throws an error if no provider found
  :white_check_mark: update should notify
```
### :white_check_mark: <a id="user-content-r0s10" href="#r0s10">test/proxy_provider_test.dart</a>
```
ProxyProvider
  :white_check_mark: throws if the provided value is a Listenable/Stream
  :white_check_mark: debugCheckInvalidValueType can be disabled
  :white_check_mark: create creates initial value
  :white_check_mark: consume another providers
  :white_check_mark: rebuild descendants if value change
  :white_check_mark: call dispose when unmounted with the latest result
  :white_check_mark: don't rebuild descendants if value doesn't change
  :white_check_mark: pass down updateShouldNotify
  :white_check_mark: works with MultiProvider
  :white_check_mark: update callback can trigger descendants setState synchronously
  :white_check_mark: throws if update is null
ProxyProvider variants
  :white_check_mark: ProxyProvider2
  :white_check_mark: ProxyProvider3
  :white_check_mark: ProxyProvider4
  :white_check_mark: ProxyProvider5
  :white_check_mark: ProxyProvider6
```
### :white_check_mark: <a id="user-content-r0s11" href="#r0s11">test/reassemble_test.dart</a>
```
:white_check_mark: ReassembleHandler
:white_check_mark: unevaluated create
:white_check_mark: unevaluated create
```
### :white_check_mark: <a id="user-content-r0s12" href="#r0s12">test/selector_test.dart</a>
```
:white_check_mark: asserts that builder/selector are not null
:white_check_mark: Deep compare maps by default
:white_check_mark: Deep compare iterables by default
:white_check_mark: Deep compare sets by default
:white_check_mark: Deep compare lists by default
:white_check_mark: custom shouldRebuid
:white_check_mark: passes `child` and `key`
:white_check_mark: calls builder if the callback changes
:white_check_mark: works with MultiProvider
:white_check_mark: don't call builder again if it rebuilds but selector returns the same thing
:white_check_mark: call builder again if it rebuilds abd selector returns the a different variable
:white_check_mark: Selector
:white_check_mark: Selector2
:white_check_mark: Selector3
:white_check_mark: Selector4
:white_check_mark: Selector5
:white_check_mark: Selector6
```
### :white_check_mark: <a id="user-content-r0s13" href="#r0s13">test/stateful_provider_test.dart</a>
```
:white_check_mark: asserts
:white_check_mark: works with MultiProvider
:white_check_mark: calls create only once
:white_check_mark: dispose
```
### :white_check_mark: <a id="user-content-r0s14" href="#r0s14">test/stream_provider_test.dart</a>
```
:white_check_mark: works with MultiProvider
:white_check_mark: transition from stream to stream preserve state
:white_check_mark: throws if stream has error and catchError is missing
:white_check_mark: calls catchError if present and stream has error
:white_check_mark: works with null
:white_check_mark: StreamProvider() crashes if builder is null
StreamProvider()
  :white_check_mark: create and dispose stream with builder
  :white_check_mark: crashes if builder is null
```
### :x: <a id="user-content-r0s15" href="#r0s15">test/value_listenable_provider_test.dart</a>
```
valueListenableProvider
  :white_check_mark: rebuilds when value change
  :white_check_mark: don't rebuild dependents by default
  :white_check_mark: pass keys
  :white_check_mark: don't listen again if stream instance doesn't change
  :x: pass updateShouldNotify
	The following TestFailure object was thrown running a test:
	  Expected: <2>
	  Actual: <1>
	Unexpected number of calls
	
```