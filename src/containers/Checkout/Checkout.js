import React, { Component } from 'react';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    componentWillMount = () => {
    //    this.props.onCheckout()
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack()

    }

    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data')
    }
    
    render(){
        let summary = <Redirect to='/' />
        if(this.props.ingredients){
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients ={this.props.ingredients} 
                        checkoutCancelled = {this.checkoutCancelHandler}
                        checkoutContinued = {this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.path +'/contact-data'} 
                        component= {ContactData}/>
                </div>
            )
        }

        return summary ;
         
       
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);