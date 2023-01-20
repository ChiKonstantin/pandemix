const C = require('construct-js');
const fs = require('fs');
const path = require('path');

const generateWav = function (rawArr) {
	//this will be the array for wave
	//WAV FILE GENERATION:
	const sampleRate = 8000; //max 44100 Hz
	const riffChunkStruct = C.Struct('riffChunk')
		.field('magic', C.RawString('RIFF'))
		.field('size', C.U32(0))
		.field('fmtName', C.RawString('WAVE'));

	const fmtSubChunkStruct = C.Struct('fmtSubChunk')
		.field('id', C.RawString('fmt '))
		.field('subChunk1Size', C.U32(0))
		.field('audioFormat', C.U16(1))
		.field('numChannels', C.U16(1))
		.field('sampleRate', C.U32(sampleRate))
		.field('byteRate', C.U32(sampleRate * 2))
		.field('blockAlign', C.U16(2))
		.field('bitPerSample', C.U16(16));

	const totalSUbChunkSize = fmtSubChunkStruct.computeBufferSize();
	fmtSubChunkStruct.get('subChunk1Size').set(totalSUbChunkSize - 8);

	const dataSubChunkStruct = C.Struct('dataSubChunk')
		.field('id', C.RawString('data'))
		.field('size', C.U32(0))
		.field('data', C.I16s([0]));

	//Stretch Array
	const stretchArr = function (array) {
		const newArrLength = 16000;
		const numberOfElemToAdd = Math.round(
			(newArrLength - array.length) / (array.length - 1)
		);
		let stretchedArray = [];
		for (let i = 0; i < array.length - 1; i++) {
			stretchedArray.push(array[i]);
			for (let j = 1; j <= numberOfElemToAdd; j++) {
				const newElem =
					Math.round((array[i + 1] - array[i]) / (numberOfElemToAdd + 1)) * j +
					array[i];
				stretchedArray.push(newElem);
			}
		}
		stretchedArray.push(array[array.length - 1]);
		return stretchedArray;
	};

	//Compress Array
	const compressArr = function (array) {
		const compressedArr = [];
		console.log('MAX value', Math.max(...array));
		const maxData = Math.max(...array);
		const maxAmplitude = 30000; //actually 32767, conservitavely use 30K
		const compFactor = Math.round(maxData / maxAmplitude);
		console.log('Length: ', array.length);
		for (let i = 0; i < array.length; i++) {
			const value = Math.round(array[i] / compFactor);
			compressedArr.push(value);
		}
		return compressedArr;
	};

	//Loop array
	const loopArr = function () {};

	const soundData = compressArr(stretchArr(rawArr));
	// let isUp = true;
	// for (let i = 0; i < 44100; i++) {
	// 	if (i % 50 === 0) {
	// 		isUp = !isUp;
	// 	}
	// 	const sampleValue = isUp ? 16383 : -16383;
	// 	soundData[i] = sampleValue;
	// }

	dataSubChunkStruct.get('data').set(soundData);
	dataSubChunkStruct.get('size').set(soundData.length * 2);

	const fileStruct = C.Struct('waveFile')
		.field('riffChunk', riffChunkStruct)
		.field('fmtSubChunk', fmtSubChunkStruct)
		.field('dataSubChunk', dataSubChunkStruct);

	fs.writeFileSync(
		path.join(__dirname, '../public/pandemic.wav'),
		fileStruct.toUint8Array()
	);
};

module.exports = generateWav;
