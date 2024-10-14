import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter, Route, Routes, Link, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

const select_descriptiontyledButton = styled.button`
    color: 'white';
    background: 'purple';
`;


const ReactButton = (props)=> {
  const buttonstyle = {
    color:'white',
    backgroundColor: 'purple'
  }
  return <button style = {buttonstyle} > {props.children} </button>
}


function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home...
    </div>
  )
}
var contents = [
  {id:1, title:'HTML', description:'HTML is...'},
  {id:2, title:'JS', description:'JS is...'},
  {id:3, title:'React', description:'React is...'},
]

function Topic(){
  const params = useParams();
  let select_id = Number( params.topic_id );

  let select_title = 'Topic';
  let select_description = 'Topic....';
  for(let i=0; i<contents.length; i++){
    if( contents[i].id === select_id){
      select_title = contents[i].title;
      select_description = contents[i].description;
    }
  }
  return(
    <div>
      <h3>{select_title}</h3>
      {select_description}
    </div>
  )
}

function Topics(){
  var lis = [];
  for (var i=0; i<contents.length; i++){
    lis.push(
      <li><Link to = {"/topics/" + contents[i].id}>{contents[i].title}</Link></li>
    )
  }
  return(
    <div>
      <h2>Topics</h2>
      <ul>
       {lis}
      </ul>
      <Routes>
        <Route path = "/:topic_id" element={<Topic />} />
      </Routes>
    </div>
  )
}

function Contact(){
  return(
    <div>
      <h2>Contact</h2>
      contact...
    </div>
  )
}

function App(){
  return(
    <div>
      <h1>Home React Dom</h1>
      <ul>
        <li><NavLink to ="/">Home</NavLink></li>
        <li><NavLink to = "/topics">Topics</NavLink></li>
        <li><NavLink to = "/contact">Contact</NavLink></li>
      </ul>
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/topics/*" element = {<Topics />}/>
      <Route path="/contact" element = {<Contact />}/>
      <Route path="/*" element = {'Not Found'}/>
    </Routes>
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
reportWebVitals();
