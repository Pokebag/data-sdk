// Local imports
import './models/Pokemon.js'
import { getEntities } from './api/index.js'
import { getSkills } from './getSkills.js'





/**
 * Returns data for held items
 *
 * @memberof module:@pokebag/data-sdk
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.ids] Array of item IDs to be returned
 * @param {boolean} [options.includeSkills] Flag to include the Pokémon's skills in the response
 * @param {string} [options.patch] Maximum patch version to return data for
 *
 * @returns {Promise<Pokemon[]>} An array containing data for each item requested
 */
export async function getPokemon(options) {
	const POKEMON = await getEntities({
		...options || {},
		type: 'pokemon',
	})

	if (typeof options?.includeSkills === 'undefined') {
		return POKEMON
	}

	const { includeSkills } = options

	if (typeof includeSkills !== 'boolean') {
		throw new TypeError('includeSkills must be a boolean')
	}

	if (includeSkills) {
		const SKILLS = await getSkills({
			pokemonIDs: POKEMON.map(pokemon => pokemon.id),
		})

		POKEMON.forEach(pokemon => {
			pokemon.skills = SKILLS.filter(skill => {
				return skill.pokemonID === pokemon.id
			})
		})
	}

	return POKEMON
}
