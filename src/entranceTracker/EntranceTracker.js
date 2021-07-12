import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
import EntranceGraph from './EntranceGraph';

class EntranceTracker extends React.Component {
    render() {
        return (
            // <Modal show>
            //     <Modal.Header closeButton>
            //         <Modal.Title id="contained-modal-title-vcenter">
            //             Tracker Customization
            //         </Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body className="show-grid">
            //         <EntranceGraph />
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button>Close</Button>
            //     </Modal.Footer>
            // </Modal>
            <EntranceGraph />
        );
    }
}

export default EntranceTracker;
