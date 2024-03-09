import { useSelector } from 'react-redux';
import { areaSelector } from '../selectors/LogicOutput';

export default function AreaCounters({ areaName }: { areaName: string }) {
    const area = useSelector(areaSelector(areaName))!;
    return (
        <span>
            {` ${area.numLocationsInLogic}/${area.numRemainingLocations}`}
        </span>
    );
}
