/**
 * Generates a JSON object representing the directory/file structure of a patch.
 *
 * @param {string} versionMod The final version of the patch to be generated
 * @param {object} data The directory/file structure to represent the patch
 *
 * @returns {[string, object]} `[key, data]`
 */
export function generatePatchData(versionMod, data = {}) {
	return [
		`1.1.1.${versionMod}`,
		{
			'details.json': JSON.stringify({
				notes: `Patch notes for version 1.1.1.${versionMod}`,
				releasedAt: `2021-01-${versionMod.padStart(2, '0')}`,
			}),
			...data,
		},
	]
}
