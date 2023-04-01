export {};

test('', () => {
	// Charts highly depend on layout but there's no layout in jest's jsdom to test it.
	// In a production app we could have e2e tests running in a real browser, using Cypress for example.
});
