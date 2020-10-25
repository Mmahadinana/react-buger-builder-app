import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

const transformedIngredients = Object.keys(props.ingredients)
    .map( ingKey => { 
        console.log.apply('props.ingredients')
        return [...Array(props.ingredients[ingKey])].map(( _, i) => {
        return <BurgerIngredient key = {ingKey + i} type ={ingKey}/>
    })
}).reduce((prevarr,currel) => {
   
    return prevarr.concat(currel)
},[]);

//I there is mno ingredients
// if(transformedIngredients.length === 0){
//    return (<p>Start to build the burger</p>);
// } 

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type ='bread-top'/>
            {transformedIngredients.length === 0 ? "Start to build the burger": transformedIngredients} 
           <BurgerIngredient type ='bread-bottom'/>

        </div>
    )
}
export default burger;