import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import {connect} from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../Layout/Navigation/Toolbar/Toolbar';
import SideDraw from '../Layout/Navigation/SideDraw/SideDraw';


class Layout extends Component{

    state= {
        showSideDraw:true
    }
    closeSideDrawHandler = () => {
        this.setState({showSideDraw:false})
    }

    sideDrawClickHandler = () => {
        this.setState((prevSideDrawState) => {
            return{showSideDraw :!prevSideDrawState.showSideDraw};
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    sideDrawClicked={this.sideDrawClickHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDraw closeSideDraw={this.closeSideDrawHandler}
                     isAuthenticated={this.props.isAuthenticated}
                     openSideDraw={this.state.showSideDraw}/>
                <main className={classes.Content}>
                    {this.props.children}
                    </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);