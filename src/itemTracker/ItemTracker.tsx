import { CSSProperties } from 'react';
import './itemTracker.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BWheel from './BWheel';
import SwordBlock from './SwordBlock';
import SongBlock from './SongBlock';
import QuestItems from './QuestItems';
import AdditionalItems from './AdditionalItems';
import Logic from '../logic/Logic';
import ColorScheme from '../customization/ColorScheme';
import { ItemClickCallback } from '../callbacks';

type ItemTrackerProps = {
    logic: Logic;
    handleItemClick: ItemClickCallback;
    styleProps: CSSProperties;
    colorScheme: ColorScheme;
};

const ItemTracker = ({
    logic,
    handleItemClick,
    styleProps,
    colorScheme,
}: ItemTrackerProps) => {
    const width = Number(styleProps.width || 0);
    const height = Number(styleProps.height || 0);

    const swordBlockStyle: CSSProperties = {
        position: 'fixed',
        width: width / 2.5,
        left: 0,
        top: 0,
        margin: '1%',
    };

    const bWheelStyle: CSSProperties = {
        position: 'fixed',
        width: (2 * width) / 3,
        left: width / 8, // don't ask, this has to be like this so the b-wheel is somewhat centered
        top: height / 2, // swordBlockStyle.height would be preferable but is not declared
        margin: '1%',
    };

    const songBlockStyle: CSSProperties = {
        position: 'fixed',
        width: width / 2.5,
        left: swordBlockStyle.width,
        top: 0,
        margin: '1%',
        // border: '3px solid #73AD21'
    };

    const questItemsStyle: CSSProperties = {
        width: width / 2.5,
        height: height / 7,
    };

    return (
        <div id="itemTracker">
            {/* <Container fluid> */}
            <Row>
                <Col>
                    <div id="swordBlock">
                        <SwordBlock
                            styleProps={swordBlockStyle}
                            logic={logic}
                            handleItemClick={handleItemClick}
                            colorScheme={colorScheme}
                        />
                    </div>
                </Col>
                <Col>
                    <div id="songBlock">
                        <SongBlock
                            styleProps={songBlockStyle}
                            logic={logic}
                            handleItemClick={handleItemClick}
                        />
                    </div>
                </Col>
            </Row>
            <Row
                style={{
                    padding: '2%',
                    height: '10%',
                }}
            >
                <Col>
                    <QuestItems
                        styleProps={questItemsStyle}
                        logic={logic}
                        handleItemClick={handleItemClick}
                        colorScheme={colorScheme}
                    />
                </Col>
                <Col>
                    <AdditionalItems
                        logic={logic}
                        handleItemClick={handleItemClick}
                        colorScheme={colorScheme}
                    />
                </Col>
            </Row>
            <Row>
                <Col id="bWheel">
                    <BWheel
                        styleProps={bWheelStyle}
                        logic={logic}
                        handleItemClick={handleItemClick}
                    />
                </Col>
            </Row>

            {/* </Container> */}
        </div>
    );
};

export default ItemTracker;
