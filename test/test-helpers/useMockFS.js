// Module imports
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import mock from 'mock-fs'





// Module imports
import { generatePatchData } from './generatePatchData.js'





// Constants
const heldItems = {
	'aeos-cookie.json': JSON.stringify({
		displayName: 'Aeos Cookie',
		id: 'aeos-cookie',
		value1: 20,
		value2: 20,
	}),
	'attack-weight.json': JSON.stringify({
		displayName: 'Attack Weight',
		id: 'attack-weight',
		value1: 0,
		value2: 20,
	}),
	'buddy-barrier.json': JSON.stringify({
		displayName: 'Buddy Barrier',
		id: 'buddy-barrier',
		value1: 1,
		value2: 20,
	}),
	'energy-amplifier.json': JSON.stringify({
		displayName: 'Energy Amplifier',
		id: 'energy-amplifier',
		value1: 2,
		value2: 20,
	}),
	'exp-share.json': JSON.stringify({
		displayName: 'Exp. Share',
		id: 'exp-share',
		value1: 3,
		value2: 20,
	}),
	'float-stone.json': JSON.stringify({
		displayName: 'Float Stone',
		id: 'float-stone',
		value1: 4,
		value2: 20,
	}),
	'focus-band.json': JSON.stringify({
		displayName: 'Focus Band',
		id: 'focus-band',
		value1: 5,
		value2: 20,
	}),
	'rocky-helmet.json': JSON.stringify({
		displayName: 'Rocky Helmet',
		id: 'rocky-helmet',
		value1: 6,
		value2: 20,
	}),
	'shell-bell.json': JSON.stringify({
		displayName: 'Shell Bell',
		id: 'shell-bell',
		value1: 7,
		value2: 20,
	}),
	'wise-glasses.json': JSON.stringify({
		displayName: 'Wise Glasses',
		id: 'wise-glasses',
		value1: 8,
		value2: 20,
	}),
}
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
		const heldItemsForPatch = Object.entries(heldItems).reduce((accumulator, [key, value], itemIndex) => {
			if (itemIndex <= index) {
				accumulator[key] = value
			}

			return accumulator
		}, {})

		const pokemonForPatch = {
			'charizard.json': JSON.stringify({
				value1: index,
				value2: 20,
			}),
			[`${pokemon[index]}.json`]: JSON.stringify({
				value1: index,
				value2: 20,
			}),
		}

		const [key, data] = generatePatchData(String(index), {
			heldItems: heldItemsForPatch,
			pokemon: pokemonForPatch,
		})

		accumulator[key] = data

		return accumulator
	}, {
		'base': {
			heldItems: {
				'special-attack-specs.json': JSON.stringify({
					displayName: 'Sp. Atk Specs',
					value1: 0,
					value2: 20,
				}),
			},
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
	heldItems,
	mockedFS,
	patches,
	pokemon,
}
