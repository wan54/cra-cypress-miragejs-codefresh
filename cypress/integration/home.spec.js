import { makeServer } from '../../src/api-mock/server';

describe('Home page', () => {
	let server;

	beforeEach(() => {
		server = makeServer('test');
	});

	afterEach(() => {
		server.shutdown();
	});

	describe('given the home page is loaded', () => {
		describe('when fetching metadata on load', () => {
			it('then should display the metadata', () => {
				cy.visit('/');
				cy.injectAxe();
				cy.checkA11y();
				// cy.checkSeriousImpactA11y();

				cy.get('[data-cy=metadata-list]')
					.children('li')
					.should('have.length', 2);
			});
		});
	});
});
