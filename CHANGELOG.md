# 1.0.0
## Added
- Location Tracker
  - Displays all areas
  - Clicking an area opens the list of checks in that area
  - Hovering over a location will display the requirements to reach that check
  - Logic is pulled live from the randomizer
  - In logic locations are green
  - Out of logic locations are red
- Item Tracker
  - Mark your items in the item tracker to see what checks you can reach

# 1.1.0
## Added
- Counters
  - Area Counters
    - Each area in the location tracker now displays information about the number of checks
    - Areas show Available Checks/Total Checks
  - Global Counters
    - Added a counter widget that shows counter information for the entire tracker
    - Shows the number of locations checks, the total number of remaining locaitons, and the number of in logic locations
- Dungeon Tracker
  - Track Small Keys and Boss Keys for each dungeon

## Bug Fixes
- Fixed a bug with layouts
- Fixed an issue that prevented mobile layouts from rendering correctly

# 1.1.1
## Bug Fixes
- Fixed an issue causing some locations to not group together correctly

# 1.2.0
## Added
- New Items
  - Cawlin's Letter
  - Horned Colossus Beetle
  - Baby Rattle
  - Gratitude Crystals
  - Lanayru Caves Small Key
  - Ancient Sea Chart
  - Spirl Charge (BIrd Statuette)
  - Adventure Pouch
  - Empty Bottles
- Full logic support for new items across all tracker elements
- Import and export your current tracker state to save your progress

## Changed
- Moved the dungeon tracker to the right side of the tracker

## Bug Fixes
- Fixed a minor bug impacting the visual display of logic
- Fixed a logical error which could cause visual location logic to not update properly

## Known Bugs
- Certain resize actions (specifically using the maximize button) do not cause the layout to update correctly for some components. Clicking any other item will fix all misaligned items
- At certain resolutions, sidequest items do not appear in the correct locations
- At certain resolutions, the transition between 0, 5, 10, and 15 gratitude crystals causes an exaggerated change to the placement calculation
- At certain resolutions, parts of Sky Keep are cut off within the dungeon tracker

# 1.3.0
## Added
- Goddess Cube Tracking
  - Goddess Cubes are now tracked separately in their own panel
  - Goddess cubes display like all other locations in the tracker (green when
in logic, red when out) and can be marked like normal locations
  - Marking a cube puts the chest it opens fully into logic (assuming you can
reach the chest)
  - Chests which can be reached, and their cube can also be reached, but
the cube has not been marked are considered to be semi-in-logic (more
on that later)
- Options
  - When launching the tracker, you will now be presented with a page where
you can select the correct options
  - Options will filter out locations where progress items cannot appear
automatically
  - Options also integrate correctly with logic for locations where options
have an impact (I.e. Thunderhead)
  - Items that you start with are automatically tracked when appropriate for
the given options
    - Swordless off starts with Goddess Sword
    - 3 starting tablets starts with all 3 tablets (all others must be entered
manually because they are selected randomly)
- Added a color picker to change the background color of the tracker (we
recommend aqua for chroma keying)
- New logic states
  - Rendering of locations and determination of in/out of logic state has been
updated to allow for more than two states
  - Currently, there are three used states: in-logic (green), semi-logic (orange), out-logic (red).
    - In logic means the location can be reached with no additional work
    - Semi-logic means that the location can be reached, but something
required to get there is missing. This only applies to items where
the location is restricted. Currently this state only exists for
Goddess Chests, but will eventually be expanded upon (and likely
sub divided further)
    - Out-logic means that the location cannot be reached without the
use of glitches given the currently tracked items
  - This change gives us incredible flexibility in creating dynamic and useful
additional display information within the tracker
  - Only locations that are fully in logic are considered for counters
## Bug Fixes
- Fixed a bug that caused the slingshot to render in the wrong place when
unmarked
- Fixed the positioning of the following items:
  - Practice Sword
  - Goddess Sword
  - Goddess Longsword
  - Goddess Whitesword
  - Slingshot
- Fixed a bug that caused logic tooltips to contain duplicate entries
- Fixed a bug that caused logic tooltips to contain empty entries
- Fixed Sky Keep in the Dungeon Tracker getting cut off at certain resolutions
- Fixed a bug that could cause the Item Tracker to shift left, possibly partially
offscreen
- Fixed a bug that caused locations to be improperly considered out of logic
during the initialization of the location list

## Changes
- Shifted the entire Item Tracker to the right slightly. How far depends on resolution
- Adjusted the padding on the Location tracker. Fewer (if any) locations should
overflow horizontally
- When appropriate, logic will have minor simplifications applied to it
- Gratitude crystal logical requirements are now greatly simplified

