// ***********************************************************
// This example support/component.js is processed and
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

import '@cypress/code-coverage/support';
import './commands';

import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom';

Cypress.Commands.add('mount', mount);

// Custom command to mount a component with necessary providers
Cypress.Commands.add('mountWithProviders', (component, { route = '/' } = {}) => {
    const wrapped = (
        <MemoryRouter initialEntries={[route]}>
            <AuthProvider>{component}</AuthProvider>
        </MemoryRouter>
    );
    return mount(wrapped);
});

// Cypress.Commands.add('myCustomMount', mount);

// Example use:
// cy.mount(<MyComponent />)
