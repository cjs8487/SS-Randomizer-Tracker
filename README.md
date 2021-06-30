# Skyward Sword Randomizer Tracker
[![Discord](https://discordapp.com/api/guilds/767090759773323264/embed.png?style=shield)](https://discord.gg/evpNKkaaw6)

Web based tracker for the [Skyward Sword Randomizer](https://github.com/lepelog/sslib).

## Instances
[Production](https://cjs8487.github.com/SS-Randomizer-Tracker) - generally the recommended version to use. Usually the most stable and most tested version of the tracker.

### Dev Instances
In addition to the primary production instance, additional development instances are also hosted. These versions are generally less stable than the production instance and are not guaranteed to be bug free.
- [Main Dev](https://devtracker.ssrando.com) - relatively stable instance used for staging and testing upcoming releases for the production instance.
- [Shopsanity](https://shopsanitytracker.ssrando.com) - Contains the newest changes, including full support for shopsanity in the randomizer.

## Usage
When you navigate to the tracker, you will be presented with a UI quite similar to the GUI in the randomizer, where you can fill in your options. These options will make various changes to the tracker, such as filtering out locations that cannot contain progression items, and enabling various special behaviors. ONce you've properly filled in the settings, click *Launch Tracker* to begin tracking.

The *Launch Tracker* button will bring you to the main tracker page. This page is where all the action happens. The left side of the screen is the **Item Tracker**. This is where you mark your items. Items marked here will be considered as part of the trackers logic.

In the center of the tracker is the **Location Tracker**. This is where the randomizer shows you all of the available locations, and info about your current logical state in the seed. Hovering over a check will show what the requirements logically for the check are, and clicking a check will toggle it as checked/unchecked.

The right side of the tracker contains the **Dungeon Tracker** and **Additional Checks**. Clicking the name of  dungeon will mark it as required or unrequired. When unrequired dungeons are empty (race mode), this will also label the dungeons locations as being able to contain progression. You can track small keys and boss keys in the dungeon tracker as well. When entrance randomization is enabled, a spot to mark an entrance as found will also appear. The **Additional Vhecks** section is populated with unrandomized checks (such as individual crystals) or additional things that are required to unlock randomized locations (such as goddess cubes).

The bottom bar of the tracker contains various controls for the entire tracker. Here, you can export your tracker state to save your progress or import a previous state. Note that states exported from previous versions may not always work on newer versions. Additionally, there are **Customization** options that allow you to configure the colors in the tracker to your liking. For content creators, we recommend using *Dark Mode* along with a Chroma Key on your capture window(s) in order to capture the tracker without a background.

## Reporting Issues

Ran into a bug? Bugs found in the production instance should be reported [here on GitHub](https://github.com/cjs8487/SS-Randomizer-Tracker/issues) or in the Discord. Bugs in development instances should only be reported in the Discord. If you're on the production build, it's also possible that the bug is already fixed and the version just hasn't been released, but don't let that stop you from reporting!

## Running From Source
Building and running an instance of the tracker locally requires Node v14 and npm. This process will allow you to run any version of the tracker.

1. Clone the repository
2. Install dependcies
```
npm install
```
3. Build and serve the application
```
npm start
```
4. Access the application at http://localhost:3000

## Shoutouts
- lepelog, peppernicus, azer67 - Creating the randomizer
- Floha, muzugalium, Extodasher, CapitanBublo - Fellow devs on the tracker
- wooferzfg - Creating the tracker for The Wind Waker Randomizer, from which much of the logic subsystem in this tracker is derrived
