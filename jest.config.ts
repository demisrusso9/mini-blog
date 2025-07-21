export default {
	// preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testMatch: [
		'**/tests/**/!(*setup).(ts|tsx|js)',
		'**/?(*.)+(spec|test).(ts|tsx|js)'
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
}
