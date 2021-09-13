// Module imports
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import mock from 'mock-fs'





// Module imports
import { generatePatchData } from './generatePatchData.js'





// Constants
const ENUM_TYPES = [
	'pokemon-skill-slot',
	'pokemon-skill-type',
]
const ENUMS = ENUM_TYPES.reduce((accumulator, type) => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'

	accumulator[type] = alphabet.split('').reduce((accumulator, character, index) => {
		accumulator[index] = character
		return accumulator
	}, {})

	return accumulator
}, {})

const HELD_ITEM_IDS = [
	'aeos-cookie',
	'attack-weight',
	'buddy-barrier',
	'energy-amplifier',
	'exp-share',
	'float-stone',
	'focus-band',
	'rocky-helmet',
	'shell-bell',
]
const HELD_ITEMS = HELD_ITEM_IDS.reduce((accumulator, id, index) => {
	accumulator[id] = {
		displayName: id.replace(/(?:^\w|-\w)/g, match => {
			return match.toUpperCase().replace('-', ' ')
		}),
		id,
		value1: index,
		value2: 20,
	}

	return accumulator
}, {})

const POKEMON_IDS = [
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
const POKEMON = POKEMON_IDS.reduce((accumulator, id, index) => {
	accumulator[id] = {
		displayName: id.replace(/(?:^\w|-\w)/g, match => {
			return match.toUpperCase().replace('-', ' ')
		}),
		id,
		value1: index,
		value2: 20,
	}

	return accumulator
}, {})

const SKILL_IDS = [
	'absol-attack',
	'absol-feint',
	'crustle-attack',
	'crustle-fury-cutter',
	'garchomp-attack',
	'garchomp-dig',
	'lucario-attack',
	'lucario-bone-rush',
	'pikachu-attack',
]
const SKILLS = SKILL_IDS.reduce((accumulator, id, index) => {
	accumulator[id] = {
		displayName: id.replace(/(?:^\w|-\w)/g, match => {
			return match.toUpperCase().replace('-', ' ')
		}),
		id,
		pokemonID: id.split('-')[0],
		value1: index,
		value2: 20,
	}

	return accumulator
}, {})

const RSB_IDS = SKILL_IDS.map(skillID => {
	return `${skillID}-rsb`
})
const RSBS = RSB_IDS.reduce((accumulator, id, index) => {
	const SKILL_ID = SKILL_IDS[index]
	const SKILL = SKILLS[SKILL_ID]
	accumulator[id] = {
		id,
		pokemonID: SKILL.pokemonID,
		hits: [
			{
				base: Math.round(Math.random() * 100) + 1,
				damageType: 'Atk',
				label: 'Damage',
				ratio: Math.round(Math.random() * 100) + 1,
				slider: Math.round(Math.random() * 100) + 1,
			},
		],
		skillID: SKILL.id,
	}

	return accumulator
}, {})

const MOCKED_FS = {
	[DATA_ROOT]: Array(10).fill(null).reduce((accumulator, _, index) => {
		function reducer(accumulator, [key, value], itemIndex) {
			if ((itemIndex === 0) || (itemIndex <= index)) {
				accumulator[`${key}.json`] = JSON.stringify(value)
			}

			return accumulator
		}

		const [key, data] = generatePatchData(((index === 0) ? 'base' : String(index)), {
			'enums': Object.entries(ENUMS).reduce(reducer, {}),
			'held-items': Object.entries(HELD_ITEMS).reduce(reducer, {}),
			pokemon: Object.entries(POKEMON).reduce(reducer, {}),
			rsbs: Object.entries(RSBS).reduce(reducer, {}),
			skills: Object.entries(SKILLS).reduce(reducer, {}),
		})

		accumulator[key] = data

		return accumulator
	}, {}),
}

const datasets = Object.keys(MOCKED_FS[DATA_ROOT])
const patches = datasets.filter(item => item !== 'base')





/**
 * Mocks the filesystem to add a base dataset, as well as patch datasets.
 */
export function useMockFS() {
	before('Mock the filesystem for UNITE data', () => {
		mock(MOCKED_FS)
	})

	after('Restore filesystem from mocks', () => {
		mock.restore()
	})
}

export const mockData = {
	datasets,
	enums: ENUMS,
	enumTypes: ENUM_TYPES,
	heldItemIDs: HELD_ITEM_IDS,
	heldItems: HELD_ITEMS,
	mockedFS: MOCKED_FS,
	patches,
	pokemon: POKEMON,
	pokemonIDs: POKEMON_IDS,
	rsbIDs: RSB_IDS,
	rsbs: RSBS,
	skillIDs: SKILL_IDS,
	skills: SKILLS,
}
