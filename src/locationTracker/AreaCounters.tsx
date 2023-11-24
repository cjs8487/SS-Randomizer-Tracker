import ColorScheme from '../customization/ColorScheme';

export default function AreaCounters({
    colorScheme,
    totalChecksAccessible,
    totalChecksLeftInArea,
}: {
    colorScheme: ColorScheme,
    totalChecksAccessible: number,
    totalChecksLeftInArea: number,
}) {
    return (
        <span style={{ color: colorScheme.text }}>
            {` ${totalChecksAccessible}/${totalChecksLeftInArea}`}
        </span>
    );
}
