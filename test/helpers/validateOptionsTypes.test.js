// Module imports
import { expect } from 'chai'





// Local imports
import { validateOptionsTypes } from '../../src/helpers/validateOptionsTypes.js'





describe('validateOptionsTypes', function() {
	it('is a function', () => {
		expect(validateOptionsTypes).to.be.a('function')
	})

	describe('existence validation', () => {
		it('validates the existence of required keys', () => {
			expect(() => validateOptionsTypes({
				requiredField: 'foo',
			}, {
				requiredField: { isRequired: true },
			})).to.not.throw()
		})

		it('errors if the input is missing required keys', () => {
			expect(() => validateOptionsTypes({
				notTheRequiredField: 'foo',
			}, {
				requiredField: { isRequired: true },
			})).to.throw(TypeError, /^requiredField is required$/)
		})
	})

	describe('negation validation', () => {
		it('validates that negated keys do not exist', () => {
			expect(() => validateOptionsTypes({
				exclusiveField: 'foo',
			}, {
				exclusiveField: { notInPresenceOf: ['negatedField'] },
			})).to.not.throw()
		})

		it('errors if negated keys exist', () => {
			expect(() => validateOptionsTypes({
				exclusiveField: 'foo',
				negatedField: 'bar',
			}, {
				exclusiveField: { notInPresenceOf: ['negatedField'] },
			})).to.throw(TypeError, /^exclusiveField may not be used at the same time as: negatedField$/)
		})
	})

	describe('types validation', () => {
		describe('given a boolean type', () => {
			it('validates boolean values', () => {
				expect(() => validateOptionsTypes({
					boolean1: true,
					boolean2: false,
				}, {
					boolean1: { type: 'boolean' },
					boolean2: { type: 'boolean' },
				})).to.not.throw()
			})

			it('errors on string values', () => {
				expect(() => validateOptionsTypes({
					boolean: 'true',
				}, {
					boolean: { type: 'boolean' },
				})).to.throw(TypeError, /must be a boolean$/)
			})

			it('errors on object values', () => {
				expect(() => validateOptionsTypes({
					boolean: {},
				}, {
					boolean: { type: 'boolean' },
				})).to.throw(TypeError, /must be a boolean$/)
			})

			it('errors on array values', () => {
				expect(() => validateOptionsTypes({
					boolean: [],
				}, {
					boolean: { type: 'boolean' },
				})).to.throw(TypeError, /must be a boolean$/)
			})

			it('errors on number values', () => {
				expect(() => validateOptionsTypes({
					boolean1: 1,
					boolean2: 0,
				}, {
					boolean1: { type: 'boolean' },
					boolean2: { type: 'boolean' },
				})).to.throw(TypeError, /must be a boolean$/)
			})
		})

		describe('given a number type', () => {
			it('validates number values', () => {
				expect(() => validateOptionsTypes({
					number1: 0,
					number2: 1,
				}, {
					number1: { type: 'number' },
					number2: { type: 'number' },
				})).to.not.throw()
			})

			it('errors on string values', () => {
				expect(() => validateOptionsTypes({
					array: '1',
				}, {
					array: { type: 'number' },
				})).to.throw(TypeError, /must be a number$/)
			})

			it('errors on object values', () => {
				expect(() => validateOptionsTypes({
					number: {},
				}, {
					number: { type: 'number' },
				})).to.throw(TypeError, /must be a number$/)
			})

			it('errors on boolean values', () => {
				expect(() => validateOptionsTypes({
					number: true,
				}, {
					number: { type: 'number' },
				})).to.throw(TypeError, /must be a number$/)
			})

			it('errors on array values', () => {
				expect(() => validateOptionsTypes({
					number: [],
				}, {
					number: { type: 'number' },
				})).to.throw(TypeError, /must be a number$/)
			})
		})

		describe('given a string type', () => {
			it('validates string values', () => {
				expect(() => validateOptionsTypes({
					string: 'foo',
				}, {
					string: { type: 'string' },
				})).to.not.throw()
			})

			it('errors on number values', () => {
				expect(() => validateOptionsTypes({
					array: 1,
				}, {
					array: { type: 'string' },
				})).to.throw(TypeError, /must be a string$/)
			})

			it('errors on object values', () => {
				expect(() => validateOptionsTypes({
					string: {},
				}, {
					string: { type: 'string' },
				})).to.throw(TypeError, /must be a string$/)
			})

			it('errors on boolean values', () => {
				expect(() => validateOptionsTypes({
					string: true,
				}, {
					string: { type: 'string' },
				})).to.throw(TypeError, /must be a string$/)
			})

			it('errors on array values', () => {
				expect(() => validateOptionsTypes({
					string: [],
				}, {
					string: { type: 'string' },
				})).to.throw(TypeError, /must be a string$/)
			})
		})

		describe('given an array type', () => {
			it('validates array values', () => {
				expect(() => validateOptionsTypes({
					array: [],
				}, {
					array: { type: 'array' },
				})).to.not.throw()
			})

			it('errors on string values', () => {
				expect(() => validateOptionsTypes({
					array: 'true',
				}, {
					array: { type: 'array' },
				})).to.throw(TypeError, /must be an array$/)
			})

			it('errors on object values', () => {
				expect(() => validateOptionsTypes({
					array: {},
				}, {
					array: { type: 'array' },
				})).to.throw(TypeError, /must be an array$/)
			})

			it('errors on boolean values', () => {
				expect(() => validateOptionsTypes({
					array: true,
				}, {
					array: { type: 'array' },
				})).to.throw(TypeError, /must be an array$/)
			})

			it('errors on number values', () => {
				expect(() => validateOptionsTypes({
					array1: 1,
					array2: 0,
				}, {
					array1: { type: 'array' },
					array2: { type: 'array' },
				})).to.throw(TypeError, /must be an array$/)
			})
		})
	})
})
