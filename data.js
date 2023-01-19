import fetch from 'node-fetch';

// https://health.google.com/covid-19/open-data/raw-data

async function loadData() {
	const data = await (
		await fetch(
			`https://storage.googleapis.com/covid19-open-data/v3/location/IT.json`
		)
	).json();
	// Use the data...
	const result = data.data.map((elem) => {
		return elem[10];
	});
	// console.log('ARRAY ', data.data[700][10]);
	result.forEach((e) => console.log(e, ','));
	// console.log('@@@@@ ', result);
	return result;
}

loadData();

// The structure of epidimiology data:

// {
// 	columns: [
// 'location_key',
//   'date',
//   'place_id',
//   'wikidata_id',
//   'datacommons_id',
//   'country_code',
//   'country_name',
//   'iso_3166_1_alpha_2',
//   'iso_3166_1_alpha_3',
//   'aggregation_level',
//   'new_confirmed',
//   'new_deceased',
//   'new_tested',
//   'cumulative_confirmed',
//   'cumulative_deceased',
//   'cumulative_tested',
//   'new_hospitalized_patients',
//   'cumulative_hospitalized_patients',
//   'current_hospitalized_patients',
//   'new_intensive_care_patients',
//   'cumulative_intensive_care_patients',
//   'current_intensive_care_patients',
//   'new_ventilator_patients',
//   'cumulative_ventilator_patients',
//   'current_ventilator_patients',
//   'new_persons_vaccinated',
//   'cumulative_persons_vaccinated',
//   'new_persons_fully_vaccinated',
//   'cumulative_persons_fully_vaccinated',
//   'new_vaccine_doses_administered',
//     'cumulative_vaccine_doses_administered',
// ...etc
// 	],
// 	data: [[]],
// };
