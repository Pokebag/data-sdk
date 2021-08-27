// Module imports
import { promises as fs } from 'fs'
import { DATA_ROOT } from '@pokebag/pokemon-unite-data'
import path from 'path'





// Local imports
import { getPatches } from './helpers/getPatches.mjs'
import { patchReduce } from './helpers/patchReduce.mjs'





export async function getDirectoryAtPatchVersion(directory = '', version = 'latest') {
	const PATCHES = await getPatches(version)

	if (PATCHES.indexOf(version) === -1) {
		throw new Error(`Pokémon UNITE patch version ${version} is not available.`)
	}

	let baseDirectoryContents = await fs.readdir(path.resolve(DATA_ROOT, 'base', directory))

	const DIRECTORY_CONTENTS = await patchReduce(PATCHES, async (accumulator, currentPatchVersion) => {
		try {
			const DIRECTORY_CONTENTS = await fs.readdir(path.resolve(DATA_ROOT, currentPatchVersion, directory))
			return accumulator.concat(DIRECTORY_CONTENTS)
		} catch(error) {
			return accumulator
		}
	}, baseDirectoryContents)

	// return deduped directory contents
	return Array.from(new Set(DIRECTORY_CONTENTS))
}
