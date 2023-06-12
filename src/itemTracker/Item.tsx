import React, { CSSProperties, MouseEvent } from 'react';
import Logic from '../logic/Logic';
import allImages from './Images';
import keyDownWrapper from '../KeyDownWrapper';

type ItemProps = {
    logic: Logic;
    images: string[];
    itemName: string;
    imgWidth: number;
    onChange: (arg0: string, arg1: boolean) => void;
    ignoreItemClass: boolean;
    styleProps: CSSProperties;
    grid?: boolean;
};

const Item = (props: ItemProps) => {
    const {
        logic,
        itemName,
        ignoreItemClass,
        images: itemImages,
        styleProps,
        grid,
        onChange,
        imgWidth,
    } = props;

    const current = logic.getItem(itemName);
    const className = ignoreItemClass ? '' : 'item';

    let images: string[];
    if (!itemImages) {
        if (grid) {
            images = allImages[`${itemName} Grid`];
        } else {
            images = allImages[itemName];
        }
    } else {
        images = props.images;
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
            <img src={images[current]} alt={itemName} width={imgWidth} />
        </div>
    );
};

export default Item;
