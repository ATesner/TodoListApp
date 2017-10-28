import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import './App.css';

var todos = []

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos
    }
  }

  componentDidMount(){
    fetch('http://localhost:3008/tasks', {
      method: 'get',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      }
    }).then((results) =>{
      return results.json();
    }).then(data => {
      this.setState({ todos: data });
    });
  }

  deleteTask(index){

    fetch('http://localhost:3008/tasks/' + this.state.todos[index]._id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       }
    }).then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        todos: this.state.todos.filter(function(e, i){
          return i !== index;
        })
      });
      alert(data['message']);
    });
  }

  onAddTodo(todo){
    this.setState({
      todos: [...this.state.todos, todo]
    });
  }

  render() {
    return (
      <div className="container">
        <TodoInput onAddTodo={this.onAddTodo.bind(this)} />
        <hr/>
        <h4> Nombre de tâches: <span className="badge">{this.state.todos.length}</span> </h4>
        <ul className="list-group">
          { this.state.todos.map( (todo, index) => {
              return(  
                <li className="list-group-item" key={index}> 
                  <h4 className="list-group-item-heading">{todo.title}  
                    <small> <span className="label label-info"> {todo.priority} </span></small>
                    <p><span className="glyphicon glyphicon-user"></span> {todo.responsible}</p>
                    <p>{todo.description}</p>
                    <button className="btn btn-danger btn-sm" onClick={this.deleteTask.bind(this, index)}>
                      <span className="glyphicon glyphicon-trash"></span> Supprimer
                    </button>
                  </h4>
                </li>
              )
            })
          }  
        </ul>
      </div>
    );
  }
}



export default App;
