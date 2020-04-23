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
  list: [{text: "Buy eggs", notes:'empty',done: false,toggle:false},
  {text: "Buy milk", notes:'empty',done: true,toggle:false},
  ],
  input: '',
  textInput:'',
  newList: [],
  modal:false,
  modalContent:[],
  modalIndex:null,
  modalInput:"",
  modalTextInput:'',
  toggle:false
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
  if(this.state.input){
      console.log(this.state.input)
      this.setState(prevState => ({
        list: [...prevState.list, {text: this.state.input,notes:this.state.textInput,done:false,toggle:false}]
      }))
      // this.state.list.push({text:this.state.input, done: false})
      console.log(this.state.list)
      this.setState({input:''})
      this.setState({textInput:''})

  }
  console.log(this.state.list)
  this.componentUpdate()
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
  this.setState({modalIndex:index})
  this.setState({modalContent : modalList})
  this.setState({modalInput : this.state.modalContent.text})
  this.setState({modalTextInput:this.state.modalContent.notes})
  console.log(this.state.modalInput)
}
onEdit = (index) => {
  if(this.state.modalInput){
      let list = this.state.list
      list.splice(index, 1 , {text:this.state.modalInput,notes:this.state.modalTextInput,done:false})
      this.setState({list})
      console.log(index)
      this.setState({modal:false})
  }
}
  onToggle = (index) => {
    console.log(this.state.list[index])
    let list = this.state.list
    let toggle = list[index]
    if(toggle.toggle === false){
      toggle.toggle = true
      
    }
    else{
      toggle.toggle = false
      
    }
    console.log(toggle.toggle)
    this.setState({list})
    console.log(this.state.list)
  }
  componentUpdate = () => {
    // Storing to local storage
      
      const newlist1 = this.state.list;
      localStorage.setItem("todolist", JSON.stringify(newlist1));
      // Retrieving from local storage
      const listString = localStorage.getItem("todolist");
      if (listString) { // list exists
      const list = JSON.parse(listString);
      this.setState({
      list: newlist1,
      })
      console.log(this.state.list);
      }
  }

render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "todo-list">
          <h1>To Do List</h1>         
          {(this.state.list != 0)? (this.state.list.map((todo,index)=>
              <div key={index} >
                <div className = "todo-item">
                <span onClick={()=> this.showModal(index)}>{todo.text} </span>
                <button onClick={() => this.changeToDone(index)}>{todo.done?<Emoji label="sheep" symbol="✅"/>:'❌'}</button>
                <button className='delete' onClick={()=> this.deleteItem(index)}>Delete</button>
                <button onClick={()=> this.onToggle(index)}>toggle</button>
                </div>
                <div id="toggle" className={(todo.toggle)?("toggle-true"):('toggle-false')}>{(todo.toggle)?(<span>{this.state.list[index].notes}</span>):('')}</div>
                <br></br>
              </div>
              
              )):(<div>Nothing to do</div>)
              }
          <div className='input'>
              <input type='text' className='todo-item' value={this.state.input} onChange={this.onInputChange}></input><br></br><br></br>
              <textarea placeholder='add notes' name="message" rows="3" cols="30" value={this.state.textInput} onChange={this.onTextInputChange}></textarea>
              <br></br><br></br>
              <input type='submit' className='todo-button' onClick={()=> this.onClicked()}></input>
          </div>
          <br></br>
          <br></br>
          {(this.state.modal)?(
           <div className='modal'>
              <input type='text' className='modal-tex' value={this.state.modalInput} onChange={this.onModalInputChange}></input>

              <br></br>
              <br></br>

              <textarea placeholder='add notes' name="message" rows="3" cols="30" onChange={this.onModalTextInputChange} value={this.state.modalTextInput}>{this.state.modalTextInput}</textarea>
              <br></br>
              <button onClick={()=> this.onEdit(this.state.modalIndex)}>Edit</button>
              
           
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