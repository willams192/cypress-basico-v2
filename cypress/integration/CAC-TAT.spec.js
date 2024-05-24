describe('Central de Atendimento ao Cliente TAT', () => {
    const Text = 'A suave brisa da tarde acaricia o rosto enquanto as folhas dançam ao ritmo da natureza. O sol, em seu lento declínio, pinta o céu com tons de laranja e rosa, anunciando a chegada da serenidade noturna. As sombras se estendem pelo horizonte, abraçando a paisagem em um abraço caloroso. É nesse momento mágico que a tranquilidade se instala, convidando a mente a se perder na contemplação do espetáculo diário que o universo nos presenteia.'
    const TRHEE_SECONDS_IN_MS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('CN001 - Verificar o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    it('CN002 - Preencher os campos obrigatórios e envia o formulário', () => {
        cy.clock();

        cy.get('#firstName').type('Will').should('have.value', 'Will');
        cy.get('#lastName').type('Almeida').should('have.value', 'Almeida');
        cy.get('#email').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#open-text-area').type(Text, { delay: 0 }).should('have.value', Text);
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');

        cy.tick(TRHEE_SECONDS_IN_MS);

        cy.get('.success').should('not.be.visible');

    });

    it('CN003 - Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();

        cy.get('#firstName').type('Will').should('have.value', 'Will');
        cy.get('#lastName').type('Almeida').should('have.value', 'Almeida');
        cy.get('#email').type('teste@gmail,com').should('have.value', 'teste@gmail,com');
        cy.get('#open-text-area').type(Text, { delay: 0 }).should('have.value', Text);
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');

        cy.tick(TRHEE_SECONDS_IN_MS);

        cy.get('.error').should('not.be.visible');


    });

    it('CN004 - Verificar campo de número de telefone não númerico', () => {
        cy.get('#phone').type('Test').should('have.text', '');
    });

    it('CN005 - Exibir mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();
        cy.get('#firstName').type('Will').should('have.value', 'Will');
        cy.get('#lastName').type('Almeida').should('have.value', 'Almeida');
        cy.get('#phone-checkbox').check().should('be.checked');
        cy.get('#email').type('teste@gmail.com').should('have.value', 'teste@gmail.com');
        cy.get('#open-text-area').type(Text, { delay: 0 }).should('have.value', Text);
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
        cy.tick(TRHEE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');

    });

    it('CN006 - Preencher e limpar os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
            .type('Will', { delay: 0 })
            .should('have.value', 'Will')
            .clear()
            .should('have.value', '');
        cy.get('#lastName')
            .type('Almeida', { delay: 0 })
            .should('have.value', 'Almeida')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('teste@gmail.com', { delay: 0 })
            .should('have.value', 'teste@gmail.com')
            .clear()
            .should('have.value', '');
        cy.get('#open-text-area')
            .type(Text, { delay: 0 })
            .should('have.value', Text)
            .clear()
            .should('have.value', '');
    });

    it('CN007 - Exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
        cy.tick(TRHEE_SECONDS_IN_MS);
        cy.get('.error').should('not.be.visible');
    });

    it('CN008 - Enviar o formuário com sucesso com comando', () => {
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
        cy.tick(TRHEE_SECONDS_IN_MS);
        cy.get('.success').should('not.be.visible');
    });

    it('CN009 - Selecionar opção de produto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('CN010 - Marcando todos os itens', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            });
    });

    it('CN011 - Desmarcando checkbox', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    it('CN012 - Inserindo arquivo', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            });
    });

    it('CN013 -  Verificar link de política e privacidade', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible');
    });

    it('CN014 - Exibir e esconder as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success');
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

});
