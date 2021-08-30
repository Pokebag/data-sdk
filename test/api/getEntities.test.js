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

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of Pokémon IDs, returns each Pokémon in the array', async () => {
				const POKEMON_IDS = ['crustle', 'zeraora']
				const POKEMON_DATA = POKEMON_IDS.map(id => mockData.pokemon[id])
				const RESPONSE = await getEntities({
					ids: POKEMON_IDS,
					type: 'pokemon',
				})

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(POKEMON_DATA[index])
				})
			})
		})

		xdescribe('options.patch', () => {
			it('given a patch version, returns only Pokémon that would be available in that patch', async () => {
				// const POKEMON_IDS = ['crustle', 'zeraora']
				// const POKEMON_DATA = POKEMON_IDS.map(id => mockData.pokemon[id])
				// const RESPONSE = await getEntities({ ids: POKEMON_IDS })

				// expect(RESPONSE).to.be.an('array')
				// RESPONSE.forEach((item, index) => {
				// 	expect(item).to.deep.equal(POKEMON_DATA[index])
				// })
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given no options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-expect-error
				expect(getEntities()).to.eventually.throw(...errorStuff)
			})
		})

		describe('given `null` as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-expect-error
				expect(getEntities(null)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an array as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-expect-error
				expect(getEntities([])).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a number as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-expect-error
				expect(getEntities(12345)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a string as options', () => {
			const errorStuff = [TypeError, 'options must be an object']

			it('throws an error', async () => {
				// @ts-expect-error
				expect(getEntities('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an object as options', () => {
			describe('options.type', () => {
				describe('given no type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEntities({})).to.eventually.throw(...errorStuff)
					})
				})

				describe('given `null` as type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEntities({ type: null })).to.eventually.throw(...errorStuff)
					})
				})

				describe('given an object as type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEntities({ type: {} })).to.eventually.throw(...errorStuff)
					})
				})

				describe('given an array as type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEntities({ type: [] })).to.eventually.throw(...errorStuff)
					})
				})

				describe('given a number as type', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'type must be a string']

						// @ts-expect-error
						expect(getEntities({ type: 12345 })).to.eventually.throw(...errorStuff)
					})
				})
			})

			describe('options.ids', () => {
				describe('given `null`', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'ids must be an array of strings']

						expect(getEntities({
							ids: null,
							type: 'pokemon',
						// @ts-expect-error
						})).to.eventually.throw(...errorStuff)
					})
				})

				describe('given an object', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'ids must be an array of strings']

						expect(getEntities({
							// @ts-expect-error
							ids: {},
							type: 'pokemon',
						// @ts-expect-error
						})).to.eventually.throw(...errorStuff)
					})
				})

				describe('given a string', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'ids must be an array of strings']

						expect(getEntities({
							// @ts-expect-error
							ids: 'foo',
							type: 'pokemon',
						// @ts-expect-error
						})).to.eventually.throw(...errorStuff)
					})
				})

				describe('given a number', () => {
					it('throws an error', () => {
						const errorStuff = [TypeError, 'ids must be an array of strings']

						expect(getEntities({
							// @ts-expect-error
							ids: 12345,
							type: 'pokemon',
						// @ts-expect-error
						})).to.eventually.throw(...errorStuff)
					})
				})

				describe('given an array', () => {
					describe('of `null`', () => {
						it('throws an error', () => {
							const errorStuff = [TypeError, 'ids must be an array of strings']

							expect(getEntities({
								ids: [null],
								type: 'pokemon',
							// @ts-expect-error
							})).to.eventually.throw(...errorStuff)
						})
					})

					describe('of objects', () => {
						it('throws an error', () => {
							const errorStuff = [TypeError, 'ids must be an array of strings']

							expect(getEntities({
								// @ts-expect-error
								ids: [{}],
								type: 'pokemon',
							// @ts-expect-error
							})).to.eventually.throw(...errorStuff)
						})
					})

					describe('of arrays', () => {
						it('throws an error', () => {
							const errorStuff = [TypeError, 'ids must be an array of strings']

							expect(getEntities({
								// @ts-expect-error
								ids: [[]],
								type: 'pokemon',
							// @ts-expect-error
							})).to.eventually.throw(...errorStuff)
						})
					})

					describe('of numbers', () => {
						it('throws an error', () => {
							const errorStuff = [TypeError, 'ids must be an array of strings']

							expect(getEntities({
								// @ts-expect-error
								ids: [12345],
								type: 'pokemon',
							// @ts-expect-error
							})).to.eventually.throw(...errorStuff)
						})
					})
				})
			})
		})
	})
})
