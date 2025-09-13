const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
	e2e: {
		specPattern: 'cypress/e2e/features/**/*.feature',
		setupNodeEvents(on, config) {
			// This is required for the preprocessor to be able to generate JSON reports after each run, and more,

			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin.default(config)]
				})
			);

			preprocessor.addCucumberPreprocessorPlugin(on, config);

			return config;
		},

		// Base URL. Would be better to use an env variable - see README
		baseUrl: 'https://www.saucedemo.com'
	}
});
