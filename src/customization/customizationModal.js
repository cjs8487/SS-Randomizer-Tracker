import React from 'react'
import { Modal, Button, Container } from 'react-bootstrap';
import {SketchPicker} from 'react-color'
import ColorBlock from './colorBlock';

class CustomizationModal extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Tracker Customization
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container>
                            <ColorBlock colorName="Background" currentColor={this.props.colorScheme.background} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                    </Modal>
        )
    }
}

export default CustomizationModal;