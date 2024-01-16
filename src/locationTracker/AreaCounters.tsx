export default function AreaCounters({
    totalChecksAccessible,
    totalChecksLeftInArea,
}: {
    totalChecksAccessible: number,
    totalChecksLeftInArea: number,
}) {
    return (
        <span>
            {` ${totalChecksAccessible}/${totalChecksLeftInArea}`}
        </span>
    );
}
