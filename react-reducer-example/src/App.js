import logo from './logo.svg';
import './App.css';
import React, { useState,useReducer } from 'react';


function App() {
  //const [count, setCount]=useState(0);
  const [amount, amountDispatch] = useReducer(amountReducer, 0);


  function amountReducer(oldCount, action){
    if( action.type ==='DOWN'){
        return(oldCount-action.subNumber);
    }else if( action.type ==='RESET'){
      return 0;
    }else if( action.type ==='UP'){
      return(oldCount+action.addNumber);
    }
  }

  function down(){
    amountDispatch({type:'DOWN', addNumber:plusNumber, subNumber:minusNumber});
  }
  function reset(){
    amountDispatch({type:'RESET', addNumber:0, subNumber:minusNumber});
  }
  function up(){
    amountDispatch({type:'UP', addNumber:plusNumber, subNumber:minusNumber});
  }

  const [minusNumber, setMinusNumber] = useState(1);
  function changeMinusNumber(event){
    setMinusNumber(Number(event.target.value));
  }
  const [plusNumber, setPlusNumber] = useState(1);
  function changePlusNumber(event){
    setPlusNumber(Number(event.target.value));
  }

  return (
    <div align="center">
      <input type="text" value={ minusNumber } size="3" onChange={changeMinusNumber} />
      <input type="button" value="-" onClick={down} />
      <input type="button" value="0" onClick={reset} />
      <input type="button" value="+" onClick={up}/>
      <input type="text" value={ plusNumber } size="3" onChange={changePlusNumber} />
      <p><span> { amount } </span></p>
    </div>
  );
}

export default App;
