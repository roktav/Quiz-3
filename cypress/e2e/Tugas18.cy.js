describe('Automated API Testing for Reqres', () => {
  const baseUrl = 'https://reqres.in/api';

  it('GET - List Users', () => {
    cy.request('GET', `${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('page', 2);
      expect(response.body.data).to.be.an('array');
    });
  });

  it('GET - Single User', () => {
    cy.request('GET', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  it('GET - Single User Not Found', () => {
    cy.request({ method: 'GET', url: `${baseUrl}/users/23`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('POST - Create User', () => {
    cy.request('POST', `${baseUrl}/users`, {
      name: 'morpheus',
      job: 'leader',
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'leader');
    });
  });

  it('PUT - Update User', () => {
    cy.request('PUT', `${baseUrl}/users/2`, {
      name: 'morpheus',
      job: 'zion resident',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'zion resident');
    });
  });

  it('PATCH - Update User', () => {
    cy.request('PATCH', `${baseUrl}/users/2`, {
      name: 'morpheus',
      job: 'zion resident',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', 'zion resident');
    });
  });

  it('DELETE - Delete User', () => {
    cy.request('DELETE', `${baseUrl}/users/2`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('POST - Login Successful', () => {
    cy.request('POST', `${baseUrl}/login`, {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Login Unsuccessful', () => {
    cy.request({ method: 'POST', url: `${baseUrl}/login`, body: { email: 'peter@klaven' }, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Missing password');
      }
    );
  });

  it('POST - Register Successful', () => {
    cy.request('POST', `${baseUrl}/register`, {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST - Register Unsuccessful', () => {
    cy.request({ method: 'POST', url: `${baseUrl}/register`, body: { email: 'sydney@fife' }, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'Missing password');
      }
    );
  });
});
