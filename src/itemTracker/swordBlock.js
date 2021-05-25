import React from 'react';
import Item from './Item';
import swordBlock from '../assets/Sword_Block.png'
import noSword from '../assets/swords/No_Sword.png'
import practiceSword from '../assets/swords/Practice Sword.png'
import goddessSword from '../assets/swords/Goddess Sword.png'
import longSword from '../assets/swords/Goddess Long Sword.png'
import whiteSword from '../assets/swords/Goddess White Sword.png'
import masterSword from '../assets/swords/Master Sword.png'
import trueMasterSword from '../assets/swords/True Master Sword.png'
import noFlame from '../assets/swords/No_Farores_Flame.png'
import faroresFlame from '../assets/swords/Farores_Flame.png'
import nayrusFlame from '../assets/swords/Nayrus_Flame.png'
import dinsFlame from '../assets/swords/Dins_Flame.png'


export default class SwordBlock extends React.Component {

    constructor(props) {
        super(props);
        this.swordImages = [
            noSword,
            practiceSword,
            goddessSword,
            longSword,
            whiteSword,
            masterSword,
            trueMasterSword,
        ]
        this.faroresFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            faroresFlame,
            faroresFlame,
            faroresFlame,
            faroresFlame,
        ]
        this.nayrusFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            nayrusFlame,
            nayrusFlame,
            nayrusFlame,
        ]
        this.dinsFlameImages = [
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            noFlame,
            dinsFlame,
            dinsFlame,
        ]
    }
    
    render() {
        let wid = this.props.styleProps.width

        const swordStyle = {
            position: 'relative',
            bottom: (wid/.85 - 1/wid),
            left: wid/16
        }        
        
        const faroresFlameStyle = {
            position: 'relative',
            bottom: (wid/1.07 - 1/wid),
            left: wid/1.36
        }     

        const nayrusFlameStyle = {
            position: 'relative',
            bottom: (wid/1.12 - 1/wid),
            left: wid/20
        }

        const dinsFlameStyle = {
            position: 'relative',
            bottom: (wid/.69 - 1/wid),
            left: wid/2.55
        }

        const swordWidth = this.props.styleProps.width / 1.1
        const flameWidth = this.props.styleProps.width / 4.4;

        return  <div id={"BWheel"}>
                    <img src={swordBlock} alt={""} width={wid}/>
                    <div id={"sword"} style={swordStyle}>
                        <Item itemName="Progressive Sword" images={this.swordImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={swordWidth}/>
                    </div>
                    <div id={"faroresFlame"} style={faroresFlameStyle}>
                        <Item itemName="Progressive Sword" images={this.faroresFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth}/>
                    </div>
                    <div id={"nayrusFlame"} style={nayrusFlameStyle}>
                        <Item itemName="Progressive Sword" images={this.nayrusFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth}/>
                    </div>                    
                    <div id={"dinsFlame"} style={dinsFlameStyle}>
                        <Item itemName="Progressive Sword" images={this.dinsFlameImages} logic={this.props.logic} onChange={this.props.handleItemClick} imgWidth={flameWidth}/>
                    </div>
                </div>

    }
}
