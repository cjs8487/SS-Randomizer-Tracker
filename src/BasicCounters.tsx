import ColorScheme from './customization/ColorScheme';

export default function BasicCounters({
    locationsChecked,
    totalAccessible,
    checksRemaining,
    colorScheme,
}: {
    locationsChecked: number;
    totalAccessible: number;
    checksRemaining: number;
    colorScheme: ColorScheme;
}) {
    return (
        <div className="Counters" style={{ color: colorScheme.text }}>
            <p>{`Locations Checked: ${locationsChecked}`}</p>
            <p>{`Locations Accessible: ${totalAccessible}`}</p>
            <p>{`Locations Remaining: ${checksRemaining}`}</p>
        </div>
    );
}
