import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSum = Object.keys(props.ingredients).map(ingKey => {
        return (<li key={ingKey}>
            <span style={{textTransform:'capitalize'}}>{ingKey}</span>:
            <span style={{margin:'0px 5px'}}>{props.ingredients[ingKey]}</span>
            </li>)
    })
    return(
        <Aux>
            <h3>You Ordered</h3>
            <p>You have order the following:</p>
            <ul>
                {ingredientsSum}
            </ul>

    <p><ins><strong>Total Price: {props.totalPrice}</strong></ins></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={props.oderCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.orderContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;