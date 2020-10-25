import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Burger Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctr =>(
           
            <BuildControl
             key={ctr.label}
             label={ctr.label}
             addMore ={() => props.ingredientAdded(ctr.type)}
             remove ={() => props.ingredientReduced(ctr.type)}
             disable={props.disableButton[ctr.type]}
             />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.order}>{props.isAuthenticated ? "Order Now" : "Sign Up to Order"} </button>
    </div>
);

export default buildControls;