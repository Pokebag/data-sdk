// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from './test-helpers/useMockFS.js'
import { getRSBs } from '../src/getRSBs.js'





describe('getRSBs', function () {
	useMockFS()

	it('is a function', () => {
		expect(getRSBs).to.be.a('function')
	})

	describe('with no options', () => {
		it('returns all RSBs', async () => {
			const RSBS_ARRAY = Object.values(mockData.rsbs)
			const RESPONSE = await getRSBs()

			expect(RESPONSE).to.deep.equal(RSBS_ARRAY)
		})
	})

	describe('with valid arguments', () => {
		describe('options.ids', () => {
			it('given an array of RSB IDs, returns each RSB in the array', async () => {
				const RSB_IDS = ['absol-feint-rsb', 'garchomp-dig-rsb']
				const RSB_DATA = RSB_IDS.map(id => mockData.rsbs[id])
				const RESPONSE = await getRSBs({ ids: RSB_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(RSB_DATA[index])
				})
			})
		})

		describe('options.pokemonIDs', () => {
			it('given an array of Pokémon IDs, returns only RSBs that belong to the listed Pokémon', async () => {
				const POKEMON_IDS = ['absol', 'garchomp']
				const RSB_DATA = Object.entries(mockData.rsbs)
					.filter(([rsbID]) => {
						return POKEMON_IDS.some(pokemonID => {
							return rsbID.startsWith(pokemonID)
						})
					})
					.map(([_, rsbData]) => rsbData)
				const RESPONSE = await getRSBs({ pokemonIDs: POKEMON_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(RSB_DATA[index])
				})
			})
		})

		describe('options.skillIDs', () => {
			it('given an array of skill IDs, returns only RSBs that belong to the listed skills', async () => {
				const SKILL_IDS = ['absol-feint', 'garchomp-dig']
				const RSB_DATA = Object.entries(mockData.rsbs)
					.filter(([rsbID]) => {
						return SKILL_IDS.some(skillID => {
							return rsbID.startsWith(skillID)
						})
					})
					.map(([_, rsbData]) => rsbData)
				const RESPONSE = await getRSBs({ skillIDs: SKILL_IDS })

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(RSB_DATA[index])
				})
			})
		})

		describe('options.pokemonIDs + options.skillIDs', () => {
			it('given an array of Pokémon IDs AND an array of skill IDs, returns RSBs that belong to either the listed Pokémon OR the listed skills', async () => {
				const POKEMON_IDS = ['absol', 'garchomp']
				const SKILL_IDS = ['crustle-fury-cutter', 'lucario-bone-rush']
				const RSB_DATA = Object.entries(mockData.rsbs)
					.filter(([rsbID]) => {
						const rsbMatchesPokemonID = POKEMON_IDS.some(pokemonID => {
							return rsbID.startsWith(pokemonID)
						})
						const rsbMatchesSkillID = SKILL_IDS.some(skillID => {
							return rsbID.startsWith(skillID)
						})

						return rsbMatchesPokemonID || rsbMatchesSkillID
					})
					.map(([_, rsbData]) => rsbData)
				const RESPONSE = await getRSBs({
					pokemonIDs: POKEMON_IDS,
					skillIDs: SKILL_IDS,
				})

				expect(RESPONSE).to.be.an('array')
				RESPONSE.forEach((item, index) => {
					expect(item).to.deep.equal(RSB_DATA[index])
				})
			})
		})
	})

	describe('with invalid arguments', () => {
		describe('given an invalid options type', () => {
			it('throws an error', async () => {
				const errorStuff = [TypeError, 'options must be an object']

				// @ts-ignore
				expect(getRSBs(null)).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getRSBs([])).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getRSBs(12345)).to.eventually.throw(...errorStuff)
				// @ts-ignore
				expect(getRSBs('mr-mime')).to.eventually.throw(...errorStuff)
			})
		})
	})
})
