import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_INIT_LIST } from './actionType';
import { initListAction } from './actionCreateors';

function* getDataList() {
    try{
        const res = yield axios.get('http://127.0.0.1:8080/manage/list');
        const action = initListAction(res.data);
        yield put(action);
    } catch(e){
        console.log('list.json网络请求失败');
    }
   
}

function* mySaga() {
    yield takeEvery(GET_INIT_LIST, getDataList);
}

export default mySaga;
