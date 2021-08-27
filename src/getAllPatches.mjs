// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'





// Local imports
import { sortVersions } from './helpers/sortVersions.mjs'





export async function getAllPatches() {
	const PATCHES = await fs.readdir(DATA_ROOT)
	const FILTERED_PATCHES = PATCHES.filter(item => /^(?:\d+\.)+\d+$/.test(item))
	return sortVersions(FILTERED_PATCHES)
}
