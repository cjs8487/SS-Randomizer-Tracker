export default function BasicCounters({
    locationsChecked,
    totalAccessible,
    checksRemaining,
}: {
    locationsChecked: number;
    totalAccessible: number;
    checksRemaining: number;
}) {
    return (
        <div className="Counters">
            <p>{`Locations Checked: ${locationsChecked}`}</p>
            <p>{`Locations Accessible: ${totalAccessible}`}</p>
            <p>{`Locations Remaining: ${checksRemaining}`}</p>
        </div>
    );
}
