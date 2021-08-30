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

	describe('with no options', () => {
		it('returns all held items', async () => {
			const HELD_ITEMS_ARRAY = Object.values(mockData.heldItems)
			const RESPONSE = await getHeldItems()

			expect(RESPONSE).to.deep.equal(HELD_ITEMS_ARRAY)
		})
	})

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of item IDs, returns each held item in the array', async () => {
				const HELD_ITEM_IDS = ['aeos-cookie', 'buddy-barrier']
				const HELD_ITEM_DATA = HELD_ITEM_IDS.map(id => mockData.heldItems[id])
				const RESPONSE = await getHeldItems({ ids: HELD_ITEM_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(HELD_ITEM_DATA[index])
				})
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given `null` as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getHeldItems(null)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an array as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getHeldItems([])).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a number as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getHeldItems(12345)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a string as options', () => {
			const errorStuff = [TypeError, 'options must be an object']

			it('throws an error', async () => {
				// @ts-ignore
				expect(getHeldItems('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})
	})
})
