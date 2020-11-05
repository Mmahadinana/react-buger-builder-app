import React, { useEffect, Suspense} from 'react';
import './App.css';
import Layout from '../hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from "../store/actions/index";

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Logout from '../containers/Auth/Logout/Logout'

const Checkout = React.lazy(() => {
  return import('../containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('../containers/Orders/Orders');
})
const Auth = React.lazy(() => {
  return import('../containers/Auth/Auth');
})
const app = props => {
  const { onAuthCheckState } = props;
  useEffect(() => {
    onAuthCheckState();
  },[onAuthCheckState])
 
    let routes =(
      <Switch>
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
      
    )
    if(props.isAuthenticated){
        routes = (
        
         <Switch>
            <Route path='/checkout' render={(props) => <Checkout {...props} />} />
            <Route path='/orders' render={(props) => <Orders {...props} />} />
            <Route path='/auth' render={(props) => <Auth {...props} />} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/' />
          </Switch>
          )
    }
    return (
      <div>
      <Layout>
          <Suspense fallback={<span>...Loading</span>}>{routes}</Suspense>
      </Layout>
      </div>
    );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(app));
