# Unreal C++ Automation Test Support

This module supports Unreal C++ Automation Tests which are [simple tests declared like this]:

```c++
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FAplusBSimpleTest, "AutotestingExampleProject.AplusB.SimpleTest.AplusB", 
    EAutomationTestFlags::SmokeFilter | EAutomationTestFlags::ApplicationContextMask)
```

or [data driven tests declared like this]:

```c++
IMPLEMENT_COMPLEX_AUTOMATION_TEST(ItemListTest, "AdventureGame.Items.ItemListTest",
    EAutomationTestFlags::EditorContext | EAutomationTestFlags::EngineFilter)
```

or [spec tests declared like this]:

```c++
BEGIN_DEFINE_SPEC(MyCoolFeatureTest, "Private.Tests.MyCoolFeatureTest",
                  EAutomationTestFlags::EditorContext | EAutomationTestFlags::EngineFilter)

END_DEFINE_SPEC(MyCoolFeatureTest)

void MyCoolFeatureTest::Define()
{
	Describe("MyCoolFeature", [this]()
	{
			It("Some behavior", [this]()
			{
				TestEqual(TEXT("Behaviour is correct"), MyCoolFeature().DoThing(), 42);
			});
		};
	});
}
```

It expects a JSON test report in the [format specified by Epic Games on their Unreal Engine documentation
website]. To get a report like that when you have the above tests in place use a command with `-ReportExportPath`
like this:

```bash
# Outputs results in JSON format - Linux version shown
/home/ue4/UnrealEngine/Engine/Binaries/Linux/UnrealEditor "${PROJECT_DIR}/${PROJECT_NAME}.uproject" \
   -execcmds="Automation RunTests SomeSuite.SomeGroup.ATest+SomeSuite.SomeGroup.AnotherTest;Quit" \
   -stdout -unattended -NOSPLASH -AllowStdOutLogVerbosity -NullRHI \
   -ReportExportPath="${PROJECT_DIR}/Reports" \
   -AbsLog="${PROJECT_DIR}/Logs" \
   -TestExit="Automation Test Queue Empty"
```

The report will be  `Reports/index.json`.

## Use in GitHub Actions

Try using this with the official Unreal Engine Docker containers, rather than checking out and
building Unreal Engine source code in tests.

See [this Github Actions YAML file] for an example.

[this Github Actions YAML file]: https://github.com/sarah-j-smith/AdventureGameTemplate/blob/main/.github/workflows/unreal-unit-tests.yml

[format specified by Epic Games on their Unreal Engine documentation website]: https://dev.epicgames.com/documentation/unreal-engine/review-test-results-in-unreal-engine#json

## Suite, Group and Test Name Discovery

This parser attempts to derive a suite name, any group names and test names from the test output 
JSON file entries field `fullTestPath`. Look at a typical test report to see how this naming works.

The Unreal Engine [editor UI presents these tests in a tree-list format]. This tree format of tests
is defined by dot-separated, free-text defined by a method on the Automation Test's base class called
`GetBeautifiedTestName`. Suites, groups and names are derived on a _best effort_ basis.

## Mapping Test Errors & Failures to Filenames

* Not supported

Unreal Engine JSON gets this data from the Automation framework:

* `fullTestPath: 'Project.Functional Tests.SomeGroup.Test1'`

These dot-separated "paths" bear no fixed relation to the file system. When errors are reported
these are shown with the `fullTestPath` which developers can search-in-code to find.

In the case of error events, a `filename` is recorded, but research to date has shown it bears no 
relation to the file containing the test failure. 

The `unreal-json` parser ignores the `parseErrors` argument and prints an informational message.

## Unreal Testing Landscape

There are [many Unreal Engine testing approaches] and more are being added every year.

See the [Unreal Engine test overview documentation] which details 8-9 approaches:

> _The Automation Test Framework is built in C++ and designed to function directly
in Unreal Engine's core modules. Because it uses Unreal Engine itself, it is not ideal for pure unit testing._

_See [Low-Level Tests for more information on pure unit testing]._

[many Unreal Engine testing approaches]: https://andrewfray.wordpress.com/2025/04/09/the-topography-of-unreal-test-automation-in-2025/
[Low-Level Tests for more information on pure unit testing]: https://dev.epicgames.com/documentation/unreal-engine/low-level-tests-in-unreal-engine
[Unreal Engine test overview documentation]: https://dev.epicgames.com/documentation/unreal-engine/automation-test-framework-in-unreal-engine#overview

At present the only tests known to work are the Automation `SIMPLE` and `COMPLEX` ones shown above. 

* _Automation C++ [Spec Tests]_
* [Unreal Spec tests]
* Unreal Low-Level tests
* Low-Level BDD and other tests

### Test Formats Not Supported

Low-Level tests use _Catch2_ testing framework under the hood. That can already use 
[many different report formats]. Try those if using Low-Level tests.

[many different report formats]: https://github.com/catchorg/Catch2/blob/devel/docs/reporters.md#top

These tests use C2 under the hood, and use macros like this:

```c++
TEST_CASE_NAMED(Editor_DataStorage_ScratchBuffer_MultiThreaded_Tests, "Editor::DataStorage::Scratch Buffer - MT (FScratchBuffer)", "[ApplicationContextMask][EngineFilter]")
```

This creates a `fullTestPath` entry in the Automation logs of the Unreal Test like: `Editor.DataStorage.Scratch Buffer - MT (FScratchBuffer)`

### Future Plans

Low-level, BDD and TDD may not be widely supported by other tooling, for example
in Rider's test reporters it is either [not supported or only recently supported].

Once those stabilise spec tests have great promise and would be good to make supported.

----
[spec tests declared like this]: https://dev.epicgames.com/documentation/unreal-engine/automation-spec-in-unreal-engine#howtosetupaspec
[simple tests declared like this]: https://github.com/test544/UE5_AutotestsExample/blob/main/AplusB.Test.cpp
[data driven tests declared like this]: https://github.com/sarah-j-smith/AdventureGameTemplate/blob/main/Plugins/AdventureTools/Source/AdventureCommon/Private/__TESTS__/GameUtilsTests.cpp#L13
[editor UI presents these tests in a tree-list format]: https://dev.epicgames.com/documentation/unreal-engine/automation-system-user-guide-in-unreal-engine
[Unreal Spec tests]: https://github.com/test544/UE5_AutotestsExample/blob/main/AplusB.Spec.cpp
[not supported or only recently supported]: https://youtrack.jetbrains.com/projects/RIDER/issues/RIDER-110897/Support-low-level-tests-in-Unreal-Engine
