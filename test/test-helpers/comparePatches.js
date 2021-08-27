/**
 * Compares two patch versions to determine which is greater.
 *
 * @param {string} patchA
 * @param {string} patchB
 *
 * @returns {boolean} True if patch A is greater then patch B, otherwise false.
 */
export function comparePatches(patchA, patchB) {
	const PATCH_ARRAY_A = patchA.split('.')
	const PATCH_ARRAY_B = patchB.split('.')

	const MAX_COMPARISONS = Math.min(PATCH_ARRAY_A.length, PATCH_ARRAY_B.length)

	let patchAIsGreater = false

	for (let index = 0; index < MAX_COMPARISONS; index += 1) {
		const PATCH_SEGMENT_A = Number(PATCH_ARRAY_A[index])
		const PATCH_SEGMENT_B = Number(PATCH_ARRAY_B[index])

		if (PATCH_SEGMENT_A === PATCH_SEGMENT_B) continue

		patchAIsGreater = PATCH_SEGMENT_A > PATCH_SEGMENT_B
		break
	}

	return patchAIsGreater
}
