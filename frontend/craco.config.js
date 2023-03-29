// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require(`path`);

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	jest: {
		configure: {
			roots: ['<rootDir>', '<rootDir>/src'],
			moduleNameMapper: {
				'^@/(.*)$': '<rootDir>/src/$1',
			},
		},
	},
};
