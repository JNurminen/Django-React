describe('Note', function () {

    beforeEach(function () {
        cy.visit("http://localhost:5173/login");
    });

    it('login sivu näkyy', function () {
        cy.contains('Login');
        cy.contains('Register');
    });

    it('rekisteröinti onnistuu', function () {
        cy.contains('Register').click();
        cy.get('input[placeholder="Username"]').type('testi');
        cy.get('input[placeholder="Password"]').type('testi');
        cy.get('button').contains('Register').click();
    });

    it('uuden muistiinpanon luominen onnistuu', function () {
        // Login
        cy.get('input[placeholder="Username"]').type('testi');
        cy.get('input[placeholder="Password"]').type('testi');
        cy.get('button').contains('Login').click();

        // Fill out the note form
        cy.get('input[name="title"]').type('New Note Title');
        cy.get('textarea[name="content"]').type('This is the content of the new note.');

        // Submit the form
        cy.get('input[type="submit"]').contains('Submit').click();

        // Verify the new note is displayed
        cy.contains('New Note Title');
        cy.contains('This is the content of the new note.');
    });

});