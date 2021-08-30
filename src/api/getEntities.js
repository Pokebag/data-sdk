// Local imports
import { getDirectory } from './getDirectory.js'
import { getFile } from './getFile.js'





/**
 * Returns data for entities
 *
 * @param {Object} options An object containing filtering options
 * @param {string[]} [options.ids] Array of entity IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string} options.type Entity type to return
 *
 * @returns {Promise<Object[]>} An array containing data for each item requested
 */
export async function getEntities(options) {
	const {
		patch,
		type,
	} = options
	let { ids } = options

	// If no ids provided, get all entities
	if (typeof ids === 'undefined') {
		ids = await getDirectory(type, patch)
	}

	// If ids isn't an array of strings, throw an error
	if (!Array.isArray(ids) || ids.some(item => typeof item !== 'string')) {
		throw new TypeError(`ids must be an array of strings`)
	}

	// Convert IDs to filenames
	ids = ids.map(id => {
		if (!id.endsWith('.json')) {
			return `${id}.json`
		}

		return id
	})

	// If ids is an array of strings, get
	return Promise.all(ids.map(filename => {
		return getFile(`${type}/${filename}`)
	}))
}
