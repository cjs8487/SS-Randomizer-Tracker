import _ from 'lodash';
import Settings from '../../permalink/Settings';

export function getPastRequirementsExpression(
    settings: Settings,
    requiredDungeons: string[],
): string {
    let newReqs = `Can Access Sealed Temple & Goddess's Harp & ${settings.getOption(
        'Gate of Time Sword Requirement',
    )} & `;
    _.forEach(requiredDungeons, (dungeon) => {
        newReqs += `${dungeon} Completed & `;
    });
    return newReqs.slice(0, -3);
}