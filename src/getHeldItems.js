// Local imports
import './models/HeldItem.js'
import { getEntities } from './api/index.js'





/**
 * Returns data for held items
 *
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.ids] Array of item IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 *
 * @returns {Promise<HeldItem[]>} An array containing data for each item requested
 */
export async function getHeldItems(options = {}) {
	if ((typeof options !== 'object') || Array.isArray(options)) {
		throw new TypeError('options must be an object')
	}

	return getEntities({
		...options,
		type: 'held-items',
	})
}
