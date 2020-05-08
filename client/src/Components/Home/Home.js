import React, { Component } from 'react';
import './Home.css';


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
var date = new Date().toJSON().slice(5,10);
var time = new Date().toJSON().slice(11,16)
var dateTime = date+' '+time;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class Home extends Component{
  


state = {
  list: [{text: "Buy eggs", notes:'empty',done: false,toggle:false},
  {text: "Buy milk", notes:'empty',done: true,toggle:false},
  ],
  grocery:[],
  input: '',

  textInput:'',
  newList: [],
  modal:false,
  modalContent:[],
  modalIndex:null,
  modalInput:"",
  modalTextInput:'',
  toggle:false,
  todoItemClicked:false,
  todo:true,
  active:'todo',
  todoListItems: 'todo-list-items',
  user:[],
  userIs:false,
  registerUn:'',
  registerPw:'',
  userN:'',
  userPw:'',
  registered:[],
  testRegister:[],
  allUsers:[],
  loggedIn:false,
  }



// userFetch = () => {
//   const userJSON = localStorage.getItem('user')
//   const user = JSON.parse(userJSON)
//   if (user){
//     this.setState({user:user })
//   }
// }

onRegisterUn = (event) => {
  this.setState({registerUn:event.target.value})
}
onRegisterPw = (event) => {
  this.setState({registerPw:event.target.value})
}
onLoginUn = (event) => {
  this.setState({userN:event.target.value})
}
onLoginPw = (event) => {
  this.setState({userPw:event.target.value})
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
fetchUsers = () => {
  let testusers= []
  fetch('/api/mongodb/users/')
  .then(response => response.json())
  .then(data => {
    console.log('data!',data)
    this.setState({allUsers:data})
    testusers.push(data)
  })
  this.setState({allUsers:testusers})
  console.log(this.state.allUsers)

}
onFetch = () => {
  fetch(`/api/mongodb/${this.state.user.user}todolist/`)
  .then(response => response.json())
  .then(data => {
    console.log('data!',data)
    this.setState({list:data})
  })
  fetch(`/api/mongodb/${this.state.user.password}grocery/`)
  .then(response => response.json())
  .then(data => {
    console.log('data!',data)
    this.setState({grocery:data})
  })
}
onRegister = () => {
  console.log('clicked')

  let user = this.state.registerUn
  let pw = this.state.registerPw
  let formData = {user:user,password:pw}
  console.log(formData)
  
  fetch('/api/mongodb/users/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Got this back', data);

  });
  this.setState({testRegister:formData})
  this.setState({registerUn:''})
  this.setState({registerPw:''})

}
onSignIn = () => {
  console.log('signIN')
  console.log(this.state.userN)
  let un = this.state.userN
  let pw = this.state.userPw
  console.log(this.state.allUsers)
  let userLogin ={}
  const user = this.state.allUsers.map((user, index)=>{
      return userLogin[user.user] = user.password
    
  })
  console.log(userLogin)
  
 if (Object.keys(userLogin).includes(un)){
   if (userLogin[un] === pw){
     console.log('log In')
     user[un] = pw
     this.setState({user:{user:un,password:pw}})
     this.setState({loggedIn:true})
     
   }
   else{
     console.log('incorrect password')
   }

 }
 else{
   console.log('username does not exist')
 }
 console.log(this.state.user)

}
onClicked = () => {
  if(this.state.input && this.state.todo){
      
      console.log(this.state.input)
      this.setState(prevState => ({
        list: [...prevState.list, {text: this.state.input,notes:this.state.textInput,done:false,toggle:false,time:dateTime}]
      }))
      const formData = {
        text: this.state.input,notes:this.state.textInput,done:false,toggle:false,time:dateTime
       
      };
    
      fetch(`/api/mongodb/${this.state.user.user}todolist/`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);
    
          
        });
      // this.state.list.push({text:this.state.input, done: false})
      console.log(this.state.list)
      this.setState({input:''})
      this.setState({textInput:''})

      }
    if(this.state.input && !this.state.todo){
      console.log('grocery')
      console.log(this.state.input)
      this.setState(prevState => ({
        grocery: [...prevState.grocery, {text: this.state.input,notes:this.state.textInput,done:false,toggle:false,time:dateTime}]
      }))
      const formData = {
        text: this.state.input,notes:this.state.textInput,done:false,toggle:false,time:dateTime
       
      };
    
      fetch('/api/mongodb/grocery/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);
    
          
        });
      // this.state.list.push({text:this.state.input, done: false})
      console.log(this.state.grocery)
      this.setState({input:''})
      this.setState({textInput:''})
    }
  
}

