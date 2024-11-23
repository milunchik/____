import React from 'react';
import Categories from './Categories';
import { subjects } from '../../../assets/subjects-constants';

describe('Categories Component', () => {
    beforeEach(() => {
        cy.mountWithProviders(<Categories />);
    });

    it('renders subject containers for each subject', () => {
        subjects.forEach((subject) => {
            cy.contains(subject.name).should('exist');
        });
    });
});
