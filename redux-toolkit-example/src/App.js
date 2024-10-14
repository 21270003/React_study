import logo from './logo.svg';
import './App.css';
import {createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import myStore from './store';
import mySlice from './slice';


function Counter( props ){
  const myCount = useSelector((state) => { return state.counter.value });
  const myDispatch = useDispatch();
  return (
    <div>
      <button onClick={() => {
        myDispatch({ type: 'countSlice/up', step: 2 });
      }}>+</button> {myCount}
    </div>
  );
}


function App() {
  return (
    <Provider store={myStore}>
      <div align='center'>
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
