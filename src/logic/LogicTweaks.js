import _ from 'lodash'
import goddessCubes from '../data/goddessCubes.json'
import crystalMacros from '../data/gratitudeCrystalMacros.json';
import crystalLocations from '../data/crystals.json';

class LogicTweaks {

    static applyTweaks(logic, options) {
        LogicTweaks.createDungeonMacros(logic.macros, options.entrancesRandomized)
        LogicTweaks.tweakTMSAndRequiredDungeons(logic.macros);
        LogicTweaks.tweakGoddessChestRequirements(logic.macros);
        LogicTweaks.tweakGratitudeCrstalRequirements(logic.macros);
        LogicTweaks.removeCrystalLocations(logic.locations)
    }

    static createDungeonMacros(macros, entrancesRandomized) {
        if (entrancesRandomized === "None") {
            //no entrance randomizer, sub default macros in
            macros.setMacro("Can Access Skyview", "Can Access Dungeon Entrance In Deep Woods");
            macros.setMacro("Can Access Earth Temple", "Can Access Dungeon Entrance In Eldin Volcano");
            macros.setMacro("Can Access Lanayru Mining Facility", "Can Access Dungeon Entrance In Lanayru Desert");
            macros.setMacro("Can Access Ancient Cistern", "Can Access Dungeon Entrance In Lake Floria");
            macros.setMacro("Can Access Sandship", "Can Access Dungeon Entrance In Sand Sea");
            macros.setMacro("Can Access Fire Sanctuary", "Can Access Dungeon Entrance In Volcano Summit");
            macros.setMacro("Can Access Skykeep", "Can Access Dungeon Entrance On Skyloft");
        }
        else {
            macros.setMacro("Can Access Skyview", "Entered Skyview");
            macros.setMacro("Can Access Earth Temple", "Entered Earth Temple");
            macros.setMacro("Can Access Lanayru Mining Facility", "Entered Lanayru Mining Facility");
            macros.setMacro("Can Access Ancient Cistern", "Entered Ancient Cistern");
            macros.setMacro("Can Access Sandship", "Entered Sandship");
            macros.setMacro("Can Access Fire Sanctuary", "Entered Fire Sanctuary");
            if (entrancesRandomized === "Dungeons") {
                macros.setMacro("Can Access Skykeep", "Can Access Dungeon Entrance On Skyloft");
            } else {
                macros.setMacro("Can Access Skykeep", "Skykeep Entered")
            }
        }
    }

    static tweakTMSAndRequiredDungeons(macros) {
        macros.setMacro("Can Access Past", "Goddess Harp & Master Sword & Can Complete Required Dungeons");
        macros.setMacro("Can Complet Required Dungeons", "Nothing")
    }

    static tweakGoddessChestRequirements(macros) {
        _.forEach(goddessCubes, (cube, macro) => {
            macros.removeMacro(macro);
        });
    }

    static tweakGratitudeCrstalRequirements(macros) {
        _.forEach(crystalMacros, (macro) => {
            const macroSplit = macro.split(/\s+/);
            const newMacro = `5 ${macroSplit[1]} ${macroSplit[2].slice(0, -1)} x${macroSplit[0] / 5}`
            macros.setMacro(macro, newMacro);
        });
    }

    static removeCrystalLocations(locations) {
        _.forEach(crystalLocations, (crystal, macro) => {
            console.log(`${crystal.area} - ${macro}`);
            locations.deleteLocation(crystal.area, macro)
        });
    }
}

export default LogicTweaks;