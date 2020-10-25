import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {purchaseBurger} from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios_orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updatedObj,checkValidation} from '../../../shared/utility'

class ContactData extends Component{
    state ={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Name"
                    },
                value:"",
                validation:{
                    required:true
                    },
                    touched:false,
                valid:false
            },
            email:{
                elementType:'input',
                elementConfig: {
                    type:'email',
                    isEmail:true,
                    placeholder: "Email"
            }
            ,value:"",
            validation:{
                required:true
            },
            touched:false,
            valid:false
        },
            number:{
                elementType:'input',
                elementConfig: {
                    type:'number',
                    placeholder: "Contact Number"
            }
            ,value:"",
            validation:{
                required:true
            },
            touched:false,
            valid:false
        },
            street:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Street"
            }
            ,value:"",
            validation:{
                required:true
            },
            touched:false,
            valid:false
        },
            zipCode:{
                elementType:'input',
                elementConfig: {
                    type:'number',
                    placeholder: "ZIP Code"
            }
            ,value:"",
            validation:{
                required:true,
                minLength:5,
                maxLength:5,
                isNumeric: true
            },
            touched:false,
            valid:false
        },
            country:{
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder: "Country"
                }
            ,value:"",
            validation:{
                required:true
            },
            touched:false,
            valid:false
        },
            delivery:{
                elementType:'select',
                elementConfig: {
                    options:[
                            { value:'Normal', displayValue:'Normal'},
                            { value:'Fast', displayValue:'Fast'},
                            { value:'Fastest', displayValue:'Fastest'},
                        ]
            }
            ,value:"Normal",
            valid:true,
            validation:{}
            },
        },
        formIsValid:false
    }

    orderHandler = (event) => {
        event.preventDefault();
       
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            orderData:formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, inputIdentifier) => {

       
        const newFormElement =updatedObj(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid: checkValidation(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        });
        const newOrderForm =updatedObj(this.state.orderForm,{
            [inputIdentifier]: newFormElement
        });

        let formValid = true;
        for(let inputIdentify in newOrderForm){
            formValid = newOrderForm[inputIdentify].valid && formValid
            
        }
        this.setState({orderForm:newOrderForm, formIsValid:formValid});
    }
    render(){

        const formElement =[];

        for(let key in this.state.orderForm){
            
            formElement.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
       
        let form = (
            <form onSubmit={this.orderHandler}>
                    {
                    formElement.map(element => (
                        <Input 
                            key={element.id} 
                            elementType={element.config.elementType} 
                            elementConfig={element.config.elementConfig} 
                            value={element.config.value} 
                            invalid={!element.config.valid}
                            validate={element.config.validation}
                            touched={element.config.touched}
                            // errorMessage ={element.config.validationError}
                            change={(event) => this.inputChangeHandler(event, element.id)}/>
                    ))
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h3> Enter Contact Details</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));