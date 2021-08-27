// Local imports
import { getAllPatches } from '../getAllPatches.mjs'





export async function getPatches(maxVersion) {
	// Get all patches
	const PATCHES = await getAllPatches()

	if (!maxVersion) {
		return PATCHES
	}

	let version = maxVersion

	// Handle version keywords
	if (maxVersion === 'latest') {
		version = PATCHES[PATCHES.length - 1]
	}

	// Find the requested version in the list of patches
	const PATCH_VERSION_INDEX = PATCHES.indexOf(maxVersion)

	// Get a copy of the patches array up to the
	return PATCHES.slice(0, PATCH_VERSION_INDEX + 1)
}
