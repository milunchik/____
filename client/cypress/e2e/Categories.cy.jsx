describe('MainPage', () => {
    beforeEach(() => {
        cy.visitApp();
        cy.getByDataCy('categories-link').click();
        cy.getByDataCy('email-input').type('test9@gmail.com');
        cy.getByDataCy('password-input').type('test9@gmail.com');
        cy.getByDataCy('submit-button').click();
        cy.getByDataCy('categories-link').click();
    });

    it('should visible best items', () => {
        cy.getByDataCy('subject-item').should('have.length', 10);
    });
});
