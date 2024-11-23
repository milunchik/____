describe('SingUp Page', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
        cy.getByDataCy('link-url').click();
        cy.getByDataCy('link-url').click();
    });

    it('should render Signup teacher page', () => {
        cy.getByDataCy('signup-teacher-page').should('exist');
        cy.getByDataCy('signup-teacher-container').should('exist');
    });
});
