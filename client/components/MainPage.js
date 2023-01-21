import React, { useState } from 'react';
import { makeCountryCasesObj } from '../store';
import { countriesArr } from '../countries';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
// import sound from './new.wav';

export default function MainPage() {
	const dispatch = useDispatch();
	const [values, setValues] = useState({ selectCountry: 'US' });
	// const messages = useSelector((state) => state.messages);
	//Handling form input
	const handleChange = (event) => {
		event.persist();
		setValues((state) => ({
			...state,
			[event.target.name]: event.target.value,
		}));
		// let audio = new Audio('../../new.wav');
		// audio.play();
		console.log(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let allCountriesCasesArr = [];
		for (let i = 0; i < countriesArr.length; i++) {
			const obj = await dispatch(makeCountryCasesObj(countriesArr[i]));
			allCountriesCasesArr.push(obj);
		}
		console.log('ALL COUNTRIES CASES: ', allCountriesCasesArr);
		const response = await axios.post(
			'/api/data-for-wav',
			allCountriesCasesArr
		);
		console.log('response from api: ', response.data);
		// dispatch(getCasesDataArr(values.selectCountry));
		// console.log('Submit', values.selectCountry);
	};

	const playAudio = () => {
		const audioElement = new Audio('pandemic.wav');
		audioElement.play();
		console.log('playing audio');
	};

	return (
		<div>
			<form
				className='form'
				onSubmit={handleSubmit}
				key='join-form'
				autoComplete='off'
			>
				{/* <select
					name='selectCountry'
					value={values.selectCountry || ''}
					onChange={handleChange}
					placeholder='Country'
				>
					<option value='US' key='UNITED STATES'>
						US
					</option>
					<option value='KZ'>Kazakhstan</option>
					<option value='IT'>Italy</option>
					<option value='CN'>China</option>
					<option value='RU'>Russia</option>
					<option value='GB'>UK</option>
				</select> */}
				<button className='submit-button' type='submit'>
					Generate Soundwave
				</button>
				<div id='button-div' onClick={playAudio}>
					play audio
				</div>
			</form>
		</div>
	);
}
