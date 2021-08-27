// Module imports
import { expect } from 'chai'





// Local imports
import { comparePatches } from '../test-helpers/comparePatches.js'
import { getPatches } from '../../src/helpers/getPatches.js'
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'





describe('getPatches', function() {
	useMockFS()

	it('is a function', () => {
		expect(getPatches).to.be.a('function')
	})

	it('returns an array of patches', async () => {
		const PATCHES = await getPatches()

		expect(PATCHES).to.be.an('array')
		expect(PATCHES.every(item => /^(?:\d+\.)+\d+$/.test(item))).to.be.true
	})

	it('returns a limited array of patches', async () => {
		// Grab a patch from the middle of the list
		const MAX_PATCH = mockData.patches[Math.round(mockData.patches.length / 2)]

		// Get a liimited list of patches
		const PATCHES = await getPatches(MAX_PATCH)

		// Ensure all returned patches are less than or equal to the maximum patch version
		expect(PATCHES.every(item => !comparePatches(item, MAX_PATCH))).to.be.true
	})
})
