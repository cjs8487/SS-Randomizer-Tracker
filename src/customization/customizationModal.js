import React from 'react'
import { Modal, Button, Container, Row, Col} from 'react-bootstrap';
import ColorBlock from './colorBlock';
import ColorScheme from './colorScheme';

class CustomizationModal extends React.Component {

    constructor(props) {
        super(props);
        let lightScheme = new ColorScheme()
        let darkScheme = new ColorScheme()
        darkScheme.background = "#000000"
        darkScheme.text = "#FFFFFF"
        this.defaultColorSchemes = {
            "Light": lightScheme,
            "Dark": darkScheme
        }
    }

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
                            <Row>
                                <h4>Presets</h4>
                            </Row>
                            <Row>
                                {
                                    Object.keys(this.defaultColorSchemes).map((key) => {
                                        let scheme = this.defaultColorSchemes[key]
                                        return (
                                            <Col key={key}>
                                                <Button
                                                    style={{background: scheme.background, color: scheme.text, border: "1px solid black"}}
                                                    onClick={() => this.props.updateColorScheme(scheme)}
                                                >
                                                    {key
                                                }</Button>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            <Row>
                                <h4>Colors</h4>
                            </Row>
                            <ColorBlock colorName="Background" schemeKey="background" currentColor={this.props.colorScheme.background} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="Foreground" schemeKey="text" currentColor={this.props.colorScheme.text} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="In Logic Check" schemeKey="inLogic" currentColor={this.props.colorScheme.inLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="Out of Logic Check" schemeKey="outLoigc" currentColor={this.props.colorScheme.outLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="Semi Logic Check" schemeKey="semiLogic" currentColor={this.props.colorScheme.semiLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="Unrequired Dungeon" schemeKey="unrequired" currentColor={this.props.colorScheme.unrequired} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
                            <ColorBlock colorName="Required Dungeon" schemeKey="required" currentColor={this.props.colorScheme.required} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme}/>
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