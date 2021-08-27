// Local imports
import { getAllPatches } from '../getAllPatches.js'





/**
 * Returns a limited list of patch versions.
 *
 * @param {string} [maxVersion] The maximum patch version to return
 *
 * @returns {Promise<string[]>} List of patches, clamped to the maximum version
 */
export async function getPatches(maxVersion) {
	// Get all patches
	const PATCHES = await getAllPatches()

	if (!maxVersion || maxVersion === 'latest') {
		return PATCHES
	}

	// Find the requested version in the list of patches
	const PATCH_VERSION_INDEX = PATCHES.indexOf(maxVersion)

	// Get a copy of the patches array up to the
	return PATCHES.slice(0, PATCH_VERSION_INDEX + 1)
}
