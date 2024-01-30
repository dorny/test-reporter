![Tests failed](https://img.shields.io/badge/tests-36%20passed%2C%204%20failed%2C%2020%20skipped-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/external/java/playwright-report.xml</a>
**60** tests were completed in **59s** with **36** passed, **4** failed and **20** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[auth.setup.ts](#r0s0)|6✅|||7s|
|[tests/analyze/load-video.spec.ts](#r0s1)|||3⚪|0ms|
|[tests/analyze/seamless-video-playback.spec.ts](#r0s2)|||9⚪|12ms|
|[tests/app.spec.ts](#r0s3)|||1⚪|0ms|
|[tests/grid.spec.ts](#r0s4)|18✅|4❌|3⚪|116s|
|[tests/onboarding.spec.ts](#r0s5)|||4⚪|0ms|
|[tests/statsEngine.spec.ts](#r0s6)|12✅|||36s|
### ✅ <a id="user-content-r0s0" href="#r0s0">auth.setup.ts</a>
```
✅ authenticate as classic admin
✅ authenticate as basketball admin
✅ authenticate as wrestling admin
✅ authenticate as onboarding admin 1
✅ authenticate as onboarding admin 3
✅ authenticate as coachAdmin
```
### ✅ <a id="user-content-r0s1" href="#r0s1">tests/analyze/load-video.spec.ts</a>
```
```
### ✅ <a id="user-content-r0s2" href="#r0s2">tests/analyze/seamless-video-playback.spec.ts</a>
```
```
### ✅ <a id="user-content-r0s3" href="#r0s3">tests/app.spec.ts</a>
```
```
### ❌ <a id="user-content-r0s4" href="#r0s4">tests/grid.spec.ts</a>
```
✅ Grid › Mobile Web › Athlete › should not be able to edit data
✅ Grid › Mobile Web › Admin or Coach › should be able to edit data
✅ Grid › Field Sets › should update displayed grid columns after editing
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Scout team Points
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Opponent Rebounds
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Steals
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Rebounds
✅ Grid › Basketball Navigation Module › should display clips for opportunities in Period when filtered by Period
✅ Grid › Basketball Navigation Module › should display clips for opportunities that end in a turnover when filtered by Turnovers
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by 3FG Attempts
❌ Grid › Column Sorting › AmFb Column Sets › should display correct data when sorting by OFF FORM column
	[chrome] › tests/grid.spec.ts:202:11 › Grid › Column Sorting › AmFb Column Sets › should display correct data when sorting by OFF FORM column › Sort grid by OFF FORM in ascending order
❌ Grid › Data Entry › should open select dropdown options when pressing Spacebar in grid cell
	[chrome] › tests/grid.spec.ts:254:9 › Grid › Data Entry › should open select dropdown options when pressing Spacebar in grid cell › double click into column OFF FORM clip number 3
❌ Grid › Data Entry › should be able to use keyboard to navigate horizontal grid and enter data
	[chrome] › tests/grid.spec.ts:261:9 › Grid › Data Entry › should be able to use keyboard to navigate horizontal grid and enter data › double click into column OFF FORM clip number 3
❌ Grid › Data Entry › should be able to use keyboard to navigate vertical grid and enter data
	[chrome] › tests/grid.spec.ts:277:9 › Grid › Data Entry › should be able to use keyboard to navigate vertical grid and enter data › Select BUNCH from column OFF FORM list
✅ Grid › Data Entry › should display error state for input with invalid data
✅ Grid › Data Entry › confirm auto-fill works correctly
✅ Grid › Tagged data › Wrestling › should display correct wrestler names tagged from Assist
✅ Grid › Tagged data › Wrestling › should display correct score and points tagged from Assist
✅ Grid › Tagged data › Wrestling › should display correct Period tagged from Assist
✅ Grid › Tagged data › Wrestling › should display correct Key Moments tagged from Assist
✅ Grid › Tagged data › Wrestling › should edit cells using the team roster
✅ Grid › Tagged data › Wrestling › should change key moment type and update grid data
```
### ✅ <a id="user-content-r0s5" href="#r0s5">tests/onboarding.spec.ts</a>
```
```
### ✅ <a id="user-content-r0s6" href="#r0s6">tests/statsEngine.spec.ts</a>
```
✅ Mock stats engine for speed › Filter by Offense in Phase card
✅ Mock stats engine for speed › Filter by defense in phase card
✅ Mock stats engine for speed › Key stats card stats appear as expected when opponent is selected
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - FG percentage for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - 2FG Makes for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - 2FG Attempts for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - 3FG Makes for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - 3FG Attempts for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - Off. Rebounds for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - Def. Rebounds for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - Assists for Team in Context
✅ Mock stats engine for speed › Selecting a Key Stats filter updates both the Navigation Module and Insights Module cards - Steal for Team in Context
```