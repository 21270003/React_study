import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useStore, useSelector, Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';


function reducer(currentState, action){
  if( currentState === undefined ){
    return {number: 1,};
  }
  const newState = {...currentState};
  if( action.type === 'PLUS'){
    newState.number++;
  }else  if( action.type === 'MINUS'){
    newState.number--;
  }
  return newState ;
}

const myStore = createStore(reducer);

function Left1(props){
  return(
    <div>
      <h2>Left1</h2>
      <Left2></Left2>
    </div>
  );
}

function Left2(props){
  return(
    <div>
      <h2>Left2</h2>
      <Left3></Left3>
    </div>
  );
}

function Left3(props){
  const curNumber = useSelector((state) => {return state.number;} );
  return(
    <div>
      <h2>Left3...{curNumber} </h2>
    </div>
  );
}

function Right1(props){
  return(
    <div>
      <h2>Right1</h2>
      <Right2></Right2>
    </div>
  )
}
function Right2(props){
  const myDispatch = useDispatch();
  return(
    <div>
      <h2>Right2</h2>
      <input type='button'
        onClick={()=>{
          myDispatch({ type: 'MINUS'});
          }}></input>
      <Right3></Right3>
    </div>
  )
}
function Right3(props){
  const myDispatch = useDispatch();
  return(
    <div>
      <h2>Right3</h2>
      <input type='button'
        onClick={()=>{
          myDispatch({ type: 'PLUS'});
          }}></input>
    </div>
  )
}

function App() {
  const [number, setNumber] = useState(1);
  return (
    <div id='container'>
      <h2>React-Redux</h2>
      <div id='grid'>
        <Provider store={myStore}>
          <Left1 ></Left1>
          <Right1 ></Right1>
        </Provider>
      </div>
    </div>
  );
}



export default App;
