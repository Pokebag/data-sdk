// Local imports
import './models/Pokemon.js'
import { getEntities } from './api/index.js'





/**
 * Returns data for held items
 *
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.ids] Array of item IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 *
 * @returns {Promise<Pokemon[]>} An array containing data for each item requested
 */
export async function getPokemon(options = {}) {
	if ((typeof options !== 'object') || Array.isArray(options)) {
		throw new TypeError('options must be an object')
	}

	const {
		ids,
		patch,
	} = options

	return getEntities({
		ids,
		patch,
		type: 'pokemon',
	})
}
