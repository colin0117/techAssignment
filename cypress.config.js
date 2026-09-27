const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { generateReport } = require('./cypress/reporter/generateReport');

module.exports = defineConfig({
	e2e: {
		specPattern: ['cypress/e2e/features/**/*.feature', 'cypress/e2e/features/**/*.cy.js'],
		async setupNodeEvents(on, config) {
			on(
				'file:preprocessor',
				createBundler({
					plugins: [createEsbuildPlugin.default(config)]
				})
			);

			// Intercept after:run to chain both Cucumber preprocessor reporter and our unified test reporter
			const afterRunHandlers = [];
			const originalOn = on;
			const interceptedOn = (event, handler) => {
				if (event === 'after:run') {
					afterRunHandlers.push(handler);
					return;
				}
				return originalOn(event, handler);
			};

			await preprocessor.addCucumberPreprocessorPlugin(interceptedOn, config);

			afterRunHandlers.push(async (results) => {
				await generateReport(results, config);
			});

			originalOn('after:run', async (results) => {
				for (const handler of afterRunHandlers) {
					try {
						await handler(results);
					} catch (err) {
						console.error('Error executing after:run handler:', err);
					}
				}
			});

			return config;
		},

		// Base URL. Would be better to use an env variable - see README
		baseUrl: 'https://www.saucedemo.com'
	}
});
