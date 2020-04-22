import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Emoji = props => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
)



class App extends Component{


state = {
  list: [{text: "Buy eggs", notes:'empty',done: false},
  {text: "Buy milk", notes:'empty',done: true},
  ],
  input: '',
  textInput:'',
  newList: [],
  modal:false,
  modalContent:[],
  modalIndex:null,
  modalInput:"",
  modalTextInput:''
  }
onInputChange = (event) => {

  this.setState({input:event.target.value})
}
onTextInputChange = (event) => {
  this.setState({textInput:event.target.value})
}
onModalInputChange = (event) => {

  this.setState({modalInput:event.target.value})
}
onModalTextInputChange = (event) => {
  this.setState({modalTextInput:event.target.value})
}
onClicked = () => {
  console.log(this.state.input)
  this.setState(prevState => ({
    list: [...prevState.list, {text: this.state.input,notes:this.state.textInput,done:false}]
  }))
  // this.state.list.push({text:this.state.input, done: false})
  console.log(this.state.list)

}
// componentDidMount = () => {
//   let newData = this.state.list
//   this.setState({newList:newData})
//   console.log(this.state.newList)
//   this.forceUpdate()
// }
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
showModal = index => {
  console.log(index)
  this.setState({modal:true})
  let modalList = (this.state.list[index])
  this.state.modalContent = modalList
  console.log(this.state.modalContent)
  console.log(this.state.modalContent.text)
  this.setState({modalIndex:index})
  this.setState({modalContent : modalList})
}
onEdit = (index) => {
  let list = this.state.list
  list.splice(index, 1 , {text:this.state.modalInput,notes:this.state.modalTextInput,done:false})
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "todo-list">
          <h1>To Do List</h1>         
          {(this.state.list != 0)? (this.state.list.map((todo,index)=>
              <div key={index} ><span onClick={()=> this.showModal(index)}>{todo.text} </span>
              <button onClick={() => this.changeToDone(index)}>{todo.done?<Emoji label="sheep" symbol="✅"/>:'❌'}</button>
              <button onClick={()=> this.onClicked(index)}>Delete</button></div>
              )):(<div>Nothing to do</div>)}
          <div className='input'>
              <input type='text' className='todo-item' value={this.state.input} onChange={this.onInputChange}></input><br></br><br></br>
              <textarea placeholder='add notes' name="message" rows="10" cols="30" value={this.state.textInput} onChange={this.onTextInputChange}></textarea>
              <br></br><br></br>
              <input type='submit' className='todo-button' onClick={()=> this.onClicked()}></input>
          </div>
          <br></br>
          <br></br>
          {(this.state.modal)?(
           <div className='modal'>
              <br></br>
              <br></br>
              <h1>{this.state.modalContent.text}</h1>
              <textarea placeholder='add notes' name="message" rows="10" cols="30" value={this.state.modalContent.notes} onChange={this.onModalTextInputChange}>{this.state.modalContent.notes}</textarea>
              <br></br>
              <br></br>
              
           
           </div>
          ):(<div></div>)
          }
        </div>
      </header>
    </div>
  );
}
}
export default App;


// <input type='text' className='modal-tex' value={this.state.list[this.state.modalIndex].text} onChange={this.onModalInputChange}></input>

// <input type='submit' className='todo-button' onClick={()=> this.onEdit(this.state.modalIndex)}>Edit</input>