import { CSSProperties } from 'react';
import allImages from './Images';
import keyDownWrapper from '../KeyDownWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { clickItem } from '../state/Tracker';
import { itemCountSelector } from '../selectors/Inventory';
import { InventoryItem } from '../logic/Inventory';

type ItemProps = {
    images?: string[];
    itemName: InventoryItem;
    imgWidth?: number;
    ignoreItemClass?: boolean;
    styleProps?: CSSProperties;
    grid?: boolean;
};

const Item = (props: ItemProps) => {
    const {
        itemName,
        ignoreItemClass,
        images,
        styleProps,
        grid,
        imgWidth,
    } = props;

    const dispatch = useDispatch();
    const current = useSelector(itemCountSelector(itemName));

    const className = ignoreItemClass ? '' : 'item';

    let itemImages: string[];
    if (!images) {
        if (grid) {
            itemImages = allImages[`${itemName} Grid`];
        } else {
            itemImages = allImages[itemName];
        }
    } else {
        itemImages = images;
    }

    const style = styleProps;

    const handleClick = (e: React.UIEvent) => {
        if (e.type === 'contextmenu') {
            dispatch(clickItem({ item: itemName, take: true }))
            e.preventDefault();
        } else {
            dispatch(clickItem({ item: itemName, take: false }))
        }
    };

    return (
        <div
            className={`item-container ${className}`}
            style={style}
            onClick={handleClick}
            onContextMenu={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <img src={itemImages[current]} alt={itemName} width={imgWidth} />
        </div>
    );
};

export default Item;
