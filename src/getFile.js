// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import merge from 'lodash-es/merge.js'
import path from 'path'





// Local imports
import { filterPatches } from './helpers/filterPatches.js'
import { getPatches } from './getPatches.js'
import { patchReduce } from './helpers/patchReduce.js'





/**
 * Returns the contents of a file for a particular version in the dataset.
 *
 * @param {string} file Relative path to a file inside of the dataset
 * @param {string} version The version of the dataset to use
 *
 * @returns {Promise<Record<string,*>>} An array containing a compiled version of the contents of the requested directory
 */
 export async function getFile(file, version = 'latest') {
	const PATCHES = await getPatches()
	const FILTERED_PATCHES = await filterPatches(PATCHES, version)

	return patchReduce(['base', ...FILTERED_PATCHES], async (accumulator, currentPatchVersion) => {
		try {
			const FILE_CONTENTS = await fs.readFile(path.resolve(DATA_ROOT, currentPatchVersion, file), 'utf8')
			return merge(accumulator, JSON.parse(FILE_CONTENTS))
		} catch(error) {
			return accumulator
		}
	}, null)
}
