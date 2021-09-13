// Local imports
import { getDirectory } from './getDirectory.js'
import { getFile } from './getFile.js'





/**
 * Returns a set of enums
 *
 * @example
 * // returns enums for Pokémon Skill Slot at patch 1.1.1.6
 * await getEnums({
 * 	patch: '1.1.1.6',
 * 	type: 'pokemon-skill-slot',
 * })
 *
 * @memberof module:@pokebag/data-sdk
 * @param {Object} options An object containing filtering options
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string} options.type The enum to be retrieved
 *
 * @returns {Promise<Object>} An object containing the requested enums
 */
export async function getEnums(options) {
	if ((typeof options !== 'object') || Array.isArray(options)) {
		throw new TypeError('options must be an object')
	}

	const {
		patch,
		type,
	} = options

	if (typeof type !== 'string') {
		throw new TypeError('type must be a string')
	}

	return getFile(`enums/${type}.json`, patch)
}
