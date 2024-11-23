import React from 'react';
import NotFound from './NotFound';

describe('<NotFound />', () => {
    beforeEach(() => {
        cy.mount(<NotFound />);
    });

    it('renders not found section', () => {
        cy.getByDataCy('notfound-page').should('exist');
    });
});