deleteItem = (id) => {
  if(this.state.todo){
    fetch(`/api/mongodb/${this.state.user.user}todolist?_id=/`+ id, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('deleted',id)
      this.onFetch()
    })
  }
  if(!this.state.todo){
    fetch('/api/mongodb/grocery/?_id=' + id, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('deleted',id)
      this.onFetch()
    })
  }
  
}
changeToDone = (index) => {
  if(this.state.todo){
    
      console.log(this.state.list[index].done)
      let list = this.state.list
      let done = this.state.list[index]
      
      if(done.done === false){
        done.done = true
        console.log(done.done)
        done.todoItemClicked = 'todo-item-true'
      }
      else{
        done.done = false
        console.log(done.done)
        done.todoItemClicked = 'todo-item-false'
      }
      
      this.setState({list})
    }
  if(!this.state.todo){
      console.log(this.state.grocery[index].done)
      let list = this.state.grocery
      let done = this.state.grocery[index]
      
      if(done.done === false){
        done.done = true
        console.log(done.done)
        done.todoItemClicked = 'todo-item-true'
      }
      else{
        done.done = false
        console.log(done.done)
        done.todoItemClicked = 'todo-item-false'
      }
      
      this.setState({grocery:list})

  }
}
showModal = index => {
  if(this.state.todo){
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
  if(!this.state.todo){
    console.log(index)
    this.setState({modal:true})
    let modalList = (this.state.grocery[index])
    this.state.modalContent = modalList
    this.setState({modalIndex:index})
    this.setState({modalContent : modalList})
    this.setState({modalInput : this.state.modalContent.text})
    this.setState({modalTextInput:this.state.modalContent.notes})
    console.log(this.state.modalInput)
  }
}
onEdit = (index) => {
  if(this.state.modalInput && this.state.todo){
      let list = this.state.list[index]
      // let time = this.state.list[index].time
      // list.splice(index, 1 , {text:this.state.modalInput,notes:this.state.modalTextInput,done:false,time:dateTime})
      // this.setState({list})
      // console.log(index)
      console.log(list._id)
      const newList ={text : this.state.modalInput
      ,notes : this.state.modalTextInput
      ,done : false,time : dateTime}
      
      console.log(list.text)
      fetch(`/api/mongodb/${this.state.user.user}todolist?_id=/` + list._id, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newList),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);

          // Call method to refresh data
          this.onFetch();
        });
        this.setState({modal:false})
  }
  if(this.state.modalInput && !this.state.todo){
      let list = this.state.grocery[index]
      // let time = this.state.list[index].time
      // list.splice(index, 1 , {text:this.state.modalInput,notes:this.state.modalTextInput,done:false,time:dateTime})
      // this.setState({list})
      // console.log(index)
      console.log(list._id)
      const newList ={text : this.state.modalInput
      ,notes : this.state.modalTextInput
      ,done : false,time : dateTime}
      
      console.log(list.text)
      fetch('/api/mongodb/grocery/?_id=' + list._id, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newList),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);

          // Call method to refresh data
          this.onFetch();
        });
        this.setState({modal:false})
  }
}
  onToggle = (index) => {
    if(this.state.todo){
      console.log(this.state.list[index])
      let list = this.state.list
      let toggle = list[index]
      if(toggle.toggle === false){
        toggle.toggle = true
        toggle.todoItemClicked = 'todo-item-true'
        
      }
      else{
        toggle.toggle = false
        toggle.todoItemClicked = 'todo-item-false'
        
      }
      console.log(toggle.toggle)
      this.setState({list})
      console.log(this.state.list)
    }
    if(!this.state.todo){
      let list = this.state.grocery
      let toggle = list[index]
      if(toggle.toggle === false){
        toggle.toggle = true
        toggle.todoItemClicked = 'todo-item-true'
        
      }
      else{
        toggle.toggle = false
        toggle.todoItemClicked = 'todo-item-false'
        
      }
      console.log(toggle.toggle)
      this.setState({grocery:list})

    }
  }
componentDidMount(){
  
  this.fetchUsers()
  console.log(this.state.allUsers)
  if (this.state.loggedIn){
    this.onFetch()
  }
}

todo = (todo) => {
  if (todo === 'todo'){
    console.log('todo')
    this.setState({todo:true})
    this.setState({active:todo})
    this.setState({todoListItems:'todo-list-items'})
  }
  if (todo === 'grocery'){
    console.log('todo')
    this.setState({todo:false})
    this.setState({active:todo})
    this.setState({todoListItems: 'todo-list-items grocery-true'})
  }
}


