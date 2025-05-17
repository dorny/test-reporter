# Changelog

## 2.1.0
* Feature: Add summary title https://github.com/dorny/test-reporter/pull/568
* Feature: Add Golang test parser https://github.com/dorny/test-reporter/pull/571
* Increase step summary limit to 1MiB https://github.com/dorny/test-reporter/pull/581
* Fix for empty TRX TestDefinitions https://github.com/dorny/test-reporter/pull/582
* Fix input description for list options https://github.com/dorny/test-reporter/pull/572
* Update npm packages https://github.com/dorny/test-reporter/pull/583

## 2.0.0
* Parse JUnit report with detailed message in failure https://github.com/dorny/test-reporter/pull/559
* Support displaying test results in markdown using GitHub Actions Job Summaries https://github.com/dorny/test-reporter/pull/383

## 1.9.1
* Fix problematic retransmission of authentication token https://github.com/dorny/test-reporter/pull/438
* Report correct number of tests in Dart https://github.com/dorny/test-reporter/pull/426
* Number of completed tests mismatches passed/failed https://github.com/dorny/test-reporter/issues/319

## 1.9.0
* Add support for Rspec (Ruby) https://github.com/dorny/test-reporter/pull/398

## 1.8.0
* Add `SwiftXunitParser` class based on `JavaJunitParser` for `swift-xunit` reporter https://github.com/dorny/test-reporter/pull/317
* Use NodeJS 18 LTS as default runtime https://github.com/dorny/test-reporter/pull/332
* Escape `<>` characters in suite name https://github.com/dorny/test-reporter/pull/236
* Update actions runtime to Node20 https://github.com/dorny/test-reporter/pull/315
* Update check title and remove icon https://github.com/dorny/test-reporter/pull/144

## 1.7.0
* Fix #199: Use ✅ instead of ✔️ for better cross platform look by @petrdvorak in https://github.com/dorny/test-reporter/pull/200
* Verify content of dist/ folder matches build output by @dorny in https://github.com/dorny/test-reporter/pull/207
* Gracefully handle empty nested testsuite elements for JUnit. by @rvdlaarschot in https://github.com/dorny/test-reporter/pull/193
* Gracefully handle empty failure tags by @haudren-woven in https://github.com/dorny/test-reporter/pull/213
* Fix #208 - java-junit: show annotations on PR changed files by @atsu85 in https://github.com/dorny/test-reporter/pull/209
* Only report failure if fail-on-error is set by @trond-snekvik in https://github.com/dorny/test-reporter/pull/214
* Improve clarity on configuring for forkable repos by @abelbraaksma in https://github.com/dorny/test-reporter/pull/211
* Suppress "Processing test results from" log by @vasanthdharmaraj in https://github.com/dorny/test-reporter/pull/179
* Skip listing of files if error parsing is disabled by @dorny in https://github.com/dorny/test-reporter/pull/216
* Correct typo in docs by @tangowithfoxtrot in https://github.com/dorny/test-reporter/pull/254
* update dependencies by @j-catania in https://github.com/dorny/test-reporter/pull/269
* Add permissions to example yml files by @TurnrDev in https://github.com/dorny/test-reporter/pull/263
* add feature fail-on-empty by @gdams in https://github.com/dorny/test-reporter/pull/243
* Add dependabot configuration by @yeikel in https://github.com/dorny/test-reporter/pull/228
* Bump ws from 7.3.1 to 7.5.9 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/265
* Bump actions/checkout from 2 to 4 by @dependabot in https://github.com/dorny/test-reporter/pull/279
* Add new output for url url html by @luisito666 in https://github.com/dorny/test-reporter/pull/242
* Update README.md by @IanMoroney in https://github.com/dorny/test-reporter/pull/158
* Update jest-Junit part of Readme by @ryancasburn-KAI in https://github.com/dorny/test-reporter/pull/176
* fix: default-valued fields are not mandatory by @TomerFi in https://github.com/dorny/test-reporter/pull/172
* Bump ansi-regex from 4.1.0 to 4.1.1 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/278
* Bump decode-uri-component from 0.2.0 to 0.2.2 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/276
* Bump minimist from 1.2.5 to 1.2.8 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/275
* Bump qs from 6.5.2 to 6.5.3 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/272
* Bump json5 from 2.1.3 to 2.2.3 in /reports/jest by @dependabot in https://github.com/dorny/test-reporter/pull/271
* Bump ansi-regex from 3.0.0 to 3.0.1 in /reports/mocha by @dependabot in https://github.com/dorny/test-reporter/pull/270
* declare 'url' and 'url_html' as action outputs by @micha-one in https://github.com/dorny/test-reporter/pull/287
* Avoid split on undefined by @cazou in https://github.com/dorny/test-reporter/pull/258

## v1.6.0
- [Update to node16 + recent versions of core and exec packages](https://github.com/dorny/test-reporter/pull/203)
- [Update all dependencies to latest versions](https://github.com/dorny/test-reporter/pull/186)
- [Fix tests on non us-EN local env](https://github.com/dorny/test-reporter/pull/185)

## v1.5.0
- [Add option to convert backslashes in path pattern to forward slashes](https://github.com/dorny/test-reporter/pull/128)
- [Add option to generate only the summary from processed test results files](https://github.com/dorny/test-reporter/pull/123)

## v1.4.3
- [Patch java-junit to handle missing time field](https://github.com/dorny/test-reporter/pull/115)
- [Fix dart-json parsing broken by print message](https://github.com/dorny/test-reporter/pull/114)

## v1.4.2
- [Fix dotnet-trx parsing of passed tests with non-empty error info](https://github.com/dorny/test-reporter/commit/43d89d5ee509bcef7bd0287aacc0c4a4fb9c1657)

## v1.4.1
- [Fix dotnet-trx parsing of tests with custom display names](https://github.com/dorny/test-reporter/pull/105)

## v1.4.0
- [Add support for mocha-json](https://github.com/dorny/test-reporter/pull/90)
- [Use full URL to fix navigation from summary to suite details](https://github.com/dorny/test-reporter/pull/89)
- [New report rendering with code blocks instead of tables](https://github.com/dorny/test-reporter/pull/88)
- [Improve test error messages from flutter](https://github.com/dorny/test-reporter/pull/87)

## v1.3.1
- [Fix: parsing of .NET duration string without milliseconds](https://github.com/dorny/test-reporter/pull/84)
- [Fix: dart-json - remove group name from test case names](https://github.com/dorny/test-reporter/pull/85)
- [Fix: net-trx parser crashing on missing duration attribute](https://github.com/dorny/test-reporter/pull/86)

## v1.3.0
- [Add support for java-junit](https://github.com/dorny/test-reporter/pull/80)
- [Fix: Handle test reports with no test cases](https://github.com/dorny/test-reporter/pull/70)
- [Fix: Reduce number of API calls to get list of files tracked by GitHub](https://github.com/dorny/test-reporter/pull/69)

## v1.2.0
- [Set `listTests` and `listSuites` to lower detail if report is too big](https://github.com/dorny/test-reporter/pull/60)

## v1.1.0
- [Support public repo PR workflow](https://github.com/dorny/test-reporter/pull/56)

## v1.0.0
Supported languages / frameworks:
- .NET / xUnit / NUnit / MSTest
- Dart / test
- Flutter / test
- JavaScript / JEST
