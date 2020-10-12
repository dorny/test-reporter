**WIP**

# Test Check Report

Goal of this project is to create [Github Action](https://github.com/features/actions)
that could presents test results from popular testing frameworks as Github check run with code annotation in places where test failed.

Support for following test reports are planned for initial release:
- [ ] dotnet-trx: [`dotnet test --logger trx`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#examples)
- [ ] flutter-machine: `flutter test --machine`
- [ ] jest-junit: [`jest --ci --reporters=jest-junit`](https://github.com/jest-community/jest-junit#readme)
