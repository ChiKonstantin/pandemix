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

export const makeCountryCasesObj = function (country) {
	return async function (dispatch) {
		try {
			// FETCHING ONLY COUNTRY DATA
			const data = await (
				await fetch(
					`https://storage.googleapis.com/covid19-open-data/v3/location/${country}.json`
				)
			).json();
			const result = data.data.map((elem) => {
				return elem[10];
			});
			console.log('RESULT FROM MAKE COUNTRY OBJ: ', result);
			const countryDataObj = {
				countryName: country,
				casesArr: result,
			};
			console.log('Generated country data obj for ', country);
			console.log('COUNTRY DATA OBJ:', countryDataObj);
			return countryDataObj;

			//FETCHING ALL DATA:
			// const data = await (
			// 	await fetch(
			// 		`https://storage.googleapis.com/covid19-open-data/v3/latest/epidemiology.json`
			// 	)
			// ).json();
			// // only keeping the 'new daily cases' array
			// const result = data.data.map((elem) => {
			// 	return elem[1];
			// });
			// const countriesArr = result.map((elem) => {
			// 	return elem.slice(0, 2);
			// });

			// function removeDuplicates(arr) {
			// 	return arr.filter((item, index) => arr.indexOf(item) === index);
			// }

			// console.log('TYPE OF RESULT: ', Array.isArray(result));
			// console.log('RESULT:', result);
			// console.log('COUNTRIES ARR:', countriesArr);
			// console.log(
			// 	'COUNTRIES WITHOUT DUPLICATES',
			// 	removeDuplicates(countriesArr)
			// );

			//SEND TO CONVERT TO AUDIO:
			// const response = await axios.post('/api/data-for-wav', result);
			// console.log('response from api: ', response.data);
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
