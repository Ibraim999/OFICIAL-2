describe('API de consulta de dados da matrícula dos alunos', () => {
  it('Deve ser possível consultar os dados de uma matrícula regular ao informar um número de matrícula válido e sem restrições', () => {
    const numeroDaMatricula = '4653421';

    cy.request({
      method: 'GET',
      url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
      headers: {
        'X-API-KEY': 'unime-qualidade-oficial2'
      }
    }).then((response) => {
      // Verifica se o status da resposta é 200
      expect(response.status).to.eq(200);

    // Verifica se o campo 'id' está presente
    expect(response.body).to.have.property('id','4653421' );

    // Verifica as propriedades de 'courseName'
    expect(response.body).to.have.property('courseName').that.is.a('string');

    // Verifica as propriedades do objeto 'tuition'
    expect(response.body).to.have.property('tuition').that.is.an('object');
    expect(response.body.tuition).to.have.property('amount').that.is.a('number');
    expect(response.body.tuition).to.have.property('formattedAmount').that.is.a('string');
    expect(response.body.tuition).to.have.property('dueDate').that.is.a('string');
    expect(response.body.tuition).to.have.property('status').that.is.a('string');

    // Verifica as propriedades do objeto 'student'
    expect(response.body).to.have.property('student').that.is.an('object');
    expect(response.body.student).to.have.property('firstName').that.is.a('string');
    expect(response.body.student).to.have.property('lastName').that.is.a('string');
    expect(response.body.student).to.have.property('birthDate').that.is.a('string');
    expect(response.body.student).to.have.property('cpf').that.is.a('string');
});
});

it('Deve ser retornada uma mensagem de erro ao consultar os dados de uma matrícula com pagamento em atraso.', () => {
  const numeroDaMatricula = '5566778';

  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2'
    }
  }).then((response) => {
    // Verifica se o status code é 409
    expect(response.status).to.eq(409);//ERRO API RETORNANDO 200 OK E NÃO 409

    // Verifica a mensagem de erro
    expect(response.body).to.have.property('mensagem', 'A matrícula informada possui débitos em aberto. Não é possível obter dados da mesma até a quitação!');
});
});

it('Deve ser possível consultar os dados de uma matrícula de aluno bolsista 100% ao informar um número de matrícula válido e sem restrições.', () => {
  const numeroDaMatricula = '7890123';

  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2' 
    }
  }).then((response) => {
      // Verifica se o status code é 200
      expect(response.status).to.eq(200);

      // Verifica se o campo 'id' está presente 
      expect(response.body).to.have.property('id', '7890123');

      // Verifica as propriedades de 'courseName'
      expect(response.body).to.have.property('courseName').that.is.a('string');

      // Verifica as propriedades do objeto 'tuition'
      expect(response.body).to.have.property('tuition').that.is.an('object');
      expect(response.body.tuition).to.have.property('amount').that.is.a('number').and.to.eq(0.0);
      expect(response.body.tuition).to.have.property('formattedAmount').that.is.a('string').and.to.eq('R$ 0.00');
      expect(response.body.tuition).to.have.property('dueDate').to.be.null;
      expect(response.body.tuition).to.have.property('status').that.is.a('string').and.to.eq('BOLSISTA_100');

      // Verifica as propriedades do objeto 'student'
      expect(response.body).to.have.property('student').that.is.an('object');
      expect(response.body.student).to.have.property('firstName').that.is.a('string');
      expect(response.body.student).to.have.property('lastName').that.is.a('string');
      expect(response.body.student).to.have.property('birthDate').that.is.a('string');
      expect(response.body.student).to.have.property('cpf').that.is.a('string');
});
});

