import _ from 'lodash';
import goddessCubes from '../data/goddessCubes.json';
import crystalMacros from '../data/gratitudeCrystalMacros.json';
import crystalLocations from '../data/crystals.json';
import LogicHelper from './LogicHelper';

class LogicTweaks {
    static applyTweaks(logic, settings) {
        LogicTweaks.createDungeonMacros(logic.macros, settings.getOption('Randomize Entrances'));
        LogicTweaks.tweakTMSAndRequiredDungeons(logic.macros);
        LogicTweaks.tweakGoddessChestRequirements(logic.macros);
        LogicTweaks.tweakGratitudeCrstalRequirements(logic.requirements);
        LogicTweaks.removeCrystalLocations(logic.locations);
        LogicTweaks.tweakSoTH(logic.locations);
    }

    static createDungeonMacros(requirements, entrancesRandomized) {
        if (entrancesRandomized === 'None') {
            // no entrance randomizer, sub default requirements in
            requirements.set('Can Access Skyview', 'Can Access Dungeon Entrance in Deep Woods');
            requirements.set('Can Access Earth Temple', 'Can Access Dungeon Entrance in Eldin Volcano');
            requirements.set('Can Access Lanayru Mining Facility', 'Can Access Dungeon Entrance in Lanayru Desert');
            requirements.set('Can Access Ancient Cistern', 'Can Access Dungeon Entrance in Lake Floria');
            requirements.set('Can Access Sandship', 'Can Access Dungeon Entrance in Sand Sea');
            requirements.set('Can Access Fire Sanctuary', 'Can Access Dungeon Entrance in Volcano Summit');
            requirements.set('Can Access Sky Keep', 'Can Access Dungeon Entrance on Skyloft');
        } else {
            requirements.set('Can Access Skyview', 'Entered Skyview');
            requirements.set('Can Access Earth Temple', 'Entered Earth Temple');
            requirements.set('Can Access Lanayru Mining Facility', 'Entered Lanayru Mining Facility');
            requirements.set('Can Access Ancient Cistern', 'Entered Ancient Cistern');
            requirements.set('Can Access Sandship', 'Entered Sandship');
            requirements.set('Can Access Fire Sanctuary', 'Entered Fire Sanctuary');
            if (entrancesRandomized === 'Dungeons') {
                requirements.set('Can Access Sky Keep', 'Can Access Dungeon Entrance on Skyloft');
            } else {
                requirements.set('Can Access Sky Keep', 'Entered Sky Keep');
            }
        }
    }

    static tweakTMSAndRequiredDungeons(requirements) {
        requirements.set('Can Access Past', 'Goddess Harp & Master Sword & Can Complete Required Dungeons');
        requirements.set('Can Complete Required Dungeons', 'Nothing');
    }

    static tweakGoddessChestRequirements(requirements) {
        _.forEach(goddessCubes, (__, macro) => {
            requirements.remove(macro);
        });
    }

    static tweakGratitudeCrystalRequirements(requirements) {
        _.forEach(crystalMacros, (macro) => {
            const macroSplit = macro.split(/\s+/);
            // ${n} Gratitude Crystals
            const newMacro = `${macroSplit[1]} ${macroSplit[2].slice(0, -1)} x${macroSplit[0]}`;
            // Gratitude Crystal x${n}
            requirements.set(macro, newMacro);
        });
    }

    static removeCrystalLocations(locations) {
        _.forEach(crystalLocations, (crystal, name) => {
            locations.deleteLocation(crystal.area, name);
        });
    }

    static tweakSoTH(locations) {
        const stoneOfTrials = locations.getLocation('Skyloft Silent Realm', 'Stone of Trials');
        stoneOfTrials.logicSentence = 'Song of the Hero x3 & Goddess Harp';
        stoneOfTrials.booleanExpression = LogicHelper.booleanExpressionForRequirements(stoneOfTrials.logicSentence);
        const simplifiedExpression = stoneOfTrials.booleanExpression.simplify({
            implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
        });
        const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
        const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
        stoneOfTrials.needs = readablerequirements;
    }
}

export default LogicTweaks;
