// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-axe'
import '@cypress/code-coverage/support'
import './commands'

Cypress.on('window:before:load', (win) => {
    win.handleFromCypress = (request) =>
      fetch(request.url, {
        method: request.method,
        headers: request.requestHeaders,
        body: request.requestBody,
      })
        .then((res) => {
          const content = res.headers
            ?.get('content-type')
            ?.includes('application/json')
            ? res.json()
            : res.text();
          return new Promise((resolve) => {
            content.then((body) => resolve([res.status, res.headers, body]));
          });
        })
        .catch((error) => {
          console.log('Cypress request proxy error', { error });
        });
  });