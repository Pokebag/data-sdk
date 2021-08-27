// Module imports
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import mock from 'mock-fs'





// Module imports
import { generatePatchData } from './generatePatchData.js'





// Constants
const pokemon = [
	'absol',
	'crustle',
	'mr-mime',
	'pikachu',
	'talonflame',
	'eldegoss',
	'snorlax',
	'lucario',
	'wigglytuff',
	'zeraora',
]
const mockedFS = {
	[DATA_ROOT]: Array(10).fill(null).reduce((accumulator, _, index) => {
		const [key, data] = generatePatchData(String(index), {
			pokemon: {
				'charizard.json': JSON.stringify({
					value1: index,
					value2: 20,
				}),
				[`${pokemon[index]}.json`]: JSON.stringify({
					value1: index,
					value2: 20,
				}),
			}
		})

		accumulator[key] = data

		return accumulator
	}, {
		'base': {
			pokemon: {
				'charizard.json': JSON.stringify({
					value1: 0,
					value2: 20,
				}),
			},
		},
	}),
}

const datasets = Object.keys(mockedFS[DATA_ROOT])
const patches = datasets.filter(item => item !== 'base')





/**
 * Mocks the filesystem to add a base dataset, as well as patch datasets.
 */
export function useMockFS() {
	before('Mock the filesystem for UNITE data', () => {
		mock(mockedFS)
	})

	after('Restore filesystem from mocks', () => {
		mock.restore()
	})
}

export const mockData = {
	datasets,
	mockedFS,
	patches,
	pokemon,
}
