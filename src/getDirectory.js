// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import path from 'path'





// Local imports
import { filterPatches } from './helpers/filterPatches.js'
import { getPatches } from './getPatches.js'
import { patchReduce } from './helpers/patchReduce.js'





/**
 * Returns the contents of a directory for a particular version in the dataset.
 *
 * @param {string} directory Relative path to a directory inside of the dataset
 * @param {string} [version=latest] The version of the dataset to use
 *
 * @returns {Promise<string[]>} An array containing a compiled version of the contents of the requested directory
 */
export async function getDirectory(directory, version = 'latest') {
	const PATCHES = await getPatches()
	const FILTERED_PATCHES = await filterPatches(PATCHES, version)

	const DIRECTORY_CONTENTS = await patchReduce(['base', ...FILTERED_PATCHES], async (accumulator, currentPatchVersion) => {
		try {
			const DIRECTORY_CONTENTS = await fs.readdir(path.resolve(DATA_ROOT, currentPatchVersion, directory))
			return accumulator.concat(DIRECTORY_CONTENTS)
		} catch(error) {
			return accumulator
		}
	}, [])

	// return deduped directory contents
	return Array.from(new Set(DIRECTORY_CONTENTS))
}
