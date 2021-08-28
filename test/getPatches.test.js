// Module imports
import { expect } from 'chai'





// Local imports
import { getPatches } from '../src/getPatches.js'
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'





describe('getPatches', function () {
	useMockFS()

	it('is a function', () => {
		expect(getPatches).to.be.a('function')
	})

	it('returns a list of patches', async () => {
		const PATCHES = await getPatches()

		expect(PATCHES).to.have.ordered.members(mockData.patches)
	})
})
