import React from 'react';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
    return (
        // this is an hoc component to avoid <div>
        <Aux>  
            <h1>{props.appTitle}</h1>
            <p className={props.classes.join(' ')}> this is really working! </p>
            <button style={props.style} 
            onClick={props.clicked}>Toggle Persons </button>
            <button onClick={props.login}> Log in </button>
        </Aux>
    );
}

export default cockpit;