render() {

  return (
    <div className="App">
      <header className="App-header">
        <div  className = "todo-list"
        
        >
          <h1><span>To Do List</span></h1>   
          <div className={this.state.todoListItems}>     
          {(this.state.list !== 0 && this.state.todo)? (this.state.list.map((todo,index)=>
              
              <div key={index} className = "todo-item" id={(todo.toggle)?("toggle-true"):('toggle-false')}>
                <span className='todo-text' onClick={()=> this.onToggle(index)}>{todo.text}</span><span className='time'>{todo.time} </span>
                <button onClick={() => this.changeToDone(index)}>{todo.done?<Emoji className='todo-check' label="sheep" symbol="✅"/>:<Emoji className='todo-check' label="sheep" symbol='❌'/>}</button>
                <button className='delete' onClick={()=> this.deleteItem(todo._id)}>Delete</button>
                <button className='toggle-button' onClick={()=> this.showModal(index)}>Edit</button>
                
                <div id="toggle" className={(todo.toggle)?("toggle-true"):('toggle-false')}>{(todo.toggle)?this.state.list[index].notes:('')}</div>
              </div>
              
              
              )):(
                (this.state.grocery.map((todo,index)=>

                <div key={index} className = "todo-item grocery-2" id={(todo.toggle)?("toggle-true"):('toggle-false')}>
                <span className='todo-text' onClick={()=> this.onToggle(index)}>{todo.text}</span><span className='time'>{todo.time} </span>
                <button onClick={() => this.changeToDone(index)}>{todo.done?<Emoji className='todo-check' label="sheep" symbol="✅"/>:<Emoji className='todo-check' label="sheep" symbol='❌'/>}</button>
                <button className='delete' onClick={()=> this.deleteItem(todo._id)}>Delete</button>
                <button className='toggle-button' onClick={()=> this.showModal(index)}>Edit</button>
                
                <div id="toggle" className={(todo.toggle)?("toggle-true"):('toggle-false')}>{(todo.toggle)?this.state.grocery[index].notes:('')}</div>
              </div>
                
                ))
                )
              }
          </div> 
          <div className='input'>
              <input type='text' placeholder='add todo item'className='input-item' value={this.state.input} onChange={this.onInputChange}></input><br></br><br></br>
              <textarea className='input-notes' placeholder='add notes' name="message" rows="3" cols="20" value={this.state.textInput} onChange={this.onTextInputChange}></textarea>
              <br></br><br></br>
              <input type='submit' className='input-button' onClick={()=> this.onClicked()} ></input>
          </div>
          <br></br>
          <br></br>
          {(this.state.modal)?(
           <div className='modal' draggable='true'
           >
           
              <input type='text' className='modal-text' value={this.state.modalInput} onChange={this.onModalInputChange}></input>

              <br></br>
              <br></br>

              <textarea className='modal-notes' placeholder='add notes' name="message" rows="3" cols="30" onChange={this.onModalTextInputChange} value={this.state.modalTextInput}>{this.state.modalTextInput}</textarea>
              <br></br>
              <button className='modal-button' onClick={()=> this.onEdit(this.state.modalIndex)}>Edit</button>
              
           
           </div>
          ):(<div></div>)
          }
          <div id={(this.state.active === 'todo')? "active":"none"} className="todo" onClick={()=>this.todo('todo')}>Todo List</div>
          <div id={(this.state.active === 'grocery')? "active":"none"} className="grocery"  onClick={()=>this.todo('grocery')}> Grocery</div>
          <div className={(this.state.userIs)?('user-true'):('user-false')} id='user'> user
              <div className='register'>
                <span>Username</span>
                <br></br>
                <input className='register-un' value={this.state.registerUn} onChange={this.onRegisterUn}></input>
                <br></br>
                <span>Password</span>
                <br></br>
                <input className='register-pw' value={this.state.registerPw} onChange={this.onRegisterPw}></input>
                <br></br>
                <button type='submit' className='register-btn' onClick={() => this.onRegister()} >Register</button>
              </div>
              <div className='signin'>
                <span>Username</span>
                <br></br>
                <input className='signin-un' value={this.state.userN} onChange={this.onLoginUn} ></input>
                <br></br>
                <span>Password</span>
                <br></br>
                <input className='signin-pw' value={this.state.userPw} onChange={this.onLoginPw}></input>
                <br></br>
                <button className='signin-btn' type='submit' className='register-btn' onClick={() => this.onSignIn()}>Sign In</button>
              </div>
          
          </div>
        </div>

      </header>
    </div>
  );
}
}
export default Home;

//   componentDidMount(){
//     const userJSON = localStorage.getItem('user')
//     const user = JSON.parse(userJSON)
//     if (user){
    
//     console.log(user)
//     if (user){
//         for (let i of user){
//           i.toggle = false
//         }
//       }
//     this.setState({list:user})
//   }
// }
//   componentDidUpdate(){
//     // Storing to local storage
//     const userJSON = JSON.stringify(this.state.list)
    
//     localStorage.setItem('user', userJSON)


// }