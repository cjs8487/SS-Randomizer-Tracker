import React from 'react';
import { Modal, Button, Container, Row, Col, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ColorBlock from './ColorBlock';
import ColorScheme from './ColorScheme';

class CustomizationModal extends React.Component {
    constructor(props) {
        super(props);
        const lightScheme = new ColorScheme();
        const darkScheme = new ColorScheme();
        darkScheme.background = '#000000';
        darkScheme.text = '#FFFFFF';
        darkScheme.checked = '#B6B6B6';
        this.defaultColorSchemes = {
            Light: lightScheme,
            Dark: darkScheme,
        };
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
                                    const scheme = this.defaultColorSchemes[key];
                                    return (
                                        <Col key={key}>
                                            <Button
                                                style={{ background: scheme.background, color: scheme.text, border: '1px solid black' }}
                                                onClick={() => this.props.updateColorScheme(scheme)}
                                            >
                                                {key}
                                            </Button>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                        <Row>
                            <h4>Colors</h4>
                        </Row>
                        <ColorBlock colorName="Background" schemeKey="background" currentColor={this.props.colorScheme.background} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Foreground" schemeKey="text" currentColor={this.props.colorScheme.text} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="In Logic Check" schemeKey="inLogic" currentColor={this.props.colorScheme.inLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Out of Logic Check" schemeKey="outLogic" currentColor={this.props.colorScheme.outLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Semi Logic Check" schemeKey="semiLogic" currentColor={this.props.colorScheme.semiLogic} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Unrequired Dungeon" schemeKey="unrequired" currentColor={this.props.colorScheme.unrequired} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Required Dungeon" schemeKey="required" currentColor={this.props.colorScheme.required} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <ColorBlock colorName="Completed Checks" schemeKey="checked" currentColor={this.props.colorScheme.checked} colorScheme={this.props.colorScheme} updateColorScheme={this.props.updateColorScheme} />
                        <Row>
                            <h4>Tracker Settings</h4>
                        </Row>
                        <Row>
                            <FormControl as="select" onChange={this.props.updateLayout}>
                                <option value="inventory">In-Game Inventory</option>
                                <option value="grid">Grid Layout</option>
                            </FormControl>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CustomizationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    colorScheme: PropTypes.instanceOf(ColorScheme).isRequired,
    updateColorScheme: PropTypes.func.isRequired,
    updateLayout: PropTypes.func.isRequired,
};

export default CustomizationModal;
