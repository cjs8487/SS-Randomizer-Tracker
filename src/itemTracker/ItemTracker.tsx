import { CSSProperties } from 'react';
import './itemTracker.css';
import BWheel from './BWheel';
import SwordBlock from './SwordBlock';
import SongBlock from './SongBlock';
import QuestItems from './QuestItems';
import AdditionalItems from './AdditionalItems';

type ItemTrackerProps = {
    styleProps: CSSProperties;
};

const ItemTracker = ({
    styleProps,
}: ItemTrackerProps) => {
    const maxHeight = styleProps.height as number;
    const aspectRatio = 0.65;
    let wid = styleProps.width as number;
    if (wid > maxHeight * aspectRatio) {
        wid = maxHeight * aspectRatio; // ensure the tracker isn't so wide that it ends up too tall
    }
    const swordBlockStyle: CSSProperties = {
        position: 'fixed',
        height: 0,
        width: wid / 2.5,
        left: 0,
        top: 0,
        margin: '1%',
    };

    const songBlockStyle: CSSProperties = {
        position: 'fixed',
        width: wid / 2.5,
        left: swordBlockStyle.width as number * 1.1,
        margin: '1%',
        // border: '3px solid #73AD21',
    };

    const bWheelStyle: CSSProperties = {
        position: 'fixed',
        width: 2 * wid / 3,
        left: swordBlockStyle.width as number * 0.3, // don't ask, this has to be like this so the b-wheel is somewhat centered
        top: wid * 0.8,
        margin: '0%',
    };

    const additionalItemsStyle: CSSProperties = {
        position: 'fixed',
        width: wid / 2.5,
        top: wid * 0.55,
        left: wid * 0.44,
        margin: '1%',
    };

    const questItemsStyle: CSSProperties = {
        position: 'fixed',
        width: wid / 2.5,
        top: (additionalItemsStyle.top as number) + (additionalItemsStyle.top as number) / 12,
        left: 0,
        margin: '1%',
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td style={swordBlockStyle}>
                        <div id="swordBlock">
                            <SwordBlock styleProps={swordBlockStyle} />
                        </div>
                    </td>
                    <td style={songBlockStyle}>
                        <div id="songBlock">
                            <SongBlock styleProps={songBlockStyle} />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={questItemsStyle}>
                        <QuestItems styleProps={questItemsStyle} />
                    </td>
                    <td style={additionalItemsStyle}>
                        <AdditionalItems styleProps={additionalItemsStyle} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} style={bWheelStyle}>
                        <div id="bWheel">
                            <BWheel styleProps={bWheelStyle} />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ItemTracker;
