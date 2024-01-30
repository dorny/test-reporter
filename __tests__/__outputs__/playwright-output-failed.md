![Tests failed](https://img.shields.io/badge/tests-36%20passed%2C%204%20failed%2C%2020%20skipped-critical)
## ❌ <a id="user-content-r0" href="#r0">fixtures/external/java/playwright-report.xml</a>
**60** tests were completed in **59s** with **36** passed, **4** failed and **20** skipped.
|Test suite|Passed|Failed|Skipped|Time|
|:---|---:|---:|---:|---:|
|[tests/grid.spec.ts](#r0s0)|18✅|4❌|3⚪|116s|
### ❌ <a id="user-content-r0s0" href="#r0s0">tests/grid.spec.ts</a>
```
✅ Grid › Mobile Web › Athlete › should not be able to edit data
✅ Grid › Mobile Web › Admin or Coach › should be able to edit data
✅ Grid › Field Sets › should update displayed grid columns after editing
⚪ Grid › Field Sets › should update displayed clip preview fields after editing
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Scout team Points
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Opponent Rebounds
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Steals
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by Rebounds
✅ Grid › Basketball Navigation Module › should display clips for opportunities in Period when filtered by Period
✅ Grid › Basketball Navigation Module › should display clips for opportunities that end in a turnover when filtered by Turnovers
✅ Grid › Basketball Navigation Module › should display correct moment data when filtered by 3FG Attempts
❌ Grid › Column Sorting › AmFb Column Sets › should display correct data when sorting by OFF FORM column
	[chrome] › tests/grid.spec.ts:202:11 › Grid › Column Sorting › AmFb Column Sets › should display correct data when sorting by OFF FORM column › Sort grid by OFF FORM in ascending order
⚪ Grid › Column Sorting › Wrestling Column Sets › should display correct data when sorting by Period column
⚪ Grid › Quick Editor › should be able to edit data from quick editor as an admin or coach
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