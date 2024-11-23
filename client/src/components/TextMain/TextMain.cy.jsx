import React from 'react';
import TextMain from './TextMain';

describe('<TextMain />', () => {
    beforeEach(() => {
        cy.mount(<TextMain />);
    });

    it('renders text for main page ', () => {
        cy.getByDataCy('text-for-main-page').should('exist');
    });
});
