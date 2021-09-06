// Local imports
import './models/Skill.js'
import {
	getDirectory,
	getEntities,
} from './api/index.js'





/**
 * Returns data for held items
 *
 * @memberof module:@pokebag/data-sdk
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.ids] Array of item IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string[]} [options.pokemonIDs] Array of Pokémon IDs to whom the returned skills must belong
 *
 * @returns {Promise<Skill[]>} An array containing data for each item requested
 */
export async function getSkills(options) {
	if ((typeof options?.pokemonIDs === 'undefined')) {
		return getEntities({
			...(options || {}),
			type: 'skills',
		})
	}

	const {
		patch,
		pokemonIDs,
	} = options

	if (!Array.isArray(pokemonIDs)) {
		throw new TypeError('pokemonIDs must be an array')
	}

	if (typeof options.ids !== 'undefined') {
		throw new TypeError('ids and pokemonIDs may not be used together; you must choose one')
	}

	const ALL_SKILL_IDS = await getDirectory('skills', patch)

	let response = []
	let index = 0

	while (index < pokemonIDs.length) {
		const pokemonID = pokemonIDs[index]
		const SKILL_IDS = ALL_SKILL_IDS.filter(skill => skill.startsWith(pokemonID))

		const SKILLS = await getEntities({
			...options,
			ids: SKILL_IDS,
			type: 'skills',
		})

		response = response.concat(SKILLS)

		index += 1
	}

	return response
}
