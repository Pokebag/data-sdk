// Module imports
import { expect } from 'chai'





// Local imports
import { sortVersions } from '../../src/helpers/sortVersions.js'





describe('sortVersions', function() {
	it('should be a function', () => {
		expect(sortVersions).to.be.a('function')
	})

	it('should not mutate its input list', () => {
		const unsortedVersions = [
			'1.1.1.6',
			'1.1.1.5',
			'1.1.1.3',
			'1.1.1.4',
			'1.1.1.1',
			'1.1.1.2',
		]
		const copyOfUnsortedVersions = [...unsortedVersions]

		sortVersions(copyOfUnsortedVersions)

		expect(unsortedVersions).to.have.ordered.members(copyOfUnsortedVersions)
	})

	it('should sort a list of simple versions', () => {
		const unsortedVersions = [
			'1.1.1.6',
			'1.1.1.5',
			'1.1.1.3',
			'1.1.1.4',
			'1.1.1.1',
			'1.1.1.2',
		]
		const sortedVersions = [
			'1.1.1.1',
			'1.1.1.2',
			'1.1.1.3',
			'1.1.1.4',
			'1.1.1.5',
			'1.1.1.6',
		]

		expect(sortVersions(unsortedVersions)).to.have.ordered.members(sortedVersions)
	})

	it('should sort a list of complex versions', () => {
		const unsortedVersions = [
			'1.1.1.6',
			'1.1.1.223345',
			'1.1.1.43',
			'1.1.1.64',
			'1.1.1.11',
			'1.1.1.2',
		]
		const sortedVersions = [
			'1.1.1.2',
			'1.1.1.6',
			'1.1.1.11',
			'1.1.1.43',
			'1.1.1.64',
			'1.1.1.223345',
		]

		expect(sortVersions(unsortedVersions)).to.have.ordered.members(sortedVersions)
	})
})
