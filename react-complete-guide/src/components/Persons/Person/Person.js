import React, {Component} from 'react';
import './Person.css';
import WithClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import {AuthContext} from '../../../containers/App';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('Person.js inside constructor.', props);  

        this.inputElement = React.createRef();   
      }
      componentWillMount() {
        console.log('Person.js inside ComponentWillMount ');
      }
      componentDidMount() {
        console.log('Person.js inside componentDidMount()');
        if(this.props.position == 0) {
            this.inputElement.current.focus();
        }
        
      }
focus() {
    this.input.current.focus();
}
    render () {
        console.log('Person.js inside render()');
            return ( 
                <WithClass class="Person">
                <AuthContext.Consumer>
                    {auth => auth ? <p> Iam authenticated! </p> : null}
                    {/* {this.props.authenticated ? <p> Iam authenticated! </p> : null} */}
                </AuthContext.Consumer>
                    <p onClick={this.props.click}>I am {this.props.name} I am {this.props.age} years old</p>
                    <p> {this.props.children} </p>
                    <input                        
                        type="text" 
                        ref={this.inputElement}  
                        onChange={this.props.changed} 
                        value={this.props.name} />
                </WithClass>
        )
        
    }

} 
Person.PropTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age:PropTypes.number ,
    changed: PropTypes.func
};
export default Person;