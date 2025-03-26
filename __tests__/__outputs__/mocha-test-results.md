[![Tests passed successfully](https://img.shields.io/badge/tests-833%20passed%2C%206%20skipped-success)](#user-content-test-report)
<details><summary>Expand for details</summary>
 
# <a name="user-content-test-report"></a> Tests report
|Report|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|fixtures/external/mocha/mocha-test-results.json|833 ✅||6 ⚪|6s|
## ✅ <a id="user-content-r0" href="#user-content-r0">fixtures/external/mocha/mocha-test-results.json</a>
**839** tests were completed in **6s** with **833** passed, **0** failed and **6** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/node-unit/buffered-worker-pool.spec.js](#user-content-r0s0)|14 ✅|||8ms|
|[test/node-unit/cli/config.spec.js](#user-content-r0s1)|10 ✅|||8ms|
|[test/node-unit/cli/node-flags.spec.js](#user-content-r0s2)|105 ✅|||9ms|
|[test/node-unit/cli/options.spec.js](#user-content-r0s3)|36 ✅|||250ms|
|[test/node-unit/cli/run-helpers.spec.js](#user-content-r0s4)|9 ✅|||8ms|
|[test/node-unit/cli/run.spec.js](#user-content-r0s5)|40 ✅|||4ms|
|[test/node-unit/mocha.spec.js](#user-content-r0s6)|24 ✅|||33ms|
|[test/node-unit/parallel-buffered-runner.spec.js](#user-content-r0s7)|19 ✅|||23ms|
|[test/node-unit/reporters/parallel-buffered.spec.js](#user-content-r0s8)|6 ✅|||16ms|
|[test/node-unit/serializer.spec.js](#user-content-r0s9)|40 ✅|||31ms|
|[test/node-unit/stack-trace-filter.spec.js](#user-content-r0s10)|2 ✅||4 ⚪|1ms|
|[test/node-unit/utils.spec.js](#user-content-r0s11)|5 ✅|||1ms|
|[test/node-unit/worker.spec.js](#user-content-r0s12)|15 ✅|||92ms|
|[test/unit/context.spec.js](#user-content-r0s13)|8 ✅|||5ms|
|[test/unit/duration.spec.js](#user-content-r0s14)|3 ✅|||166ms|
|[test/unit/errors.spec.js](#user-content-r0s15)|13 ✅|||5ms|
|[test/unit/globals.spec.js](#user-content-r0s16)|4 ✅|||0ms|
|[test/unit/grep.spec.js](#user-content-r0s17)|8 ✅|||2ms|
|[test/unit/hook-async.spec.js](#user-content-r0s18)|3 ✅|||1ms|
|[test/unit/hook-sync-nested.spec.js](#user-content-r0s19)|4 ✅|||1ms|
|[test/unit/hook-sync.spec.js](#user-content-r0s20)|3 ✅|||0ms|
|[test/unit/hook-timeout.spec.js](#user-content-r0s21)|1 ✅|||0ms|
|[test/unit/hook.spec.js](#user-content-r0s22)|4 ✅|||0ms|
|[test/unit/mocha.spec.js](#user-content-r0s23)|115 ✅||1 ⚪|128ms|
|[test/unit/overspecified-async.spec.js](#user-content-r0s24)|1 ✅|||3ms|
|[test/unit/parse-query.spec.js](#user-content-r0s25)|2 ✅|||1ms|
|[test/unit/plugin-loader.spec.js](#user-content-r0s26)|41 ✅||1 ⚪|16ms|
|[test/unit/required-tokens.spec.js](#user-content-r0s27)|1 ✅|||0ms|
|[test/unit/root.spec.js](#user-content-r0s28)|1 ✅|||0ms|
|[test/unit/runnable.spec.js](#user-content-r0s29)|55 ✅|||122ms|
|[test/unit/runner.spec.js](#user-content-r0s30)|77 ✅|||43ms|
|[test/unit/suite.spec.js](#user-content-r0s31)|57 ✅|||14ms|
|[test/unit/test.spec.js](#user-content-r0s32)|15 ✅|||0ms|
|[test/unit/throw.spec.js](#user-content-r0s33)|9 ✅|||9ms|
|[test/unit/timeout.spec.js](#user-content-r0s34)|8 ✅|||109ms|
|[test/unit/utils.spec.js](#user-content-r0s35)|75 ✅|||24ms|
### ✅ <a id="user-content-r0s0" href="#user-content-r0s0">test/node-unit/buffered-worker-pool.spec.js</a>
```
class BufferedWorkerPool constructor
  ✅ should apply defaults
class BufferedWorkerPool instance method run()
  ✅ should deserialize the result
  ✅ should serialize the options object
class BufferedWorkerPool instance method run() when passed a non-string filepath
  ✅ should reject
class BufferedWorkerPool instance method run() when passed no arguments
  ✅ should reject
class BufferedWorkerPool instance method stats()
  ✅ should return the object returned by `workerpool.Pool#stats`
class BufferedWorkerPool instance method terminate() when called with `force`
  ✅ should delegate to the underlying pool w/ "force" behavior
class BufferedWorkerPool instance method terminate() when called without `force`
  ✅ should delegate to the underlying pool w/o "force" behavior
class BufferedWorkerPool static method create()
  ✅ should return a BufferedWorkerPool instance
class BufferedWorkerPool static method create() when passed no arguments
  ✅ should not throw
class BufferedWorkerPool static method serializeOptions()
  ✅ should return a serialized string
class BufferedWorkerPool static method serializeOptions() when called multiple times with the same object
  ✅ should not perform serialization twice
  ✅ should return the same value
class BufferedWorkerPool static method serializeOptions() when passed no arguments
  ✅ should not throw
```
### ✅ <a id="user-content-r0s1" href="#user-content-r0s1">test/node-unit/cli/config.spec.js</a>
```
cli/config findConfig()
  ✅ should look for one of the config files using findup-sync
  ✅ should support an explicit `cwd`
cli/config loadConfig() when config file parsing fails
  ✅ should throw
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".cjs" extension
  ✅ should use the JS parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".js" extension
  ✅ should use the JS parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".json" extension
  ✅ should use the JSON parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".jsonc" extension
  ✅ should use the JSON parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".yaml" extension
  ✅ should use the YAML parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".yml" extension
  ✅ should use the YAML parser
cli/config loadConfig() when supplied a filepath with unsupported extension
  ✅ should use the JSON parser
```
### ✅ <a id="user-content-r0s2" href="#user-content-r0s2">test/node-unit/cli/node-flags.spec.js</a>
```
node-flags impliesNoTimeouts()
  ✅ should return true for inspect flags
node-flags isNodeFlag() for all allowed node env flags which conflict with mocha flags
  ✅ --require should return false
  ✅ -r should return false
node-flags isNodeFlag() for all allowed node environment flags
  ✅ --abort-on-uncaught-exception should return true
  ✅ --conditions should return true
  ✅ --debug-arraybuffer-allocations should return true
  ✅ --debug-port should return true
  ✅ --diagnostic-dir should return true
  ✅ --disable-proto should return true
  ✅ --disallow-code-generation-from-strings should return true
  ✅ --enable-source-maps should return true
  ✅ --es-module-specifier-resolution should return true
  ✅ --experimental-import-meta-resolve should return true
  ✅ --experimental-json-modules should return true
  ✅ --experimental-loader should return true
  ✅ --experimental-modules should return true
  ✅ --experimental-policy should return true
  ✅ --experimental-repl-await should return true
  ✅ --experimental-report should return true
  ✅ --experimental-specifier-resolution should return true
  ✅ --experimental-vm-modules should return true
  ✅ --experimental-wasi-unstable-preview1 should return true
  ✅ --experimental-wasm-modules should return true
  ✅ --experimental-worker should return true
  ✅ --force-context-aware should return true
  ✅ --frozen-intrinsics should return true
  ✅ --heapsnapshot-signal should return true
  ✅ --http-parser should return true
  ✅ --http-server-default-timeout should return true
  ✅ --huge-max-old-generation-size should return true
  ✅ --icu-data-dir should return true
  ✅ --input-type should return true
  ✅ --insecure-http-parser should return true
  ✅ --inspect should return true
  ✅ --inspect-brk should return true
  ✅ --inspect-port should return true
  ✅ --inspect-publish-uid should return true
  ✅ --interpreted-frames-native-stack should return true
  ✅ --jitless should return true
  ✅ --loader should return true
  ✅ --max-http-header-size should return true
  ✅ --max-old-space-size should return true
  ✅ --napi-modules should return true
  ✅ --no-deprecation should return true
  ✅ --no-force-async-hooks-checks should return true
  ✅ --no-node-snapshot should return true
  ✅ --no-warnings should return true
  ✅ --openssl-config should return true
  ✅ --pending-deprecation should return true
  ✅ --perf-basic-prof should return true
  ✅ --perf-basic-prof-only-functions should return true
  ✅ --perf-prof should return true
  ✅ --perf-prof-unwinding-info should return true
  ✅ --policy-integrity should return true
  ✅ --preserve-symlinks should return true
  ✅ --preserve-symlinks-main should return true
  ✅ --prof-process should return true
  ✅ --redirect-warnings should return true
  ✅ --report-compact should return true
  ✅ --report-dir should return true
  ✅ --report-directory should return true
  ✅ --report-filename should return true
  ✅ --report-on-fatalerror should return true
  ✅ --report-on-signal should return true
  ✅ --report-signal should return true
  ✅ --report-uncaught-exception should return true
  ✅ --stack-trace-limit should return true
  ✅ --throw-deprecation should return true
  ✅ --title should return true
  ✅ --tls-cipher-list should return true
  ✅ --tls-keylog should return true
  ✅ --tls-max-v1.2 should return true
  ✅ --tls-max-v1.3 should return true
  ✅ --tls-min-v1.0 should return true
  ✅ --tls-min-v1.1 should return true
  ✅ --tls-min-v1.2 should return true
  ✅ --tls-min-v1.3 should return true
  ✅ --trace-deprecation should return true
  ✅ --trace-event-categories should return true
  ✅ --trace-event-file-pattern should return true
  ✅ --trace-events-enabled should return true
  ✅ --trace-exit should return true
  ✅ --trace-sigint should return true
  ✅ --trace-sync-io should return true
  ✅ --trace-tls should return true
  ✅ --trace-uncaught should return true
  ✅ --trace-warnings should return true
  ✅ --track-heap-objects should return true
  ✅ --unhandled-rejections should return true
  ✅ --use-bundled-ca should return true
  ✅ --use-largepages should return true
  ✅ --use-openssl-ca should return true
  ✅ --v8-pool-size should return true
  ✅ --zero-fill-buffers should return true
node-flags isNodeFlag() special cases
  ✅ should return true for "es-staging"
  ✅ should return true for "gc-global"
  ✅ should return true for "harmony" itself
  ✅ should return true for "use-strict"
  ✅ should return true for flags starting with "--v8-"
  ✅ should return true for flags starting with "harmony-" or "harmony_"
  ✅ should return true for flags starting with "preserve-symlinks"
  ✅ should return true for flags starting with "trace-" or "trace_"
node-flags isNodeFlag() when expecting leading dashes
  ✅ should require leading dashes
node-flags unparseNodeFlags()
  ✅ should handle multiple v8 flags
  ✅ should handle single v8 flags
```
### ✅ <a id="user-content-r0s3" href="#user-content-r0s3">test/node-unit/cli/options.spec.js</a>
```
options loadOptions() "extension" handling when user does not supply "extension" option
  ✅ should retain the default
options loadOptions() "extension" handling when user supplies "extension" option
  ✅ should not concatenate the default value
options loadOptions() "ignore" handling
  ✅ should not split option values by comma
options loadOptions() "spec" handling when user supplies "spec" in config and positional arguments
  ✅ should place both - unsplitted - into the positional arguments array
options loadOptions() config priority
  ✅ should prioritize args over rc file
  ✅ should prioritize package.json over defaults
  ✅ should prioritize rc file over package.json
options loadOptions() when called with a one-and-done arg "h"
  ✅ should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "help"
  ✅ should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "list-interfaces"
  ✅ should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "list-reporters"
  ✅ should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "V"
  ✅ should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "version"
  ✅ should return basic parsed arguments and flag
options loadOptions() when no parameter provided
  ✅ should return an object containing positional args, defaults, and anti-reloading flags
options loadOptions() when parameter provided package.json when called with package = false (`--no-package`)
  ✅ should not look for package.json
  ✅ should return parsed args and default config
  ✅ should set package = false
options loadOptions() when parameter provided package.json when path to package.json (`--package <path>`) is invalid
  ✅ should throw
options loadOptions() when parameter provided package.json when path to package.json (`--package <path>`) is valid
  ✅ should not try to find a package.json
  ✅ should return merged options incl. package.json opts
  ✅ should set package = false
options loadOptions() when parameter provided package.json when path to package.json unspecified
  ✅ should return merged options incl. found package.json
  ✅ should set package = false
options loadOptions() when parameter provided rc file when called with config = false (`--no-config`)
  ✅ should not attempt to find a config file
  ✅ should not attempt to load a config file
  ✅ should return parsed args, default config and package.json
  ✅ should set config = false
options loadOptions() when parameter provided rc file when called with unspecified config when an rc file would be found
  ✅ should attempt to load file at found path
  ✅ should look for a config
  ✅ should set config = false
options loadOptions() when parameter provided rc file when called with unspecified config when an rc file would not be found
  ✅ should look for a config
  ✅ should not attempt to load a config file
  ✅ should set config = false
options loadOptions() when parameter provided rc file when path to config (`--config <path>`) is invalid
  ✅ should attempt to load file at path
  ✅ should not look for a config
  ✅ should throw to warn the user
```
### ✅ <a id="user-content-r0s4" href="#user-content-r0s4">test/node-unit/cli/run-helpers.spec.js</a>
```
helpers list() when given a comma-delimited string
  ✅ should return a flat array
helpers list() when provided a flat array
  ✅ should return a flat array
helpers list() when provided a nested array
  ✅ should return a flat array
helpers validateLegacyPlugin() when a plugin throws an exception upon load
  ✅ should fail and report the original error
helpers validateLegacyPlugin() when used with "reporter" key
  ✅ should disallow an array of names
  ✅ should fail to recognize an unknown reporter
helpers validateLegacyPlugin() when used with an "interfaces" key
  ✅ should disallow an array of names
  ✅ should fail to recognize an unknown interface
helpers validateLegacyPlugin() when used with an unknown plugin type
  ✅ should fail
```
### ✅ <a id="user-content-r0s5" href="#user-content-r0s5">test/node-unit/cli/run.spec.js</a>
```
command run builder array type
  ✅ should include option extension
  ✅ should include option file
  ✅ should include option global
  ✅ should include option ignore
  ✅ should include option reporter-option
  ✅ should include option require
  ✅ should include option spec
  ✅ should include option watch-files
  ✅ should include option watch-ignore
command run builder boolean type
  ✅ should include option allow-uncaught
  ✅ should include option async-only
  ✅ should include option bail
  ✅ should include option check-leaks
  ✅ should include option color
  ✅ should include option delay
  ✅ should include option diff
  ✅ should include option exit
  ✅ should include option forbid-only
  ✅ should include option forbid-pending
  ✅ should include option full-trace
  ✅ should include option growl
  ✅ should include option inline-diffs
  ✅ should include option invert
  ✅ should include option list-interfaces
  ✅ should include option list-reporters
  ✅ should include option no-colors
  ✅ should include option parallel
  ✅ should include option recursive
  ✅ should include option sort
  ✅ should include option watch
command run builder number type
  ✅ should include option jobs
  ✅ should include option retries
command run builder string type
  ✅ should include option config
  ✅ should include option fgrep
  ✅ should include option grep
  ✅ should include option package
  ✅ should include option reporter
  ✅ should include option slow
  ✅ should include option timeout
  ✅ should include option ui
```
### ✅ <a id="user-content-r0s6" href="#user-content-r0s6">test/node-unit/mocha.spec.js</a>
```
Mocha instance method addFile()
  ✅ should add the given file to the files array
  ✅ should be chainable
Mocha instance method lazyLoadFiles()
  ✅ should return the `Mocha` instance
Mocha instance method lazyLoadFiles() when passed `true`
  ✅ should enable lazy loading
Mocha instance method lazyLoadFiles() when passed a non-`true` value
  ✅ should enable eager loading
Mocha instance method loadFiles()
  ✅ should execute the optional callback if given
  ✅ should load all files from the files array
Mocha instance method parallelMode() when `Mocha` is running in Node.js
  ✅ should return the Mocha instance
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed `true` value when `Mocha` instance is in `INIT` state
  ✅ should enable parallel mode
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed `true` value when `Mocha` instance is not in `INIT` state
  ✅ should throw
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed non-`true` value when `Mocha` instance is in `INIT` state
  ✅ should enable serial mode
Mocha instance method parallelMode() when `Mocha` is running in Node.js when parallel mode is already disabled
  ✅ should not swap the Runner, nor change lazy loading setting
Mocha instance method parallelMode() when `Mocha` is running in Node.js when parallel mode is already enabled
  ✅ should not swap the Runner, nor change lazy loading setting
Mocha instance method reporter() when a reporter exists relative to the "mocha" module path
  ✅ should load from module path
Mocha instance method reporter() when a reporter exists relative to the "mocha" module path when the reporter throws upon load
  ✅ should throw "invalid reporter" exception
  ✅ should warn about the error before throwing
Mocha instance method reporter() when a reporter exists relative to the cwd
  ✅ should load from current working directory
Mocha instance method reporter() when a reporter exists relative to the cwd when the reporter throws upon load
  ✅ should throw "invalid reporter" exception
  ✅ should warn about the error before throwing
Mocha instance method unloadFiles()
  ✅ should be chainable
  ✅ should delegate Mocha.unloadFile() for each item in its list of files
  ✅ should not be allowed when the current instance is already disposed
  ✅ should reset referencesCleaned and allow for next run
Mocha static method unloadFile()
  ✅ should unload a specific file from cache
```
### ✅ <a id="user-content-r0s7" href="#user-content-r0s7">test/node-unit/parallel-buffered-runner.spec.js</a>
```
parallel-buffered-runner ParallelBufferedRunner constructor
  ✅ should start in "IDLE" state
parallel-buffered-runner ParallelBufferedRunner event EVENT_RUN_END
  ✅ should change the state to COMPLETE
parallel-buffered-runner ParallelBufferedRunner instance method isParallelMode()
  ✅ should return true
parallel-buffered-runner ParallelBufferedRunner instance method linkPartialObjects()
  ✅ should return the runner
parallel-buffered-runner ParallelBufferedRunner instance method run()
  ✅ should be chainable
  ✅ should emit `EVENT_RUN_BEGIN`
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when an event contains an error and has positive failures when subsequent files already started running
  ✅ should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when an event contains an error and has positive failures when subsequent files have not yet been run
  ✅ should cleanly terminate the thread pool
  ✅ should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when no event contains an error
  ✅ should not force-terminate
parallel-buffered-runner ParallelBufferedRunner instance method run() when a worker fails
  ✅ should delegate to Runner#uncaught
  ✅ should recover
parallel-buffered-runner ParallelBufferedRunner instance method run() when instructed to link objects
  ✅ should create object references
parallel-buffered-runner ParallelBufferedRunner instance method run() when instructed to link objects when event data object is missing an ID
  ✅ should result in an uncaught exception
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when an event contains an error and has positive failures when subsequent files already started running
  ✅ should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when an event contains an error and has positive failures when subsequent files have not yet been run
  ✅ should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when no event contains an error
  ✅ should not force-terminate
parallel-buffered-runner ParallelBufferedRunner instance method workerReporter()
  ✅ should return its context
parallel-buffered-runner ParallelBufferedRunner instance property _state
  ✅ should disallow an invalid state transition
```
### ✅ <a id="user-content-r0s8" href="#user-content-r0s8">test/node-unit/reporters/parallel-buffered.spec.js</a>
```
ParallelBuffered constructor
  ✅ should listen for Runner events
  ✅ should listen for Runner events expecting to occur once
ParallelBuffered event on any other event listened for
  ✅ should populate its `events` array with SerializableEvents
ParallelBuffered event on EVENT_RUN_END
  ✅ should remove all listeners
ParallelBuffered instance method done
  ✅ should execute its callback with a SerializableWorkerResult
  ✅ should reset its `events` prop
```
### ✅ <a id="user-content-r0s9" href="#user-content-r0s9">test/node-unit/serializer.spec.js</a>
```
serializer function deserialize when passed a non-object value
  ✅ should return the value
serializer function deserialize when passed a SerializedWorkerResult object
  ✅ should return the result of `SerializableWorkerResult.deserialize` called on the value
serializer function deserialize when passed an object value which is not a SerializedWorkerResult
  ✅ should return the value
serializer function deserialize when passed nothing
  ✅ should return `undefined`
serializer function serialize when not passed anything
  ✅ should return `undefined`
serializer function serialize when passed a non-object value
  ✅ should return the value
serializer function serialize when passed an object value having a `serialize` method
  ✅ should return the result of the `serialize` method
serializer function serialize when passed an object value w/o a `serialize` method
  ✅ should return the value
serializer SerializableEvent constructor when called with a non-object `rawObject`
  ✅ should throw "invalid arg type" error
serializer SerializableEvent constructor when called without `eventName`
  ✅ should throw "invalid arg value" error
serializer SerializableEvent instance method serialize
  ✅ should freeze the instance
  ✅ should mutate the instance in-place
serializer SerializableEvent instance method serialize when passed an error
  ✅ should not retain not-own props
  ✅ should retain own props
  ✅ should serialize the error
serializer SerializableEvent instance method serialize when passed an object containing a nested prop with an Error value
  ✅ should serialize the Error
serializer SerializableEvent instance method serialize when passed an object containing a non-`serialize` method
  ✅ should remove the method
serializer SerializableEvent instance method serialize when passed an object containing a top-level prop with an Error value
  ✅ should serialize the Error
serializer SerializableEvent instance method serialize when passed an object containing an array
  ✅ should serialize the array
serializer SerializableEvent instance method serialize when passed an object containing an object with a `serialize` method
  ✅ should call the `serialize` method
serializer SerializableEvent instance method serialize when passed an object with a `serialize` method
  ✅ should call the `serialize` method
serializer SerializableEvent static method create
  ✅ should instantiate a SerializableEvent
serializer SerializableEvent static method deserialize
  ✅ should return a new object w/ null prototype
serializer SerializableEvent static method deserialize when passed a falsy parameter
  ✅ should throw "invalid arg type" error
serializer SerializableEvent static method deserialize when passed value contains `data` prop
  ✅ should ignore __proto__
serializer SerializableEvent static method deserialize when passed value contains `data` prop when `data` prop contains a nested serialized Error prop
  ✅ should create an Error instance from the nested serialized Error prop
serializer SerializableEvent static method deserialize when passed value contains an `error` prop
  ✅ should create an Error instance from the prop
serializer SerializableEvent static method deserialize when passed value data contains a prop beginning with "$$"
  ✅ should create a new prop having a function value
  ✅ should create a new prop returning the original value
  ✅ should remove the prop with the "$$" prefix
serializer SerializableEvent static method deserialize when the value data contains a prop with an array value
  ✅ should deserialize each prop
serializer SerializableWorkerResult constructor
  ✅ should add a readonly `__type` prop
serializer SerializableWorkerResult instance method serialize
  ✅ should call `SerializableEvent#serialize` of each of its events
  ✅ should return a read-only value
serializer SerializableWorkerResult static method create
  ✅ should return a new SerializableWorkerResult instance
serializer SerializableWorkerResult static method deserialize
  ✅ should call SerializableEvent#deserialize on each item in its `events` prop
  ✅ should return the deserialized value
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an instance
  ✅ should return `true`
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an object with an appropriate `__type` prop
  ✅ should return `true`
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an object without an appropriate `__type` prop
  ✅ should return `false`
```
### ✅ <a id="user-content-r0s10" href="#user-content-r0s10">test/node-unit/stack-trace-filter.spec.js</a>
```
stackTraceFilter() on browser
  ✅ does not strip out other bower_components
stackTraceFilter() on node on POSIX OS
  ⚪ does not ignore other bower_components and components
  ⚪ should get a stack-trace as a string and prettify it
  ⚪ should not replace absolute path which has cwd as infix
  ⚪ should replace absolute with relative paths
stackTraceFilter() on node on Windows
  ✅ should work on Windows
```
### ✅ <a id="user-content-r0s11" href="#user-content-r0s11">test/node-unit/utils.spec.js</a>
```
utils function canonicalType()
  ✅ should return "asyncfunction" if the parameter is an async function
  ✅ should return "buffer" if the parameter is a Buffer
utils function cwd()
  ✅ should return the current working directory
utils function type()
  ✅ should return "error" if the parameter is an Error
  ✅ should return "function" if the parameter is an async function
```
### ✅ <a id="user-content-r0s12" href="#user-content-r0s12">test/node-unit/worker.spec.js</a>
```
worker when run as main process
  ✅ should throw
worker when run as worker process
  ✅ should register itself with workerpool
worker when run as worker process function run() when called with empty "filepath" argument
  ✅ should reject
worker when run as worker process function run() when called without arguments
  ✅ should reject
worker when run as worker process function run() when passed a non-string `options` value
  ✅ should reject
worker when run as worker process function run() when passed an invalid string `options` value
  ✅ should reject
worker when run as worker process function run() when the file at "filepath" argument is unloadable
  ✅ should reject
worker when run as worker process function run() when the file at "filepath" is loadable
  ✅ should call Mocha#run
  ✅ should handle "--require"
  ✅ should handle "--ui"
  ✅ should remove all uncaughtException listeners
  ✅ should remove all unhandledRejection listeners
worker when run as worker process function run() when the file at "filepath" is loadable when run twice
  ✅ should initialize only once
worker when run as worker process function run() when the file at "filepath" is loadable when serialization fails
  ✅ should reject
worker when run as worker process function run() when the file at "filepath" is loadable when serialization succeeds
  ✅ should resolve with a SerializedWorkerResult
```
### ✅ <a id="user-content-r0s13" href="#user-content-r0s13">test/unit/context.spec.js</a>
```
Context nested
  ✅ should work
Context Siblings sequestered sibling
  ✅ should work
Context Siblings sibling verifiction
  ✅ should allow test siblings to modify shared context
  ✅ should have reset this.calls before describe
  ✅ should not have value set within a sibling describe
methods retries
  ✅ should return the number of retries
methods slow()
  ✅ should return the slow
methods timeout()
  ✅ should return the timeout
```
### ✅ <a id="user-content-r0s14" href="#user-content-r0s14">test/unit/duration.spec.js</a>
```
durations when fast
  ✅ should not highlight
durations when reasonable
  ✅ should highlight in yellow
durations when slow
  ✅ should highlight in red
```
### ✅ <a id="user-content-r0s15" href="#user-content-r0s15">test/unit/errors.spec.js</a>
```
Errors createForbiddenExclusivityError() when Mocha instance is not running in a worker process
  ✅ should output a message regarding --forbid-only
Errors createForbiddenExclusivityError() when Mocha instance is running in a worker process
  ✅ should output a message regarding incompatibility
Errors createInvalidInterfaceError()
  ✅ should include expected code in thrown interface errors
Errors createInvalidReporterError()
  ✅ should include expected code in thrown reporter errors
Errors deprecate()
  ✅ should cache the message
  ✅ should coerce its parameter to a string
  ✅ should ignore falsy messages
Errors isMochaError() when provided a non-error
  ✅ should return false
Errors isMochaError() when provided an Error object having a known Mocha error code
  ✅ should return true
Errors isMochaError() when provided an Error object with a non-Mocha error code
  ✅ should return false
Errors warn()
  ✅ should call process.emitWarning
  ✅ should ignore falsy messages
  ✅ should not cache messages
```
### ✅ <a id="user-content-r0s16" href="#user-content-r0s16">test/unit/globals.spec.js</a>
```
global leaks
  ✅ should cause tests to fail
  ✅ should pass when accepted
  ✅ should pass when prefixed "mocha-"
  ✅ should pass with wildcard
```
### ✅ <a id="user-content-r0s17" href="#user-content-r0s17">test/unit/grep.spec.js</a>
```
Mocha .grep()
  ✅ should add a RegExp to the mocha.options object
  ✅ should convert grep string to a RegExp
  ✅ should covert grep regex-like string to a RegExp
  ✅ should return its parent Mocha object for chainability
Mocha "fgrep" option
  ✅ should escape and convert string to a RegExp
Mocha "grep" option
  ✅ should add a RegExp to the mocha.options object
  ✅ should convert string to a RegExp
Mocha "invert" option
  ✅ should add a Boolean to the mocha.options object
```
### ✅ <a id="user-content-r0s18" href="#user-content-r0s18">test/unit/hook-async.spec.js</a>
```
async hooks
  ✅ one
  ✅ three
  ✅ two
```
### ✅ <a id="user-content-r0s19" href="#user-content-r0s19">test/unit/hook-sync-nested.spec.js</a>
```
serial nested
  ✅ bar
  ✅ foo
serial nested hooks
  ✅ one
  ✅ two
```
### ✅ <a id="user-content-r0s20" href="#user-content-r0s20">test/unit/hook-sync.spec.js</a>
```
serial hooks
  ✅ one
  ✅ three
  ✅ two
```
### ✅ <a id="user-content-r0s21" href="#user-content-r0s21">test/unit/hook-timeout.spec.js</a>
```
hook timeout
  ✅ should work
```
### ✅ <a id="user-content-r0s22" href="#user-content-r0s22">test/unit/hook.spec.js</a>
```
Hook error
  ✅ should get the hook._error when called without arguments
  ✅ should set the hook._error
Hook reset
  ✅ should call Runnable.reset
  ✅ should reset the error state
```
### ✅ <a id="user-content-r0s23" href="#user-content-r0s23">test/unit/mocha.spec.js</a>
```
Mocha constructor
  ✅ should set _cleanReferencesAfterRun to true
Mocha constructor when `global` option is an `Array`
  ✅ should attempt to set globals
Mocha constructor when `parallel` option is true and `jobs` option <= 1
  ✅ should not enable parallel mode
Mocha constructor when `parallel` option is true and `jobs` option > 1
  ✅ should enable parallel mode
Mocha constructor when `parallel` option is true when `enableGlobalSetup` option is present
  ✅ should toggle global setup fixtures
Mocha constructor when `parallel` option is true when `enableGlobalTeardown` option is present
  ✅ should configure global teardown fixtures
Mocha constructor when `parallel` option is true when `globalSetup` option is present
  ✅ should configure global setup fixtures
Mocha constructor when `parallel` option is true when `globalTeardown` option is present
  ✅ should configure global teardown fixtures
Mocha constructor when `retries` option is not present
  ✅ should not attempt to set retries
Mocha constructor when `retries` option is present
  ✅ should attempt to set retries`
Mocha constructor when `rootHooks` option is truthy
  ✅ shouid attempt to set root hooks
Mocha constructor when `timeout` option is `false`
  ✅ should attempt to set timeout
Mocha constructor when `timeout` option is `undefined`
  ✅ should not attempt to set timeout
Mocha instance method _runGlobalFixtures()
  ✅ should execute multiple fixtures in order
Mocha instance method allowUncaught()
  ✅ should be chainable
  ✅ should set the allowUncaught option to false
  ✅ should set the allowUncaught option to true
Mocha instance method asyncOnly()
  ✅ should be chainable
  ✅ should set the asyncOnly option to false
  ✅ should set the asyncOnly option to true
Mocha instance method bail()
  ✅ should be chainable
Mocha instance method bail() when provided a falsy argument
  ✅ should unset the "bail" flag on the root suite
Mocha instance method bail() when provided no arguments
  ✅ should set the "bail" flag on the root suite
Mocha instance method checkLeaks()
  ✅ should set the checkLeaks option to true
Mocha instance method cleanReferencesAfterRun()
  ✅ should be chainable
  ✅ should set the _cleanReferencesAfterRun attribute
  ✅ should set the _cleanReferencesAfterRun attribute to false
Mocha instance method color()
  ✅ should be chainable
  ✅ should set the color option to false
  ✅ should set the color option to true
Mocha instance method delay()
  ✅ should be chainable
  ✅ should set the delay option to true
Mocha instance method diff()
  ✅ should set the diff option to true
Mocha instance method diff() when provided `false` argument
  ✅ should set the diff option to false
Mocha instance method dispose()
  ✅ should dispose previous test runner
  ✅ should dispose the root suite
  ✅ should unload the files
Mocha instance method forbidOnly()
  ✅ should be chainable
  ✅ should set the forbidOnly option to false
  ✅ should set the forbidOnly option to true
Mocha instance method forbidPending()
  ✅ should be chainable
  ✅ should set the forbidPending option to false
  ✅ should set the forbidPending option to true
Mocha instance method fullTrace()
  ✅ should be chainable
  ✅ should set the fullTrace option to false
  ✅ should set the fullTrace option to true
Mocha instance method global()
  ✅ should be an empty array initially
  ✅ should be chainable
Mocha instance method global() when argument is invalid
  ✅ should not modify the whitelist when given empty array
  ✅ should not modify the whitelist when given empty string
Mocha instance method global() when argument is valid
  ✅ should add contents of string array to the whitelist
  ✅ should add string to the whitelist
  ✅ should not have duplicates
Mocha instance method growl()
  ✅ should be chainable
Mocha instance method growl() if capable of notifications
  ✅ should set the growl option to true
Mocha instance method growl() if not capable of notifications
  ✅ should set the growl option to false
Mocha instance method hasGlobalSetupFixtures() when no global setup fixtures are present
  ✅ should return `false`
Mocha instance method hasGlobalSetupFixtures() when one or more global setup fixtures are present
  ✅ should return `true`
Mocha instance method hasGlobalTeardownFixtures() when no global teardown fixtures are present
  ✅ should return `false`
Mocha instance method hasGlobalTeardownFixtures() when one or more global teardown fixtures are present
  ✅ should return `true`
Mocha instance method inlineDiffs()
  ✅ should be chainable
  ✅ should set the inlineDiffs option to false
  ✅ should set the inlineDiffs option to true
Mocha instance method invert()
  ✅ should be chainable
  ✅ should set the invert option to true
Mocha instance method noHighlighting()
  ✅ should be chainable
  ✅ should set the noHighlighting option to true
Mocha instance method parallelMode() when `Mocha` is running in a browser
  ✅ should throw
Mocha instance method reporter()
  ✅ should be chainable
  ✅ should keep reporterOption on options
  ✅ should support legacy reporterOptions
Mocha instance method rootHooks()
  ✅ should be chainable
Mocha instance method rootHooks() when provided a single "after all" hook
  ✅ should attach it to the root suite
Mocha instance method rootHooks() when provided a single "after each" hook
  ✅ should attach it to the root suite
Mocha instance method rootHooks() when provided a single "before all" hook
  ✅ should attach it to the root suite
Mocha instance method rootHooks() when provided a single "before each" hook
  ✅ should attach it to the root suite
Mocha instance method rootHooks() when provided multiple "after all" hooks
  ✅ should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "after each" hooks
  ✅ should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "before all" hooks
  ✅ should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "before each" hooks
  ✅ should attach each to the root suite
Mocha instance method run()
  ✅ should execute the callback when complete
  ⚪ should initialize the stats collector
  ✅ should instantiate a reporter
Mocha instance method run() Base reporter initialization
  ✅ should configure the Base reporter
Mocha instance method run() Base reporter initialization when "color" options is set
  ✅ should configure the Base reporter
Mocha instance method run() Runner initialization
  ✅ should instantiate a Runner
Mocha instance method run() Runner initialization when "global" option is present
  ✅ should configure global vars
Mocha instance method run() Runner initialization when "grep" option is present
  ✅ should configure "grep"
Mocha instance method run() when "growl" option is present
  ✅ should initialize growl support
Mocha instance method run() when a reporter instance has a "done" method
  ✅ should call the reporter "done" method
Mocha instance method run() when a run has finished and is called again
  ✅ should not call `Runner#runAsync()`
  ✅ should throw
Mocha instance method run() when a run is in progress
  ✅ should not call `Runner#runAsync`
  ✅ should throw
Mocha instance method run() when files have been added to the Mocha instance when Mocha is set to eagerly load files
  ✅ should eagerly load files
Mocha instance method run() when files have been added to the Mocha instance when Mocha is set to lazily load files
  ✅ should not eagerly load files
Mocha instance method run() when global setup fixtures disabled when global setup fixtures are present
  ✅ should not run global setup fixtures
Mocha instance method run() when global setup fixtures disabled when global setup fixtures not present
  ✅ should not run global setup fixtures
Mocha instance method run() when global setup fixtures enabled when global setup fixtures are present
  ✅ should run global setup fixtures
Mocha instance method run() when global setup fixtures enabled when global setup fixtures not present
  ✅ should not run global setup fixtures
Mocha instance method run() when global teardown fixtures disabled when global teardown fixtures are present
  ✅ should not run global teardown fixtures
Mocha instance method run() when global teardown fixtures disabled when global teardown fixtures not present
  ✅ should not run global teardown fixtures
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures are present
  ✅ should run global teardown fixtures
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures are present when global setup fixtures are present and enabled
  ✅ should use the same context as returned by `runGlobalSetup`
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures not present
  ✅ should not run global teardown fixtures
Mocha instance method run() when Mocha configured for multiple runs and multiple runs are attempted
  ✅ should call `Runner#runAsync` for each call
  ✅ should dispose the previous runner
  ✅ should not throw
  ✅ should reset the root Suite between runs
Mocha instance method run() when the `Mocha` instance is already disposed
  ✅ should not call `Runner#runAsync`
  ✅ should throw
Mocha instance method runGlobalSetup() when a fixture is not present
  ✅ should not attempt to run fixtures
Mocha instance method runGlobalSetup() when fixture(s) are present
  ✅ should attempt run the fixtures
Mocha instance method runGlobalTeardown() when a fixture is not present
  ✅ not attempt to run the fixtures
Mocha instance method runGlobalTeardown() when fixture(s) are present
  ✅ should attempt to run the fixtures
Mocha instance method unloadFile() when run in a browser
  ✅ should throw
```
### ✅ <a id="user-content-r0s24" href="#user-content-r0s24">test/unit/overspecified-async.spec.js</a>
```
overspecified asynchronous resolution method
  ✅ should fail when multiple methods are used
```
### ✅ <a id="user-content-r0s25" href="#user-content-r0s25">test/unit/parse-query.spec.js</a>
```
parseQuery()
  ✅ should get queryString and return key-value object
  ✅ should parse "+" as a space
```
### ✅ <a id="user-content-r0s26" href="#user-content-r0s26">test/unit/plugin-loader.spec.js</a>
```
plugin module class PluginLoader constructor when passed custom plugins
  ✅ should register the custom plugins
plugin module class PluginLoader constructor when passed ignored plugins
  ✅ should retain a list of ignored plugins
plugin module class PluginLoader constructor when passed no options
  ✅ should populate a registry of built-in plugins
plugin module class PluginLoader instance method finalize() when a plugin has no "finalize" function
  ✅ should return an array of raw implementations
plugin module class PluginLoader instance method finalize() when a plugin has one or more implementations
  ✅ should omit unused plugins
  ✅ should return an object map using `optionName` key for each registered plugin
plugin module class PluginLoader instance method finalize() when no plugins have been loaded
  ✅ should return an empty map
plugin module class PluginLoader instance method load() when called with a falsy value
  ✅ should return false
plugin module class PluginLoader instance method load() when called with an object containing a recognized plugin
  ✅ should call the associated validator, if present
  ✅ should retain the value of any matching property in its mapping
  ✅ should return true
plugin module class PluginLoader instance method load() when called with an object containing no recognized plugin
  ✅ should return false
plugin module class PluginLoader instance method load() when passed a falsy or non-object value
  ✅ should not call a validator
  ✅ should return false
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export
  ✅ should call the associated validator
  ✅ should not call validators whose keys were not found
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export when the value does not pass the associated validator
  ✅ should throw
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export when the value passes the associated validator
  ✅ should add the implementation to the internal mapping
  ✅ should not add an implementation of plugins not present
  ✅ should return true
plugin module class PluginLoader instance method load() when passed an object value when no keys match any known named exports
  ✅ should return false
plugin module class PluginLoader instance method register() when passed a definition w/o an exportName
  ✅ should throw
plugin module class PluginLoader instance method register() when passed a falsy parameter
  ✅ should throw
plugin module class PluginLoader instance method register() when passed a non-object parameter
  ✅ should throw
plugin module class PluginLoader instance method register() when the plugin export name is already in use
  ✅ should throw
plugin module class PluginLoader instance method register() when the plugin export name is ignored
  ✅ should not register the plugin
  ✅ should not throw
plugin module class PluginLoader instance method register() when the plugin export name is not in use
  ✅ should not throw
plugin module class PluginLoader static method create()
  ✅ should return a PluginLoader instance
plugin module global fixtures plugin global setup when an implementation is a function
  ✅ should pass validation
plugin module global fixtures plugin global setup when an implementation is a primitive
  ✅ should fail validation
plugin module global fixtures plugin global setup when an implementation is an array of functions
  ✅ should pass validation
plugin module global fixtures plugin global setup when an implementation is an array of primitives
  ✅ should fail validation
plugin module global fixtures plugin global teardown when an implementation is a function
  ✅ should pass validation
plugin module global fixtures plugin global teardown when an implementation is a primitive
  ✅ should fail validation
plugin module global fixtures plugin global teardown when an implementation is an array of functions
  ✅ should pass validation
plugin module global fixtures plugin global teardown when an implementation is an array of primitives
  ✅ should fail validation
plugin module root hooks plugin 🎣 when a loaded impl is finalized
  ✅ should flatten the implementations
plugin module root hooks plugin 🎣 when impl is a function
  ✅ should pass validation
plugin module root hooks plugin 🎣 when impl is a primitive
  ✅ should fail validation
plugin module root hooks plugin 🎣 when impl is an array
  ✅ should fail validation
plugin module root hooks plugin 🎣 when impl is an object of functions
  ⚪ should pass validation
```
### ✅ <a id="user-content-r0s27" href="#user-content-r0s27">test/unit/required-tokens.spec.js</a>
```
using imported describe
  ✅ using imported it
```
### ✅ <a id="user-content-r0s28" href="#user-content-r0s28">test/unit/root.spec.js</a>
```
root
  ✅ should be a valid suite
```
### ✅ <a id="user-content-r0s29" href="#user-content-r0s29">test/unit/runnable.spec.js</a>
```
Runnable(title, fn) .run(fn) if async
  ✅ this.skip() should halt synchronous execution
  ✅ this.skip() should set runnable to pending
Runnable(title, fn) .run(fn) if timed-out
  ✅ should ignore call to `done` and not execute callback again
Runnable(title, fn) .run(fn) when .pending
  ✅ should not invoke the callback
Runnable(title, fn) .run(fn) when async
  ✅ should allow a timeout of 0
  ✅ should allow updating the timeout
Runnable(title, fn) .run(fn) when async when an error is passed
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when async when an exception is thrown
  ✅ should invoke the callback
  ✅ should not throw its own exception if passed a non-object
Runnable(title, fn) .run(fn) when async when an exception is thrown and is allowed to remain uncaught
  ✅ throws an error when it is allowed
Runnable(title, fn) .run(fn) when async when done() is invoked with a non-Error object
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when async when done() is invoked with a string
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when async when the callback is invoked several times with an error
  ✅ should emit a single "error" event
Runnable(title, fn) .run(fn) when async when the callback is invoked several times without an error
  ✅ should emit a single "error" event
Runnable(title, fn) .run(fn) when async without error
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn is not a function
  ✅ should throw an error
Runnable(title, fn) .run(fn) when fn returns a non-promise
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is fulfilled with a value
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is fulfilled with no value
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is rejected
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is rejected without a reason
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise takes too long to settle
  ✅ should throw the timeout error
Runnable(title, fn) .run(fn) when sync when an exception is thrown
  ✅ should invoke the callback with error
Runnable(title, fn) .run(fn) when sync when an exception is thrown and is allowed to remain uncaught
  ✅ throws an error when it is allowed
Runnable(title, fn) .run(fn) when sync without error
  ✅ should invoke the callback
Runnable(title, fn) .run(fn) when timeouts are disabled
  ✅ should not error with timeout
Runnable(title, fn) .title
  ✅ should be present
Runnable(title, fn) .titlePath()
  ✅ returns the concatenation of the parent's title path and runnable's title
Runnable(title, fn) #globals
  ✅ should allow for whitelisting globals
Runnable(title, fn) #isFailed()
  ✅ should return `false` if test is pending
  ✅ should return `true` if test has failed
  ✅ should return `true` if test has not failed
Runnable(title, fn) #reset
  ✅ should reset current run state
Runnable(title, fn) #resetTimeout()
  ✅ should not time out if timeouts disabled after reset
Runnable(title, fn) #retries(n)
  ✅ should set the number of retries
Runnable(title, fn) #slow(ms)
  ✅ should not set the slow threshold if the parameter is not passed
  ✅ should not set the slow threshold if the parameter is undefined
  ✅ should set the slow threshold
Runnable(title, fn) #slow(ms) when passed a time-formatted string
  ✅ should convert to ms
Runnable(title, fn) #timeout(ms) when value is equal to lower bound given numeric value
  ✅ should set the timeout value to disabled
Runnable(title, fn) #timeout(ms) when value is equal to lower bound given string timestamp
  ✅ should set the timeout value to disabled
Runnable(title, fn) #timeout(ms) when value is equal to upper bound given numeric value
  ✅ should set the disabled timeout value
Runnable(title, fn) #timeout(ms) when value is less than lower bound
  ✅ should clamp to lower bound given numeric
  ✅ should clamp to lower bound given timestamp
Runnable(title, fn) #timeout(ms) when value is out-of-bounds given numeric value
  ✅ should set the disabled timeout value
Runnable(title, fn) #timeout(ms) when value is within `setTimeout` bounds given numeric value
  ✅ should set the timeout value
Runnable(title, fn) #timeout(ms) when value is within `setTimeout` bounds given string timestamp
  ✅ should set the timeout value
Runnable(title, fn) interesting property id
  ✅ should have a permanent identifier
  ✅ should have a unique identifier
Runnable(title, fn) static method toValueOrError
  ✅ should return an Error if parameter is falsy
  ✅ should return identity if parameter is truthy
Runnable(title, fn) when arity == 0
  ✅ should be .sync
  ✅ should not be .async
Runnable(title, fn) when arity >= 1
  ✅ should be .async
  ✅ should not be .sync
```
### ✅ <a id="user-content-r0s30" href="#user-content-r0s30">test/unit/runner.spec.js</a>
```
Runner instance method _uncaught() when called with a non-Runner context
  ✅ should throw
Runner instance method abort()
  ✅ should return the Runner
  ✅ should set _abort property to true
Runner instance method allowUncaught()
  ✅ async - should allow unhandled errors in hooks to propagate through
  ✅ should allow unhandled errors in sync hooks to propagate through
  ✅ should allow unhandled errors to propagate through
  ✅ should not allow unhandled errors in sync hooks to propagate through
Runner instance method checkGlobals(test)
  ✅ should allow variables that match a wildcard
  ✅ should emit "fail" when a global beginning with "d" is introduced
  ✅ should emit "fail" when a new global is introduced
  ✅ should emit "fail" when a single new disallowed global is introduced after a single extra global is allowed
  ✅ should not fail when a new common global is introduced
  ✅ should pluralize the error message when several are introduced
  ✅ should respect per test whitelisted globals
  ✅ should respect per test whitelisted globals but still detect other leaks
Runner instance method dispose()
  ✅ should remove "error" listeners from a test
  ✅ should remove "uncaughtException" listeners from the process
  ✅ should remove all listeners from itself
Runner instance method fail()
  ✅ should emit "fail"
  ✅ should emit "fail"
  ✅ should emit a helpful message when failed with a string
  ✅ should emit a helpful message when failed with an Array
  ✅ should emit a helpful message when failed with an Object
  ✅ should emit a the error when failed with an Error instance
  ✅ should emit the error when failed with an Error-like object
  ✅ should increment .failures
  ✅ should increment `Runner#failures`
  ✅ should not emit "end" if suite bail is not true
  ✅ should recover if the error stack is not writable
  ✅ should return and not increment failures when test is pending
  ✅ should set `Test#state` to "failed"
Runner instance method fail() when Runner has stopped when test is not pending when error is not of the "multiple done" variety
  ✅ should throw a "fatal" error
Runner instance method fail() when Runner has stopped when test is not pending when error is the "multiple done" variety
  ✅ should throw the "multiple done" error
Runner instance method globalProps()
  ✅ should include common non enumerable globals
Runner instance method globals()
  ✅ should default to the known globals
  ✅ should white-list globals
Runner instance method grep()
  ✅ should update the runner.total with number of matched tests
  ✅ should update the runner.total with number of matched tests when inverted
Runner instance method grepTotal()
  ✅ should return the total number of matched tests
  ✅ should return the total number of matched tests when inverted
Runner instance method hook()
  ✅ should augment hook title with current test title
  ✅ should execute hooks after failed test if suite bail is true
Runner instance method isParallelMode()
  ✅ should return false
Runner instance method linkPartialObjects()
  ✅ should return the Runner
Runner instance method run()
  ✅ should clean references after a run
  ✅ should emit "retry" when a retryable test fails
  ✅ should not clean references after a run when `cleanReferencesAfterRun` is `false`
  ✅ should not leak `Process.uncaughtException` listeners
  ✅ should not throw an exception if something emits EVENT_TEST_END with a non-Test object
Runner instance method run() stack traces ginormous
  ✅ should not hang if overlong error message is multiple lines
  ✅ should not hang if overlong error message is single line
Runner instance method run() stack traces long
  ✅ should display the full stack-trace
Runner instance method run() stack traces short
  ✅ should prettify the stack-trace
Runner instance method runAsync()
  ✅ should pass through options to Runner#run
  ✅ should return a Promise with a failure count
Runner instance method runTest()
  ✅ should return when no tests to run
Runner instance method uncaught() when allow-uncaught is set to true
  ✅ should propagate error and throw
Runner instance method uncaught() when provided an object argument when argument is a Pending
  ✅ should ignore argument and return
Runner instance method uncaught() when provided an object argument when argument is an Error
  ✅ should add the "uncaught" property to the Error
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run
  ✅ should clear any pending timeouts
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when current Runnable has already failed
  ✅ should not attempt to fail again
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when current Runnable has been marked pending
  ✅ should attempt to fail
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable has already passed
  ✅ should abort the runner without emitting end event
  ✅ should fail with the current Runnable and the error
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable is still running when the current Runnable is a Hook
  ✅ should not notify run has ended
  ✅ should not notify test has ended
  ✅ should run callback(err) to handle failing hook pattern
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable is still running when the current Runnable is a Test
  ✅ should not notify run has ended
  ✅ should not notify test has ended
  ✅ should run callback(err) to handle failing and hooks
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running
  ✅ should fail with a transient Runnable and the error
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is IDLE
  ✅ should emit start/end events for the benefit of reporters
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is RUNNING
  ✅ should not emit start/end events
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is STOPPED
  ✅ should not emit start/end events, since this presumably would have already happened
  ✅ should throw
Runner instance method uncaught() when provided an object argument when argument is not an Error
  ✅ should fail with a transient Runnable and a new Error coerced from the object
Runner instance method workerReporter()
  ✅ should throw
```
### ✅ <a id="user-content-r0s31" href="#user-content-r0s31">test/unit/suite.spec.js</a>
```
Suite instance method addSuite()
  ✅ adds the suite to the suites collection
  ✅ copies the slow value
  ✅ copies the timeout value
  ✅ sets the parent on the added Suite
  ✅ treats suite as pending if its parent is pending
Suite instance method addTest()
  ✅ adds the test to the tests collection
  ✅ copies the timeout value
  ✅ sets the parent on the added test
Suite instance method afterAll() wraps the passed in function in a Hook
  ✅ adds it to _afterAll
  ✅ appends title to hook
  ✅ uses function name if available
Suite instance method afterEach() wraps the passed in function in a Hook
  ✅ adds it to _afterEach
  ✅ appends title to hook
  ✅ uses function name if available
Suite instance method bail() when argument is passed
  ✅ should return the Suite object
Suite instance method bail() when no argument is passed
  ✅ should return the bail value
Suite instance method beforeAll() wraps the passed in function in a Hook
  ✅ adds it to _beforeAll
  ✅ appends title to hook
  ✅ uses function name if available
Suite instance method beforeEach() when the suite is pending
  ✅ should not create a hook
Suite instance method beforeEach() wraps the passed in function in a Hook
  ✅ adds it to _beforeEach
  ✅ appends title to hook
  ✅ uses function name if available
Suite instance method clone()
  ✅ should clone the Suite, omitting children
Suite instance method constructor
  ✅ should not throw if the title is a string
  ✅ should report listened-for deprecated events as deprecated
  ✅ should throw an error if the title isn't a string
Suite instance method create()
  ✅ does not create a second root suite
  ✅ does not denote the root suite by being titleless
Suite instance method eachTest(fn) when there are no nested suites or tests
  ✅ should return 0
Suite instance method eachTest(fn) when there are several levels of nested suites
  ✅ should return the number
Suite instance method eachTest(fn) when there are several tests in the suite
  ✅ should return the number
Suite instance method filterOnly()
  ✅ should filter out all other tests and suites if a suite has `only`
  ✅ should filter out all other tests and suites if a test has `only`
Suite instance method fullTitle() when there is a parent
  ✅ returns the combination of parent's and suite's title
Suite instance method fullTitle() when there is no parent
  ✅ returns the suite title
Suite instance method hasOnly()
  ✅ should return false if no suite or test is marked `only`
  ✅ should return true if a suite has `only`
  ✅ should return true if a test has `only`
  ✅ should return true if nested suite has `only`
Suite instance method markOnly()
  ✅ should call appendOnlySuite on parent
Suite instance method reset()
  ✅ should forward reset to all hooks
  ✅ should forward reset to suites and tests
  ✅ should reset the `delayed` state
Suite instance method slow() when argument is passed
  ✅ should return the Suite object
Suite instance method slow() when given a string
  ✅ should parse it
Suite instance method slow() when no argument is passed
  ✅ should return the slow value
Suite instance method timeout()
  ✅ should convert a string to milliseconds
Suite instance method timeout() when argument is passed
  ✅ should return the Suite object
Suite instance method timeout() when no argument is passed
  ✅ should return the timeout value
Suite instance method titlePath() when there is a parent the parent is not the root suite
  ✅ returns the concatenation of parent's and suite's title
Suite instance method titlePath() when there is a parent the parent is the root suite
  ✅ returns the suite title
Suite instance method titlePath() when there is no parent
  ✅ returns the suite title
Suite instance method total() when there are no nested suites or tests
  ✅ should return 0
Suite instance method total() when there are several tests in the suite
  ✅ should return the number
Test initialization
  ✅ should not throw if the title is a string
  ✅ should throw an error if the title isn't a string
```
### ✅ <a id="user-content-r0s32" href="#user-content-r0s32">test/unit/test.spec.js</a>
```
Test .clone()
  ✅ should add/keep the retriedTest value
  ✅ should copy the currentRetry value
  ✅ should copy the file value
  ✅ should copy the globals value
  ✅ should copy the parent value
  ✅ should copy the retries value
  ✅ should copy the slow value
  ✅ should copy the timeout value
  ✅ should copy the title
Test .isPending()
  ✅ should be pending when its parent is pending
  ✅ should be pending when marked as such
  ✅ should not be pending by default
Test .markOnly()
  ✅ should call appendOnlyTest on parent
Test .reset()
  ✅ should call Runnable.reset
  ✅ should reset the run state
```
### ✅ <a id="user-content-r0s33" href="#user-content-r0s33">test/unit/throw.spec.js</a>
```
a test that throws non-extensible
  ✅ should not pass if throwing async and test is async
  ✅ should not pass if throwing sync and test is async
  ✅ should not pass if throwing sync and test is sync
a test that throws null
  ✅ should not pass if throwing async and test is async
  ✅ should not pass if throwing sync and test is async
  ✅ should not pass if throwing sync and test is sync
a test that throws undefined
  ✅ should not pass if throwing async and test is async
  ✅ should not pass if throwing sync and test is async
  ✅ should not pass if throwing sync and test is sync
```
### ✅ <a id="user-content-r0s34" href="#user-content-r0s34">test/unit/timeout.spec.js</a>
```
timeouts
  ✅ should allow overriding per-test
  ✅ should error on timeout
timeouts disabling
  ✅ should work with timeout(0)
timeouts disabling suite-level
  ✅ should work with timeout(0)
timeouts disabling suite-level nested suite
  ✅ should work with timeout(0)
timeouts disabling using before
  ✅ should work with timeout(0)
timeouts disabling using beforeEach
  ✅ should work with timeout(0)
timeouts disabling using timeout(0)
  ✅ should suppress timeout(4)
```
### ✅ <a id="user-content-r0s35" href="#user-content-r0s35">test/unit/utils.spec.js</a>
```
lib/utils canonicalType()
  ✅ should recognize various types
lib/utils canonicalType() when toString on null or undefined stringifies window
  ✅ should recognize null and undefined
lib/utils castArray() when provided a primitive value
  ✅ should return an array containing the primitive value only
lib/utils castArray() when provided an "arguments" value
  ✅ should return an array containing the arguments
lib/utils castArray() when provided an array value
  ✅ should return a copy of the array
lib/utils castArray() when provided an object
  ✅ should return an array containing the object only
lib/utils castArray() when provided no parameters
  ✅ should return an empty array
lib/utils castArray() when provided null
  ✅ should return an array containing a null value only
lib/utils clean()
  ✅ should format a multi line test indented with spaces
  ✅ should format a multi line test indented with tabs
  ✅ should format a single line test function
  ✅ should format es6 arrow functions
  ✅ should format es6 arrow functions with implicit return
  ✅ should format functions saved in windows style - spaces
  ✅ should format functions saved in windows style - tabs
  ✅ should handle empty functions
  ✅ should handle functions with no space between the end and the closing brace
  ✅ should handle functions with parentheses in the same line
  ✅ should handle functions with tabs in their declarations
  ✅ should handle named functions with space after name
  ✅ should handle named functions without space after name
  ✅ should handle newlines in the function declaration
  ✅ should remove space character indentation from the function body
  ✅ should remove tab character indentation from the function body
  ✅ should remove the wrapping function declaration
lib/utils createMap()
  ✅ should add props from all object parameters to the object
  ✅ should add props to the object
  ✅ should return an object with a null prototype
lib/utils dQuote()
  ✅ should return its input as string wrapped in double quotes
lib/utils escape()
  ✅ replaces invalid xml characters
  ✅ replaces the usual xml suspects
lib/utils isPromise()
  ✅ should return false if the object is null
  ✅ should return false if the value is an object w/o a "then" function
  ✅ should return false if the value is not an object
  ✅ should return true if the value is Promise-ish
lib/utils lookupFiles() when run in browser
  ✅ should throw
lib/utils lookupFiles() when run in Node.js
  ✅ should delegate to new location of lookupFiles()
  ✅ should print a deprecation message
lib/utils slug()
  ✅ should convert the string to lowercase
  ✅ should convert whitespace to dashes
  ✅ should disallow consecutive dashes
  ✅ should strip non-alphanumeric and non-dash characters
lib/utils sQuote()
  ✅ should return its input as string wrapped in single quotes
lib/utils stringify()
  ✅ might get confusing
  ✅ should canonicalize the object
  ✅ should handle arrays
  ✅ should handle circular structures in arrays
  ✅ should handle circular structures in functions
  ✅ should handle circular structures in objects
  ✅ should handle empty arrays
  ✅ should handle empty functions (with no properties)
  ✅ should handle empty objects
  ✅ should handle functions
  ✅ should handle functions w/ properties
  ✅ should handle length properties that cannot be coerced to a number
  ✅ should handle non-empty arrays
  ✅ should handle object without an Object prototype
  ✅ should handle Symbol
  ✅ should handle undefined values
  ✅ should handle various non-undefined, non-null, non-object, non-array, non-date, and non-function values
  ✅ should not freak out if it sees a primitive twice
  ✅ should recurse
  ✅ should return an object representation of a string created with a String constructor
  ✅ should return Buffer with .toJSON representation
  ✅ should return Date object with .toISOString() + string prefix
  ✅ should return invalid Date object with .toString() + string prefix
  ✅ should stringify dates
lib/utils stringify() #Number
  ✅ floats and ints
  ✅ should show the handle -0 situations
  ✅ should work well with `NaN` and `Infinity`
  ✅ should work with bigints when possible
lib/utils stringify() canonicalize example
  ✅ should represent the actual full result
lib/utils type()
  ✅ should recognize various types
lib/utils type() when toString on null or undefined stringifies window
  ✅ should recognize null and undefined
lib/utils uniqueID()
  ✅ should return a non-empty string
```
</details>