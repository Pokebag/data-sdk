// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'
import { getEnums } from '../../src/api/getEnums.js'





describe('getEnums', function () {
	useMockFS()

	it('is a function', () => {
		expect(getEnums).to.be.a('function')
	})

	describe('with valid arguments', () => {
		xdescribe('options.patch', () => {})

		describe('options.type', () => {
			it('given a valid type, returns the appropriate enum for that type', async () => {
				const RESPONSE = await getEnums({
					type: mockData.enumTypes[0],
				})

				expect(RESPONSE).to.be.an('object')
					.and.to.deep.equal(mockData.enums[mockData.enumTypes[0]])
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given an invalid options type', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-expect-error
				expect(getEnums()).to.eventually.throw(...errorStuff)
				// @ts-expect-error
				expect(getEnums(null)).to.eventually.throw(...errorStuff)
				// @ts-expect-error
				expect(getEnums([])).to.eventually.throw(...errorStuff)
				// @ts-expect-error
				expect(getEnums(12345)).to.eventually.throw(...errorStuff)
				// @ts-expect-error
				expect(getEnums('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an object as options', () => {
			describe('options.type', () => {
				// Not a typo... It's the argument type passed via the `type` key
				describe('given an invalid type type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEnums({})).to.eventually.throw(...errorStuff)
						// @ts-expect-error
						expect(getEnums({ type: null })).to.eventually.throw(...errorStuff)
						// @ts-expect-error
						expect(getEnums({ type: {} })).to.eventually.throw(...errorStuff)
						// @ts-expect-error
						expect(getEnums({ type: [] })).to.eventually.throw(...errorStuff)
						// @ts-expect-error
						expect(getEnums({ type: 12345 })).to.eventually.throw(...errorStuff)
					})
				})
			})
		})
	})
})
