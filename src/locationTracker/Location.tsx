import { useCallback } from 'react';
import { TriggerEvent, useContextMenu } from 'react-contexify';
import { Row, Col } from 'react-bootstrap';
import Tippy from '@tippyjs/react';

import RequirementsTooltip from './RequirementsTooltip';
import images from '../itemTracker/Images';
import placeholderImg from '../assets/slot test.png';
import './Location.css';
import ColorScheme from '../customization/ColorScheme';
import ItemLocation from '../logic/ItemLocation';
import keyDownWrapper from '../KeyDownWrapper';

import 'react-contexify/dist/ReactContexify.css';
import 'tippy.js/dist/tippy.css';

export default function Location({
    colorScheme,
    handler,
    location,
    meetsRequirement,
    group,
}: {
    checked: boolean,
    group?: string,
    location: ItemLocation,
    handler: ((loc_: ItemLocation) => void) | ((group_: string, loc_: ItemLocation) => void),
    meetsRequirement: (req: string) => boolean,
    colorScheme: ColorScheme,
}) {

    function onClick(e: React.MouseEvent<HTMLDivElement>) {
        if (!(e.target as Element | null)?.id) {
            return;
        }
        if (group !== undefined) {
            (handler as (group_: string, loc_: ItemLocation) => void)(group, location);
        } else {
            (handler as (loc_: ItemLocation) => void)(location);
        }
    }

    const style = {
        textDecoration: location.checked ? 'line-through' : 'none',
        cursor: 'pointer',
        color: colorScheme[location.logicalState],
        paddingLeft: 6,
        paddingRight: 0,
    };

    const setItem = useCallback((item: string) => {
        location.item = item;
    }, [location]);

    const { show } = useContextMenu({
        id: 'location-context',
    });

    const displayMenu = useCallback((e: TriggerEvent) => {
        show({ event: e, props: { handler, group, location, setItem } });
    }, [location]);

    const tooltip = (
        <RequirementsTooltip
            requirements={location.needs}
            meetsRequirement={meetsRequirement}
        />
    );

    return (
        <Tippy content={tooltip}>
            <div
                className="location-container"
                onClick={onClick}
                onKeyDown={keyDownWrapper(onClick)}
                role="button"
                tabIndex={0}
                onContextMenu={displayMenu}
            >
                <Row noGutters>
                    <Col
                        style={style}
                        data-tip={location.needs}
                        data-for={location.name}
                        id={location.name}
                        sm={8}
                    >
                        {location.name}
                    </Col>
                    {
                        location.item !== '' && (
                            <Col sm={2} style={{ padding: 0 }}>
                                <img src={images[location.item][images[location.item].length - 1] || placeholderImg} height={30} title={location.item} alt={location.item} />
                            </Col>
                        )
                    }
                </Row>
            </div>
        </Tippy>

    );
}
