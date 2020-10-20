import React from 'react';
import noBeetle from '../../assets/Beetle_Silhouette.png'
import beetle from '../../assets/Beetle_Icon.png'
import hookBeetle from '../../assets/Hook_Beetle_Icon.png'

export default class Beetle extends React.Component {

    render() {
        return <div id="beetle-item">
            {
                this.props.state === 0 &&
                    <img src={noBeetle} onClick={super.state.beetle = 1} alt={"No Beetle"}/>
            }
            {
                this.props.state === 1 &&
                    <img src={beetle} onClick={super.state.beetle = 2} alt={"Beetle"}/>
            }
            {
                this.props.state === 2 &&
                    <img src={hookBeetle} onClick={super.state.beetle = 0} alt={"Hook Beetle"}/>
            }
        </div>;
    }
}
