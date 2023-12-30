import { CSSProperties } from 'react';
import keyDownWrapper from '../KeyDownWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { dungeonEntranceDiscoveredSelector } from '../state/tracker/Selectors';
import { clickDungeonEntranceMarker } from '../state/tracker/Slice';
import noEntrance from '../assets/No_Entrance.png';
import entrance from '../assets/Entrance.png';

type DungeonEntranceProps = {
    dungeon: string;
    imgWidth?: number;
    styleProps?: CSSProperties;
};

// This component is temporary and will be removed with new logic
const DungeonEntranceMarker = (props: DungeonEntranceProps) => {
    const { dungeon, styleProps, imgWidth } = props;

    const dispatch = useDispatch();
    const discovered = useSelector(dungeonEntranceDiscoveredSelector(dungeon));

    const image = discovered ? entrance : noEntrance;

    const style = styleProps;

    const handleClick = () =>
        dispatch(clickDungeonEntranceMarker({ dungeonName: dungeon }));

    return (
        <div
            className={`item-container`}
            style={style}
            onClick={handleClick}
            onContextMenu={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <img src={image} alt={dungeon} width={imgWidth} />
        </div>
    );
};

export default DungeonEntranceMarker;
