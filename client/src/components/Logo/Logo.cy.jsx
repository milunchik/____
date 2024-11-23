import React from 'react';
import Logo from './Logo';

describe('<Logo />', () => {
    beforeEach(() => {
        cy.mount(<Logo />);
    });

    it('renders logo section', () => {
        cy.getByDataCy('logo-title').should('exist');
    });
});
