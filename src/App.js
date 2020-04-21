import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component{


state = {
  list: [
  {text: "Buy eggs", done: false},
  {text: "Buy milk", done: true},
  ],
  input: ''
  }
onInputChange = (event) => {

  this.setState({input:event.target.value})
}
onClicked = () => {
  console.log(this.state.input)
  this.state.list.push({text:this.state.input, done: false})
  console.log(this.state.list)

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
              <input type='text' className='todo-item' value={this.state.input} onChange={this.onInputChange}></input>
              <input type='submit' className='todo-button' onClick={()=> this.onClicked()}></input>
          </div>
        </div>
      </header>
    </div>
  );
}
}
export default App;
