![Tests failed](https://img.shields.io/badge/tests-268%20passed%2C%201%20failed-critical)
## <a id="user-content-r0" href="#r0">fixtures/external/flutter/provider-test-results.json</a> ❌
**269** tests were completed in **0ms** with **268** passed, **1** failed and **0** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/builder_test.dart](#r0s0)|24✔️|||402ms|
|[test/change_notifier_provider_test.dart](#r0s1)|10✔️|||306ms|
|[test/consumer_test.dart](#r0s2)|18✔️|||340ms|
|[test/context_test.dart](#r0s3)|31✔️|||698ms|
|[test/future_provider_test.dart](#r0s4)|10✔️|||305ms|
|[test/inherited_provider_test.dart](#r0s5)|81✔️|||1.117s|
|[test/listenable_provider_test.dart](#r0s6)|16✔️|||353ms|
|[test/listenable_proxy_provider_test.dart](#r0s7)|12✔️|||373ms|
|[test/multi_provider_test.dart](#r0s8)|3✔️|||198ms|
|[test/provider_test.dart](#r0s9)|11✔️|||306ms|
|[test/proxy_provider_test.dart](#r0s10)|16✔️|||438ms|
|[test/reassemble_test.dart](#r0s11)|3✔️|||221ms|
|[test/selector_test.dart](#r0s12)|17✔️|||364ms|
|[test/stateful_provider_test.dart](#r0s13)|4✔️|||254ms|
|[test/stream_provider_test.dart](#r0s14)|8✔️|||282ms|
|[test/value_listenable_provider_test.dart](#r0s15)|4✔️|1❌||327ms|
### <a id="user-content-r0s0" href="#r0s0">test/builder_test.dart</a> ✔️
**24** tests were completed in **402ms** with **24** passed, **0** failed and **0** skipped.

**ChangeNotifierProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ChangeNotifierProvider default|189ms|
|✔️|ChangeNotifierProvider .value|10ms|

**ListenableProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProvider default|9ms|
|✔️|ListenableProvider .value|16ms|

**Provider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|Provider default|11ms|
|✔️|Provider .value|8ms|

**ProxyProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ProxyProvider 0|11ms|
|✔️|ProxyProvider 1|10ms|
|✔️|ProxyProvider 2|8ms|
|✔️|ProxyProvider 3|10ms|
|✔️|ProxyProvider 4|9ms|
|✔️|ProxyProvider 5|9ms|
|✔️|ProxyProvider 6|9ms|

**MultiProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|MultiProvider with 1 ChangeNotifierProvider default|9ms|
|✔️|MultiProvider with 2 ChangeNotifierProvider default|9ms|
|✔️|MultiProvider with ListenableProvider default|12ms|
|✔️|MultiProvider with Provider default|8ms|
|✔️|MultiProvider with ProxyProvider0|7ms|
|✔️|MultiProvider with ProxyProvider1|9ms|
|✔️|MultiProvider with ProxyProvider2|7ms|
|✔️|MultiProvider with ProxyProvider3|9ms|
|✔️|MultiProvider with ProxyProvider4|9ms|
|✔️|MultiProvider with ProxyProvider5|7ms|
|✔️|MultiProvider with ProxyProvider6|7ms|
### <a id="user-content-r0s1" href="#r0s1">test/change_notifier_provider_test.dart</a> ✔️
**10** tests were completed in **306ms** with **10** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|Use builder property, not child|10ms|

**ChangeNotifierProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ChangeNotifierProvider value|185ms|
|✔️|ChangeNotifierProvider builder|18ms|
|✔️|ChangeNotifierProvider builder1|12ms|
|✔️|ChangeNotifierProvider builder2|12ms|
|✔️|ChangeNotifierProvider builder3|19ms|
|✔️|ChangeNotifierProvider builder4|14ms|
|✔️|ChangeNotifierProvider builder5|15ms|
|✔️|ChangeNotifierProvider builder6|11ms|
|✔️|ChangeNotifierProvider builder0|10ms|
### <a id="user-content-r0s2" href="#r0s2">test/consumer_test.dart</a> ✔️
**18** tests were completed in **340ms** with **18** passed, **0** failed and **0** skipped.

**consumer**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer obtains value from Provider<T>|181ms|
|✔️|consumer crashed with no builder|11ms|
|✔️|consumer can be used inside MultiProvider|16ms|

**consumer2**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer2 obtains value from Provider<T>|22ms|
|✔️|consumer2 crashed with no builder|8ms|
|✔️|consumer2 can be used inside MultiProvider|9ms|

**consumer3**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer3 obtains value from Provider<T>|9ms|
|✔️|consumer3 crashed with no builder|7ms|
|✔️|consumer3 can be used inside MultiProvider|8ms|

**consumer4**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer4 obtains value from Provider<T>|8ms|
|✔️|consumer4 crashed with no builder|6ms|
|✔️|consumer4 can be used inside MultiProvider|8ms|

**consumer5**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer5 obtains value from Provider<T>|8ms|
|✔️|consumer5 crashed with no builder|6ms|
|✔️|consumer5 can be used inside MultiProvider|9ms|

**consumer6**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|consumer6 obtains value from Provider<T>|8ms|
|✔️|consumer6 crashed with no builder|8ms|
|✔️|consumer6 can be used inside MultiProvider|8ms|
### <a id="user-content-r0s3" href="#r0s3">test/context_test.dart</a> ✔️
**31** tests were completed in **698ms** with **31** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|watch in layoutbuilder|179ms|
|✔️|select in layoutbuilder|12ms|
|✔️|cannot select in listView|138ms|
|✔️|watch in listView|33ms|
|✔️|watch in gridView|21ms|
|✔️|clears select dependencies for all dependents|19ms|

**BuildContext**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|BuildContext internal selected value is updated|32ms|
|✔️|BuildContext create can use read without being lazy|11ms|
|✔️|BuildContext watch can be used inside InheritedProvider.update|10ms|
|✔️|BuildContext select doesn't fail if it loads a provider that depends on other providers|9ms|
|✔️|BuildContext don't call old selectors if the child rebuilds individually|21ms|
|✔️|BuildContext selects throws inside click handlers|40ms|
|✔️|BuildContext select throws if try to read dynamic|9ms|
|✔️|BuildContext select throws ProviderNotFoundException|9ms|
|✔️|BuildContext select throws if watch called inside the callback from build|6ms|
|✔️|BuildContext select throws if read called inside the callback from build|9ms|
|✔️|BuildContext select throws if select called inside the callback from build|8ms|
|✔️|BuildContext select throws if read called inside the callback on dependency change|10ms|
|✔️|BuildContext select throws if watch called inside the callback on dependency change|17ms|
|✔️|BuildContext select throws if select called inside the callback on dependency change|9ms|
|✔️|BuildContext can call read inside didChangeDependencies|9ms|
|✔️|BuildContext select cannot be called inside didChangeDependencies|6ms|
|✔️|BuildContext select in initState throws|6ms|
|✔️|BuildContext watch in initState throws|10ms|
|✔️|BuildContext read in initState works|6ms|
|✔️|BuildContext consumer can be removed and selector stops to be called|7ms|
|✔️|BuildContext context.select deeply compares maps|15ms|
|✔️|BuildContext context.select deeply compares lists|8ms|
|✔️|BuildContext context.select deeply compares iterables|8ms|
|✔️|BuildContext context.select deeply compares sets|11ms|
|✔️|BuildContext context.watch listens to value changes|10ms|
### <a id="user-content-r0s4" href="#r0s4">test/future_provider_test.dart</a> ✔️
**10** tests were completed in **305ms** with **10** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|works with MultiProvider|184ms|
|✔️|(catchError) previous future completes after transition is no-op|16ms|
|✔️|previous future completes after transition is no-op|15ms|
|✔️|transition from future to future preserve state|12ms|
|✔️|throws if future has error and catchError is missing|24ms|
|✔️|calls catchError if present and future has error|21ms|
|✔️|works with null|14ms|
|✔️|create and dispose future with builder|12ms|
|✔️|FutureProvider() crashes if builder is null|4ms|

**FutureProvider()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|FutureProvider() crashes if builder is null|3ms|
### <a id="user-content-r0s5" href="#r0s5">test/inherited_provider_test.dart</a> ✔️
**81** tests were completed in **1.117s** with **81** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|regression test #377|167ms|
|✔️|rebuild on dependency flags update|15ms|
|✔️|properly update debug flags if a create triggers another deferred create|9ms|
|✔️|properly update debug flags if a create triggers another deferred create|8ms|
|✔️|properly update debug flags if an update triggers another create/update|7ms|
|✔️|properly update debug flags if a create triggers another create/update|8ms|
|✔️|Provider.of(listen: false) outside of build works when it loads a provider|22ms|
|✔️|new value is available in didChangeDependencies|26ms|
|✔️|builder receives the current value and updates independently from `update`|16ms|
|✔️|builder can _not_ rebuild when provider updates|8ms|
|✔️|builder rebuilds if provider is recreated|9ms|
|✔️|provider.of throws if listen:true outside of the widget tree|23ms|
|✔️|InheritedProvider throws if no child is provided with default constructor|14ms|
|✔️|InheritedProvider throws if no child is provided with value constructor|8ms|
|✔️|DeferredInheritedProvider throws if no child is provided with default constructor|15ms|
|✔️|DeferredInheritedProvider throws if no child is provided with value constructor|7ms|
|✔️|startListening markNeedsNotifyDependents|7ms|
|✔️|InheritedProvider can be subclassed|8ms|
|✔️|DeferredInheritedProvider can be subclassed|7ms|
|✔️|can be used with MultiProvider|8ms|
|✔️|throw if the widget ctor changes|8ms|
|✔️|InheritedProvider lazy loading can be disabled|6ms|
|✔️|InheritedProvider.value lazy loading can be disabled|9ms|
|✔️|InheritedProvider subclass don't have to specify default lazy value|7ms|
|✔️|DeferredInheritedProvider lazy loading can be disabled|7ms|
|✔️|DeferredInheritedProvider.value lazy loading can be disabled|7ms|
|✔️|selector|14ms|
|✔️|can select multiple types from same provider|9ms|
|✔️|can select same type on two different providers|8ms|
|✔️|can select same type twice on same provider|10ms|
|✔️|Provider.of has a proper error message if context is null|6ms|

**diagnostics**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|diagnostics InheritedProvider.value|11ms|
|✔️|diagnostics InheritedProvider doesn't break lazy loading|7ms|
|✔️|diagnostics InheritedProvider show if listening|7ms|
|✔️|diagnostics DeferredInheritedProvider.value|6ms|
|✔️|diagnostics DeferredInheritedProvider|16ms|

**InheritedProvider.value()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|InheritedProvider.value() markNeedsNotifyDependents during startListening is noop|8ms|
|✔️|InheritedProvider.value() startListening called again when create returns new value|27ms|
|✔️|InheritedProvider.value() startListening|19ms|
|✔️|InheritedProvider.value() stopListening not called twice if rebuild doesn't have listeners|16ms|
|✔️|InheritedProvider.value() removeListener cannot be null|22ms|
|✔️|InheritedProvider.value() pass down current value|17ms|
|✔️|InheritedProvider.value() default updateShouldNotify|8ms|
|✔️|InheritedProvider.value() custom updateShouldNotify|32ms|

**InheritedProvider()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|InheritedProvider() hasValue|16ms|
|✔️|InheritedProvider() provider calls update if rebuilding only due to didChangeDependencies|9ms|
|✔️|InheritedProvider() provider notifying dependents doesn't call update|11ms|
|✔️|InheritedProvider() update can call Provider.of with listen:true|7ms|
|✔️|InheritedProvider() update lazy loaded can call Provider.of with listen:true|10ms|
|✔️|InheritedProvider() markNeedsNotifyDependents during startListening is noop|22ms|
|✔️|InheritedProvider() update can obtain parent of the same type than self|15ms|
|✔️|InheritedProvider() _debugCheckInvalidValueType|22ms|
|✔️|InheritedProvider() startListening|18ms|
|✔️|InheritedProvider() startListening called again when create returns new value|20ms|
|✔️|InheritedProvider() stopListening not called twice if rebuild doesn't have listeners|18ms|
|✔️|InheritedProvider() removeListener cannot be null|16ms|
|✔️|InheritedProvider() fails if initialValueBuilder calls inheritFromElement/inheritFromWiggetOfExactType|17ms|
|✔️|InheritedProvider() builder is called on every rebuild and after a dependency change|11ms|
|✔️|InheritedProvider() builder with no updateShouldNotify use ==|8ms|
|✔️|InheritedProvider() builder calls updateShouldNotify callback|8ms|
|✔️|InheritedProvider() initialValue is transmitted to valueBuilder|8ms|
|✔️|InheritedProvider() calls builder again if dependencies change|22ms|
|✔️|InheritedProvider() exposes initialValue if valueBuilder is null|20ms|
|✔️|InheritedProvider() call dispose on unmount|22ms|
|✔️|InheritedProvider() builder unmount, dispose not called if value never read|11ms|
|✔️|InheritedProvider() call dispose after new value|9ms|
|✔️|InheritedProvider() valueBuilder works without initialBuilder|11ms|
|✔️|InheritedProvider() calls initialValueBuilder lazily once|7ms|
|✔️|InheritedProvider() throws if both builder and initialBuilder are missing|5ms|

**DeferredInheritedProvider.value()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|DeferredInheritedProvider.value() hasValue|6ms|
|✔️|DeferredInheritedProvider.value() startListening|9ms|
|✔️|DeferredInheritedProvider.value() stopListening cannot be null|9ms|
|✔️|DeferredInheritedProvider.value() startListening doesn't need setState if already initialized|8ms|
|✔️|DeferredInheritedProvider.value() setState without updateShouldNotify|8ms|
|✔️|DeferredInheritedProvider.value() setState with updateShouldNotify|9ms|
|✔️|DeferredInheritedProvider.value() startListening never leave the widget uninitialized|8ms|
|✔️|DeferredInheritedProvider.value() startListening called again on controller change|10ms|

**DeferredInheritedProvider()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|DeferredInheritedProvider() create can't call inherited widgets|7ms|
|✔️|DeferredInheritedProvider() creates the value lazily|7ms|
|✔️|DeferredInheritedProvider() dispose|7ms|
|✔️|DeferredInheritedProvider() dispose no-op if never built|7ms|
### <a id="user-content-r0s6" href="#r0s6">test/listenable_provider_test.dart</a> ✔️
**16** tests were completed in **353ms** with **16** passed, **0** failed and **0** skipped.

**ListenableProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProvider works with MultiProvider|173ms|
|✔️|ListenableProvider asserts that the created notifier can have listeners|12ms|
|✔️|ListenableProvider don't listen again if listenable instance doesn't change|12ms|
|✔️|ListenableProvider works with null (default)|7ms|
|✔️|ListenableProvider works with null (create)|7ms|
|✔️|ListenableProvider stateful create called once|11ms|
|✔️|ListenableProvider dispose called on unmount|13ms|
|✔️|ListenableProvider dispose can be null|8ms|
|✔️|ListenableProvider changing listenable rebuilds descendants|12ms|
|✔️|ListenableProvider rebuilding with the same provider don't rebuilds descendants|11ms|
|✔️|ListenableProvider notifylistener rebuilds descendants|9ms|

**ListenableProvider value constructor**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProvider value constructor pass down key|17ms|
|✔️|ListenableProvider value constructor changing the Listenable instance rebuilds dependents|29ms|

**ListenableProvider stateful constructor**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProvider stateful constructor called with context|8ms|
|✔️|ListenableProvider stateful constructor pass down key|20ms|
|✔️|ListenableProvider stateful constructor throws if create is null|4ms|
### <a id="user-content-r0s7" href="#r0s7">test/listenable_proxy_provider_test.dart</a> ✔️
**12** tests were completed in **373ms** with **12** passed, **0** failed and **0** skipped.

**ListenableProxyProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProxyProvider throws if update is missing|43ms|
|✔️|ListenableProxyProvider asserts that the created notifier has no listener|177ms|
|✔️|ListenableProxyProvider asserts that the created notifier has no listener after rebuild|18ms|
|✔️|ListenableProxyProvider rebuilds dependendents when listeners are called|20ms|
|✔️|ListenableProxyProvider update returning a new Listenable disposes the previously created value and update dependents|25ms|
|✔️|ListenableProxyProvider disposes of created value|13ms|

**ListenableProxyProvider variants**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ListenableProxyProvider variants ListenableProxyProvider|13ms|
|✔️|ListenableProxyProvider variants ListenableProxyProvider2|9ms|
|✔️|ListenableProxyProvider variants ListenableProxyProvider3|9ms|
|✔️|ListenableProxyProvider variants ListenableProxyProvider4|17ms|
|✔️|ListenableProxyProvider variants ListenableProxyProvider5|12ms|
|✔️|ListenableProxyProvider variants ListenableProxyProvider6|17ms|
### <a id="user-content-r0s8" href="#r0s8">test/multi_provider_test.dart</a> ✔️
**3** tests were completed in **198ms** with **3** passed, **0** failed and **0** skipped.

**MultiProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|MultiProvider throw if providers is null|30ms|
|✔️|MultiProvider MultiProvider children can only access parent providers|160ms|
|✔️|MultiProvider MultiProvider.providers with ignored child|8ms|
### <a id="user-content-r0s9" href="#r0s9">test/provider_test.dart</a> ✔️
**11** tests were completed in **306ms** with **11** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|works with MultiProvider|172ms|

**Provider.of**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|Provider.of throws if T is dynamic|26ms|
|✔️|Provider.of listen defaults to true when building widgets|13ms|
|✔️|Provider.of listen defaults to false outside of the widget tree|9ms|
|✔️|Provider.of listen:false doesn't trigger rebuild|10ms|
|✔️|Provider.of listen:true outside of the widget tree throws|11ms|

**Provider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|Provider throws if the provided value is a Listenable/Stream|28ms|
|✔️|Provider debugCheckInvalidValueType can be disabled|9ms|
|✔️|Provider simple usage|9ms|
|✔️|Provider throws an error if no provider found|11ms|
|✔️|Provider update should notify|8ms|
### <a id="user-content-r0s10" href="#r0s10">test/proxy_provider_test.dart</a> ✔️
**16** tests were completed in **438ms** with **16** passed, **0** failed and **0** skipped.

**ProxyProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ProxyProvider throws if the provided value is a Listenable/Stream|209ms|
|✔️|ProxyProvider debugCheckInvalidValueType can be disabled|13ms|
|✔️|ProxyProvider create creates initial value|23ms|
|✔️|ProxyProvider consume another providers|18ms|
|✔️|ProxyProvider rebuild descendants if value change|13ms|
|✔️|ProxyProvider call dispose when unmounted with the latest result|11ms|
|✔️|ProxyProvider don't rebuild descendants if value doesn't change|12ms|
|✔️|ProxyProvider pass down updateShouldNotify|19ms|
|✔️|ProxyProvider works with MultiProvider|16ms|
|✔️|ProxyProvider update callback can trigger descendants setState synchronously|24ms|
|✔️|ProxyProvider throws if update is null|7ms|

**ProxyProvider variants**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|ProxyProvider variants ProxyProvider2|18ms|
|✔️|ProxyProvider variants ProxyProvider3|16ms|
|✔️|ProxyProvider variants ProxyProvider4|9ms|
|✔️|ProxyProvider variants ProxyProvider5|20ms|
|✔️|ProxyProvider variants ProxyProvider6|10ms|
### <a id="user-content-r0s11" href="#r0s11">test/reassemble_test.dart</a> ✔️
**3** tests were completed in **221ms** with **3** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|ReassembleHandler|194ms|
|✔️|unevaluated create|11ms|
|✔️|unevaluated create|16ms|
### <a id="user-content-r0s12" href="#r0s12">test/selector_test.dart</a> ✔️
**17** tests were completed in **364ms** with **17** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|asserts that builder/selector are not null|32ms|
|✔️|Deep compare maps by default|158ms|
|✔️|Deep compare iterables by default|9ms|
|✔️|Deep compare sets by default|12ms|
|✔️|Deep compare lists by default|14ms|
|✔️|custom shouldRebuid|11ms|
|✔️|passes `child` and `key`|13ms|
|✔️|calls builder if the callback changes|14ms|
|✔️|works with MultiProvider|12ms|
|✔️|don't call builder again if it rebuilds but selector returns the same thing|9ms|
|✔️|call builder again if it rebuilds abd selector returns the a different variable|9ms|
|✔️|Selector|15ms|
|✔️|Selector2|9ms|
|✔️|Selector3|8ms|
|✔️|Selector4|9ms|
|✔️|Selector5|19ms|
|✔️|Selector6|11ms|
### <a id="user-content-r0s13" href="#r0s13">test/stateful_provider_test.dart</a> ✔️
**4** tests were completed in **254ms** with **4** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|asserts|6ms|
|✔️|works with MultiProvider|203ms|
|✔️|calls create only once|27ms|
|✔️|dispose|18ms|
### <a id="user-content-r0s14" href="#r0s14">test/stream_provider_test.dart</a> ✔️
**8** tests were completed in **282ms** with **8** passed, **0** failed and **0** skipped.

|Result|Test|Time|
|:---:|:---|---:|
|✔️|works with MultiProvider|191ms|
|✔️|transition from stream to stream preserve state|16ms|
|✔️|throws if stream has error and catchError is missing|22ms|
|✔️|calls catchError if present and stream has error|20ms|
|✔️|works with null|13ms|
|✔️|StreamProvider() crashes if builder is null|5ms|

**StreamProvider()**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|StreamProvider() create and dispose stream with builder|11ms|
|✔️|StreamProvider() crashes if builder is null|4ms|
### <a id="user-content-r0s15" href="#r0s15">test/value_listenable_provider_test.dart</a> ❌
**5** tests were completed in **327ms** with **4** passed, **1** failed and **0** skipped.

**valueListenableProvider**
|Result|Test|Time|
|:---:|:---|---:|
|✔️|valueListenableProvider rebuilds when value change|200ms|
|✔️|valueListenableProvider don't rebuild dependents by default|26ms|
|✔️|valueListenableProvider pass keys|10ms|
|✔️|valueListenableProvider don't listen again if stream instance doesn't change|22ms|
|❌|valueListenableProvider pass updateShouldNotify|69ms|