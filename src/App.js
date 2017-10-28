import React, { Component } from 'react';
import './App.css';

var todos = [
/*  {
    title: 'First todo',
    responsible: 'Antoine',
    description: 'todo description',
    priority: 'low'
  },
  {
    title: 'Second todo',
    responsible: 'Antoine',
    description: 'todo description',
    priority: 'medium'
  },
  {
    title: 'Third todo',
    responsible: 'Antoine',
    description: 'todo description',
    priority: 'high'
  }*/
]

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

class TodoInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      responsible: '',
      description: '',
      priority: 'low'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state);
    
    fetch('http://localhost:3008/tasks', {
      method: 'post',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        responsible: this.state.responsible,
        priority: this.state.priority
      })
    }).then((results) =>{
      console.log('Task added ' + results.json());
      this.props.onAddTodo(this.state);
      this.setState({
        title: '',
        responsible: '',
        description: '',
        priority: 'low'
      });
    });

  }

  render() {
    return (
      <div>
        <h4>Ajouter une tâche:</h4>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="inputTodoTitle" className="col-sm-2 control-label">Titre</label>
            <div className="col-sm-10">
              <input type="text" name="title" id="inputTodoTitle" value={this.state.title}
                onChange={this.handleInputChange} placeholder="Titre" className="form-control" />  
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoResponsible" className="col-sm-2 control-label">Responsable</label>
            <div className="col-sm-10">
              <input type="text" name="responsible" id="inputTodoResponsible" value={this.state.responsible}
                onChange={this.handleInputChange} rows="3" placeholder="Responsable" className="form-control" />  
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea name="description" id="inputTodoDescription" value={this.state.description}
                onChange={this.handleInputChange} placeholder="Description" className="form-control" ></textarea>  
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTodoPriority" className="col-sm-2 control-label">Priorité</label>
            <div className="col-sm-10">
              <select name="priority" id="inputTodoPriority" value={this.state.priority}
                onChange={this.handleInputChange} className="form-control" > 
                <option>Low</option>  
                <option>Medium</option> 
                <option>High</option> 
              </select> 
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success" > 
                Ajouter tâche
              </button> 
            </div>
          </div>
        </form>
      </div>
    )
  }
  
}

export default App;
