import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import fetch from 'node-fetch';
import axios from 'axios';

const SET_CASES_DATA_ARR = 'SET_CASES_DATA_ARR';

export const setCasesDataArr = function (casesDataArr) {
	return {
		type: SET_CASES_DATA_ARR,
		casesDataArr,
	};
};

export const getCasesDataArr = function (country) {
	return async function (dispatch) {
		try {
			// fentching all data
			const data = await (
				await fetch(
					`https://storage.googleapis.com/covid19-open-data/v3/location/${country}.json`
				)
			).json();
			//only keeping the 'new daiy' cases array
			const result = data.data.map((elem) => {
				return elem[10];
			});

			console.log('TYPE OF RESULT: ', Array.isArray(result));
			console.log('RESULT:', result);
			const response = await axios.post('/api/data-for-wav', result);
			console.log('response from api: ', response.data);
			//send cases data via API
			// dispatch(setCasesDataArr([1, 2, 3, 4, 5]));
		} catch (error) {
			console.log(error);
		}
	};
};

const initialState = {
	casesDataArr: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CASES_DATA_ARR:
			return { ...state, casesDataArr: action.casesDataArr };
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
