describe('SingIn Page', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
    });

    it('should render Signin page', () => {
        cy.getByDataCy('signin-page').should('exist');
        cy.getByDataCy('signin-container').should('exist');
    });
});