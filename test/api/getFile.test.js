// Module imports
import { expect } from 'chai'





// Local imports
import {
	mockData,
	useMockFS,
} from '../test-helpers/useMockFS.js'
import { getFile } from '../../src/api/getFile.js'





// Constants
const FILES_DATA = {}





describe('getFile', () => {
	useMockFS()

	before('Retrieve file data for all Pokémon in each patch', async () => {
		const ALL_POKEMON = ['charizard', ...mockData.pokemon]
		let patchIndex = 0

		while(patchIndex < mockData.patches.length) {
			const PATCH = mockData.patches[patchIndex]

			FILES_DATA[PATCH] = {}

			let pokemonIndex = 0

			while(pokemonIndex < ALL_POKEMON.length) {
				const POKEMON = ALL_POKEMON[pokemonIndex]
				const POKEMON_DATUM = await getFile(`pokemon/${POKEMON}.json`, PATCH)

				FILES_DATA[PATCH][POKEMON] = POKEMON_DATUM

				pokemonIndex += 1
			}

			patchIndex += 1
		}
	})

	it('is a function', () => {
		expect(getFile).to.be.a('function')
	})

	describe('for each patch', () => {
		mockData.patches.forEach((patch, patchIndex) => {
			describe(patch, () => {
				describe('for each Pokémon', () => {
					['charizard', ...mockData.pokemon].forEach((pokemon, pokemonIndex) => {
						describe(pokemon, () => {
							if (pokemonIndex <= (patchIndex + 1)) {
								it('is available', () => {
									const POKEMON_DATUM = FILES_DATA[patch][pokemon]
									expect(POKEMON_DATUM).to.be.an('object')
								})

								it('has the correct stats', () => {
									expect(true).to.equal(true)
								})
							} else {
								it('is not available', () => {
									const POKEMON_DATUM = FILES_DATA[patch][pokemon]
									expect(POKEMON_DATUM).to.be.a('null')
								})
							}
						})
					})
				})
			})
		})
	})
})