## Known Bugs
- Certain resize actions (specifically using the maximize button) do not cause the layout to update correctly for some components. Clicking any other item will fix
all misaligned items
- At certain resolutions, sidequest items do not appear in the correct locations
- At certain resolutions, the transition between 0, 5, 10, and 15 gratitude crystals causes an exaggerated change to the placement calculation
- At certain resolutions, some item placements are slightly off

# 1.3.1
## Bug Fixes
- Fixed a bug that caused the Sailcloth to not be given as a starting item
- Fixed a bug that prevented option logic from being properly simplified

# 1.3.2
## Added
- More robust customization
  - Customization now has a dedicated dialog that can be accessed any time
  - Choose from preset color schemes, or create your own
    - Currently available are traditional light and dark themes, which will be tweaked further in coming updates
  - Choose colors for the following parts of the tracker
    - Background
    - Normal text
    - All three current logic states for locations (in logic, out of logic, and semi-logic)
    - Required and unrequired dungeons
  - All customization elements are saved when you export your progress
- Mark your Required Dungeons
  - Clicking the name of a dungeon will mark it as required
  - Required Dungeons are marked in a separate color
  - Dungeons (required and unrequired) will automatically be marked as completed when their final check is marked in the tracker
  - The TMS check is properly updated with the required dungeons
- Entrance Rando Support
  - Mark dungeons once you have found their entrance
  - Full logic support
  - Cannot currently track which entrances lead to each other

## Changes
- Goddess Cube Tracker now scrolls
- TMS location supports semi-logic when in Go Mode (currently keys are required)
- Changed several minor styles across the tracker
- Moved the Import/Export Buttons
- Updated styling on the Options page

## Bug Fixes
- Sky Keep should no longer go offscreen at most resolutions
- Fixed an issue that caused the Silent Realms and Lanayru options to be linked on the Options page
- Fixed several minor styling issues across the tracker

# Dev 2.0.0 v1 RC1
## Changes
- Complete rework of the logic system
  - Full simplification of all logic expressions for displays
  - Performance improvements to the logic calculator
- Gratitude crystals are now removed from the main location tracker and added to the cube tracker section (renamed to the Extra Checks officially)
  - Checking individual crystal locations will increment the coutner
- Extra Checks section is now split by area

# Dev 2.0.0 v2 RC1
## Changes
- Many internal changes
- Minor performance improvements
- Code readability improvements
- Added additional customization for completed checks
- Added acknowledgements to the options page

# Dev 2.0.0 v3 RC1
## Changes
- Dungeon Tracker
  - Small Keys, Boss Keys, and Entrance Markers are now a single row in the tracker
  - Added images of the dungeon bosses to the dungeon trackers
    - Clicking the boss opens the dngeon in the location tracker
  - Added Silent Realms to the Dungeon Tracker
- Location Tracker
  - Removed Dungeons from the area list
  - Removed Silent Realms from the area list

# Dev 2.0.0 v3 RC2
## Added
- Hint markers are now included with the Silent Realms for tracking if they are required

## Changes
- Separated the Area list from the location list

# Dev 2.0.0 v3 RC3
##
- Added a confirmation dialog when trying to leave the tracker page
## Bug Fixes
- Fixed a bug that caused the Ruby Tablet to severely overlap the Emerald Tablet when unchecked
- Fixed several bugs in counters

# Dev 2.0.0 v3 RC4
## Bug Fixes
- Fixed a bug that caused counters to become desynced when checking individual crsyals
- Fixed a bug that cuased counters to become desynced when considering Goddess Cube logic
- Fixed a bug that caused TMS to never be considered in logic for coutners
- Fixed a bug that caused counters to become desynced when changing required dungeons
- Minor UI adjustments to help with the bottom bar restricting the visibility of some checks
- Minor performance improvements with counter calculations

# 2.1.0
## Additions
- Right clicking an item now subtracts one from its count

## Changes
- Space is now the only key that interacts with the tracker

## Bug Fixes
- Fixed multiple bugs that caused the application to crash when loading an exported state file
- Fixed a bug that prevented LMF and AC from being marked as completed under certain conditions
- Fixed a bug that could prevent Sky Keep from being marked as completed
- Fixed a bug that could cause Lanayru goddess cubes to disappear
- Fixed a typo in the contributors

# 2.2.0
## Additions
- Added a simple list based entrance tracker that has no logical impact
- Added a reset button to control bar that resets the entire tracker state back to the supplied permalink
- Grid layout option

## Bug Fixes
- Fixed a bug that caused the dungeon tracker items to be laid out incorrectly at some resolutions and specific settings

# 2.3.0
## Additions
- Added an in-tracker hint tracking system
  - Right clicking a location now brings up a specialized menu where you can control the hints
  - Hinted items on locations are rendered next to the locations name in the tracker
  - Locations can also be marked as checked or unchecked from the menu