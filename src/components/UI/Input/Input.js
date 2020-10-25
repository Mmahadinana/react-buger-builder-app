import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputEle = null;
    let validationError= null;
    const inputClasses =[classes.InputEle]

    if(props.invalid && props.touched){
        validationError= <p className={classes.ValidationError}>Please enter a valid {props.elementType}!</p>;
    }

    if(props.invalid && props.validate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType) {
        case('input'):
            inputEle = <input className={inputClasses.join(' ')} {...props.elementConfig}  onChange={props.change} value={props.value}/>
            break;
        case('textarea'):
            inputEle = <textarea className={inputClasses.join(' ')} {...props.elementConfig}  onChange={props.change} value={props.value}/>
            break;
        case('select'): 
            inputEle = (
                <select  
                    className={inputClasses.join(' ')} 
                    onChange={props.change} 
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                           {option.displayValue}
                        </option>
                    ))}
                 </select>
            )
            break;
        default:
            inputEle = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEle}
            {validationError}

            
        </div>
    )
}

export default input;