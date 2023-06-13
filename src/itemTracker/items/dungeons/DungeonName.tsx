import './dungeons.css';
import ColorScheme from '../../../customization/ColorScheme';
import Logic from '../../../logic/Logic';
import keyDownWrapper from '../../../KeyDownWrapper';
import { DungeonClickCallback } from '../../../callbacks';

type DungeonNameProps = {
    colorScheme: ColorScheme;
    dungeon: string;
    dungeonName: string;
    dungeonChange: DungeonClickCallback;
    logic: Logic;
};

const DungeonName = (props: DungeonNameProps) => {
    const { colorScheme, dungeon, dungeonName, dungeonChange, logic } = props;
    const handleClick = () => {
        dungeonChange(dungeonName);
    };
    const currentStyle = {
        color: logic.isDungeonRequired(dungeonName)
            ? colorScheme.required
            : colorScheme.unrequired,
    };
    const completedState = logic.isDungeonCompleted(dungeonName)
        ? 'complete'
        : 'incomplete';
    return (
        <div
            onClick={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <p className={completedState} style={currentStyle}>
                {dungeon}
            </p>
        </div>
    );
};

export default DungeonName;
