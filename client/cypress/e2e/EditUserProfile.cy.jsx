describe('Edit Teacher Profile', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('login-link').click();
        cy.getByDataCy('email-input').type('test1@gmail.com');
        cy.getByDataCy('password-input').type('test1@gmail.com');
        cy.getByDataCy('submit-button').click();
        cy.getByDataCy('settings-button').click();
        cy.getByDataCy('change-profile').click();
    });

    it('should render EditTeacherForm', () => {
        cy.getByDataCy('edit-page').should('exist');
    });
});
