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
		const RESPONSE = await getHeldItems()

		expect(RESPONSE).to.have.ordered.members(mockData.heldItems)
	})

	it('given an item ID, returns the held item', async () => {
		const HELD_ITEM_ID = 'eject-button'
		const EJECT_BUTTON_DATA = mockData.heldItems[HELD_ITEM_ID]
		const RESPONSE = await getHeldItems(HELD_ITEM_ID)

		expect(RESPONSE).to.be.an('object')
		expect(RESPONSE).to.deep.equal(EJECT_BUTTON_DATA)
	})

	it('given an array of item IDs, returns each held item in the array', async () => {
		const HELD_ITEM_IDS = ['eject-button', 'x-attack']
		const HELD_ITEM_DATA = [
			mockData.heldItems[HELD_ITEM_IDS[0]],
			mockData.heldItems[HELD_ITEM_IDS[1]],
		]
		const RESPONSE = await getHeldItems(HELD_ITEM_IDS)

		expect(RESPONSE).to.be.an('array')
		RESPONSE.forEach(item => {
			expect(item).to.be.an('object')
			expect(item).to.deep.equal(HELD_ITEM_DATA)
		})
	})
})
