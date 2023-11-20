import './RequirementsTooltip.css';
import _ from 'lodash';
import type { ReadableRequirement } from '../logic/LogicHelper';


export default function RequirementsTooltip({ requirements, meetsRequirement }: { requirements: ReadableRequirement[][], meetsRequirement: (req: string) => boolean }) {
    return (
        <div>
            {
                _.map(requirements, (value, index) => (
                    <li key={index}>
                        {
                            _.map(value, (requirement, requirementIndex) => {
                                if (requirement.item === ' and ' || requirement.item === ' or ' || requirement.item === '(' || requirement.item === ')') {
                                    return (
                                        <span key={requirementIndex}>{requirement.name}</span>
                                    );
                                }
                                return (
                                    <span key={requirementIndex} className={meetsRequirement(requirement.item) ? 'met' : 'unmet'}>{requirement.name}</span>
                                );
                            })
                        }
                    </li>
                ))
            }
        </div>
    );
}
