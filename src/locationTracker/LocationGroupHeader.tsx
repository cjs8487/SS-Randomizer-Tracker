import { useCallback, useEffect, useState } from 'react';
import { TriggerEvent } from 'react-contexify';
import { Col, Row } from 'react-bootstrap';

import AreaCounters from './AreaCounters';

import sotsImage from '../assets/hints/sots.png';
import barrenImage from '../assets/hints/barren.png';

import g1 from '../assets/hints/g1.png';
import scaldera from '../assets/hints/scaldera.png';
import moldarach from '../assets/hints/moldarach.png';
import koloktos from '../assets/hints/koloktos.png';
import tentalus from '../assets/hints/tentalus.png';
import g2 from '../assets/hints/g2.png';

import 'react-contexify/dist/ReactContexify.css';
import { useContextMenu } from './context-menu';
import { useDispatch, useSelector } from 'react-redux';
import { bulkEditChecks } from '../state/tracker/Slice';
import { areaSelector } from '../state/tracker/Selectors';

const pathImages = [
    g1,
    scaldera,
    moldarach,
    koloktos,
    tentalus,
    g2,
];

export interface LocationGroupContextMenuProps {
    setAllLocationsChecked: (checked: boolean) => void;
    setSots: (checked: boolean) => void;
    setBarren: (checked: boolean) => void;
    setPath: (path: number) => void;
}

export default function LocationGroupHeader({
    onClick,
    title,
}: {
    title: string,
    onClick: () => void,
}) {
    const dispatch = useDispatch();

    const area = useSelector(areaSelector(title))!;

    // TODO move these into redux
    const [sots, setSots] = useState(false);
    const [barren, setBarren] = useState(false);
    const [inEffect, setInEffect] = useState(false);
    const [pathIndex, setPath] = useState(6);

    const setAllLocationsChecked = useCallback(
        (value: boolean) =>
            dispatch(
                bulkEditChecks({
                    markChecked: value,
                    checkIds: area.locations.map((loc) => loc.staticLocation.id),
                }),
            ),
        [area.locations, dispatch],
    );

    const { show } = useContextMenu<LocationGroupContextMenuProps>({
        id: 'group-context',
    });

    const displayMenu = useCallback((e: TriggerEvent) => {
        show({ event: e, props: { setAllLocationsChecked, setSots, setBarren, setPath } });
    }, [setAllLocationsChecked, show]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setSots(false);
            setInEffect(true);
        }
    }, [pathIndex]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setBarren(false);
            setPath(6);
            setInEffect(true);
        }
    }, [sots]);

    useEffect(() => {
        if (inEffect) {
            setInEffect(false);
        } else {
            setSots(false);
            setPath(6);
            setInEffect(true);
        }
    }, [barren]);

    let image;
    if (pathIndex < 6) {
        image = <img src={pathImages[pathIndex]} alt="path" />;
    } else if (sots) {
        image = <img src={sotsImage} alt="sots" />;
    } else if (barren) {
        image = <img src={barrenImage} alt="barren" />;
    }

    return (
        <Row
            className="group-container"
            onClick={onClick}
            onKeyDown={onClick}
            role="button"
            tabIndex={0}
            onContextMenu={displayMenu}
        >
            <Col sm={7}>
                <h3 style={{ cursor: 'pointer' }}>
                    {title}
                </h3>
            </Col>
            <Col sm={2}>
                <span>{image}</span>
            </Col>
            <Col sm={1}>
                <h3>
                    <AreaCounters areaName={title} />
                </h3>
            </Col>
        </Row>
    );
}
