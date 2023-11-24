import Logic from '../../../logic/Logic';
import allImages from '../../Images';
import keyDownWrapper from '../../../KeyDownWrapper';
import { ItemClickCallback } from '../../../callbacks';

type GratitudeCrystalsProps = {
    onChange: ItemClickCallback;
    images?: string[];
    imgWidth: number;
    logic: Logic;
    ignoreItemClass?: boolean;
    grid?: boolean;
};

const GratitudeCrystals = (props: GratitudeCrystalsProps) => {
    const { onChange, images, imgWidth, logic, ignoreItemClass, grid } = props;
    const handleClick = (e: React.UIEvent) => {
        if (e.type === 'click') {
            onChange('5 Gratitude Crystal', false);
        } else if (e.type === 'contextmenu') {
            onChange('5 Gratitude Crystal', true);
            e.preventDefault();
        }
    };

    const current = logic.getCrystalCount() >= 1 ? 1 : 0;
    const className = ignoreItemClass ? '' : 'item';
    let itemImages;
    if (!images) {
        if (grid) {
            itemImages = allImages['Gratitude Crystals Grid'];
        } else {
            itemImages = allImages['Gratitude Crystals'];
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
