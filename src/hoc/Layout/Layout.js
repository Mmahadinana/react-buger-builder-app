import React, {useState} from 'react';
import Aux from '../Aux/Aux';
import {connect} from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../Layout/Navigation/Toolbar/Toolbar';
import SideDraw from '../Layout/Navigation/SideDraw/SideDraw';


const layout = props => {

   const [showSideDraw,setShowSideDraw] = useState(false)
   
   const closeSideDrawHandler = () => {
        setShowSideDraw(false);
    }

    const sideDrawClickHandler = () => {
       setShowSideDraw(!showSideDraw);
        // this.setState((prevSideDrawState) => {
        //     return{showSideDraw :!prevSideDrawState.showSideDraw};
        // })
    }

  
        return(
            <Aux>
                <Toolbar 
                    sideDrawClicked={sideDrawClickHandler}
                    isAuthenticated={props.isAuthenticated}/>
                <SideDraw 
                    closeSideDraw={closeSideDrawHandler}
                    isAuthenticated={props.isAuthenticated}
                    openSideDraw={showSideDraw}/>
                <main className={classes.Content}>
                    {props.children}
                    </main>
            </Aux>
        )
    
}

const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout);