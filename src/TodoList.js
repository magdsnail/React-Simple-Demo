import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import './style.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleBtnclick = this.handleBtnclick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleBtnclick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
 
  handleItemDelete(index) {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list
    })
  }

  getItem() {
    return (
      this.state.list.map((item, index) => {
        return (
            <TodoItem 
                key={index} 
                index={index} 
                deleteItem={this.handleItemDelete}
                content={item}/>
          )
        })

    );
  }
  //<li key={index} 
  //onClick={this.handleItemDelete.bind(this, index)} 
  //dangerouslySetInnerHTML={{__html: item}} > 
  //</li>
  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea" className="littlePointer">输入内容</label>
          <input id="insertArea" 
            className="input" 
            value={this.state.inputValue} 
            onChange={this.handleInputChange}/>
          <button onClick={this.handleBtnclick} className="littlePointer">提交</button>
        </div>
        <ul>
          {this.getItem()}
        </ul>
      </Fragment>
    );
  }
}

export default TodoList;
