import _ from 'lodash';
import goddessCubes from '../data/goddessCubes.json';
import crystalMacros from '../data/gratitudeCrystalMacros.json';
import crystalLocations from '../data/crystals.json';
// import LogicHelper from './LogicHelper';

class LogicTweaks {
    static applyTweaks(logic, settings) {
        LogicTweaks.createDungeonMacros(logic.requirements, settings.getOption('Randomize Entrances'));
        LogicTweaks.createTrialMacros(logic.requirements, settings.getOption('Randomize Silent Realms'));
        LogicTweaks.tweakTMSAndRequiredDungeons(logic.requirements);
        LogicTweaks.tweakGoddessChestRequirements(logic.requirements);
        LogicTweaks.tweakGratitudeCrystalRequirements(logic.requirements);
        LogicTweaks.removeCrystalLocations(logic.locations);
        if (!settings.getOption('Randomize Silent Realms')) {
            LogicTweaks.tweakSoTH(logic.requirements);
        }
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
            requirements.set('Can Beat Dungeon Entrance in Lanayru Desert', 'Can Beat Lanayru Mining Facility');
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

    static createTrialMacros(requirements, entrancesRandomized) {
        if (entrancesRandomized) {
            // entrances are shuffled, create fake items for the tracker
            requirements.set('Can Access Skyloft Silent Realm', 'Entered Skyloft Silent Realm');
            requirements.set('Can Access Faron Silent Realm', 'Entered Faron Silent Realm');
            requirements.set('Can Access Eldin Silent Realm', 'Entered Eldin Silent Realm');
            requirements.set('Can Access Lanayru Silent Realm', 'Entered Lanayru Silent Realm');
        } else {
            // no entrance randomizer, sub default requirements in
            requirements.set('Can Access Skyloft Silent Realm', 'Can Open Trial Gate on Skyloft');
            requirements.set('Can Access Faron Silent Realm', 'Can Open Trial Gate in Faron Woods');
            requirements.set('Can Access Eldin Silent Realm', 'Can Open Trial Gate in Eldin Volcano');
            requirements.set('Can Access Lanayru Silent Realm', 'Can Open Trial Gate in Lanayru Desert');
        }
    }

    static tweakTMSAndRequiredDungeons(requirements) {
        requirements.set('Can Access Past', 'Goddess Harp & Master Sword & Can Complete Required Dungeons');
        requirements.set('Can Complete Required Dungeons', 'Nothing');
    }

    static tweakGoddessChestRequirements(requirements) {
        _.forEach(goddessCubes, (__, macro) => {
            // console.log(macro);
            // rename the macro so that the logic can differentiate from the fake cube items used in the tracker and the actual logic
            requirements.set(`Can Reach ${macro}`, requirements.get(macro));
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

    static tweakSoTH(requirements) {
        requirements.set('Can Open Trial Gate on Skyloft', 'Song of the Hero x3 & Goddess Harp');
        // stoneOfTrials.logicSentence = 'Song of the Hero x3 & Goddess Harp';
        // stoneOfTrials.booleanExpression = LogicHelper.booleanExpressionForRequirements(stoneOfTrials.logicSentence);
        // const simplifiedExpression = stoneOfTrials.booleanExpression.simplify({
        //     implies: (firstRequirement, secondRequirement) => LogicHelper.requirementImplies(firstRequirement, secondRequirement),
        // });
        // const evaluatedRequirements = LogicHelper.evaluatedRequirements(simplifiedExpression);
        // const readablerequirements = LogicHelper.createReadableRequirements(evaluatedRequirements);
        // stoneOfTrials.needs = readablerequirements;
    }
}

export default LogicTweaks;
