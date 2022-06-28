import { GeoJSON } from '@global-volcanic-lightning/types';
import { highestStrikes, alertStrikes } from '../../src/api/sortedStrikeData';

describe('Testing the UI with the reponse from GET /lightning', () => {
  it('Opens the application and waits for API response, then checks each component on the console to ensure values match', () => {
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '/prod/v0/rest/lightning').as('getLightning')
    cy.get('[aria-label=loading-text]').should('contain.text', 'Loading, please wait...')
    let res;
    cy.wait('@getLightning').then((interception) => {
      cy.get('[id=map-component]').screenshot()
      res = interception.response.body as GeoJSON;
      cy.get('[aria-label=console-drawer-icon-Dashboard]').click()
      highestStrikes(res.features).forEach((feature, index) => {
        cy.get(`[aria-label=highest-strikes-table-cell-${index}-name]`).should('contain.text', feature.name)
        cy.get(`[aria-label=highest-strikes-table-cell-${index}-20km-strikes]`).should('contain.text', feature.twentyKmStrikes)
        cy.get(`[aria-label=highest-strikes-table-cell-${index}-100km-strikes]`).should('contain.text', feature.hundredKmStrikes)
        cy.get(`[aria-label=highest-strikes-table-cell-${index}-total-strikes]`).should('contain.text', feature.totalStrikes)
        cy.get(`[aria-label=highest-strikes-table-cell-show-coordinates-${index}]`).click()

        cy.get(`[aria-label=strike-dialog-${index}-name]`).should('contain.text', feature.name)
        cy.get(`[aria-label=strike-dialog-bar-icon]`).click()
        cy.get(`[aria-label=strike-dialog-${index}-close-button]`).click()
      })
      alertStrikes(res.features).forEach((feature, index) => {
        cy.get(`[aria-label=alert-strikes-table-cell-${index}-name]`).should('contain.text', feature.name)
        cy.get(`[aria-label=alert-strikes-table-cell-${index}-area]`).should('contain.text', feature.area)
        cy.get(`[aria-label=alert-strikes-table-cell-${index}-20km-strikes]`).should('contain.text', feature.twentyKmStrikes)
        cy.get(`[aria-label=alert-strikes-table-cell-${index}-100km-strikes]`).should('contain.text', feature.hundredKmStrikes)
        cy.get(`[aria-label=alert-strikes-table-cell-${index}-total-strikes]`).should('contain.text', feature.totalStrikes)
        cy.get(`[aria-label=alert-strikes-table-cell-show-coordinates-${index}]`).click()

        cy.get(`[aria-label=strike-dialog-${index}-name]`).should('contain.text', feature.name)
        cy.get(`[aria-label=strike-dialog-bar-icon]`).click()
        cy.get(`[aria-label=strike-dialog-${index}-close-button]`).click()
      })
      cy.wait(1000)
      cy.get('[id=dashboard]').screenshot()
      cy.get('[aria-label=console-drawer-icon-Table]').click()

      res.features.forEach((feature, index) => {
        // cy.get(`[aria-label=map-circle-marker-${index}]`).click()
        cy.get(`[aria-label=full-table-cell-${index}-name]`).should('contain.text', feature.properties.name)
        cy.get(`[aria-label=full-table-cell-${index}-area]`).should('contain.text', feature.properties.area)
        cy.get(`[aria-label=full-table-cell-${index}-volcano-type]`).should('contain.text', feature.properties.volcanoType)
        cy.get(`[aria-label=full-table-cell-${index}-20km-strikes]`).should('contain.text', feature.properties.twentyKmStrikes)
        cy.get(`[aria-label=full-table-cell-${index}-100km-strikes]`).should('contain.text', feature.properties.hundredKmStrikes)
        cy.get(`[aria-label=full-table-cell-show-coordinates-${index}]`).click()

        cy.get(`[aria-label=strike-dialog-${index}-name]`).should('contain.text', feature.properties.name)
        cy.get(`[aria-label=strike-dialog-${index}-area]`).should('contain.text', feature.properties.area)
        cy.get(`[aria-label=strike-dialog-bar-icon]`).click()
        cy.get(`[aria-label=strike-dialog-${index}-close-button]`).click()
        // cy.get(`[aria-label=strike-dialog-${feature.properties.name}-${feature.properties.area}]`).click()
      })
      cy.wait(1000)
      cy.get('[id=table-component]').screenshot()
    })
  })
  it('Tests each view in the console in dark mode', () => {
    cy.get('[aria-label=toolbar-theme-toggle]').click()
    cy.get('[aria-label=console-drawer-icon-Map]').click()
    cy.wait(1000)
    cy.get('[id=map-component]').screenshot()
    cy.get('[aria-label=console-drawer-icon-Dashboard]').click()
    cy.wait(1000)
    cy.get('[id=dashboard]').screenshot()
    cy.get('[aria-label=console-drawer-icon-Table]').click()
    cy.wait(1000)
    cy.get('[id=table-component]').screenshot()
  })
  it('Reloads the API response', () => {
    cy.get('[aria-label=toolbar-reload-button]').click()
    cy.get('[aria-label=loading-text]').should('contain.text', 'Loading, please wait...')
  })
})