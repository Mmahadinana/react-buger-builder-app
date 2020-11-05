import React from 'react';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const checkout = props => {

   const checkoutCancelHandler = () => {
        props.history.goBack()
    }

    const checkoutContinueHandler = () => {
        props.history.replace('checkout/contact-data')
    }
   
    let summary = <Redirect to='/' />
    if(props.ingredients){
        const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    ingredients ={props.ingredients} 
                    checkoutCancelled = {checkoutCancelHandler}
                    checkoutContinued = {checkoutContinueHandler}
                />
                <Route path={props.match.path +'/contact-data'} 
                    component= {ContactData}/>
            </div>
        )
    }

    return summary ;
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(checkout);