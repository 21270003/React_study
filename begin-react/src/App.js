import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function MyHeader( props ){
  return(
    <header>
      <h2><a href="/" onClick={function( event ){ 
      event.preventDefault(); props.onFirstEvent();
      
    }} > { props.title } </a></h2>
    </header>
  );
}

function MyArticle( props ){
  return(
    <article>
      <h2> { props.title} </h2> { props.body }
    </article>
  );
}

function MyNav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={'/read/' + t.id} onClick={(event) => {
          event.preventDefault(); 
          props.onMyEvent(Number(event.target.id)); 
        }}>
          {t.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        alert(title + '::' + body);
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder='title...' /></p>
        <p><textarea name="body" cols="50" rows="8" placeholder='body...'></textarea></p>
        <p><input type="submit" value="create" /></p>
      </form>
    </article>
  );
}

function Update( props ){
  const[title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        alert('UPDATE:: title ='+ title + '::body' + body);
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" value ={title} 
        onChange={event=>{ 
          
          setTitle(event.target.value);
          }}/></p>
        <p><textarea name="body" cols="50" rows="8" placeholder="body" value={body} onChange ={event =>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
 
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);

  let content = null;
  let contextControl = null;
  
  if (mode === 'WELCOME') {
    content = <MyArticle title="Welcome" body="Hello, Web" />;
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title;
        body = topics[i].body; 
      }
    }
    content = <MyArticle title={title} body={body}></MyArticle> 
    contextControl = <div>
      <p><a href = {'/update/'+id} onClick={ event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></p>

    <p><a href = {'/delete/'+id} onClick={ event=>{
      event.preventDefault();
      alert('Delete');
      const newTopics = [];
      for(let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
    }}>Delete</a></p>
    </div>

  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }; 
      const newTopics = [...topics, newTopic];
      topics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }} />;
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title;
        body = topics[i].body; 
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:title, body:body }
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
    }}></Update>
  }
 
  return (
    <div align="center">
      <MyHeader data="abc" title="REACT..."  
        onFirstEvent={function() { 
          setMode('WELCOME'); 
        }}
      />

      <MyNav topics={topics} 
        onMyEvent={function(id) { 
          setMode('READ'); 
          setId(id);
        }}>
      </MyNav>

      { content }
      <ul>
        <li><a href="/create" onClick={function(event) {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
