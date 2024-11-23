describe('OrangeHRM Login Feature', () => {
  const url = 'https://opensource-demo.orangehrmlive.com/';
  const validUsername = 'Admin';
  const validPassword = 'admin123';

  beforeEach(() => {
    cy.visit(url);
  });

  it('should login with valid credentials', () => {
    cy.get('[name="username"]').type(validUsername);
    cy.get('[name="password"]').type(validPassword);
    cy.contains('button','Login').click();
  });

  it('should display error for invalid password', () => {
    cy.get('[name="username"]').clear().type(validUsername); // Clear and type username
    cy.get('[name="password"]').clear().type('wrongpassword'); // Clear and type password
    cy.contains('button', 'Login').click();
    
    // Wait for the error to appear
    cy.get('.oxd-alert.oxd-alert--error').should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should display error for invalid username', () => {
    cy.get('[name="username"]').type('WrongUsername');
    cy.get('[name="password"]').type(validPassword);
    cy.contains('button','Login').click();
    cy.get('.oxd-alert.oxd-alert--error').should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should display error for empty username', () => {
    cy.get('[name="password"]').type(validPassword);
    cy.contains('button', 'Login').click()
    cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');
  });

  it('should display error for empty password', () => {
    cy.get('[name="username"]').type(validUsername);
    cy.contains('button','Login').click();
    cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');
  });

  it('should display error for empty username and password', () => {
    cy.contains('button','Login').click();
    cy.get('span.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible').and('contain.text', 'Required');
  });

  it('should display error for special characters in username', () => {
    cy.get('[name="username"]').type('!@#$%^&*()');
    cy.get('[name="password"]').type(validPassword);
    cy.contains('button','Login').click();
    cy.get('.oxd-alert.oxd-alert--error').should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('should display error for SQL Injection attempt', () => {
    cy.get('[name="username"]').type("admin' OR 1=1 --");
    cy.get('[name="password"]').type(validPassword);
    cy.contains('button','Login').click();
    cy.get('.oxd-alert.oxd-alert--error').should('be.visible').and('contain.text', 'Invalid credentials');
  });

  it('forgot password', () => {
    cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click();
  });
});
