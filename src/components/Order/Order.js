import React from 'react';
import classes from './Order.css'

const order = (props) => {
   const ingredients = [];
   for (let ingredientName in  props.ingredients){
       ingredients.push({
           name:ingredientName,
           amount:props.ingredients[ingredientName]
       })
   }

   const ingredientOutput = ingredients.map(ingredient => {
            return <span style={{
                textTransform:"capitalize", display:'inline',border:'1px solid #55ccaa', padding:'5px',margin:'15px'
            }} key ={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
        })
   return( <div className={classes.Order}>
       {ingredientOutput}
        <p> Price : <strong> ZAR {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            </div>)
}

export default order;