import { CSSProperties, MouseEvent } from 'react';
import Logic from '../logic/Logic';
import allImages from './Images';
import keyDownWrapper from '../KeyDownWrapper';
import { ItemClickCallback } from '../callbacks';

type ItemProps = {
    logic: Logic;
    images?: string[];
    itemName: string;
    imgWidth?: number;
    onChange: ItemClickCallback;
    ignoreItemClass?: boolean;
    styleProps?: CSSProperties;
    grid?: boolean;
};

const Item = (props: ItemProps) => {
    const {
        logic,
        itemName,
        ignoreItemClass,
        images,
        styleProps,
        grid,
        onChange,
        imgWidth,
    } = props;

    const current = logic.getItem(itemName);
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

    const handleClick = (e: MouseEvent) => {
        if (e.type === 'contextmenu') {
            onChange(itemName, true);
            e.preventDefault();
        } else {
            onChange(itemName, false);
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
