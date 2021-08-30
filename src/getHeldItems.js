// Local imports
import './models/HeldItem.js'
import { getEntities } from './api/index.js'





/**
 * Returns data for held items
 *
 * @param {Object} [options] An object containing filtering options
 * @param {string[]} [options.items] Array of item IDs to be returned
 * @param {string} [options.patch] Maximum patch version to return data for
 *
 * @returns {Promise<HeldItem[]>} An array containing data for each item requested
 */
export async function getHeldItems(options = {}) {
	const {
		items,
		patch,
	} = options

	return getEntities({
		ids: items,
		patch,
		type: 'held-items',
	})
}
