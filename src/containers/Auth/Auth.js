import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';
import {updatedObj, checkValidation} from '../../shared/utility'

const auth = props => {
    const  [controls,setControls] = useState({
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
                });
    const [isSignup, setIsSignup]=useState(true);
    const {onSetAuthRedirectPath,buildingBurger, redirectPath} = props;
    useEffect(() => {
        if(!buildingBurger && redirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[onSetAuthRedirectPath]);

    const inputChangeHandler = (event,controlName) => {
        const updatedControls= updatedObj(controls,{
            [controlName]: updatedObj(controls[controlName],{
                    value: event.target.value,
                    valid: checkValidation(event.target.value,controls[controlName].validation),
                    touched:true
                }),
            })

        setControls(updatedControls);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        props.onLogin(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }
    
    const formElement =[];

    for(let key in controls){
        
        formElement.push({
            id:key,
            config:controls[key]
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
            change={(event) => inputChangeHandler(event, element.id)}
            />     
    ))
    if(props.loading){
        form= <Spinner />
    }

    let errorMessage = null;
    
    if(props.error){
        errorMessage = (
        <p style={{'color':'red'}}>{props.error.message}</p>
        )
    }

    let authenticated = null;
    if(props.isAuthenticated){
        authenticated = <Redirect to={props.redirectPath} />
    }
    return(
        <div className={classes.Auth}>
            <h3>Login</h3>
            <hr/>
            {authenticated}
            {errorMessage}
            <form onSubmit= { onSubmitHandler}>
                {form}

                    <Button btnType='Success'>Submit</Button>
                    
            </form>
            <Button clicked = {switchAuthModeHandler} btnType="Danger">Switch to {isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
        </div>
    )
    
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

export default connect(mapStateToProps, mapDispatchToProps) (auth);