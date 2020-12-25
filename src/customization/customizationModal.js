import React from 'react'
import { Modal, Button, Container } from 'react-bootstrap';
import {SketchPicker} from 'react-color'

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
                            <h4>Background Color<br/></h4>
                            <SketchPicker
                                color={this.props.colorScheme.background}
                                onChangeComplete={(color) => {
                                    let colorScheme = {...this.props.colorScheme}
                                    colorScheme.background = color.hex
                                    this.props.updateColorScheme(colorScheme)
                                }} 
                                disableAlpha={true}
                                presetColors={[
                                    "#FFFFFF",
                                    "#00FFFF",
                                    "#FF00FF",
                                    "#FFFF00",
                                    "#FF0000",
                                    "#00FF00",
                                    "#0000FF"
                                ]}
                            />
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