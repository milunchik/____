import React from 'react';
import Footer from './Footer';

describe('<Footer />', () => {
    beforeEach(() => {
        cy.mount(<Footer />);
    });

    it('should display social icons and copyright text', () => {
        cy.get('[data-testid="linkedin-icon"]', { timeout: 10000 }).should('exist');
        cy.get('[data-testid="instagram-icon"]').should('exist');
        cy.get('[data-testid="github-icon"]').should('exist');
        cy.get('[data-testid="footer"]').should('contain', 'Copyright');
        cy.get('[data-testid="footer"]').should('contain', 'Built by Grab Emilia');
    });
});
