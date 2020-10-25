import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';
import {updatedObj, checkValidation} from '../../shared/utility'

class Auth extends Component {

    state ={
        controls : {
            email:{
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder: "Email Address"
                    },
                value:"",
                validation:{
                    required:true,
                    isEmail:true,
                    },
                    touched:false,
                valid:false
            },
            password:{
                elementType:'input',
                elementConfig: {
                    type:'password',
                    placeholder: "Password",
                    minLength:6,
                    },
                value:"",
                validation:{
                    required:true
                    },
                touched:false,
                valid:false
            },
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.redirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidation(value, rules){
        let isValid = true;

        if(!rules){
            isValid=true;
        }

        if(rules.required){
            isValid=value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event,controlName) =>{
        const updatedControls= updatedObj(this.state.controls,{
            [controlName]: updatedObj(this.state.controls[controlName],{
                    value: event.target.value,
                    valid: checkValidation(event.target.value,this.state.controls[controlName].validation),
                    touched:true
                }),
            })

        this.setState({controls:updatedControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render(){
        const formElement =[];

        for(let key in this.state.controls){
            
            formElement.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElement.map(element =>(
            <Input
                key={element.id}
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value} 
                invalid={!element.config.valid}
                validate={element.config.validation}
                            touched={element.config.touched}
                            // errorMessage ={element.config.validationError}
                change={(event) => this.inputChangeHandler(event, element.id)}
                />

               
        ))
        if(this.props.loading){
            form= <Spinner />
        }

        let errorMessage = null;
        
        if(this.props.error){
            errorMessage = (
            <p style={{'color':'red'}}>{this.props.error.message}</p>
            )
        }

        let authenticated = null;
        if(this.props.isAuthenticated){
            authenticated = <Redirect to={this.props.redirectPath} />
        }
        return(
            <div className={classes.Auth}>
                <h3>Login</h3>
                <hr/>
                {authenticated}
                {errorMessage}
                <form onSubmit= { this.onSubmitHandler}>
                    {form}

                     <Button btnType='Success'>Submit</Button>
                     
                </form>
                <Button clicked = {this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin : (email, password, isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);