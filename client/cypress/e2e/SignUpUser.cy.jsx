describe('SingUp Page', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
        cy.getByDataCy('link-url').click();
    });

    it('should render Signup user page', () => {
        cy.getByDataCy('signup-user-page').should('exist');
        cy.getByDataCy('signup-user-container').should('exist');
    });
});
