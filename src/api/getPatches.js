// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'





// Local imports
import { sortVersions } from '../helpers/sortVersions.js'





/**
 * Returns a list of all patches currently available in the dataset.
 *
 * @memberof module:@pokebag/data-sdk
 *
 * @returns {Promise<string[]>} A list of all available patches
 */
export async function getPatches() {
	const PATCHES = await fs.readdir(DATA_ROOT)
	const FILTERED_PATCHES = PATCHES.filter(item => /^(?:\d+\.)+\d+$/.test(item))
	return sortVersions(FILTERED_PATCHES)
}
