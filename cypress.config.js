const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;

module.exports = defineConfig({
	e2e: {
		/***
		 * Use a specific timeout for command in that specific test rather than globally changing the TMO
		 */
		//Increase the default timer to account for the performance user
		// defaultCommandTimeout: 5000,

		specPattern: '**/*.feature',
		setupNodeEvents(on, config) {
			addCucumberPreprocessorPlugin(on, config);
			on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
			return config;
		},

		// Location of the feature files
		specPattern: 'cypress/e2e/**/*.feature',
		
		// Base URL. Would be better to use an env variable - see README
		baseUrl: 'https://www.saucedemo.com'
	}
});
