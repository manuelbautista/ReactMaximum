import React, { PureComponent } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass'
// import ErrorBoundary  from './ErrorBoundary/ErrorBoundary';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('App.js inside constructor.', props);
    this.state = {
      persons: [
        {id:'0521', name: 'Max', age: 28},
        {id:'7986', name: 'Manuel', age: 29},
        {id:'0559', name: 'Lisa', age: 30}
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  
  }
  componentWillMount() {
    console.log('App.js inside ComponentWillMount ');
  }
  componentDidMount() {
    console.log('App.js inside componentDidMount()');
  }
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
//     return nextState.persons !== this.state.persons ||
//             nextState.showPersons !== this.state.showPersons;
// }
componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
}
static getDerivedStateFromProps(nextProps, prevState) {
  console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);

  return prevState;
}
getSnapshotBeforeUpdate() {
  console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');
}
componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
}
  switchNameHandler = (newName) => {
    //console.log('was clicked');
    //DONT DO THIS: this.state.persons[0].name = "Maxilium";
    this.setState({
      persons: [
        {name: newName, age: 28},
        {name: 'Manuel', age: 29},
        {name: 'Lisa', age: 18}
      ]
    })
  }
  
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;

    // no puedes usar this.state dentro de un setState
    //este es el best practive: prevState
    this.setState((prevState, props) =>  {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
     });
  }
  loginHandler = () => {
    this.setState({authenticated: true});
  }
  render() {
    console.log('App.js inside render()');

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let persons = null;
    
    if(this.state.showPersons) {
      persons = (
        <div> 
          <Persons persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    // isAuthenticated = {this.state.authenticated}
                    changed={this.nameChangedHandler}
                    />
      </div> 
      );
      style.backgroundColor = 'red';
    }

    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red']
    }
    if(this.state.persons.length <= 1){
      classes.push('bold'); // classes = ['red', 'bold']
    }
    return (  
      <WithClass class="App">
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons.</button>
          <Cockpit 
              appTitle= {this.props.title}
              classes={classes}
              login = {this.loginHandler}
              style ={style}
              clicked = {this.togglePersonsHandler}/>
              <AuthContext.Provider value={this.state.authenticated}>
                {persons}
              </AuthContext.Provider>
      </WithClass>
      
    );
  }
}

export default App;
