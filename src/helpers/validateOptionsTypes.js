/**
 * Validate the existence of a single options key
 *
 * @param {string} key
 * @param {*} value
 */
function validateExistence(key, value) {
	if (typeof value === 'undefined') {
		throw new TypeError(`${key} is required`)
	}
}

/**
 * Validate that none of the negated properties exist
 *
 * @param {Object} optionsDict
 * @param {string} key
 * @param {*} value
 * @param {string[]} notInPresenceOf
 */
function validateNegation(optionsDict, key, value, notInPresenceOf) {
	if (typeof value !== 'undefined') {
		const NEGATED_KEYS = Object
			.keys(optionsDict)
			.filter(potentiallyNegatedKey => notInPresenceOf.includes(potentiallyNegatedKey))

		if (NEGATED_KEYS.length) {
			throw new TypeError(`${key} may not be used at the same time as: ${NEGATED_KEYS.join(', ')}`)
		}
	}
}

/**
 * Validate array type values
 *
 * @param {string} key
 * @param {*} value
 * @param {string} type
 */
function validateTypeArray(key, value) {
	if (typeof value !== 'undefined' && !Array.isArray(value)) {
		throw new TypeError(`${key} must be an array`)
	}
}

/**
 * Validate the type of a single options key
 *
 * @param {string} key
 * @param {*} value
 * @param {string} type
 */
function validateType(key, value, type) {
	if (type === 'array') {
		validateTypeArray(key, value)
	} else if (typeof value !== 'undefined' && typeof value !== type) {
		throw new TypeError(`${key} must be a ${type}`)
	}
}

/**
 * Validate an options object's types
 *
 * @param {Object} optionsDict
 * @param {Object} validationOptions
 */
export function validateOptionsTypes(optionsDict, validationOptions) {
	Object.entries(validationOptions).forEach(([key, validationOptionsDict]) => {
		const value = optionsDict[key]

		if (validationOptionsDict.isRequired) {
			validateExistence(key, value)
		}

		if (validationOptionsDict.isRequired) {
			validateExistence(key, value)
		}

		if (validationOptionsDict.notInPresenceOf) {
			validateNegation(optionsDict, key, value, validationOptionsDict.notInPresenceOf)
		}

		if (validationOptionsDict.type) {
			validateType(key, value, validationOptionsDict.type)
		}
	})
}
