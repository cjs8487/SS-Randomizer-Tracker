import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Item from './Item';

import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import { ItemClickCallback } from '../callbacks';

type AdditionalItemsProps = {
    handleItemClick: ItemClickCallback;
    logic: Logic;
    colorScheme: ColorScheme;
};

const AdditionalItems = ({
    handleItemClick,
    logic,
    colorScheme,
}: AdditionalItemsProps) => {
    const [width, setWidth] = useState(0);

    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setWidth(divRef?.current?.clientWidth || 0);
    }, [setWidth, divRef]);

    const widthDiv = 7;

    return (
        <Row ref={divRef} noGutters="true">
            <Col>
                <p
                    style={{
                        margin: 0,
                        fontSize: 'small',
                        color: colorScheme.text,
                    }}
                >
                    Caves
                </p>
                <Item
                    itemName="Lanayru Caves Small Key"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
            </Col>
            <Col>
                <Item
                    itemName="Sea Chart"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
            </Col>
            <Col>
                <Item
                    itemName="Spiral Charge"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
            </Col>
            <Col>
                <Item
                    itemName="Progressive Pouch"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
            </Col>
            <Col>
                <Item
                    itemName="Empty Bottle"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
                <p
                    style={{
                        fontSize: 'xx-large',
                        position: 'relative',
                        left: '20px',
                        bottom: '-15%',
                        color: colorScheme.text,
                    }}
                >
                    {logic.getItem('Empty Bottle')}
                </p>
            </Col>
            <Col>
                <Item
                    itemName="Life Tree Fruit"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
            </Col>
            <Col>
                <Item
                    itemName="Group of Tadtones"
                    logic={logic}
                    onChange={handleItemClick}
                    imgWidth={width / widthDiv}
                />
                <p
                    style={{
                        fontSize: 'xx-large',
                        position: 'relative',
                        left: '20px',
                        bottom: '-15%',
                        color: colorScheme.text,
                    }}
                >
                    {logic.getItem('Group of Tadtones')}
                </p>
            </Col>
        </Row>
    );
};

export default AdditionalItems;
