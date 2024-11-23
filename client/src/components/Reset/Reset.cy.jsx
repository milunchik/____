import React from 'react';
import ResetForm from './ResetForm';
import ResetToken from './ResetToken';

describe('Reset Form Component', () => {
    beforeEach(() => {
        cy.mount(<ResetForm />);
    });

    it('should render reset', () => {
        cy.getByDataCy('reset-form-section').should('exist');
    });
});

describe('Reset Token Component', () => {
    beforeEach(() => {
        cy.mount(<ResetToken />);
    });

    it('should render reset token', () => {
        cy.getByDataCy('reset-token-section').should('exist');
    });
});
