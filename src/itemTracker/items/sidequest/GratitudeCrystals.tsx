import allImages from '../../Images';
import keyDownWrapper from '../../../KeyDownWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { totalGratitudeCrystalsSelector } from '../../../selectors/LogicOutput';
import { clickItem } from '../../../state/Tracker';

type GratitudeCrystalsProps = {
    images?: string[];
    imgWidth: number;
    ignoreItemClass?: boolean;
    grid?: boolean;
};

const GratitudeCrystals = (props: GratitudeCrystalsProps) => {
    const { images, imgWidth, ignoreItemClass, grid } = props;
    const dispatch = useDispatch();
    const handleClick = (e: React.UIEvent) => {
        if (e.type === 'click') {
            dispatch(clickItem({ item: 'Gratitude Crystal Pack', take: false }));
        } else if (e.type === 'contextmenu') {
            dispatch(clickItem({ item: 'Gratitude Crystal Pack', take: true }));
            e.preventDefault();
        }
    };

    const current = useSelector(totalGratitudeCrystalsSelector) ? 1 : 0;
    const className = ignoreItemClass ? '' : 'item';
    let itemImages;
    if (!images) {
        if (grid) {
            itemImages = allImages['Gratitude Crystals Grid'];
        } else {
            itemImages = allImages['Gratitude Crystal Pack'];
        }
    } else {
        itemImages = images;
    }
    return (
        <div
            className={`item-container ${className}`}
            onClick={handleClick}
            onContextMenu={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <img
                src={itemImages[current]}
                alt="Gratitude Crystals"
                width={imgWidth}
            />
        </div>
    );
};

export default GratitudeCrystals;
