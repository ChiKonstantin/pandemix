import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

export default function Main() {
	return (
		<div className='main'>
			<Routes>
				<Route path='/' element={<MainPage />} />
			</Routes>
		</div>
	);
}
