Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const Text = 'A suave brisa da tarde acaricia o rosto enquanto as folhas dançam ao ritmo da natureza. O sol, em seu lento declínio, pinta o céu com tons de laranja e rosa, anunciando a chegada da serenidade noturna. As sombras se estendem pelo horizonte, abraçando a paisagem em um abraço caloroso. É nesse momento mágico que a tranquilidade se instala, convidando a mente a se perder na contemplação do espetáculo diário que o universo nos presenteia.'
    cy.get('#firstName').type('Will').should('have.value', 'Will')
    cy.get('#lastName').type('Almeida').should('have.value', 'Almeida')
    cy.get('#email').type('teste@gmail.com').should('have.value', 'teste@gmail.com')
    cy.get('#open-text-area').type(Text, { delay: 0 }).should('have.value', Text)
    cy.get('button[type="submit"]').click()
})