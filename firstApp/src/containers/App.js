import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import AuthContext from '../context/auth-context';

class App extends Component {


    constructor(props){
      super(props); 
      console.log('[App.js] constructor');
    }

    state ={
      persons: [
        {id: 'asd', name: 'Max', age: 28},
        {id: 'agdsfg', name: 'Manu', age: 29},
        {id: 'asfgs3', name: 'Stephanie', age: 26},
      ],
      showPersons: false,
      showCockpit: true,
      otherState: 'some other value',
      changedCounter: 0,
      authenticated: false
    };

    static getDerivedStateFromProps(props, state) { 
      console.log('[App.js] getDerivedStateFromProps', props)
      return state;
    }

    deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.slice();
      const persons = [...this.state.persons];
      persons.splice(personIndex,1);
      this.setState({persons: persons});
    }

    componentDidMount(){
      console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProp,nextState){
      console.log('[App.js] shouldComponentUpdate');
      return true;
    }

    componentDidUpdate(){
      console.log('[App.js] componentDidUpdate')
    }

    nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id===id;
      })

      // const person = Object.assign({}, this.state.persons[person])
      const person = {
        ...this.state.persons[personIndex]
      };

      person.name=event.target.value;

      const persons = [...this.state.persons];
      persons[personIndex] = person;
      
      
      this.setState((prevState,props)=>{return {
        persons: persons, 
        changedCounter: prevState.changedCounter + 1
      }});
    }

    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
    }

    loginHandler = () => {
      this.setState({authenticated: true})
    }

    render(){
      console.log('[App.js] render');
      let persons = null;

      if (this.state.showPersons) {
        persons = (  
            <Persons 
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}
              isAuthenticated = {this.state.authenticated}
            />
        )
        
      }

      return (
          <Aux>
            <button onClick={()=>{this.setState({showCockpit:false})}}>Remove Cockpit</button>
            <AuthContext.Provider value={{
               authenticated: this.state.authenticated, 
               login: this.loginHandler,
            }}>
              {this.state.showCockpit ? 
                <Cockpit 
                  login={this.loginHandler}
                  title={this.props.appTitle}
                  showPersons={this.state.showPersons}
                  personsLength={this.state.persons.length}
                  clicked={this.togglePersonsHandler}
                /> : null}
              {persons}
            </AuthContext.Provider>
          </Aux>       
      );
    }
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
}

export default withClass(App, classes.App);
