describe('Admin Page', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
        cy.getByDataCy('email-input').type('milavans161120@gmail.com');
        cy.getByDataCy('password-input').type('milavans161120@gmail.com');
        cy.getByDataCy('submit-button').click();
        cy.getByDataCy('settings-button').click();
        cy.getByDataCy('change-profile').click();
    });

    it('renders admin page container', () => {
        cy.getByDataCy('admin-page').should('exist');
    });
});
