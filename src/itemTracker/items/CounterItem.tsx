import { CSSProperties, MouseEvent } from 'react';
import _ from 'lodash';
import ColorScheme from '../../customization/ColorScheme';
import Logic from '../../logic/Logic';
import allImages from '../Images';
import { ItemClickCallback } from '../../callbacks';
import keyDownWrapper from '../../KeyDownWrapper';

type CounterItemProps = {
    logic: Logic;
    images?: string[];
    itemName: string;
    imgWidth: number;
    onChange: ItemClickCallback;
    ignoreItemClass: boolean;
    styleProps: CSSProperties;
    grid?: boolean;
    asSpan?: boolean;
    colorScheme: ColorScheme;
};

const CounterItem = (props: CounterItemProps) => {
    const {
        logic,
        images,
        itemName,
        imgWidth,
        onChange,
        ignoreItemClass,
        styleProps,
        grid,
        asSpan,
        colorScheme,
    } = props;

    const handleClick = (e: MouseEvent) => {
        if (e.type === 'contextmenu') {
            onChange(itemName, true);
            e.preventDefault();
        } else {
            onChange(itemName, false);
        }
    };

    let current = logic.getItem(itemName);
    if (_.isNil(current)) {
        current = 0;
    }

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
    const image = current === 0 ? itemImages[0] : itemImages[1];
    styleProps.position = 'relative';
    styleProps.textAlign = 'center';
    const className = ignoreItemClass ? '' : 'item';

    if (asSpan) {
        return (
            <span
                className={`item-container ${className}`}
                style={styleProps}
                onClick={handleClick}
                onContextMenu={handleClick}
                onKeyDown={keyDownWrapper(handleClick)}
                role="button"
                tabIndex={0}
            >
                <img src={image} alt={itemName} width={imgWidth} />
                {current > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: colorScheme.background,
                            width: '80%',
                            height: '150%',
                            color: colorScheme.text,
                            fontSize: 'xx-large',
                            pointerEvents: 'none',
                        }}
                    >
                        <p
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {current}
                        </p>
                    </div>
                )}
            </span>
        );
    }
    return (
        <div
            className={`item-container ${className}`}
            style={styleProps}
            onClick={handleClick}
            onContextMenu={handleClick}
            onKeyDown={keyDownWrapper(handleClick)}
            role="button"
            tabIndex={0}
        >
            <img src={image} alt={itemName} width={imgWidth} />
            {current > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'grey',
                        width: '50%',
                        height: '60%',
                        color: colorScheme.text,
                        fontSize: 'xxx-large',
                        pointerEvents: 'none',
                    }}
                >
                    <p
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {current}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CounterItem;
