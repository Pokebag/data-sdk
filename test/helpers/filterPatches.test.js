// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'
import { comparePatches } from '../test-helpers/comparePatches.js'
import { filterPatches } from '../../src/helpers/filterPatches.js'





describe('filterPatches', function() {
	useMockFS()

	it('is a function', () => {
		expect(filterPatches).to.be.a('function')
	})

	it('returns an array of patches', async () => {
		const FILTERED_PATCHES = await filterPatches(mockData.patches)

		expect(FILTERED_PATCHES).to.be.an('array')
		expect(FILTERED_PATCHES.every(item => /^(?:\d+\.)+\d+$/.test(item))).to.be.true
	})

	it('returns a limited array of patches', async () => {
		// Grab a patch from the middle of the list
		const MAX_PATCH_VERSION = mockData.patches[Math.round(mockData.patches.length / 2)]

		// Get a liimited list of patches
		const PATCHES = await filterPatches(mockData.patches, MAX_PATCH_VERSION)

		// Ensure all returned patches are less than or equal to the maximum patch version
		expect(PATCHES.every(item => !comparePatches(item, MAX_PATCH_VERSION))).to.be.true
	})
})
