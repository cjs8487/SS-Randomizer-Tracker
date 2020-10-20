import React from 'react';
import noBeetle from '../../assets/Beetle_Silhouette.png'
import beetle from '../../assets/Beetle_Icon.png'
import hookBeetle from '../../assets/Hook_Beetle_Icon.png'

export default class Beetle extends React.Component {

    render() {
        return <div id="beetle-item">
            {
                this.props.current === 0 &&
                    <img src={noBeetle} onClick={super.state.items.beetle = 1} alt={"No Beetle"}/>
            }
            {
                this.props.current === 1 &&
                    <img src={beetle} onClick={super.state.items.beetle = 2} alt={"Beetle"}/>
            }
            {
                this.props.current === 2 &&
                    <img src={hookBeetle} onClick={super.state.items.beetle = 0} alt={"Hook Beetle"}/>
            }
        </div>;
    }
}
