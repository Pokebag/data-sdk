/**
 * Returns a limited list of patch versions.
 *
 * @param {string[]} patches The list of patches to filter
 * @param {string} [version=latest] The maximum patch version to return
 *
 * @returns {Promise<string[]>} List of patches, clamped to the maximum version
 */
export async function filterPatches(patches, version = 'latest') {
	if (version === 'latest') {
		return patches
	}

	// Find the requested version in the list of patches
	const PATCH_VERSION_INDEX = patches.indexOf(version)

	// Get a copy of the patches array up to the
	return patches.slice(0, PATCH_VERSION_INDEX + 1)
}
