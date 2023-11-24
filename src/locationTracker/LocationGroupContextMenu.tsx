import _ from 'lodash';
import { useCallback } from 'react';
import { Menu, Item, Separator, Submenu, ItemParams } from 'react-contexify';
import { LocationGroupContextMenuProps } from './LocationGroupHeader';

const bosses = {
    0: 'Ghirahim 1',
    1: 'Scaldera',
    2: 'Moldarach',
    3: 'Koloktos',
    4: 'Tentalus',
    5: 'Ghirahim 2',
};

type CtxProps<T = void> = ItemParams<LocationGroupContextMenuProps, T>;

interface BossData {
    boss: number;
}

function LocationGroupContextMenu() {
    const checkAll = useCallback((params: CtxProps) => {
        params.props!.setAllLocationsChecked(true);
    }, []);

    const uncheckAll = useCallback((params: CtxProps) => {
        params.props!.setAllLocationsChecked(false);
    }, []);

    const handlePathClick = useCallback((params: CtxProps<BossData>) => {
        params.props!.setPath(params.data!.boss);
    }, []);

    const handleSotsClick = useCallback((params: CtxProps) => {
        params.props!.setSots(true);
    }, []);

    const handleBarrenClick = useCallback((params: CtxProps) => {
        params.props!.setBarren(true);
    }, []);

    const handleClearCheck = useCallback((params: CtxProps) => {
        const locProps = params.props!;
        locProps.setSots(false);
        locProps.setBarren(false);
        locProps.setPath(6);
    }, []);

    return (
        <Menu id="group-context">
            <Item onClick={checkAll}>Check All</Item>
            <Item onClick={uncheckAll}>Uncheck All</Item>
            <Separator />
            <Submenu label="Set Path">
                {
                    _.map(bosses, (bossName, bossIndex) => (
                        <Item onClick={handlePathClick} data={{ boss: parseInt(bossIndex, 10) } satisfies BossData}>{bossName}</Item>
                    ))
                }
            </Submenu>
            <Item onClick={handleSotsClick}>Set SotS</Item>
            <Item onClick={handleBarrenClick}>Set Barren</Item>
            <Item onClick={handleClearCheck}>Clear Hint</Item>
        </Menu>
    );
}

export default LocationGroupContextMenu;
