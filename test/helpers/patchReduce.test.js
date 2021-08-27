// Module imports
import { expect } from 'chai'





// Local imports
import { patchReduce } from '../../src/helpers/patchReduce.js'





describe('patchReduce', function() {
	it('should be a function', () => {
		expect(patchReduce).to.be.a('function')
	})

	it('should reduce a list of patches', async () => {
		const PATCHES = [
			'1',
			'1',
			'1',
		]
		const result = await patchReduce(PATCHES, (accumulator, item) => (accumulator + item), 0)

		expect(result).to.equal(3)
	})
})
