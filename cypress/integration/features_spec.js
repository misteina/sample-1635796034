before(() => {
    cy.request('/db/reset')
})

it('Loads the registration page', () => {

    cy.visit('/register')
    cy.contains('Register')

})

it('Fill and submit the registration form', () => {

    cy.get('#register input:first-child').type('Enyinna').should('have.value', 'Enyinna')
    cy.get('#register input:nth-child(2)').type('password').should('have.value', 'password')
    cy.get('#register input:nth-child(3)').type('password').should('have.value', 'password')
    cy.get('#register button').click()
    cy.contains('Login')

})

it('Fill and submit the login form', () => {

    cy.get('#login input:first-child').type('Enyinna').should('have.value', 'Enyinna')
    cy.get('#login input:nth-child(2)').type('password').should('have.value', 'password')
    cy.get('#form button').click()
    cy.contains('Welcome')
})

it('Opens the add todo form', () => {

    cy.get('#todo-list > button').click()
    cy.get('#add-todo button').should('have.text', 'Add Todo')

})

it('Fill the add todo form and submit', () => {

    cy.get('#add-todo input').type('2021-11-05T00:00').should('have.value', '2021-11-05T00:00')
    cy.get('#add-todo textarea').type('My new todo is here').should('have.value', 'My new todo is here')
    cy.get('#add-todo button').click()
    cy.contains('Created')

})

it('Opens edit form', () => {

    cy.get('.edit').click()
    cy.get('#edit-todo button').should('have.text', 'Update')
    cy.get('#edit-todo input').type('2021-10-05T00:00').should('have.value', '2021-10-05T00:00')
    cy.get('#edit-todo textarea').type('This is an edited todo').should('include.text', 'edited')
    cy.get('#edit-todo button').click()

})

it('Confirms todo is edited', () => {

    cy.get('.item-foot div span').should('include.text', '2021-10-05 00:00:00')
    cy.get('.todo > div:nth-child(2)').should('include.text', 'edited')

})

it('Delete todo item', () => {

    cy.get('.delete').click()
    cy.get('.todo').should('not.exist');

})

it('checks user logout', () => {

    cy.get('#profile div a').click()
    cy.contains('Login')

})
