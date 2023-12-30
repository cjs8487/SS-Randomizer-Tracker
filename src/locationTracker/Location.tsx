import { useCallback } from 'react';
import { TriggerEvent } from 'react-contexify';
import { Row, Col } from 'react-bootstrap';
import Tippy from '@tippyjs/react';

import RequirementsTooltip from './RequirementsTooltip';
import images from '../itemTracker/Images';
import placeholderImg from '../assets/slot test.png';
import './Location.css';
import ItemLocation from '../logic/ItemLocation';
import keyDownWrapper from '../KeyDownWrapper';

import 'react-contexify/dist/ReactContexify.css';
import 'tippy.js/dist/tippy.css';
import { useContextMenu } from './context-menu';
import { useDispatch, useSelector } from 'react-redux';
import { clickCheck, setCheckHint } from '../state/tracker/Slice';
import { checkItemHintSelector } from '../state/tracker/Selectors';
import { LocationState } from '../state/tracker/Types';

export interface LocationContextMenuProps {
    handler: (checkId: string, markChecked?: boolean) => void,
    location: ItemLocation,
    setItem: (item: string) => void;
}

export default function Location({
    location,
}: {
    location: LocationState,
}) {
    const dispatch = useDispatch();
    const doMarkChecked = useCallback((markChecked?: boolean) =>
        dispatch(
            clickCheck({
                checkId: location.staticLocation.id,
                markChecked,
            }),
        ), [dispatch, location.staticLocation.id]);

    const contextMenuMarkChecked = useCallback((checkId: string, markChecked?: boolean) =>
        dispatch(
            clickCheck({
                checkId,
                markChecked,
            }),
        ), [dispatch]);

    const style = {
        textDecoration: location.logicalState === 'checked' ? 'line-through' : 'none',
        cursor: 'pointer',
        color: `var(--scheme-${location.logicalState})`,
        paddingLeft: 6,
        paddingRight: 0,
    };

    const setItem = useCallback((item: string) => {
        dispatch(setCheckHint({ checkId: location.staticLocation.id, hint: item }))
    }, [dispatch, location.staticLocation.id]);

    const { show } = useContextMenu<LocationContextMenuProps>({
        id: 'location-context',
    });

    const displayMenu = useCallback((e: TriggerEvent) => {
        show({ event: e, props: { handler: contextMenuMarkChecked, location: location.staticLocation, setItem } });
    }, [contextMenuMarkChecked, location, setItem, show]);

    const tooltip = (
        <RequirementsTooltip
            requirements={location.needs}
        />
    );

    const hintItem = useSelector(checkItemHintSelector(location.staticLocation.id));

    return (
        <Tippy content={tooltip}>
            <div
                className="location-container"
                onClick={() => doMarkChecked()}
                onKeyDown={keyDownWrapper(() => doMarkChecked())}
                role="button"
                tabIndex={0}
                onContextMenu={displayMenu}
            >
                <Row noGutters>
                    <Col
                        style={style}
                        data-tip={location.needs}
                        data-for={location.staticLocation.name}
                        id={location.staticLocation.name}
                        sm={8}
                    >
                        {location.staticLocation.name}
                    </Col>
                    {
                        hintItem && (
                            <Col sm={2} style={{ padding: 0 }}>
                                <img src={images[hintItem][images[hintItem].length - 1] || placeholderImg} height={30} title={hintItem} alt={hintItem} />
                            </Col>
                        )
                    }
                </Row>
            </div>
        </Tippy>

    );
}
