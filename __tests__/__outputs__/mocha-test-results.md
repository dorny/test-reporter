![Tests passed successfully](https://img.shields.io/badge/tests-833%20passed%2C%206%20skipped-success)
## :white_check_mark: <a id="user-content-r0" href="#r0">fixtures/external/mocha/mocha-test-results.json</a>
**839** tests were completed in **6s** with **833** passed, **0** failed and **6** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[test/node-unit/buffered-worker-pool.spec.js](#r0s0)|14:white_check_mark:|||8ms|
|[test/node-unit/cli/config.spec.js](#r0s1)|10:white_check_mark:|||8ms|
|[test/node-unit/cli/node-flags.spec.js](#r0s2)|105:white_check_mark:|||9ms|
|[test/node-unit/cli/options.spec.js](#r0s3)|36:white_check_mark:|||250ms|
|[test/node-unit/cli/run-helpers.spec.js](#r0s4)|9:white_check_mark:|||8ms|
|[test/node-unit/cli/run.spec.js](#r0s5)|40:white_check_mark:|||4ms|
|[test/node-unit/mocha.spec.js](#r0s6)|24:white_check_mark:|||33ms|
|[test/node-unit/parallel-buffered-runner.spec.js](#r0s7)|19:white_check_mark:|||23ms|
|[test/node-unit/reporters/parallel-buffered.spec.js](#r0s8)|6:white_check_mark:|||16ms|
|[test/node-unit/serializer.spec.js](#r0s9)|40:white_check_mark:|||31ms|
|[test/node-unit/stack-trace-filter.spec.js](#r0s10)|2:white_check_mark:||4:warning:|1ms|
|[test/node-unit/utils.spec.js](#r0s11)|5:white_check_mark:|||1ms|
|[test/node-unit/worker.spec.js](#r0s12)|15:white_check_mark:|||92ms|
|[test/unit/context.spec.js](#r0s13)|8:white_check_mark:|||5ms|
|[test/unit/duration.spec.js](#r0s14)|3:white_check_mark:|||166ms|
|[test/unit/errors.spec.js](#r0s15)|13:white_check_mark:|||5ms|
|[test/unit/globals.spec.js](#r0s16)|4:white_check_mark:|||0ms|
|[test/unit/grep.spec.js](#r0s17)|8:white_check_mark:|||2ms|
|[test/unit/hook-async.spec.js](#r0s18)|3:white_check_mark:|||1ms|
|[test/unit/hook-sync-nested.spec.js](#r0s19)|4:white_check_mark:|||1ms|
|[test/unit/hook-sync.spec.js](#r0s20)|3:white_check_mark:|||0ms|
|[test/unit/hook-timeout.spec.js](#r0s21)|1:white_check_mark:|||0ms|
|[test/unit/hook.spec.js](#r0s22)|4:white_check_mark:|||0ms|
|[test/unit/mocha.spec.js](#r0s23)|115:white_check_mark:||1:warning:|128ms|
|[test/unit/overspecified-async.spec.js](#r0s24)|1:white_check_mark:|||3ms|
|[test/unit/parse-query.spec.js](#r0s25)|2:white_check_mark:|||1ms|
|[test/unit/plugin-loader.spec.js](#r0s26)|41:white_check_mark:||1:warning:|16ms|
|[test/unit/required-tokens.spec.js](#r0s27)|1:white_check_mark:|||0ms|
|[test/unit/root.spec.js](#r0s28)|1:white_check_mark:|||0ms|
|[test/unit/runnable.spec.js](#r0s29)|55:white_check_mark:|||122ms|
|[test/unit/runner.spec.js](#r0s30)|77:white_check_mark:|||43ms|
|[test/unit/suite.spec.js](#r0s31)|57:white_check_mark:|||14ms|
|[test/unit/test.spec.js](#r0s32)|15:white_check_mark:|||0ms|
|[test/unit/throw.spec.js](#r0s33)|9:white_check_mark:|||9ms|
|[test/unit/timeout.spec.js](#r0s34)|8:white_check_mark:|||109ms|
|[test/unit/utils.spec.js](#r0s35)|75:white_check_mark:|||24ms|
### :white_check_mark: <a id="user-content-r0s0" href="#r0s0">test/node-unit/buffered-worker-pool.spec.js</a>
```
class BufferedWorkerPool constructor
  :white_check_mark: should apply defaults
class BufferedWorkerPool instance method run()
  :white_check_mark: should deserialize the result
  :white_check_mark: should serialize the options object
class BufferedWorkerPool instance method run() when passed a non-string filepath
  :white_check_mark: should reject
class BufferedWorkerPool instance method run() when passed no arguments
  :white_check_mark: should reject
class BufferedWorkerPool instance method stats()
  :white_check_mark: should return the object returned by `workerpool.Pool#stats`
class BufferedWorkerPool instance method terminate() when called with `force`
  :white_check_mark: should delegate to the underlying pool w/ "force" behavior
class BufferedWorkerPool instance method terminate() when called without `force`
  :white_check_mark: should delegate to the underlying pool w/o "force" behavior
class BufferedWorkerPool static method create()
  :white_check_mark: should return a BufferedWorkerPool instance
class BufferedWorkerPool static method create() when passed no arguments
  :white_check_mark: should not throw
class BufferedWorkerPool static method serializeOptions()
  :white_check_mark: should return a serialized string
class BufferedWorkerPool static method serializeOptions() when called multiple times with the same object
  :white_check_mark: should not perform serialization twice
  :white_check_mark: should return the same value
class BufferedWorkerPool static method serializeOptions() when passed no arguments
  :white_check_mark: should not throw
```
### :white_check_mark: <a id="user-content-r0s1" href="#r0s1">test/node-unit/cli/config.spec.js</a>
```
cli/config findConfig()
  :white_check_mark: should look for one of the config files using findup-sync
  :white_check_mark: should support an explicit `cwd`
cli/config loadConfig() when config file parsing fails
  :white_check_mark: should throw
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".cjs" extension
  :white_check_mark: should use the JS parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".js" extension
  :white_check_mark: should use the JS parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".json" extension
  :white_check_mark: should use the JSON parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".jsonc" extension
  :white_check_mark: should use the JSON parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".yaml" extension
  :white_check_mark: should use the YAML parser
cli/config loadConfig() when parsing succeeds when supplied a filepath with ".yml" extension
  :white_check_mark: should use the YAML parser
cli/config loadConfig() when supplied a filepath with unsupported extension
  :white_check_mark: should use the JSON parser
```
### :white_check_mark: <a id="user-content-r0s2" href="#r0s2">test/node-unit/cli/node-flags.spec.js</a>
```
node-flags impliesNoTimeouts()
  :white_check_mark: should return true for inspect flags
node-flags isNodeFlag() for all allowed node env flags which conflict with mocha flags
  :white_check_mark: --require should return false
  :white_check_mark: -r should return false
node-flags isNodeFlag() for all allowed node environment flags
  :white_check_mark: --abort-on-uncaught-exception should return true
  :white_check_mark: --conditions should return true
  :white_check_mark: --debug-arraybuffer-allocations should return true
  :white_check_mark: --debug-port should return true
  :white_check_mark: --diagnostic-dir should return true
  :white_check_mark: --disable-proto should return true
  :white_check_mark: --disallow-code-generation-from-strings should return true
  :white_check_mark: --enable-source-maps should return true
  :white_check_mark: --es-module-specifier-resolution should return true
  :white_check_mark: --experimental-import-meta-resolve should return true
  :white_check_mark: --experimental-json-modules should return true
  :white_check_mark: --experimental-loader should return true
  :white_check_mark: --experimental-modules should return true
  :white_check_mark: --experimental-policy should return true
  :white_check_mark: --experimental-repl-await should return true
  :white_check_mark: --experimental-report should return true
  :white_check_mark: --experimental-specifier-resolution should return true
  :white_check_mark: --experimental-vm-modules should return true
  :white_check_mark: --experimental-wasi-unstable-preview1 should return true
  :white_check_mark: --experimental-wasm-modules should return true
  :white_check_mark: --experimental-worker should return true
  :white_check_mark: --force-context-aware should return true
  :white_check_mark: --frozen-intrinsics should return true
  :white_check_mark: --heapsnapshot-signal should return true
  :white_check_mark: --http-parser should return true
  :white_check_mark: --http-server-default-timeout should return true
  :white_check_mark: --huge-max-old-generation-size should return true
  :white_check_mark: --icu-data-dir should return true
  :white_check_mark: --input-type should return true
  :white_check_mark: --insecure-http-parser should return true
  :white_check_mark: --inspect should return true
  :white_check_mark: --inspect-brk should return true
  :white_check_mark: --inspect-port should return true
  :white_check_mark: --inspect-publish-uid should return true
  :white_check_mark: --interpreted-frames-native-stack should return true
  :white_check_mark: --jitless should return true
  :white_check_mark: --loader should return true
  :white_check_mark: --max-http-header-size should return true
  :white_check_mark: --max-old-space-size should return true
  :white_check_mark: --napi-modules should return true
  :white_check_mark: --no-deprecation should return true
  :white_check_mark: --no-force-async-hooks-checks should return true
  :white_check_mark: --no-node-snapshot should return true
  :white_check_mark: --no-warnings should return true
  :white_check_mark: --openssl-config should return true
  :white_check_mark: --pending-deprecation should return true
  :white_check_mark: --perf-basic-prof should return true
  :white_check_mark: --perf-basic-prof-only-functions should return true
  :white_check_mark: --perf-prof should return true
  :white_check_mark: --perf-prof-unwinding-info should return true
  :white_check_mark: --policy-integrity should return true
  :white_check_mark: --preserve-symlinks should return true
  :white_check_mark: --preserve-symlinks-main should return true
  :white_check_mark: --prof-process should return true
  :white_check_mark: --redirect-warnings should return true
  :white_check_mark: --report-compact should return true
  :white_check_mark: --report-dir should return true
  :white_check_mark: --report-directory should return true
  :white_check_mark: --report-filename should return true
  :white_check_mark: --report-on-fatalerror should return true
  :white_check_mark: --report-on-signal should return true
  :white_check_mark: --report-signal should return true
  :white_check_mark: --report-uncaught-exception should return true
  :white_check_mark: --stack-trace-limit should return true
  :white_check_mark: --throw-deprecation should return true
  :white_check_mark: --title should return true
  :white_check_mark: --tls-cipher-list should return true
  :white_check_mark: --tls-keylog should return true
  :white_check_mark: --tls-max-v1.2 should return true
  :white_check_mark: --tls-max-v1.3 should return true
  :white_check_mark: --tls-min-v1.0 should return true
  :white_check_mark: --tls-min-v1.1 should return true
  :white_check_mark: --tls-min-v1.2 should return true
  :white_check_mark: --tls-min-v1.3 should return true
  :white_check_mark: --trace-deprecation should return true
  :white_check_mark: --trace-event-categories should return true
  :white_check_mark: --trace-event-file-pattern should return true
  :white_check_mark: --trace-events-enabled should return true
  :white_check_mark: --trace-exit should return true
  :white_check_mark: --trace-sigint should return true
  :white_check_mark: --trace-sync-io should return true
  :white_check_mark: --trace-tls should return true
  :white_check_mark: --trace-uncaught should return true
  :white_check_mark: --trace-warnings should return true
  :white_check_mark: --track-heap-objects should return true
  :white_check_mark: --unhandled-rejections should return true
  :white_check_mark: --use-bundled-ca should return true
  :white_check_mark: --use-largepages should return true
  :white_check_mark: --use-openssl-ca should return true
  :white_check_mark: --v8-pool-size should return true
  :white_check_mark: --zero-fill-buffers should return true
node-flags isNodeFlag() special cases
  :white_check_mark: should return true for "es-staging"
  :white_check_mark: should return true for "gc-global"
  :white_check_mark: should return true for "harmony" itself
  :white_check_mark: should return true for "use-strict"
  :white_check_mark: should return true for flags starting with "--v8-"
  :white_check_mark: should return true for flags starting with "harmony-" or "harmony_"
  :white_check_mark: should return true for flags starting with "preserve-symlinks"
  :white_check_mark: should return true for flags starting with "trace-" or "trace_"
node-flags isNodeFlag() when expecting leading dashes
  :white_check_mark: should require leading dashes
node-flags unparseNodeFlags()
  :white_check_mark: should handle multiple v8 flags
  :white_check_mark: should handle single v8 flags
```
### :white_check_mark: <a id="user-content-r0s3" href="#r0s3">test/node-unit/cli/options.spec.js</a>
```
options loadOptions() "extension" handling when user does not supply "extension" option
  :white_check_mark: should retain the default
options loadOptions() "extension" handling when user supplies "extension" option
  :white_check_mark: should not concatenate the default value
options loadOptions() "ignore" handling
  :white_check_mark: should not split option values by comma
options loadOptions() "spec" handling when user supplies "spec" in config and positional arguments
  :white_check_mark: should place both - unsplitted - into the positional arguments array
options loadOptions() config priority
  :white_check_mark: should prioritize args over rc file
  :white_check_mark: should prioritize package.json over defaults
  :white_check_mark: should prioritize rc file over package.json
options loadOptions() when called with a one-and-done arg "h"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "help"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "list-interfaces"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "list-reporters"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "V"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when called with a one-and-done arg "version"
  :white_check_mark: should return basic parsed arguments and flag
options loadOptions() when no parameter provided
  :white_check_mark: should return an object containing positional args, defaults, and anti-reloading flags
options loadOptions() when parameter provided package.json when called with package = false (`--no-package`)
  :white_check_mark: should not look for package.json
  :white_check_mark: should return parsed args and default config
  :white_check_mark: should set package = false
options loadOptions() when parameter provided package.json when path to package.json (`--package <path>`) is invalid
  :white_check_mark: should throw
options loadOptions() when parameter provided package.json when path to package.json (`--package <path>`) is valid
  :white_check_mark: should not try to find a package.json
  :white_check_mark: should return merged options incl. package.json opts
  :white_check_mark: should set package = false
options loadOptions() when parameter provided package.json when path to package.json unspecified
  :white_check_mark: should return merged options incl. found package.json
  :white_check_mark: should set package = false
options loadOptions() when parameter provided rc file when called with config = false (`--no-config`)
  :white_check_mark: should not attempt to find a config file
  :white_check_mark: should not attempt to load a config file
  :white_check_mark: should return parsed args, default config and package.json
  :white_check_mark: should set config = false
options loadOptions() when parameter provided rc file when called with unspecified config when an rc file would be found
  :white_check_mark: should attempt to load file at found path
  :white_check_mark: should look for a config
  :white_check_mark: should set config = false
options loadOptions() when parameter provided rc file when called with unspecified config when an rc file would not be found
  :white_check_mark: should look for a config
  :white_check_mark: should not attempt to load a config file
  :white_check_mark: should set config = false
options loadOptions() when parameter provided rc file when path to config (`--config <path>`) is invalid
  :white_check_mark: should attempt to load file at path
  :white_check_mark: should not look for a config
  :white_check_mark: should throw to warn the user
```
### :white_check_mark: <a id="user-content-r0s4" href="#r0s4">test/node-unit/cli/run-helpers.spec.js</a>
```
helpers list() when given a comma-delimited string
  :white_check_mark: should return a flat array
helpers list() when provided a flat array
  :white_check_mark: should return a flat array
helpers list() when provided a nested array
  :white_check_mark: should return a flat array
helpers validateLegacyPlugin() when a plugin throws an exception upon load
  :white_check_mark: should fail and report the original error
helpers validateLegacyPlugin() when used with "reporter" key
  :white_check_mark: should disallow an array of names
  :white_check_mark: should fail to recognize an unknown reporter
helpers validateLegacyPlugin() when used with an "interfaces" key
  :white_check_mark: should disallow an array of names
  :white_check_mark: should fail to recognize an unknown interface
helpers validateLegacyPlugin() when used with an unknown plugin type
  :white_check_mark: should fail
```
### :white_check_mark: <a id="user-content-r0s5" href="#r0s5">test/node-unit/cli/run.spec.js</a>
```
command run builder array type
  :white_check_mark: should include option extension
  :white_check_mark: should include option file
  :white_check_mark: should include option global
  :white_check_mark: should include option ignore
  :white_check_mark: should include option reporter-option
  :white_check_mark: should include option require
  :white_check_mark: should include option spec
  :white_check_mark: should include option watch-files
  :white_check_mark: should include option watch-ignore
command run builder boolean type
  :white_check_mark: should include option allow-uncaught
  :white_check_mark: should include option async-only
  :white_check_mark: should include option bail
  :white_check_mark: should include option check-leaks
  :white_check_mark: should include option color
  :white_check_mark: should include option delay
  :white_check_mark: should include option diff
  :white_check_mark: should include option exit
  :white_check_mark: should include option forbid-only
  :white_check_mark: should include option forbid-pending
  :white_check_mark: should include option full-trace
  :white_check_mark: should include option growl
  :white_check_mark: should include option inline-diffs
  :white_check_mark: should include option invert
  :white_check_mark: should include option list-interfaces
  :white_check_mark: should include option list-reporters
  :white_check_mark: should include option no-colors
  :white_check_mark: should include option parallel
  :white_check_mark: should include option recursive
  :white_check_mark: should include option sort
  :white_check_mark: should include option watch
command run builder number type
  :white_check_mark: should include option jobs
  :white_check_mark: should include option retries
command run builder string type
  :white_check_mark: should include option config
  :white_check_mark: should include option fgrep
  :white_check_mark: should include option grep
  :white_check_mark: should include option package
  :white_check_mark: should include option reporter
  :white_check_mark: should include option slow
  :white_check_mark: should include option timeout
  :white_check_mark: should include option ui
```
### :white_check_mark: <a id="user-content-r0s6" href="#r0s6">test/node-unit/mocha.spec.js</a>
```
Mocha instance method addFile()
  :white_check_mark: should add the given file to the files array
  :white_check_mark: should be chainable
Mocha instance method lazyLoadFiles()
  :white_check_mark: should return the `Mocha` instance
Mocha instance method lazyLoadFiles() when passed `true`
  :white_check_mark: should enable lazy loading
Mocha instance method lazyLoadFiles() when passed a non-`true` value
  :white_check_mark: should enable eager loading
Mocha instance method loadFiles()
  :white_check_mark: should execute the optional callback if given
  :white_check_mark: should load all files from the files array
Mocha instance method parallelMode() when `Mocha` is running in Node.js
  :white_check_mark: should return the Mocha instance
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed `true` value when `Mocha` instance is in `INIT` state
  :white_check_mark: should enable parallel mode
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed `true` value when `Mocha` instance is not in `INIT` state
  :white_check_mark: should throw
Mocha instance method parallelMode() when `Mocha` is running in Node.js when `Mocha` instance in serial mode when passed non-`true` value when `Mocha` instance is in `INIT` state
  :white_check_mark: should enable serial mode
Mocha instance method parallelMode() when `Mocha` is running in Node.js when parallel mode is already disabled
  :white_check_mark: should not swap the Runner, nor change lazy loading setting
Mocha instance method parallelMode() when `Mocha` is running in Node.js when parallel mode is already enabled
  :white_check_mark: should not swap the Runner, nor change lazy loading setting
Mocha instance method reporter() when a reporter exists relative to the "mocha" module path
  :white_check_mark: should load from module path
Mocha instance method reporter() when a reporter exists relative to the "mocha" module path when the reporter throws upon load
  :white_check_mark: should throw "invalid reporter" exception
  :white_check_mark: should warn about the error before throwing
Mocha instance method reporter() when a reporter exists relative to the cwd
  :white_check_mark: should load from current working directory
Mocha instance method reporter() when a reporter exists relative to the cwd when the reporter throws upon load
  :white_check_mark: should throw "invalid reporter" exception
  :white_check_mark: should warn about the error before throwing
Mocha instance method unloadFiles()
  :white_check_mark: should be chainable
  :white_check_mark: should delegate Mocha.unloadFile() for each item in its list of files
  :white_check_mark: should not be allowed when the current instance is already disposed
  :white_check_mark: should reset referencesCleaned and allow for next run
Mocha static method unloadFile()
  :white_check_mark: should unload a specific file from cache
```
### :white_check_mark: <a id="user-content-r0s7" href="#r0s7">test/node-unit/parallel-buffered-runner.spec.js</a>
```
parallel-buffered-runner ParallelBufferedRunner constructor
  :white_check_mark: should start in "IDLE" state
parallel-buffered-runner ParallelBufferedRunner event EVENT_RUN_END
  :white_check_mark: should change the state to COMPLETE
parallel-buffered-runner ParallelBufferedRunner instance method isParallelMode()
  :white_check_mark: should return true
parallel-buffered-runner ParallelBufferedRunner instance method linkPartialObjects()
  :white_check_mark: should return the runner
parallel-buffered-runner ParallelBufferedRunner instance method run()
  :white_check_mark: should be chainable
  :white_check_mark: should emit `EVENT_RUN_BEGIN`
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when an event contains an error and has positive failures when subsequent files already started running
  :white_check_mark: should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when an event contains an error and has positive failures when subsequent files have not yet been run
  :white_check_mark: should cleanly terminate the thread pool
  :white_check_mark: should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when a suite has a bail flag when no event contains an error
  :white_check_mark: should not force-terminate
parallel-buffered-runner ParallelBufferedRunner instance method run() when a worker fails
  :white_check_mark: should delegate to Runner#uncaught
  :white_check_mark: should recover
parallel-buffered-runner ParallelBufferedRunner instance method run() when instructed to link objects
  :white_check_mark: should create object references
parallel-buffered-runner ParallelBufferedRunner instance method run() when instructed to link objects when event data object is missing an ID
  :white_check_mark: should result in an uncaught exception
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when an event contains an error and has positive failures when subsequent files already started running
  :white_check_mark: should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when an event contains an error and has positive failures when subsequent files have not yet been run
  :white_check_mark: should cleanly terminate the thread pool
parallel-buffered-runner ParallelBufferedRunner instance method run() when suite should bail when no event contains an error
  :white_check_mark: should not force-terminate
parallel-buffered-runner ParallelBufferedRunner instance method workerReporter()
  :white_check_mark: should return its context
parallel-buffered-runner ParallelBufferedRunner instance property _state
  :white_check_mark: should disallow an invalid state transition
```
### :white_check_mark: <a id="user-content-r0s8" href="#r0s8">test/node-unit/reporters/parallel-buffered.spec.js</a>
```
ParallelBuffered constructor
  :white_check_mark: should listen for Runner events
  :white_check_mark: should listen for Runner events expecting to occur once
ParallelBuffered event on any other event listened for
  :white_check_mark: should populate its `events` array with SerializableEvents
ParallelBuffered event on EVENT_RUN_END
  :white_check_mark: should remove all listeners
ParallelBuffered instance method done
  :white_check_mark: should execute its callback with a SerializableWorkerResult
  :white_check_mark: should reset its `events` prop
```
### :white_check_mark: <a id="user-content-r0s9" href="#r0s9">test/node-unit/serializer.spec.js</a>
```
serializer function deserialize when passed a non-object value
  :white_check_mark: should return the value
serializer function deserialize when passed a SerializedWorkerResult object
  :white_check_mark: should return the result of `SerializableWorkerResult.deserialize` called on the value
serializer function deserialize when passed an object value which is not a SerializedWorkerResult
  :white_check_mark: should return the value
serializer function deserialize when passed nothing
  :white_check_mark: should return `undefined`
serializer function serialize when not passed anything
  :white_check_mark: should return `undefined`
serializer function serialize when passed a non-object value
  :white_check_mark: should return the value
serializer function serialize when passed an object value having a `serialize` method
  :white_check_mark: should return the result of the `serialize` method
serializer function serialize when passed an object value w/o a `serialize` method
  :white_check_mark: should return the value
serializer SerializableEvent constructor when called with a non-object `rawObject`
  :white_check_mark: should throw "invalid arg type" error
serializer SerializableEvent constructor when called without `eventName`
  :white_check_mark: should throw "invalid arg value" error
serializer SerializableEvent instance method serialize
  :white_check_mark: should freeze the instance
  :white_check_mark: should mutate the instance in-place
serializer SerializableEvent instance method serialize when passed an error
  :white_check_mark: should not retain not-own props
  :white_check_mark: should retain own props
  :white_check_mark: should serialize the error
serializer SerializableEvent instance method serialize when passed an object containing a nested prop with an Error value
  :white_check_mark: should serialize the Error
serializer SerializableEvent instance method serialize when passed an object containing a non-`serialize` method
  :white_check_mark: should remove the method
serializer SerializableEvent instance method serialize when passed an object containing a top-level prop with an Error value
  :white_check_mark: should serialize the Error
serializer SerializableEvent instance method serialize when passed an object containing an array
  :white_check_mark: should serialize the array
serializer SerializableEvent instance method serialize when passed an object containing an object with a `serialize` method
  :white_check_mark: should call the `serialize` method
serializer SerializableEvent instance method serialize when passed an object with a `serialize` method
  :white_check_mark: should call the `serialize` method
serializer SerializableEvent static method create
  :white_check_mark: should instantiate a SerializableEvent
serializer SerializableEvent static method deserialize
  :white_check_mark: should return a new object w/ null prototype
serializer SerializableEvent static method deserialize when passed a falsy parameter
  :white_check_mark: should throw "invalid arg type" error
serializer SerializableEvent static method deserialize when passed value contains `data` prop
  :white_check_mark: should ignore __proto__
serializer SerializableEvent static method deserialize when passed value contains `data` prop when `data` prop contains a nested serialized Error prop
  :white_check_mark: should create an Error instance from the nested serialized Error prop
serializer SerializableEvent static method deserialize when passed value contains an `error` prop
  :white_check_mark: should create an Error instance from the prop
serializer SerializableEvent static method deserialize when passed value data contains a prop beginning with "$$"
  :white_check_mark: should create a new prop having a function value
  :white_check_mark: should create a new prop returning the original value
  :white_check_mark: should remove the prop with the "$$" prefix
serializer SerializableEvent static method deserialize when the value data contains a prop with an array value
  :white_check_mark: should deserialize each prop
serializer SerializableWorkerResult constructor
  :white_check_mark: should add a readonly `__type` prop
serializer SerializableWorkerResult instance method serialize
  :white_check_mark: should call `SerializableEvent#serialize` of each of its events
  :white_check_mark: should return a read-only value
serializer SerializableWorkerResult static method create
  :white_check_mark: should return a new SerializableWorkerResult instance
serializer SerializableWorkerResult static method deserialize
  :white_check_mark: should call SerializableEvent#deserialize on each item in its `events` prop
  :white_check_mark: should return the deserialized value
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an instance
  :white_check_mark: should return `true`
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an object with an appropriate `__type` prop
  :white_check_mark: should return `true`
serializer SerializableWorkerResult static method isSerializedWorkerResult when passed an object without an appropriate `__type` prop
  :white_check_mark: should return `false`
```
### :white_check_mark: <a id="user-content-r0s10" href="#r0s10">test/node-unit/stack-trace-filter.spec.js</a>
```
stackTraceFilter() on browser
  :white_check_mark: does not strip out other bower_components
stackTraceFilter() on node on POSIX OS
  :warning: does not ignore other bower_components and components
  :warning: should get a stack-trace as a string and prettify it
  :warning: should not replace absolute path which has cwd as infix
  :warning: should replace absolute with relative paths
stackTraceFilter() on node on Windows
  :white_check_mark: should work on Windows
```
### :white_check_mark: <a id="user-content-r0s11" href="#r0s11">test/node-unit/utils.spec.js</a>
```
utils function canonicalType()
  :white_check_mark: should return "asyncfunction" if the parameter is an async function
  :white_check_mark: should return "buffer" if the parameter is a Buffer
utils function cwd()
  :white_check_mark: should return the current working directory
utils function type()
  :white_check_mark: should return "error" if the parameter is an Error
  :white_check_mark: should return "function" if the parameter is an async function
```
### :white_check_mark: <a id="user-content-r0s12" href="#r0s12">test/node-unit/worker.spec.js</a>
```
worker when run as main process
  :white_check_mark: should throw
worker when run as worker process
  :white_check_mark: should register itself with workerpool
worker when run as worker process function run() when called with empty "filepath" argument
  :white_check_mark: should reject
worker when run as worker process function run() when called without arguments
  :white_check_mark: should reject
worker when run as worker process function run() when passed a non-string `options` value
  :white_check_mark: should reject
worker when run as worker process function run() when passed an invalid string `options` value
  :white_check_mark: should reject
worker when run as worker process function run() when the file at "filepath" argument is unloadable
  :white_check_mark: should reject
worker when run as worker process function run() when the file at "filepath" is loadable
  :white_check_mark: should call Mocha#run
  :white_check_mark: should handle "--require"
  :white_check_mark: should handle "--ui"
  :white_check_mark: should remove all uncaughtException listeners
  :white_check_mark: should remove all unhandledRejection listeners
worker when run as worker process function run() when the file at "filepath" is loadable when run twice
  :white_check_mark: should initialize only once
worker when run as worker process function run() when the file at "filepath" is loadable when serialization fails
  :white_check_mark: should reject
worker when run as worker process function run() when the file at "filepath" is loadable when serialization succeeds
  :white_check_mark: should resolve with a SerializedWorkerResult
```
### :white_check_mark: <a id="user-content-r0s13" href="#r0s13">test/unit/context.spec.js</a>
```
Context nested
  :white_check_mark: should work
Context Siblings sequestered sibling
  :white_check_mark: should work
Context Siblings sibling verifiction
  :white_check_mark: should allow test siblings to modify shared context
  :white_check_mark: should have reset this.calls before describe
  :white_check_mark: should not have value set within a sibling describe
methods retries
  :white_check_mark: should return the number of retries
methods slow()
  :white_check_mark: should return the slow
methods timeout()
  :white_check_mark: should return the timeout
```
### :white_check_mark: <a id="user-content-r0s14" href="#r0s14">test/unit/duration.spec.js</a>
```
durations when fast
  :white_check_mark: should not highlight
durations when reasonable
  :white_check_mark: should highlight in yellow
durations when slow
  :white_check_mark: should highlight in red
```
### :white_check_mark: <a id="user-content-r0s15" href="#r0s15">test/unit/errors.spec.js</a>
```
Errors createForbiddenExclusivityError() when Mocha instance is not running in a worker process
  :white_check_mark: should output a message regarding --forbid-only
Errors createForbiddenExclusivityError() when Mocha instance is running in a worker process
  :white_check_mark: should output a message regarding incompatibility
Errors createInvalidInterfaceError()
  :white_check_mark: should include expected code in thrown interface errors
Errors createInvalidReporterError()
  :white_check_mark: should include expected code in thrown reporter errors
Errors deprecate()
  :white_check_mark: should cache the message
  :white_check_mark: should coerce its parameter to a string
  :white_check_mark: should ignore falsy messages
Errors isMochaError() when provided a non-error
  :white_check_mark: should return false
Errors isMochaError() when provided an Error object having a known Mocha error code
  :white_check_mark: should return true
Errors isMochaError() when provided an Error object with a non-Mocha error code
  :white_check_mark: should return false
Errors warn()
  :white_check_mark: should call process.emitWarning
  :white_check_mark: should ignore falsy messages
  :white_check_mark: should not cache messages
```
### :white_check_mark: <a id="user-content-r0s16" href="#r0s16">test/unit/globals.spec.js</a>
```
global leaks
  :white_check_mark: should cause tests to fail
  :white_check_mark: should pass when accepted
  :white_check_mark: should pass when prefixed "mocha-"
  :white_check_mark: should pass with wildcard
```
### :white_check_mark: <a id="user-content-r0s17" href="#r0s17">test/unit/grep.spec.js</a>
```
Mocha .grep()
  :white_check_mark: should add a RegExp to the mocha.options object
  :white_check_mark: should convert grep string to a RegExp
  :white_check_mark: should covert grep regex-like string to a RegExp
  :white_check_mark: should return its parent Mocha object for chainability
Mocha "fgrep" option
  :white_check_mark: should escape and convert string to a RegExp
Mocha "grep" option
  :white_check_mark: should add a RegExp to the mocha.options object
  :white_check_mark: should convert string to a RegExp
Mocha "invert" option
  :white_check_mark: should add a Boolean to the mocha.options object
```
### :white_check_mark: <a id="user-content-r0s18" href="#r0s18">test/unit/hook-async.spec.js</a>
```
async hooks
  :white_check_mark: one
  :white_check_mark: three
  :white_check_mark: two
```
### :white_check_mark: <a id="user-content-r0s19" href="#r0s19">test/unit/hook-sync-nested.spec.js</a>
```
serial nested
  :white_check_mark: bar
  :white_check_mark: foo
serial nested hooks
  :white_check_mark: one
  :white_check_mark: two
```
### :white_check_mark: <a id="user-content-r0s20" href="#r0s20">test/unit/hook-sync.spec.js</a>
```
serial hooks
  :white_check_mark: one
  :white_check_mark: three
  :white_check_mark: two
```
### :white_check_mark: <a id="user-content-r0s21" href="#r0s21">test/unit/hook-timeout.spec.js</a>
```
hook timeout
  :white_check_mark: should work
```
### :white_check_mark: <a id="user-content-r0s22" href="#r0s22">test/unit/hook.spec.js</a>
```
Hook error
  :white_check_mark: should get the hook._error when called without arguments
  :white_check_mark: should set the hook._error
Hook reset
  :white_check_mark: should call Runnable.reset
  :white_check_mark: should reset the error state
```
### :white_check_mark: <a id="user-content-r0s23" href="#r0s23">test/unit/mocha.spec.js</a>
```
Mocha constructor
  :white_check_mark: should set _cleanReferencesAfterRun to true
Mocha constructor when `global` option is an `Array`
  :white_check_mark: should attempt to set globals
Mocha constructor when `parallel` option is true and `jobs` option <= 1
  :white_check_mark: should not enable parallel mode
Mocha constructor when `parallel` option is true and `jobs` option > 1
  :white_check_mark: should enable parallel mode
Mocha constructor when `parallel` option is true when `enableGlobalSetup` option is present
  :white_check_mark: should toggle global setup fixtures
Mocha constructor when `parallel` option is true when `enableGlobalTeardown` option is present
  :white_check_mark: should configure global teardown fixtures
Mocha constructor when `parallel` option is true when `globalSetup` option is present
  :white_check_mark: should configure global setup fixtures
Mocha constructor when `parallel` option is true when `globalTeardown` option is present
  :white_check_mark: should configure global teardown fixtures
Mocha constructor when `retries` option is not present
  :white_check_mark: should not attempt to set retries
Mocha constructor when `retries` option is present
  :white_check_mark: should attempt to set retries`
Mocha constructor when `rootHooks` option is truthy
  :white_check_mark: shouid attempt to set root hooks
Mocha constructor when `timeout` option is `false`
  :white_check_mark: should attempt to set timeout
Mocha constructor when `timeout` option is `undefined`
  :white_check_mark: should not attempt to set timeout
Mocha instance method _runGlobalFixtures()
  :white_check_mark: should execute multiple fixtures in order
Mocha instance method allowUncaught()
  :white_check_mark: should be chainable
  :white_check_mark: should set the allowUncaught option to false
  :white_check_mark: should set the allowUncaught option to true
Mocha instance method asyncOnly()
  :white_check_mark: should be chainable
  :white_check_mark: should set the asyncOnly option to false
  :white_check_mark: should set the asyncOnly option to true
Mocha instance method bail()
  :white_check_mark: should be chainable
Mocha instance method bail() when provided a falsy argument
  :white_check_mark: should unset the "bail" flag on the root suite
Mocha instance method bail() when provided no arguments
  :white_check_mark: should set the "bail" flag on the root suite
Mocha instance method checkLeaks()
  :white_check_mark: should set the checkLeaks option to true
Mocha instance method cleanReferencesAfterRun()
  :white_check_mark: should be chainable
  :white_check_mark: should set the _cleanReferencesAfterRun attribute
  :white_check_mark: should set the _cleanReferencesAfterRun attribute to false
Mocha instance method color()
  :white_check_mark: should be chainable
  :white_check_mark: should set the color option to false
  :white_check_mark: should set the color option to true
Mocha instance method delay()
  :white_check_mark: should be chainable
  :white_check_mark: should set the delay option to true
Mocha instance method diff()
  :white_check_mark: should set the diff option to true
Mocha instance method diff() when provided `false` argument
  :white_check_mark: should set the diff option to false
Mocha instance method dispose()
  :white_check_mark: should dispose previous test runner
  :white_check_mark: should dispose the root suite
  :white_check_mark: should unload the files
Mocha instance method forbidOnly()
  :white_check_mark: should be chainable
  :white_check_mark: should set the forbidOnly option to false
  :white_check_mark: should set the forbidOnly option to true
Mocha instance method forbidPending()
  :white_check_mark: should be chainable
  :white_check_mark: should set the forbidPending option to false
  :white_check_mark: should set the forbidPending option to true
Mocha instance method fullTrace()
  :white_check_mark: should be chainable
  :white_check_mark: should set the fullTrace option to false
  :white_check_mark: should set the fullTrace option to true
Mocha instance method global()
  :white_check_mark: should be an empty array initially
  :white_check_mark: should be chainable
Mocha instance method global() when argument is invalid
  :white_check_mark: should not modify the whitelist when given empty array
  :white_check_mark: should not modify the whitelist when given empty string
Mocha instance method global() when argument is valid
  :white_check_mark: should add contents of string array to the whitelist
  :white_check_mark: should add string to the whitelist
  :white_check_mark: should not have duplicates
Mocha instance method growl()
  :white_check_mark: should be chainable
Mocha instance method growl() if capable of notifications
  :white_check_mark: should set the growl option to true
Mocha instance method growl() if not capable of notifications
  :white_check_mark: should set the growl option to false
Mocha instance method hasGlobalSetupFixtures() when no global setup fixtures are present
  :white_check_mark: should return `false`
Mocha instance method hasGlobalSetupFixtures() when one or more global setup fixtures are present
  :white_check_mark: should return `true`
Mocha instance method hasGlobalTeardownFixtures() when no global teardown fixtures are present
  :white_check_mark: should return `false`
Mocha instance method hasGlobalTeardownFixtures() when one or more global teardown fixtures are present
  :white_check_mark: should return `true`
Mocha instance method inlineDiffs()
  :white_check_mark: should be chainable
  :white_check_mark: should set the inlineDiffs option to false
  :white_check_mark: should set the inlineDiffs option to true
Mocha instance method invert()
  :white_check_mark: should be chainable
  :white_check_mark: should set the invert option to true
Mocha instance method noHighlighting()
  :white_check_mark: should be chainable
  :white_check_mark: should set the noHighlighting option to true
Mocha instance method parallelMode() when `Mocha` is running in a browser
  :white_check_mark: should throw
Mocha instance method reporter()
  :white_check_mark: should be chainable
  :white_check_mark: should keep reporterOption on options
  :white_check_mark: should support legacy reporterOptions
Mocha instance method rootHooks()
  :white_check_mark: should be chainable
Mocha instance method rootHooks() when provided a single "after all" hook
  :white_check_mark: should attach it to the root suite
Mocha instance method rootHooks() when provided a single "after each" hook
  :white_check_mark: should attach it to the root suite
Mocha instance method rootHooks() when provided a single "before all" hook
  :white_check_mark: should attach it to the root suite
Mocha instance method rootHooks() when provided a single "before each" hook
  :white_check_mark: should attach it to the root suite
Mocha instance method rootHooks() when provided multiple "after all" hooks
  :white_check_mark: should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "after each" hooks
  :white_check_mark: should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "before all" hooks
  :white_check_mark: should attach each to the root suite
Mocha instance method rootHooks() when provided multiple "before each" hooks
  :white_check_mark: should attach each to the root suite
Mocha instance method run()
  :white_check_mark: should execute the callback when complete
  :warning: should initialize the stats collector
  :white_check_mark: should instantiate a reporter
Mocha instance method run() Base reporter initialization
  :white_check_mark: should configure the Base reporter
Mocha instance method run() Base reporter initialization when "color" options is set
  :white_check_mark: should configure the Base reporter
Mocha instance method run() Runner initialization
  :white_check_mark: should instantiate a Runner
Mocha instance method run() Runner initialization when "global" option is present
  :white_check_mark: should configure global vars
Mocha instance method run() Runner initialization when "grep" option is present
  :white_check_mark: should configure "grep"
Mocha instance method run() when "growl" option is present
  :white_check_mark: should initialize growl support
Mocha instance method run() when a reporter instance has a "done" method
  :white_check_mark: should call the reporter "done" method
Mocha instance method run() when a run has finished and is called again
  :white_check_mark: should not call `Runner#runAsync()`
  :white_check_mark: should throw
Mocha instance method run() when a run is in progress
  :white_check_mark: should not call `Runner#runAsync`
  :white_check_mark: should throw
Mocha instance method run() when files have been added to the Mocha instance when Mocha is set to eagerly load files
  :white_check_mark: should eagerly load files
Mocha instance method run() when files have been added to the Mocha instance when Mocha is set to lazily load files
  :white_check_mark: should not eagerly load files
Mocha instance method run() when global setup fixtures disabled when global setup fixtures are present
  :white_check_mark: should not run global setup fixtures
Mocha instance method run() when global setup fixtures disabled when global setup fixtures not present
  :white_check_mark: should not run global setup fixtures
Mocha instance method run() when global setup fixtures enabled when global setup fixtures are present
  :white_check_mark: should run global setup fixtures
Mocha instance method run() when global setup fixtures enabled when global setup fixtures not present
  :white_check_mark: should not run global setup fixtures
Mocha instance method run() when global teardown fixtures disabled when global teardown fixtures are present
  :white_check_mark: should not run global teardown fixtures
Mocha instance method run() when global teardown fixtures disabled when global teardown fixtures not present
  :white_check_mark: should not run global teardown fixtures
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures are present
  :white_check_mark: should run global teardown fixtures
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures are present when global setup fixtures are present and enabled
  :white_check_mark: should use the same context as returned by `runGlobalSetup`
Mocha instance method run() when global teardown fixtures enabled when global teardown fixtures not present
  :white_check_mark: should not run global teardown fixtures
Mocha instance method run() when Mocha configured for multiple runs and multiple runs are attempted
  :white_check_mark: should call `Runner#runAsync` for each call
  :white_check_mark: should dispose the previous runner
  :white_check_mark: should not throw
  :white_check_mark: should reset the root Suite between runs
Mocha instance method run() when the `Mocha` instance is already disposed
  :white_check_mark: should not call `Runner#runAsync`
  :white_check_mark: should throw
Mocha instance method runGlobalSetup() when a fixture is not present
  :white_check_mark: should not attempt to run fixtures
Mocha instance method runGlobalSetup() when fixture(s) are present
  :white_check_mark: should attempt run the fixtures
Mocha instance method runGlobalTeardown() when a fixture is not present
  :white_check_mark: not attempt to run the fixtures
Mocha instance method runGlobalTeardown() when fixture(s) are present
  :white_check_mark: should attempt to run the fixtures
Mocha instance method unloadFile() when run in a browser
  :white_check_mark: should throw
```
### :white_check_mark: <a id="user-content-r0s24" href="#r0s24">test/unit/overspecified-async.spec.js</a>
```
overspecified asynchronous resolution method
  :white_check_mark: should fail when multiple methods are used
```
### :white_check_mark: <a id="user-content-r0s25" href="#r0s25">test/unit/parse-query.spec.js</a>
```
parseQuery()
  :white_check_mark: should get queryString and return key-value object
  :white_check_mark: should parse "+" as a space
```
### :white_check_mark: <a id="user-content-r0s26" href="#r0s26">test/unit/plugin-loader.spec.js</a>
```
plugin module class PluginLoader constructor when passed custom plugins
  :white_check_mark: should register the custom plugins
plugin module class PluginLoader constructor when passed ignored plugins
  :white_check_mark: should retain a list of ignored plugins
plugin module class PluginLoader constructor when passed no options
  :white_check_mark: should populate a registry of built-in plugins
plugin module class PluginLoader instance method finalize() when a plugin has no "finalize" function
  :white_check_mark: should return an array of raw implementations
plugin module class PluginLoader instance method finalize() when a plugin has one or more implementations
  :white_check_mark: should omit unused plugins
  :white_check_mark: should return an object map using `optionName` key for each registered plugin
plugin module class PluginLoader instance method finalize() when no plugins have been loaded
  :white_check_mark: should return an empty map
plugin module class PluginLoader instance method load() when called with a falsy value
  :white_check_mark: should return false
plugin module class PluginLoader instance method load() when called with an object containing a recognized plugin
  :white_check_mark: should call the associated validator, if present
  :white_check_mark: should retain the value of any matching property in its mapping
  :white_check_mark: should return true
plugin module class PluginLoader instance method load() when called with an object containing no recognized plugin
  :white_check_mark: should return false
plugin module class PluginLoader instance method load() when passed a falsy or non-object value
  :white_check_mark: should not call a validator
  :white_check_mark: should return false
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export
  :white_check_mark: should call the associated validator
  :white_check_mark: should not call validators whose keys were not found
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export when the value does not pass the associated validator
  :white_check_mark: should throw
plugin module class PluginLoader instance method load() when passed an object value when a key matches a known named export when the value passes the associated validator
  :white_check_mark: should add the implementation to the internal mapping
  :white_check_mark: should not add an implementation of plugins not present
  :white_check_mark: should return true
plugin module class PluginLoader instance method load() when passed an object value when no keys match any known named exports
  :white_check_mark: should return false
plugin module class PluginLoader instance method register() when passed a definition w/o an exportName
  :white_check_mark: should throw
plugin module class PluginLoader instance method register() when passed a falsy parameter
  :white_check_mark: should throw
plugin module class PluginLoader instance method register() when passed a non-object parameter
  :white_check_mark: should throw
plugin module class PluginLoader instance method register() when the plugin export name is already in use
  :white_check_mark: should throw
plugin module class PluginLoader instance method register() when the plugin export name is ignored
  :white_check_mark: should not register the plugin
  :white_check_mark: should not throw
plugin module class PluginLoader instance method register() when the plugin export name is not in use
  :white_check_mark: should not throw
plugin module class PluginLoader static method create()
  :white_check_mark: should return a PluginLoader instance
plugin module global fixtures plugin global setup when an implementation is a function
  :white_check_mark: should pass validation
plugin module global fixtures plugin global setup when an implementation is a primitive
  :white_check_mark: should fail validation
plugin module global fixtures plugin global setup when an implementation is an array of functions
  :white_check_mark: should pass validation
plugin module global fixtures plugin global setup when an implementation is an array of primitives
  :white_check_mark: should fail validation
plugin module global fixtures plugin global teardown when an implementation is a function
  :white_check_mark: should pass validation
plugin module global fixtures plugin global teardown when an implementation is a primitive
  :white_check_mark: should fail validation
plugin module global fixtures plugin global teardown when an implementation is an array of functions
  :white_check_mark: should pass validation
plugin module global fixtures plugin global teardown when an implementation is an array of primitives
  :white_check_mark: should fail validation
plugin module root hooks plugin 🎣 when a loaded impl is finalized
  :white_check_mark: should flatten the implementations
plugin module root hooks plugin 🎣 when impl is a function
  :white_check_mark: should pass validation
plugin module root hooks plugin 🎣 when impl is a primitive
  :white_check_mark: should fail validation
plugin module root hooks plugin 🎣 when impl is an array
  :white_check_mark: should fail validation
plugin module root hooks plugin 🎣 when impl is an object of functions
  :warning: should pass validation
```
### :white_check_mark: <a id="user-content-r0s27" href="#r0s27">test/unit/required-tokens.spec.js</a>
```
using imported describe
  :white_check_mark: using imported it
```
### :white_check_mark: <a id="user-content-r0s28" href="#r0s28">test/unit/root.spec.js</a>
```
root
  :white_check_mark: should be a valid suite
```
### :white_check_mark: <a id="user-content-r0s29" href="#r0s29">test/unit/runnable.spec.js</a>
```
Runnable(title, fn) .run(fn) if async
  :white_check_mark: this.skip() should halt synchronous execution
  :white_check_mark: this.skip() should set runnable to pending
Runnable(title, fn) .run(fn) if timed-out
  :white_check_mark: should ignore call to `done` and not execute callback again
Runnable(title, fn) .run(fn) when .pending
  :white_check_mark: should not invoke the callback
Runnable(title, fn) .run(fn) when async
  :white_check_mark: should allow a timeout of 0
  :white_check_mark: should allow updating the timeout
Runnable(title, fn) .run(fn) when async when an error is passed
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when async when an exception is thrown
  :white_check_mark: should invoke the callback
  :white_check_mark: should not throw its own exception if passed a non-object
Runnable(title, fn) .run(fn) when async when an exception is thrown and is allowed to remain uncaught
  :white_check_mark: throws an error when it is allowed
Runnable(title, fn) .run(fn) when async when done() is invoked with a non-Error object
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when async when done() is invoked with a string
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when async when the callback is invoked several times with an error
  :white_check_mark: should emit a single "error" event
Runnable(title, fn) .run(fn) when async when the callback is invoked several times without an error
  :white_check_mark: should emit a single "error" event
Runnable(title, fn) .run(fn) when async without error
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn is not a function
  :white_check_mark: should throw an error
Runnable(title, fn) .run(fn) when fn returns a non-promise
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is fulfilled with a value
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is fulfilled with no value
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is rejected
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise is rejected without a reason
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when fn returns a promise when the promise takes too long to settle
  :white_check_mark: should throw the timeout error
Runnable(title, fn) .run(fn) when sync when an exception is thrown
  :white_check_mark: should invoke the callback with error
Runnable(title, fn) .run(fn) when sync when an exception is thrown and is allowed to remain uncaught
  :white_check_mark: throws an error when it is allowed
Runnable(title, fn) .run(fn) when sync without error
  :white_check_mark: should invoke the callback
Runnable(title, fn) .run(fn) when timeouts are disabled
  :white_check_mark: should not error with timeout
Runnable(title, fn) .title
  :white_check_mark: should be present
Runnable(title, fn) .titlePath()
  :white_check_mark: returns the concatenation of the parent's title path and runnable's title
Runnable(title, fn) #globals
  :white_check_mark: should allow for whitelisting globals
Runnable(title, fn) #isFailed()
  :white_check_mark: should return `false` if test is pending
  :white_check_mark: should return `true` if test has failed
  :white_check_mark: should return `true` if test has not failed
Runnable(title, fn) #reset
  :white_check_mark: should reset current run state
Runnable(title, fn) #resetTimeout()
  :white_check_mark: should not time out if timeouts disabled after reset
Runnable(title, fn) #retries(n)
  :white_check_mark: should set the number of retries
Runnable(title, fn) #slow(ms)
  :white_check_mark: should not set the slow threshold if the parameter is not passed
  :white_check_mark: should not set the slow threshold if the parameter is undefined
  :white_check_mark: should set the slow threshold
Runnable(title, fn) #slow(ms) when passed a time-formatted string
  :white_check_mark: should convert to ms
Runnable(title, fn) #timeout(ms) when value is equal to lower bound given numeric value
  :white_check_mark: should set the timeout value to disabled
Runnable(title, fn) #timeout(ms) when value is equal to lower bound given string timestamp
  :white_check_mark: should set the timeout value to disabled
Runnable(title, fn) #timeout(ms) when value is equal to upper bound given numeric value
  :white_check_mark: should set the disabled timeout value
Runnable(title, fn) #timeout(ms) when value is less than lower bound
  :white_check_mark: should clamp to lower bound given numeric
  :white_check_mark: should clamp to lower bound given timestamp
Runnable(title, fn) #timeout(ms) when value is out-of-bounds given numeric value
  :white_check_mark: should set the disabled timeout value
Runnable(title, fn) #timeout(ms) when value is within `setTimeout` bounds given numeric value
  :white_check_mark: should set the timeout value
Runnable(title, fn) #timeout(ms) when value is within `setTimeout` bounds given string timestamp
  :white_check_mark: should set the timeout value
Runnable(title, fn) interesting property id
  :white_check_mark: should have a permanent identifier
  :white_check_mark: should have a unique identifier
Runnable(title, fn) static method toValueOrError
  :white_check_mark: should return an Error if parameter is falsy
  :white_check_mark: should return identity if parameter is truthy
Runnable(title, fn) when arity == 0
  :white_check_mark: should be .sync
  :white_check_mark: should not be .async
Runnable(title, fn) when arity >= 1
  :white_check_mark: should be .async
  :white_check_mark: should not be .sync
```
### :white_check_mark: <a id="user-content-r0s30" href="#r0s30">test/unit/runner.spec.js</a>
```
Runner instance method _uncaught() when called with a non-Runner context
  :white_check_mark: should throw
Runner instance method abort()
  :white_check_mark: should return the Runner
  :white_check_mark: should set _abort property to true
Runner instance method allowUncaught()
  :white_check_mark: async - should allow unhandled errors in hooks to propagate through
  :white_check_mark: should allow unhandled errors in sync hooks to propagate through
  :white_check_mark: should allow unhandled errors to propagate through
  :white_check_mark: should not allow unhandled errors in sync hooks to propagate through
Runner instance method checkGlobals(test)
  :white_check_mark: should allow variables that match a wildcard
  :white_check_mark: should emit "fail" when a global beginning with "d" is introduced
  :white_check_mark: should emit "fail" when a new global is introduced
  :white_check_mark: should emit "fail" when a single new disallowed global is introduced after a single extra global is allowed
  :white_check_mark: should not fail when a new common global is introduced
  :white_check_mark: should pluralize the error message when several are introduced
  :white_check_mark: should respect per test whitelisted globals
  :white_check_mark: should respect per test whitelisted globals but still detect other leaks
Runner instance method dispose()
  :white_check_mark: should remove "error" listeners from a test
  :white_check_mark: should remove "uncaughtException" listeners from the process
  :white_check_mark: should remove all listeners from itself
Runner instance method fail()
  :white_check_mark: should emit "fail"
  :white_check_mark: should emit "fail"
  :white_check_mark: should emit a helpful message when failed with a string
  :white_check_mark: should emit a helpful message when failed with an Array
  :white_check_mark: should emit a helpful message when failed with an Object
  :white_check_mark: should emit a the error when failed with an Error instance
  :white_check_mark: should emit the error when failed with an Error-like object
  :white_check_mark: should increment .failures
  :white_check_mark: should increment `Runner#failures`
  :white_check_mark: should not emit "end" if suite bail is not true
  :white_check_mark: should recover if the error stack is not writable
  :white_check_mark: should return and not increment failures when test is pending
  :white_check_mark: should set `Test#state` to "failed"
Runner instance method fail() when Runner has stopped when test is not pending when error is not of the "multiple done" variety
  :white_check_mark: should throw a "fatal" error
Runner instance method fail() when Runner has stopped when test is not pending when error is the "multiple done" variety
  :white_check_mark: should throw the "multiple done" error
Runner instance method globalProps()
  :white_check_mark: should include common non enumerable globals
Runner instance method globals()
  :white_check_mark: should default to the known globals
  :white_check_mark: should white-list globals
Runner instance method grep()
  :white_check_mark: should update the runner.total with number of matched tests
  :white_check_mark: should update the runner.total with number of matched tests when inverted
Runner instance method grepTotal()
  :white_check_mark: should return the total number of matched tests
  :white_check_mark: should return the total number of matched tests when inverted
Runner instance method hook()
  :white_check_mark: should augment hook title with current test title
  :white_check_mark: should execute hooks after failed test if suite bail is true
Runner instance method isParallelMode()
  :white_check_mark: should return false
Runner instance method linkPartialObjects()
  :white_check_mark: should return the Runner
Runner instance method run()
  :white_check_mark: should clean references after a run
  :white_check_mark: should emit "retry" when a retryable test fails
  :white_check_mark: should not clean references after a run when `cleanReferencesAfterRun` is `false`
  :white_check_mark: should not leak `Process.uncaughtException` listeners
  :white_check_mark: should not throw an exception if something emits EVENT_TEST_END with a non-Test object
Runner instance method run() stack traces ginormous
  :white_check_mark: should not hang if overlong error message is multiple lines
  :white_check_mark: should not hang if overlong error message is single line
Runner instance method run() stack traces long
  :white_check_mark: should display the full stack-trace
Runner instance method run() stack traces short
  :white_check_mark: should prettify the stack-trace
Runner instance method runAsync()
  :white_check_mark: should pass through options to Runner#run
  :white_check_mark: should return a Promise with a failure count
Runner instance method runTest()
  :white_check_mark: should return when no tests to run
Runner instance method uncaught() when allow-uncaught is set to true
  :white_check_mark: should propagate error and throw
Runner instance method uncaught() when provided an object argument when argument is a Pending
  :white_check_mark: should ignore argument and return
Runner instance method uncaught() when provided an object argument when argument is an Error
  :white_check_mark: should add the "uncaught" property to the Error
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run
  :white_check_mark: should clear any pending timeouts
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when current Runnable has already failed
  :white_check_mark: should not attempt to fail again
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when current Runnable has been marked pending
  :white_check_mark: should attempt to fail
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable has already passed
  :white_check_mark: should abort the runner without emitting end event
  :white_check_mark: should fail with the current Runnable and the error
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable is still running when the current Runnable is a Hook
  :white_check_mark: should not notify run has ended
  :white_check_mark: should not notify test has ended
  :white_check_mark: should run callback(err) to handle failing hook pattern
Runner instance method uncaught() when provided an object argument when argument is an Error when a Runnable is running or has run when the current Runnable is still running when the current Runnable is a Test
  :white_check_mark: should not notify run has ended
  :white_check_mark: should not notify test has ended
  :white_check_mark: should run callback(err) to handle failing and hooks
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running
  :white_check_mark: should fail with a transient Runnable and the error
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is IDLE
  :white_check_mark: should emit start/end events for the benefit of reporters
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is RUNNING
  :white_check_mark: should not emit start/end events
Runner instance method uncaught() when provided an object argument when argument is an Error when no Runnables are running when Runner is STOPPED
  :white_check_mark: should not emit start/end events, since this presumably would have already happened
  :white_check_mark: should throw
Runner instance method uncaught() when provided an object argument when argument is not an Error
  :white_check_mark: should fail with a transient Runnable and a new Error coerced from the object
Runner instance method workerReporter()
  :white_check_mark: should throw
```
### :white_check_mark: <a id="user-content-r0s31" href="#r0s31">test/unit/suite.spec.js</a>
```
Suite instance method addSuite()
  :white_check_mark: adds the suite to the suites collection
  :white_check_mark: copies the slow value
  :white_check_mark: copies the timeout value
  :white_check_mark: sets the parent on the added Suite
  :white_check_mark: treats suite as pending if its parent is pending
Suite instance method addTest()
  :white_check_mark: adds the test to the tests collection
  :white_check_mark: copies the timeout value
  :white_check_mark: sets the parent on the added test
Suite instance method afterAll() wraps the passed in function in a Hook
  :white_check_mark: adds it to _afterAll
  :white_check_mark: appends title to hook
  :white_check_mark: uses function name if available
Suite instance method afterEach() wraps the passed in function in a Hook
  :white_check_mark: adds it to _afterEach
  :white_check_mark: appends title to hook
  :white_check_mark: uses function name if available
Suite instance method bail() when argument is passed
  :white_check_mark: should return the Suite object
Suite instance method bail() when no argument is passed
  :white_check_mark: should return the bail value
Suite instance method beforeAll() wraps the passed in function in a Hook
  :white_check_mark: adds it to _beforeAll
  :white_check_mark: appends title to hook
  :white_check_mark: uses function name if available
Suite instance method beforeEach() when the suite is pending
  :white_check_mark: should not create a hook
Suite instance method beforeEach() wraps the passed in function in a Hook
  :white_check_mark: adds it to _beforeEach
  :white_check_mark: appends title to hook
  :white_check_mark: uses function name if available
Suite instance method clone()
  :white_check_mark: should clone the Suite, omitting children
Suite instance method constructor
  :white_check_mark: should not throw if the title is a string
  :white_check_mark: should report listened-for deprecated events as deprecated
  :white_check_mark: should throw an error if the title isn't a string
Suite instance method create()
  :white_check_mark: does not create a second root suite
  :white_check_mark: does not denote the root suite by being titleless
Suite instance method eachTest(fn) when there are no nested suites or tests
  :white_check_mark: should return 0
Suite instance method eachTest(fn) when there are several levels of nested suites
  :white_check_mark: should return the number
Suite instance method eachTest(fn) when there are several tests in the suite
  :white_check_mark: should return the number
Suite instance method filterOnly()
  :white_check_mark: should filter out all other tests and suites if a suite has `only`
  :white_check_mark: should filter out all other tests and suites if a test has `only`
Suite instance method fullTitle() when there is a parent
  :white_check_mark: returns the combination of parent's and suite's title
Suite instance method fullTitle() when there is no parent
  :white_check_mark: returns the suite title
Suite instance method hasOnly()
  :white_check_mark: should return false if no suite or test is marked `only`
  :white_check_mark: should return true if a suite has `only`
  :white_check_mark: should return true if a test has `only`
  :white_check_mark: should return true if nested suite has `only`
Suite instance method markOnly()
  :white_check_mark: should call appendOnlySuite on parent
Suite instance method reset()
  :white_check_mark: should forward reset to all hooks
  :white_check_mark: should forward reset to suites and tests
  :white_check_mark: should reset the `delayed` state
Suite instance method slow() when argument is passed
  :white_check_mark: should return the Suite object
Suite instance method slow() when given a string
  :white_check_mark: should parse it
Suite instance method slow() when no argument is passed
  :white_check_mark: should return the slow value
Suite instance method timeout()
  :white_check_mark: should convert a string to milliseconds
Suite instance method timeout() when argument is passed
  :white_check_mark: should return the Suite object
Suite instance method timeout() when no argument is passed
  :white_check_mark: should return the timeout value
Suite instance method titlePath() when there is a parent the parent is not the root suite
  :white_check_mark: returns the concatenation of parent's and suite's title
Suite instance method titlePath() when there is a parent the parent is the root suite
  :white_check_mark: returns the suite title
Suite instance method titlePath() when there is no parent
  :white_check_mark: returns the suite title
Suite instance method total() when there are no nested suites or tests
  :white_check_mark: should return 0
Suite instance method total() when there are several tests in the suite
  :white_check_mark: should return the number
Test initialization
  :white_check_mark: should not throw if the title is a string
  :white_check_mark: should throw an error if the title isn't a string
```
### :white_check_mark: <a id="user-content-r0s32" href="#r0s32">test/unit/test.spec.js</a>
```
Test .clone()
  :white_check_mark: should add/keep the retriedTest value
  :white_check_mark: should copy the currentRetry value
  :white_check_mark: should copy the file value
  :white_check_mark: should copy the globals value
  :white_check_mark: should copy the parent value
  :white_check_mark: should copy the retries value
  :white_check_mark: should copy the slow value
  :white_check_mark: should copy the timeout value
  :white_check_mark: should copy the title
Test .isPending()
  :white_check_mark: should be pending when its parent is pending
  :white_check_mark: should be pending when marked as such
  :white_check_mark: should not be pending by default
Test .markOnly()
  :white_check_mark: should call appendOnlyTest on parent
Test .reset()
  :white_check_mark: should call Runnable.reset
  :white_check_mark: should reset the run state
```
### :white_check_mark: <a id="user-content-r0s33" href="#r0s33">test/unit/throw.spec.js</a>
```
a test that throws non-extensible
  :white_check_mark: should not pass if throwing async and test is async
  :white_check_mark: should not pass if throwing sync and test is async
  :white_check_mark: should not pass if throwing sync and test is sync
a test that throws null
  :white_check_mark: should not pass if throwing async and test is async
  :white_check_mark: should not pass if throwing sync and test is async
  :white_check_mark: should not pass if throwing sync and test is sync
a test that throws undefined
  :white_check_mark: should not pass if throwing async and test is async
  :white_check_mark: should not pass if throwing sync and test is async
  :white_check_mark: should not pass if throwing sync and test is sync
```
### :white_check_mark: <a id="user-content-r0s34" href="#r0s34">test/unit/timeout.spec.js</a>
```
timeouts
  :white_check_mark: should allow overriding per-test
  :white_check_mark: should error on timeout
timeouts disabling
  :white_check_mark: should work with timeout(0)
timeouts disabling suite-level
  :white_check_mark: should work with timeout(0)
timeouts disabling suite-level nested suite
  :white_check_mark: should work with timeout(0)
timeouts disabling using before
  :white_check_mark: should work with timeout(0)
timeouts disabling using beforeEach
  :white_check_mark: should work with timeout(0)
timeouts disabling using timeout(0)
  :white_check_mark: should suppress timeout(4)
```
### :white_check_mark: <a id="user-content-r0s35" href="#r0s35">test/unit/utils.spec.js</a>
```
lib/utils canonicalType()
  :white_check_mark: should recognize various types
lib/utils canonicalType() when toString on null or undefined stringifies window
  :white_check_mark: should recognize null and undefined
lib/utils castArray() when provided a primitive value
  :white_check_mark: should return an array containing the primitive value only
lib/utils castArray() when provided an "arguments" value
  :white_check_mark: should return an array containing the arguments
lib/utils castArray() when provided an array value
  :white_check_mark: should return a copy of the array
lib/utils castArray() when provided an object
  :white_check_mark: should return an array containing the object only
lib/utils castArray() when provided no parameters
  :white_check_mark: should return an empty array
lib/utils castArray() when provided null
  :white_check_mark: should return an array containing a null value only
lib/utils clean()
  :white_check_mark: should format a multi line test indented with spaces
  :white_check_mark: should format a multi line test indented with tabs
  :white_check_mark: should format a single line test function
  :white_check_mark: should format es6 arrow functions
  :white_check_mark: should format es6 arrow functions with implicit return
  :white_check_mark: should format functions saved in windows style - spaces
  :white_check_mark: should format functions saved in windows style - tabs
  :white_check_mark: should handle empty functions
  :white_check_mark: should handle functions with no space between the end and the closing brace
  :white_check_mark: should handle functions with parentheses in the same line
  :white_check_mark: should handle functions with tabs in their declarations
  :white_check_mark: should handle named functions with space after name
  :white_check_mark: should handle named functions without space after name
  :white_check_mark: should handle newlines in the function declaration
  :white_check_mark: should remove space character indentation from the function body
  :white_check_mark: should remove tab character indentation from the function body
  :white_check_mark: should remove the wrapping function declaration
lib/utils createMap()
  :white_check_mark: should add props from all object parameters to the object
  :white_check_mark: should add props to the object
  :white_check_mark: should return an object with a null prototype
lib/utils dQuote()
  :white_check_mark: should return its input as string wrapped in double quotes
lib/utils escape()
  :white_check_mark: replaces invalid xml characters
  :white_check_mark: replaces the usual xml suspects
lib/utils isPromise()
  :white_check_mark: should return false if the object is null
  :white_check_mark: should return false if the value is an object w/o a "then" function
  :white_check_mark: should return false if the value is not an object
  :white_check_mark: should return true if the value is Promise-ish
lib/utils lookupFiles() when run in browser
  :white_check_mark: should throw
lib/utils lookupFiles() when run in Node.js
  :white_check_mark: should delegate to new location of lookupFiles()
  :white_check_mark: should print a deprecation message
lib/utils slug()
  :white_check_mark: should convert the string to lowercase
  :white_check_mark: should convert whitespace to dashes
  :white_check_mark: should disallow consecutive dashes
  :white_check_mark: should strip non-alphanumeric and non-dash characters
lib/utils sQuote()
  :white_check_mark: should return its input as string wrapped in single quotes
lib/utils stringify()
  :white_check_mark: might get confusing
  :white_check_mark: should canonicalize the object
  :white_check_mark: should handle arrays
  :white_check_mark: should handle circular structures in arrays
  :white_check_mark: should handle circular structures in functions
  :white_check_mark: should handle circular structures in objects
  :white_check_mark: should handle empty arrays
  :white_check_mark: should handle empty functions (with no properties)
  :white_check_mark: should handle empty objects
  :white_check_mark: should handle functions
  :white_check_mark: should handle functions w/ properties
  :white_check_mark: should handle length properties that cannot be coerced to a number
  :white_check_mark: should handle non-empty arrays
  :white_check_mark: should handle object without an Object prototype
  :white_check_mark: should handle Symbol
  :white_check_mark: should handle undefined values
  :white_check_mark: should handle various non-undefined, non-null, non-object, non-array, non-date, and non-function values
  :white_check_mark: should not freak out if it sees a primitive twice
  :white_check_mark: should recurse
  :white_check_mark: should return an object representation of a string created with a String constructor
  :white_check_mark: should return Buffer with .toJSON representation
  :white_check_mark: should return Date object with .toISOString() + string prefix
  :white_check_mark: should return invalid Date object with .toString() + string prefix
  :white_check_mark: should stringify dates
lib/utils stringify() #Number
  :white_check_mark: floats and ints
  :white_check_mark: should show the handle -0 situations
  :white_check_mark: should work well with `NaN` and `Infinity`
  :white_check_mark: should work with bigints when possible
lib/utils stringify() canonicalize example
  :white_check_mark: should represent the actual full result
lib/utils type()
  :white_check_mark: should recognize various types
lib/utils type() when toString on null or undefined stringifies window
  :white_check_mark: should recognize null and undefined
lib/utils uniqueID()
  :white_check_mark: should return a non-empty string
```