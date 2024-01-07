import './dungeons.css';
import keyDownWrapper from '../../../KeyDownWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { clickDungeonName } from '../../../state/Tracker';
import { dungeonCompletedSelector, dungeonRequiredSelector } from '../../../selectors/Dungeons';

type DungeonNameProps = {
    dungeon: string;
    dungeonName: string;
};

const DungeonName = (props: DungeonNameProps) => {
    const { dungeon, dungeonName } = props;
    const dispatch = useDispatch();
    const handleClick = () => dispatch(clickDungeonName({ dungeonName }));

    const isRequired = useSelector(dungeonRequiredSelector(dungeonName));

    const isCompleted = useSelector(dungeonCompletedSelector(dungeonName));
    const completedState = isCompleted
        ? 'complete'
        : 'incomplete';
    const requiredState = isRequired ? 'required' : 'unrequired';
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
