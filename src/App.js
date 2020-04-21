import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component{


state = {
  list: [
  ],
  input: '',
  newList: [],
  }
onInputChange = (event) => {

  this.setState({input:event.target.value})
}
onClicked = () => {
  console.log(this.state.input)
  this.setState(prevState => ({
    list: [...prevState.list, {text: this.state.input,done:false}]
  }))
  // this.state.list.push({text:this.state.input, done: false})
  console.log(this.state.list)

}
componentDidMount = () => {
  let newData = this.state.list
  this.setState({newList:newData})
  console.log(this.state.newList)
  this.forceUpdate()
}
deleteItem = (index) => {
  let arr = this.state.list
  arr.splice(index,1)
  this.setState({list:arr})
  console.log(this.state.list.length)
  
}
changeToDone = (index) => {
  console.log(this.state.list[index].done)
  let list = this.state.list
  let done = this.state.list[index]
  
  if(done.done === false){
    done.done = true
    console.log(done.done)
  }
  else{
    done.done = false
    console.log(done.done)
  }
  
  this.setState({list})
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "todo-list">
          <h1>To Do List</h1>         
          {(this.state.list != 0)? (this.state.list.map((todo,index)=>
              <div key={index} onClick={() => this.changeToDone(index)}>{todo.text} {todo.done?'[X]':'[ ]'}</div><div></div>)):(<div>Nothing to do</div>)}
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
