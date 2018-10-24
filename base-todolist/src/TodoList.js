import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
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
    // const value = this.input.value;
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleBtnclick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }), () => {
      console.log(this.ul.querySelectorAll('div').length);
    });

    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }
 
  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return {
        list
      }
    });
    // const list = [...this.state.list];
    // list.splice(index, 1);
    // this.setState({
    //   list
    // })
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
  
  //调用接口
  componentDidMount() {
    axios.get('http://127.0.0.1:8080/manage/list')
      .then((res) => {
        this.setState(() => ({
          list: [...res.data]
        })
        );
      })
      .catch((err) => {
        alert('error');
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea" className="littlePointer">输入内容</label>
          <input id="insertArea" 
            className="input" 
            value={this.state.inputValue} 
            onChange={this.handleInputChange}
            ref={(input) => {this.input = input}}
            />
          <button onClick={this.handleBtnclick} className="littlePointer">提交</button>
        </div>
        <ul ref={(ul) => {this.ul = ul}}>
          {this.getItem()}
        </ul>
      </Fragment>
    );
  }
}

export default TodoList;
