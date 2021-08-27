// Module imports
import { expect } from 'chai'





// Local imports
import { getAllPatches } from '../src/getAllPatches.js'
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'





describe('getAllPatches', function () {
	useMockFS()

	it('is a function', () => {
		expect(getAllPatches).to.be.a('function')
	})

	it('returns a list of patches', async () => {
		const PATCHES = await getAllPatches()

		expect(PATCHES).to.have.ordered.members(mockData.patches)
	})
})
