// Module imports
import { expect } from 'chai'





// Local imports
import { patchReduce } from '../../src/helpers/patchReduce.js'





describe('patchReduce', function() {
	it('is a function', () => {
		expect(patchReduce).to.be.a('function')
	})

	it('reduces a list of patches', async () => {
		const PATCHES = [
			'1',
			'1',
			'1',
		]
		const result = await patchReduce(PATCHES, (accumulator, item) => (accumulator + Number(item)), 0)

		expect(result).to.equal(3)
	})
})
