// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { getHeldItems } from '../src/getHeldItems.js'





describe('getHeldItems', function () {
	useMockFS()

	it('is a function', () => {
		expect(getHeldItems).to.be.a('function')
	})

	it('given no arguments, returns all held items', async () => {
		const HELD_ITEMS_ARRAY = Object.values(mockData.heldItems)
		const RESPONSE = await getHeldItems()

		expect(RESPONSE).to.deep.equal(HELD_ITEMS_ARRAY)
	})

	it('given an array of item IDs, returns each held item in the array', async () => {
		const HELD_ITEM_IDS = ['aeos-cookie', 'buddy-barrier']
		const HELD_ITEM_DATA = HELD_ITEM_IDS.map(id => mockData.heldItems[id])
		const RESPONSE = await getHeldItems({ items: HELD_ITEM_IDS })

		expect(RESPONSE).to.be.an('array')
		RESPONSE.forEach((item, index) => {
			expect(item).to.deep.equal(HELD_ITEM_DATA[index])
		})
	})

	it('given anything other than an array, throws an error', async () => {
		const errorStuff = [TypeError, 'First argument must be an array of strings.']

		// @ts-ignore
		expect(getHeldItems(null)).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getHeldItems(456)).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getHeldItems({})).to.eventually.throw(...errorStuff)
		// @ts-ignore
		expect(getHeldItems('mr-mime')).to.eventually.throw(...errorStuff)
	})
})