it('Deve ser possível consultar os dados de uma matrícula de aluno bolsista 50% ao informar um número de matrícula válido e sem restrições.', () => {
  const numeroDaMatricula = '1113499';
  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2' 
    }
  }).then((response) => {
    // Verifica se o status code é 200
    expect(response.status).to.eq(200);

    // Verifica se o campo 'id' está presente
    expect(response.body).to.have.property('id', '1113499');

    // Verifica as propriedades de 'courseName'
    expect(response.body).to.have.property('courseName').that.is.a('string');

    // Verifica as propriedades do objeto 'tuition'
    expect(response.body).to.have.property('tuition').that.is.an('object');
    expect(response.body.tuition).to.have.property('amount').that.is.a('number');
    expect(response.body.tuition).to.have.property('formattedAmount').that.is.a('string');
    expect(response.body.tuition).to.have.property('dueDate').to.be.null;
    expect(response.body.tuition).to.have.property('status').that.is.a('string').and.not.eq('BOLSISTA_50');//pede para nao retornar esse status no cenario

    // Verifica as propriedades do objeto 'student'
    expect(response.body).to.have.property('student').that.is.an('object');
    expect(response.body.student).to.have.property('firstName').that.is.a('string');
    expect(response.body.student).to.have.property('lastName').that.is.a('string');
    expect(response.body.student).to.have.property('birthDate').to.be.null;
    expect(response.body.student).to.have.property('cpf').that.is.a('string');
});
});

it('Deve ser possível consultar os dados de uma matrícula de um aluno que já realizou todos os pagamentos das mensalidades futuras.', () => {
  const numeroDaMatricula = '1122334';
  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2' 
    }
  }).then((response) => {
    // Verifica se o status code é 200
    expect(response.status).to.eq(200);

    // Verifica se o campo 'id' está presente e é igual ao esperado
    expect(response.body).to.have.property('id', '1122334');

    // Verifica as propriedades de 'courseName'
    expect(response.body).to.have.property('courseName').that.is.a('string').and.to.have.length.greaterThan(0);

    // Verifica as propriedades do objeto 'tuition'
    expect(response.body).to.have.property('tuition').that.is.an('object');
    expect(response.body.tuition).to.have.property('amount').that.is.a('number');
    expect(response.body.tuition).to.have.property('formattedAmount').that.is.a('string');
    expect(response.body.tuition).to.have.property('dueDate').to.be.null; // A data de vencimento não deve ser retornada
    expect(response.body.tuition).to.have.property('status', 'CONTRATO_QUITADO'); // Verifica o status 'CONTRATO_QUITADO'

    // Verifica as propriedades do objeto 'student'
    expect(response.body).to.have.property('student').that.is.an('object');
    expect(response.body.student).to.have.property('firstName').that.is.a('string').and.to.have.length.greaterThan(0);
    expect(response.body.student).to.have.property('lastName').that.is.a('string').and.to.have.length.greaterThan(0);
    expect(response.body.student).to.have.property('birthDate').that.is.a('string');
    expect(response.body.student).to.have.property('cpf').that.is.a('string');
});
});

it('Deve ser retornada uma mensagem de erro ao consultar os dados de uma matrícula que já foi excluída.', () => {
  const numeroDaMatricula = '4653499';

  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2'
    },
    failOnStatusCode: false 
  }).then((response) => {
    // Verifica se o status code é 404
    expect(response.status).to.eq(404);

    // Verifica a mensagem de erro
    expect(response.body).to.have.property('mensagem', 'A matrícula informada foi excluída de nossa base de dados!');
});
});

it('Deve ser retornada uma mensagem de erro ao consultar os dados de uma matrícula inválida.', () => {
  const numeroDaMatricula = '99';

  cy.request({
    method: 'GET',
    url: `http://localhost:8080/v1/matriculas/${numeroDaMatricula}`,
    headers: {
      'X-API-KEY': 'unime-qualidade-oficial2'
    },
    failOnStatusCode: false 
  }).then((response) => {
    // Verifica se o status code é 400
    expect(response.status).to.eq(400);

    // Verifica a mensagem de erro
    expect(response.body).to.have.property('mensagem', 'A matrícula informada não parece ser válida!');
});
});

});








