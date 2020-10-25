import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import axiosOrder from '../../axios_orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


export class BurgerBuilder extends Component{
//  constructor(props){
//      super(props);
//      this.state = {
    state= {
        purchasing:false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }
    updatePurchase = (ingredients) => {
        const sum  = Object.keys(ingredients).map(ingkey => {
            return ingredients[ingkey];
        }).reduce((sum,element) =>{
            return sum + element;
        },0);
        return (sum > 0);
    }

    orderHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push('/auth');
        }
        
    }

    orderCancelHandler = () => {
        this.setState({purchasing:false})
    }

    orderContinueHandler = () => {
        this.props.onPurchased();
        this.props.history.push('/checkout')
    }

    render(){
        const disableButton = {
            ...this.props.ingredients
        };
        for (let key in disableButton){
            disableButton[key] = disableButton[key] <= 0;
        }

        let orderSummary = null

        let burger = this.props.error ? <p>The burger is unable to load</p> : <Spinner />

        if(this.props.ingredients){
            burger =(
                <Aux>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls 
                     ingredientAdded ={this.props.onAddIngredients}
                     ingredientReduced ={this.props.onRemoveIngredients}
                     disableButton ={disableButton}
                     price={this.props.totalPrice}
                     purchasable = {this.updatePurchase(this.props.ingredients)}
                     order ={this.orderHandler}
                     isAuthenticated= {this.props.isAuthenticated}
                     />
                </Aux>)

            orderSummary = <OrderSummary 
            ingredients ={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            oderCancelled ={this.orderCancelHandler}
            orderContinued ={this.orderContinueHandler}
            />
        }

       
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
            
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice.toFixed(2),
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredients : (name) => dispatch(actions.addIngredients(name)),
        onRemoveIngredients : (name) => dispatch(actions.removeIngredients(name)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onPurchased :() => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));