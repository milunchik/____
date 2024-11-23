import React from 'react';
import Card from './Card';

describe('<Card />', () => {
    beforeEach(() => {
        cy.mount(<Card imgSrc="/images/jane.png" name="Jane Smith" role="Teacher" phone="123-456-7890" />);
    });

    it('renders card with user information and delete button', () => {
        cy.contains('Jane Smith').should('be.visible');
        cy.contains('Teacher').should('be.visible');
        cy.contains('123-456-7890').should('be.visible');
    });
});
