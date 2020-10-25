import React from 'react';

import classes from './Button.css';

const button = (props) => (
    
    <button 
    //this will display danger or success types
   
        disabled= {props.disabled}
        className= {[classes.Button,classes[props.btnType]].join(' ')}
        onClick= {props.clicked}>
       {props.children}
    </button>
)
export default button;