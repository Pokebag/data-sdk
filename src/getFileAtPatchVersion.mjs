// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import merge from 'lodash-es/merge.js'
import path from 'path'





// Local imports
import { getPatches } from './helpers/getPatches.mjs'
import { patchReduce } from './helpers/patchReduce.mjs'





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
