import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import ColorScheme from './ColorScheme';


export default function ColorBlock({
    colorName,
    colorScheme,
    currentColor,
    schemeKey,
    updateColorScheme
}: {
    colorName: string,
    schemeKey: keyof ColorScheme,
    currentColor: string,
    colorScheme: ColorScheme,
    updateColorScheme: (scheme: ColorScheme) => void
}) {
    const [showPicker, setShowPicker] = useState(false);
    return (
        <div>
            <Row>
                <Col>
                    {colorName}
                </Col>
                <Col style={{ background: currentColor, border: '2px solid black' }} onClick={() => setShowPicker(((prevState) => !prevState))} />
            </Row>
            {
                showPicker && (
                    <Row>
                        <SketchPicker
                            color={currentColor}
                            onChangeComplete={
                                (color) => {
                                    const newScheme: ColorScheme = { ...colorScheme, [schemeKey]: color.hex };
                                    updateColorScheme(newScheme);
                                }
                            }
                            disableAlpha
                            presetColors={
                                [
                                    '#FFFFFF',
                                    '#00FFFF',
                                    '#FF00FF',
                                    '#FFFF00',
                                    '#FF0000',
                                    '#00FF00',
                                    '#0000FF',
                                ]
                            }
                        />
                    </Row>
                )
            }
        </div>
    );
}

