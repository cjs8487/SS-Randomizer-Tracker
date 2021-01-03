import _ from 'lodash'
import BooleanExpression from './BooleanExpression'

class LogicHelper {

    static logic;

    static bindLogic(logic) {
        this.logic = logic;
    }

    static parseRequirement(requirement) {
        // if (this.isMacro(requirement)) {
            const macroValue = this.logic.macros.getMacro(requirement)
            if (macroValue) {
                return this.booleanExpressionForRequirements(macroValue);
            }
        // }
        return requirement;
    }

    static booleanExpressionForTokens(expressionTokens) {
        let itemsForExpression = [];
        let expressionTypeToken;
        while (!_.isEmpty(expressionTokens)) {
            const currentToken = expressionTokens.shift();
            if (currentToken === "&" || currentToken === "|") {
                if (!_.isNil(expressionTypeToken) && expressionTypeToken !== currentToken) {
                    console.log("Expression type is already set, but is attempting to be changed")
                }
                expressionTypeToken = currentToken
            } else if (currentToken === "(") {
                const childExpression = this.booleanExpressionForTokens(expressionTokens);
                itemsForExpression.push(childExpression);
            } else if (currentToken === ")") {
                break;
            } else {
                itemsForExpression.push(this.parseRequirement(currentToken))
            }
        }
        if (expressionTypeToken === "|") {
            return BooleanExpression.or(...itemsForExpression)
        }
        return BooleanExpression.and(...itemsForExpression)
    }

     static requirementImplies(firstRequirement, secondRequirement) {
        if (firstRequirement === secondRequirement) {
            return true;
        }
        if (firstRequirement === "Impossible") {
            return true;
        }

        if (secondRequirement === "Nothing") {
            return true;
        }
        return false;
    }

    static splitExpression(expression) {
        return _.compact(
            _.map(expression.split(/\s*([(&|)])\s*/g), _.trim)
        );
    }

    static booleanExpressionForRequirements(requirements) {
        const expressionTokens = this.splitExpression(requirements);
        let expression = this.booleanExpressionForTokens(expressionTokens);
        return expression
    }

    static createReadableRequirements(requirements) {
        if (requirements.type === 'and') {
            return _.map(requirements.items, (item) => _.flattenDeep(this.createReadableRequirementsHelper(item)));
        }
        if (requirements.type === 'or') {
            return [_.flattenDeep(this.createReadableRequirementsHelper(requirements))] 
        }
    }

    static createReadableRequirementsHelper(requirements) {
        if (requirements.item) {
            return [requirements.item]
        }
        return _.map(requirements.items, (item, index) => {
            console.log(`${JSON.stringify(item)}, ${index}`)
            let currentResult = []
            if (item.items) { // expression
                currentResult.push([
                    "(",
                    this.createReadableRequirementsHelper(item),
                    ")"
                ]);
            } else {
                currentResult.push(this.createReadableRequirementsHelper(item))
            }

            if (index < requirements.items.length - 1) {
                if (requirements.type === 'and') {
                    currentResult.push(" and ")
                } else {
                    currentResult.push(" or ")
                }
            }
            return currentResult;
        });
    }

    static evaluatedRequirements(requirements) {
        const generateReducerFunction = (getAccumulatorValue) => ({
          accumulator,
          item,
          isReduced,
        }) => {
          if (isReduced) {
    
            return {
              items: _.concat(accumulator.items, item),
              type: accumulator.type,
              value: getAccumulatorValue(accumulator.value, item.value),
            };
          }
    
          const wrappedItem = {
            item,
            value: false,
          };
    
          return {
            items: _.concat(accumulator.items, wrappedItem),
            type: accumulator.type,
            value: getAccumulatorValue(accumulator.value, wrappedItem.value),
          };
        };
    
        return requirements.reduce({
          andInitialValue: {
            items: [],
            type: 'and',
            value: true,
          },
          andReducer: (reducerArgs) => generateReducerFunction(
            (accumulatorValue, itemValue) => accumulatorValue && itemValue,
          )(reducerArgs),
          orInitialValue: {
            items: [],
            type: 'or',
            value: false,
          },
          orReducer: (reducerArgs) => generateReducerFunction(
            (accumulatorValue, itemValue) => accumulatorValue || itemValue,
          )(reducerArgs),
        });
      }
}

export default LogicHelper;