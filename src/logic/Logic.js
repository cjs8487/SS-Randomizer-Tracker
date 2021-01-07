import _ from 'lodash';
import BooleanExpression from './BooleanExpression'
import Locations from './Locations';
import LogicLoader from './LogicLoader';
import LogicHelper from './LogicHelper'
import Macros from './Macros';

class Logic {

    async initialize() {
        const logicLoader = new LogicLoader();
        const { macros, locations } = await logicLoader.loadLogicFiles();
        LogicHelper.bindLogic(this);
        this.macros = new Macros(macros);
        this.locations = new Locations(locations);
        this.items = {};
        this.max = {
            progressiveSword: 6,
            progressiveMitts: 2,
            waterScale: 1,
            fireshieldEarrings: 1,
            goddessHarp: 1,
            faroresCourage: 1,
            nayrusWisdom: 1,
            dinsPower: 1,
            balladOfTheGoddess: 1,
            songOfTheHero: 3,
            sailcloth: 1,
            stoneOfTrials: 1,
            emeraldTablet: 1,
            rubyTablet: 1,
            amberTablet: 1,
            letter: 1,
            cBeetle: 1,
            rattle: 1,
            crystals: 16,
            slingshot: 1,
            beetle: 2,
            bombs: 1,
            gustBellows: 1,
            whip: 1,
            clawshots: 1,
            bow: 1,
            bugnet: 1,
            seaChart: 1,
            cavesKey: 1,
            bottle: 5,
            pouch: 1,
            spiralCharge: 1,
            svEntered: 1,
            etEntered: 1,
            lmfEntered: 1,
            acEntered: 1,
            sshEntered: 1,
            fsEntered: 1,
            skEntered: 1,
            svName: 1,
            etName: 1,
            lmfName: 1,
            acName: 1,
            sshName: 1,
            fsName: 1,
            skName: 1,
            svBossKey: 1,
            etBossKey: 1,
            lmfBossKey: 1,
            acBossKey: 1,
            sshBossKey: 1,
            fsBossKey: 1,
            triforce: 3,
            svSmall: 2,
            svSmall_1: 0,
            svSmall_2: 0,
            etEntry: 5,
            lmfSmall: 1,
            acSmall: 2,
            acSmall_1: 0,
            acSmall_2: 0,
            sshSmall: 2,
            sshSmall_1: 0,
            sshSmall_2: 0,
            fsSmall: 3,
            fsSmall_1: 0,
            fsSmall_2: 0,
            fsSmall_3: 0,
            skSmall: 1,
        }
    }

      macros() {
          return this.macros.all();
      }

      getMacro(macro) {
          return this.macros.getMacro(macro)
      }

      locations() {
          return this.locations.all();
      }

      areas() {
          return this.locations.allAreas();
      }

      locationsForArea(area) {
          return this.locations.locationsForArea(area)
      }

      getLocation(area, location) {
          return this.locations.getLocation(area, location);
      }

      locationNeeds(area, location) {
          const itemLocation = this.locations.getLocation(area, location);
          return itemLocation.needs;
      }

      giveItem(item) {
          this.incrementItem(item);
      }

      takeItem(item) {
          const current = this.getItem(item);
          if (current === 0) {
              return;
          }
          _.set(this.items, _.camelCase(item), current - 1);
      }

      resetItem(item) {
          _.set(this.items, _.camelCase(item), 0);
      }

      getItem(item) {
          return _.get(this.items, _.camelCase(item), 0);
      }

      incrementItem(item) {
          const current = this.getItem(item);
          let newCount;
          if (current < _.get(this.max, _.camelCase(item))) {
              newCount = current + 1;
          } else {
              newCount = 0;
          }
          _.set(this.items, _.camelCase(item), newCount);
      }

      hasItem(item) {
          return this.getItem(item) > 0;
      }
}

export default Logic;