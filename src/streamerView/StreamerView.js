import React from 'react';
import { Container, Table } from 'react-bootstrap';
import noSailcloth from '../assets/main quest/No_Sailcloth.png';
import sailcloth from '../assets/main quest/Sailcloth.png';
import StreamerViewItem from './StreamerViewItem';

class StreamerView extends React.Component {
    constructor(props) {
        super(props);
        const channel = new BroadcastChannel('ssrTrackerItems');
        channel.addEventListener('message', (e) => {
            this.setState({ items: JSON.parse(e.data.items) });
        });
        this.state = {
            items: {},
        };
    }

    handleItemClick() {
        this.forceUpdate();
    }

    render() {
        return (
            <Container fluid>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <StreamerViewItem itemName="Sailcloth" images={[noSailcloth, sailcloth]} items={this.state.items} onChange={this.handleItemClick} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default StreamerView;
