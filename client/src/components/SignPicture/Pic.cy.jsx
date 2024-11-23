import React from 'react';
import Pic from './Pic';

describe('<Picture />', () => {
    beforeEach(() => {
        cy.mount(<Pic />);
    });

    it('renders picture section', () => {
        cy.getByDataCy('picture-section').should('exist');
    });
});
