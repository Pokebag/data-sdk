// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { getPokemon } from '../src/getPokemon.js'





describe('getPokemon', function () {
	useMockFS()

	it('is a function', () => {
		expect(getPokemon).to.be.a('function')
	})

	describe('with no options', () => {
		it('returns all Pokémon', async () => {
			const POKEMON_ARRAY = Object.values(mockData.pokemon)
			const RESPONSE = await getPokemon()

			expect(RESPONSE).to.deep.equal(POKEMON_ARRAY)
		})
	})

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of Pokémon IDs, returns each Pokémon in the array', async () => {
				const POKEMON_IDS = ['crustle', 'zeraora']
				const POKEMON_DATA = POKEMON_IDS.map(id => mockData.pokemon[id])
				const RESPONSE = await getPokemon({ ids: POKEMON_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(POKEMON_DATA[index])
				})
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given `null` as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getPokemon(null)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given an array as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getPokemon([])).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a number as options', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getPokemon(12345)).to.eventually.throw(...errorStuff)
			})
		})

		describe('given a string as options', () => {
			const errorStuff = [TypeError, 'options must be an object']

			it('throws an error', async () => {
				// @ts-ignore
				expect(getPokemon('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})
	})
})
