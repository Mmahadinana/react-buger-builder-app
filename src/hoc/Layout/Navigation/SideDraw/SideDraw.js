import React from 'react';

import Logo from '../../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDraw.css';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';

import Aux from '../../../Aux/Aux';


const sideDraw = props => {

let attachedClasses = [classes.SideDraw, classes.Close];

if(props.openSideDraw){
    attachedClasses = [classes.SideDraw, classes.Open];
}
    return(
        <Aux>
            <Backdrop show={props.openSideDraw} click={props.closeSideDraw}/>
            <div className={attachedClasses.join(' ')} onClick={props.closeSideDraw}>
                {/* other approach */}
                {/* <Logo height='11%'/> */}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuthenticated}/>
                </nav>

            </div>
        </Aux>
    )
}

export default sideDraw;