describe('the silence of lambs start page Test', function () {
  it('Visits the silence of lambs', function () {
    cy.visit('http://localhost:3000');
    cy.url().should('include', '/start');
    cy.contains('START!');
    cy.contains('랭킹보기');
    cy.contains('게임설명');
  });

  describe('view Ranking list modal', function () {
    it('should be opened modal', function () {
      cy.contains('랭킹보기').click();
      cy.get('.ranking-back')
        .get('.ranking-modal')
        .get('.rank-container')
        .get('.rank-pagination')
        .get('.rank-number span')
        .contains(4)
        .get('.rank-next-button svg')
        .click()
        .get('.rank-number span')
        .contains(11)
        .get('.rank-prev-button svg')
        .click()
        .get('.rank-number span')
        .contains(4)
        .get('.rank-next-button svg')
        .click()
        .get('.rank-number span')
        .contains(11)
        .get('.ranking-back')
        .click(1, 2);
    });
  });

  describe('view game description modal', function () {
    it('should be opened modal', function () {
      cy.contains('게임설명').click();
      cy.get('.tutorial-back')
        .get('.tutorial-modal')
        .contains('Tutorial')
        .get('.tutorial-close > svg')
        .click();
      cy.contains('게임설명').click();
      cy.get('.tutorial-comment-step')
        .contains(1)
        .get('.next-tutorial-button')
        .click()
        .get('.tutorial-comment-step')
        .contains(2)
        .get('.prev-tutorial-button')
        .click()
        .get('.tutorial-comment-step')
        .contains(1)
        .get('.tutorial-back')
        .click(1, 2);
    });
  });

  describe('game start', function () {
    it('write user name', function () {
      cy.get('input[type=text]').focus()
        .type('test name029382048');
    });
    it('click start button', function () {
      cy.get('input[type=submit]').focus()
        .click();
    });
  });
});
