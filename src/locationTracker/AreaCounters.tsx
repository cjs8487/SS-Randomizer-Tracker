import { useSelector } from "react-redux";
import { areaSelector } from "../state/tracker/Selectors";

export default function AreaCounters({
    areaName,
}: {
    areaName: string;
}) {
    const area = useSelector(areaSelector(areaName))!;
    return (
        <span>
            {` ${area.numLocationsInLogic}/${area.numRemainingLocations}`}
        </span>
    );
}
