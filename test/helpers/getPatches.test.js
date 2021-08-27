// Module imports
import { expect } from 'chai'





// Local imports
import { getPatches } from '../../src/helpers/getPatches.js'





function comparePatches(patchA, patchB) {
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





describe('getPatches', function() {
	it('should be a function', () => {
		expect(getPatches).to.be.a('function')
	})

	it('should return an array of patches', async () => {
		const patches = await getPatches()

		expect(patches).to.be.an('array')
		expect(patches.every(item => /^(?:\d+\.)+\d+$/.test(item))).to.be.true
	})

	it('should return a limited array of patches', async () => {
		// Get all patches so we can pick one to work with
		const initialPatches = await getPatches()

		// Grab a patch from the middle of the list
		const maxPatch = initialPatches[Math.ceil((initialPatches.length - 1) / 2)]

		// Get a liimited list of patches
		const patches = await getPatches(maxPatch)

		// Ensure all returned patches are less than or equal to the maximum patch version
		expect(patches.every(item => !comparePatches(item, maxPatch))).to.be.true
	})
})
