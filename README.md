**WIP**

# Test Check Report

Goal of this project is to create [Github Action](https://github.com/features/actions)
that could presents test results from popular testing frameworks as Github check run with code annotation in places where test failed.

Support for following test reports are planned for initial release:
- [ ] dart-json: [`dart test --file-reporter=\"json:test-results.json`](https://pub.dev/packages/test)
- [ ] dotnet-trx: [`dotnet test --logger "trx;LogFileName=test-results.trx"`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#examples)
- [ ] flutter-machine: [`flutter test --machine > test-results.json`](https://flutter.dev/docs/cookbook/testing/unit/introduction)
- [ ] jest-junit: [`jest --ci --reporters=jest-junit`](https://github.com/jest-community/jest-junit#readme)
