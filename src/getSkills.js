// Local imports
import './models/Skill.js'
import {
	getDirectory,
	getEnums,
	getEntities,
} from './api/index.js'





/**
 * Gets data for a subset of skills belonging to a specific list of Pokémon
 *
 * @param {Object} [options={}] An object containing filtering options
 * @param {string[]} [options.ids] Array of item IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string[]} [options.pokemonIDs] Array of Pokémon IDs to whom the returned skills must belong
 *
 * @returns {Promise<Skill[]>} An array containing data for each item requested
 */
async function getSkillsByPokemonIDs(options) {
	const {
		ids,
		patch,
		pokemonIDs,
	} = options

	if (!Array.isArray(pokemonIDs)) {
		throw new TypeError('pokemonIDs must be an array')
	}

	if (typeof ids !== 'undefined') {
		throw new TypeError('ids and pokemonIDs may not be used together; you must choose one')
	}

	const ALL_SKILL_IDS = await getDirectory('skills', patch)

	let response = []
	let index = 0

	while (index < pokemonIDs.length) {
		const pokemonID = pokemonIDs[index]
		const FILTERED_SKILL_IDS = ALL_SKILL_IDS.filter(skill => skill.startsWith(pokemonID))

		const SKILLS = await getEntities({
			...options,
			ids: FILTERED_SKILL_IDS,
			type: 'skills',
		})

		response = response.concat(SKILLS)

		index += 1
	}

	return response
}

/**
 * Loops through an array of skills and parses enumerable properties into their
 * representative strings
 *
 * @param {Skill[]} skills
 */
async function parseSkillEnums(skills) {
	const [
		pokemonSkillSlots,
		pokemonSkillTypes,
	] = await Promise.all([
		getEnums({ type: 'pokemon-skill-slot' }),
		getEnums({ type: 'pokemon-skill-type' }),
	])

	skills.forEach(skill => {
		skill.slot = pokemonSkillSlots[skill.slot]
		skill.type = pokemonSkillTypes[skill.type]
	})
}

/**
 * Gets data for skills
 *
 * @memberof module:@pokebag/data-sdk
 * @param {Object} [options={}] An object containing filtering options
 * @param {string[]} [options.ids] Array of skill IDs to be returned
 * @param {boolean} [options.parseEnums=true] Whether or not parse enumerable properties
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string[]} [options.pokemonIDs] Array of Pokémon IDs to whom the returned skills must belong
 *
 * @returns {Promise<Skill[]>} An array containing data for each skill requested
 */
export async function getSkills(options = {}) {
	const {
		parseEnums = true,
		pokemonIDs,
	} = options

	if ((typeof parseEnums !== 'undefined') && (typeof parseEnums !== 'boolean')) {
		throw new TypeError('parseEnums must be a boolean')
	}

	let skills = null

	if (typeof pokemonIDs !== 'undefined') {
		skills = await getSkillsByPokemonIDs(options)
	} else {
		skills = await getEntities({
			...options,
			type: 'skills',
		})
	}

	if (parseEnums) {
		await parseSkillEnums(skills)
	}

	return skills
}
