import React, { Component } from 'react'
import 'antd/dist/antd.css';
import store from './store';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList } from './store/actionCreateors';
import TodoListUI from './TodoListUI';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        store.subscribe(this.handleStoreChange);
    }

    handleInputChange(e) {
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }
    
    handleStoreChange() {
        this.setState(store.getState());
    }

    handleBtnClick() {
        const action = getAddItemAction();
        store.dispatch(action);
    }

    handleItemDelete(index) {
        const action = getDeleteItemAction(index);
        store.dispatch(action);
    }

    render() {
        return (
            <TodoListUI
                inputValue = {this.state.inputValue}
                list = {this.state.list}
                handleInputChange = {this.handleInputChange}
                handleBtnClick = {this.handleBtnClick}
                handleItemDelete = {this.handleItemDelete}
            />
        )
    }

    componentDidMount() {
        const action = getInitList();
        store.dispatch(action);
        // axios.get('http://127.0.0.1:8080/manage/list')
        //     .then((res) => {
        //         const action = initListAction([...res.data]);
        //         store.dispatch(action);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }
}

export default TodoList;