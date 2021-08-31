// Local imports
import { getDirectory } from './getDirectory.js'
import { getFile } from './getFile.js'





/**
 * Converts a list of IDs into a list of filenames
 *
 * @param {string[]} ids A list of IDs to be parsed
 *
 * @returns {string[]} An array of filenames
 */
function getFilenamesForIDs(ids) {
	return ids.map(id => {
		if (!id.endsWith('.json')) {
			return `${id}.json`
		}

		return id
	})
}

/**
 * Returns a list of IDs
 *
 * @param {Object} options An object containing filtering options
 * @param {string[]} [options.ids] Array of entity IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 * @param {string} options.type Entity type to return
 *
 * @returns {Promise<String[]>} An array of entity IDs
 */
async function getIDs(options) {
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

	return ids
}

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
	if ((typeof options !== 'object') || Array.isArray(options)) {
		throw new TypeError('options must be an object')
	}

	const {
		patch,
		type,
	} = options
	let ids = await getIDs(options)

	if (typeof type !== 'string') {
		throw new TypeError('type must be a string')
	}

	// Convert IDs to filenames
	const FILENAMES = getFilenamesForIDs(ids)

	return Promise.all(FILENAMES.map(filename => {
		return getFile(`${type}/${filename}`, patch)
	}))
}
