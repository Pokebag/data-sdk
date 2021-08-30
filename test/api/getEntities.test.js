// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'
import { getEntities } from '../../src/api/getEntities.js'





describe('getEntities', function () {
	useMockFS()

	it('is a function', () => {
		expect(getEntities).to.be.a('function')
	})

	it('given an array of IDs, returns each entity in the array', async () => {
		const IDS = ['aeos-cookie', 'buddy-barrier']
		const ENTITY_DATA = IDS.map(id => mockData.heldItems[id])
		const RESPONSE = await getEntities({
			ids: IDS,
			type: 'held-items',
		})

		expect(RESPONSE).to.be.an('array')
		RESPONSE.forEach((item, index) => {
			expect(item).to.deep.equal(ENTITY_DATA[index])
		})
	})

	it('given anything other than an array, throws an error', async () => {
		const errorStuff = [TypeError, 'First argument must be an array of strings.']

		// @ts-ignore
		expect(getEntities(undefined)).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getEntities(null)).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getEntities(456)).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getEntities({})).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getEntities('mr-mime')).to.eventually.throw(...errorStuff)
	})
})
