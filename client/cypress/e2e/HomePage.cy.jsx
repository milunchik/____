describe('Home Page', () => {
    beforeEach(() => {
        cy.visitApp();
    });

    it('should render Home Page', () => {
        cy.getByDataCy('main-page').should('exist');
        cy.getByDataCy('main-container').should('exist');
    });
});
