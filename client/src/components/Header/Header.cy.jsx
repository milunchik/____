import React from 'react';
import Header from './Header';

describe('<Header />', () => {
    beforeEach(() => {
        cy.stub(React, 'useAuth').returns({
            user: { _id: '12345', name: 'Mock User' },
            isAuthenticated: true,
            signout: cy.stub(),
        });

        cy.mountWithProviders(<Header />);
    });

    it('renders header', () => {
        cy.getByDataCy('header').should('exist');
    });

    it('displays user profile link when authenticated', () => {
        cy.getByDataCy('profile-link').should('exist');
    });

    it('does not display login link when authenticated', () => {
        cy.getByDataCy('login-link').should('not.exist');
    });

    it('opens settings modal when settings button is clicked', () => {
        cy.getByDataCy('settings-button').click();
        cy.getByDataCy('main-modal').should('be.visible');
    });

    it('displays login link when user is not authenticated', () => {
        cy.stub(React, 'useAuth').returns({
            user: null,
            isAuthenticated: false,
            signout: cy.stub(),
        });

        cy.mountWithProviders(<Header />);
        cy.getByDataCy('login-link').should('exist');
        cy.getByDataCy('profile-link').should('not.exist');
    });
});
