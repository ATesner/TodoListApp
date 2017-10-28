import React , { Component } from 'react';

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

export default TodoInput;