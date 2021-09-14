// Local imports
import './models/Skill.js'
import {
	getDirectory,
	getEnums,
	getEntities,
} from './api/index.js'
import { getRSBs } from './getRSBs.js'
import { validateOptionsTypes } from './helpers/validateOptionsTypes.js'





/**
 * Loops through an array of skills and any known RSBs
 *
 * @param {Skill[]} skills
 */
async function addRSBs(skills) {
	const RSBS = await getRSBs({
		skillIDs: skills.map(skill => skill.id)
	})

	RSBS.forEach(rsb => {
		const skill = skills.find(skill => (skill.id === rsb.skillID))
		skill.rsb = rsb
	})
}

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
		patch,
		pokemonIDs,
	} = options

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
 * @param {boolean} [options.includeRSBs=false] Whether or not include RSBs
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
		includeRSBs = false,
	} = options

	validateOptionsTypes(options, {
		parseEnums: { type: 'boolean' },
		pokemonIDs: {
			notInPresenceOf: ['ids'],
			type: 'array',
		},
		includeRSBs: { type: 'boolean' },
	})

	let skills = null

	if (pokemonIDs) {
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

	if (includeRSBs) {
		await addRSBs(skills)
	}

	return skills
}
