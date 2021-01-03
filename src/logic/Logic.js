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
}

export default Logic;