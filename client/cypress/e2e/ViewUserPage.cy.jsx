describe('Profile Page', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
        cy.getByDataCy('email-input').type('test1@gmail.com');
        cy.getByDataCy('password-input').type('test1@gmail.com');
        cy.getByDataCy('submit-button').click();
        cy.getByDataCy('profile-link').click();
    });

    it('should render user profile', () => {
        cy.getByDataCy('profile-page').should('exist');
    });
});
