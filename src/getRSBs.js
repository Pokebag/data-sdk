// Local imports
import './models/RSB.js'
import {
	getDirectory,
	getEntities,
} from './api/index.js'





/**
 * Returns data for RSBs
 *
 * @example
 * // returns RSBs for Blissey's Egg Bomb and Heal Pulse at patch 1.1.1.6
 * await getRSBs({
 * 	ids: [
 * 		'blissey-egg-bomb-rsb',
 * 		'blissey-heal-pulse-rsb',
 * 	],
 * 	patch: '1.1.1.6',
 * })
 *
 * @example
 * // returns RSBs for Absol and Crustle
 * await getRSBs({
 * 	pokemonIDs: [
 * 		'absol',
 * 		'crustle',
 * 	],
 * })
 *
 * @example
 * // returns RSBs for Garchomp's Dig
 * await getRSBs({
 * 	skillIDs: ['garchomp-dig'],
 * })
 *
 * @example
 * // returns all RSBs for Crustle, as well as RSBs for Blissey's Egg Bomb and Heal Pulse
 * await getRSBs({
 * 	pokemonIDs: ['crustle'],
 * 	skillIDs: [
 * 		'blissey-egg-bomb',
 * 		'blissey-heal-pulse',
 * 	],
 * })
 *
 * @memberof module:@pokebag/data-sdk
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.ids] Array of RSB IDs to be returned
 * @param {string[]} [options.pokemonIDs] Array of Pokémon IDs to whom the returned RSBs must belong
 * @param {string[]} [options.skillIDs] Array of skill IDs to whom the returned RSBs must belong
 * @param {string} [options.patch] Maximum patch version to return data for
 *
 * @returns {Promise<RSB[]>} An array containing data for each RSB requested
 */
export async function getRSBs(options) {
	if ((typeof options?.pokemonIDs === 'undefined') && (typeof options?.skillIDs === 'undefined')) {
		return getEntities({
			...options || {},
			type: 'rsbs',
		})
	}

	const {
		patch,
		pokemonIDs,
		skillIDs,
	} = options

	;[pokemonIDs, skillIDs].forEach(option => {
		if (option && !Array.isArray(option)) {
			throw new TypeError(`${option} must be an array`)
		}
	})

	if (typeof options.ids !== 'undefined') {
		throw new TypeError('ids and pokemonIDs/skillIDs may not be used together; you must choose one')
	}

	const ALL_RSB_IDS = await getDirectory('rsbs', patch)
	let FILTERED_RSB_IDS = ALL_RSB_IDS

	FILTERED_RSB_IDS = FILTERED_RSB_IDS.filter(rsbID => {
		const RSB_MATCHES_POKEMON_ID = (pokemonIDs ?? []).some(pokemonID => {
			return rsbID.startsWith(pokemonID)
		})

		if (RSB_MATCHES_POKEMON_ID) {
			return true
		}

		return (skillIDs ?? []).some(skillID => {
			return rsbID.startsWith(skillID)
		})
	})

	return getEntities({
		...options || {},
		ids: FILTERED_RSB_IDS,
		type: 'rsbs',
	})
}
