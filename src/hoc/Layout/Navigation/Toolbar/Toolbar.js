import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawToggle from '../SideDraw/SideDrawToggle/SideDrawToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <SideDrawToggle click={props.sideDrawClicked} />
        {/* <Button click={props.openSideDraw}>Menu</Button> */}
        {/* Other approach */}
        {/* <Logo height="80%"/> */}
         <div className={classes.Logo}>
            <Logo />
         </div>
        <nav className={classes.Desktop}>
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
        
    </header>
);

export default toolbar;