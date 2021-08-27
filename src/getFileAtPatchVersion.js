// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import merge from 'lodash-es/merge.js'
import path from 'path'





// Local imports
import { getPatches } from './helpers/getPatches.js'
import { patchReduce } from './helpers/patchReduce.js'





/**
 * Returns the contents of a file for a particular version in the dataset.
 *
 * @param {string} file Relative path to a file inside of the dataset
 * @param {string} version The version of the dataset to use
 *
 * @returns {Promise<Record<string,*>>} An array containing a compiled version of the contents of the requested directory
 */
 export async function getFileAtPatchVersion(file, version = 'latest') {
	const PATCHES = await getPatches(version)

	if (PATCHES.indexOf(version) === -1) {
		throw new Error(`Pokémon UNITE patch version ${version} is not available.`)
	}

	const BASE_FILE_CONTENTS = await fs.readFile(path.resolve(DATA_ROOT, 'base', file), 'utf8')

	return patchReduce(PATCHES, async (accumulator, currentPatchVersion) => {
		try {
			const FILE_CONTENTS = await fs.readFile(path.resolve(DATA_ROOT, currentPatchVersion, file), 'utf8')
			return merge(accumulator, JSON.parse(FILE_CONTENTS))
		} catch(error) {
			return accumulator
		}
	}, JSON.parse(BASE_FILE_CONTENTS))
}
