import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component{


state = {
  list: [
  {text: "Buy eggs", done: false},
  {text: "Buy milk", done: true},
  ]
  }

render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "todo-list">
          <h1>To Do List</h1>
          <ul>
          {this.state.list.map((todo,index)=>
              <li key={index}>{todo.text}</li>
            
            )}
          
          </ul>
          <div className='input'>
            <form className='input-todo'>
              <input type='text' className='todo-item'></input>
              <input type='submit' className='todo-button'></input>
            
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}
}
export default App;
