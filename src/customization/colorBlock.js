import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { SketchPicker } from 'react-color'

class ColorBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPicker: false
        }
    }

    render() {
        return (
            <div>
                <Row >
                    <Col>
                        {this.props.colorName}
                    </Col>
                    <Col style={{background: this.props.currentColor, border: "2px solid black"}} onClick={() => this.setState({showPicker: !this.state.showPicker})}>
                    </Col>
                </Row>
                {this.state.showPicker &&
                    <Row>
                        <SketchPicker
                                    color={this.props.colorScheme.background}
                                    onChangeComplete={(color) => {
                                        let colorScheme = {...this.props.colorScheme}
                                        colorScheme[this.props.schemeKey] = color.hex
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
                    </Row>
                }
            </div>
        )
    }
}

export default ColorBlock;