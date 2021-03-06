import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent{ 
    // static getDerivedStateFromProps(props,state){
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // componentWillReceiveProps(props){
    //     console.log('[Persons.js] this.componentWillReceiveProps');
    // }
    
    // shouldComponentUpdate(nextProps,nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if( nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked){
    //             return true;
    //     }else{
    //             return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('[Persons.js] getSnapsotBeforeUpdate');
        return null;
    }

    componentDidUpdate(){
        console.log("[Persons.js] componentDidUpdate");
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount'
        )
    }
    
    render(){
        console.log('[Persons.js] rendering...');
        return  this.props.persons.map((person, index) => {
            //  return <ErrorBoundary > 
            return (<Person 
                isAuth = {this.props.isAuthenticated}
                click={()=>{this.props.clicked(index)}}
                name={person.name} 
                age={person.age}
                key={person.id}
                changed={(event) => {this.props.changed(event, person.id)}} />)
            // </ErrorBoundary>
            })}

    }
 
export default Persons;