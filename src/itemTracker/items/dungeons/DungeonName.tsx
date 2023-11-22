import './dungeons.css';
import Logic from '../../../logic/Logic';
import keyDownWrapper from '../../../KeyDownWrapper';
import { DungeonClickCallback } from '../../../callbacks';

type DungeonNameProps = {
    dungeon: string;
    dungeonName: string;
    dungeonChange: DungeonClickCallback;
    logic: Logic;
};

const DungeonName = (props: DungeonNameProps) => {
    const { dungeon, dungeonName, dungeonChange, logic } = props;
    const handleClick = () => {
        dungeonChange(dungeonName);
    };
    const completedState = logic.isDungeonCompleted(dungeonName)
        ? 'complete'
        : 'incomplete';
    const requiredState = logic.isDungeonRequired(dungeonName) ? 'required' : 'unrequired';
    return (
        <div
            onClick={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <p className={`${completedState} ${requiredState}`}>
                {dungeon}
            </p>
        </div>
    );
};

export default DungeonName;
