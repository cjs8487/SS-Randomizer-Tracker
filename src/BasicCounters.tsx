import { useSelector } from 'react-redux';
import { totalCountersSelector } from './selectors/LogicOutput';

export default function BasicCounters() {
    const totalCounters = useSelector(totalCountersSelector);
    return (
        <div className="Counters">
            <p>{`Locations Checked: ${totalCounters.numChecked}`}</p>
            <p>{`Locations Accessible: ${totalCounters.numAccessible}`}</p>
            <p>{`Locations Remaining: ${totalCounters.numRemaining}`}</p>
        </div>
    );
}
