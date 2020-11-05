import React,{ useState, useEffect, useCallback} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

import axiosOrder from '../../axios_orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
 
    const ingredients =useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice =useSelector(state => state.burgerBuilder.totalPrice.toFixed(2))
    const error =useSelector(state => state.burgerBuilder.error)
    const isAuthenticated =useSelector(state => state.auth.token !== null )

    const onAddIngredients  = name => dispatch(actions.addIngredients(name));
    const onRemoveIngredients  = name => dispatch(actions.removeIngredients(name));
    const onInitIngredients  = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onPurchased  =() => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchase = (ingredients) => {
        const sum  = Object.keys(ingredients).map(ingkey => {
            return ingredients[ingkey];
        }).reduce((sum,element) =>{
            return sum + element;
        },0);
        return (sum > 0);
    }

    const orderHandler = () => {
        if(isAuthenticated){
            setPurchasing(true)
        }else{
            onSetAuthRedirectPath("/checkout");
            props.history.push('/auth');
        }
        
    }

    const orderCancelHandler = () => {
        setPurchasing(false);
    }

    const orderContinueHandler = () => {
        onPurchased();
        props.history.push('/checkout')
    }

    
    const disableButton = {
        ...ingredients
    };
    for (let key in disableButton){
        disableButton[key] = disableButton[key] <= 0;
    }

    let orderSummary = null

    let burger = error ? <p>The burger is unable to load</p> : <Spinner />

    if(ingredients){
        burger =(
            <Aux>
                <Burger ingredients = {ingredients}/>
                <BuildControls 
                    ingredientAdded ={onAddIngredients}
                    ingredientReduced ={onRemoveIngredients}
                    disableButton ={disableButton}
                    price={totalPrice}
                    purchasable = {updatePurchase(ingredients)}
                    order ={orderHandler}
                    isAuthenticated= {isAuthenticated}
                    />
            </Aux>)

        orderSummary = <OrderSummary 
        ingredients ={ingredients}
        totalPrice={totalPrice}
        oderCancelled ={orderCancelHandler}
        orderContinued ={orderContinueHandler}
        />
    }

    
    return(
        <Aux>
            <Modal show={purchasing} modalClose={orderCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
        
    )
    
    
}


export default withErrorHandler(burgerBuilder, axiosOrder);