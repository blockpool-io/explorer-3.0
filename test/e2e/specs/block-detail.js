// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'block detail page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/block/11217043835834306811'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Block')
  },

  'it should be possible to navigate to next block and back': function(browser) {
    browser
      .assert.containsText('div.semibold.truncate span', '11217043835834306811')
      .useXpath().click("//button[contains(., 'Next')]")
      .waitForElementVisible("//div[contains(@class, 'semibold') and contains(@class, 'truncate')]/span[contains(text(), '1736798214896808157')]")
    browser
      .useXpath().click("//button[contains(., 'Previous')]")
      .waitForElementVisible("//div[contains(@class, 'semibold') and contains(@class, 'truncate')]/span[contains(text(), '11217043835834306811')]")
  },

  'it should not contain a transaction table if block has no transactions': function(browser) {
    browser
      .url(browser.globals.devServerURL + '/#/block/1736798214896808157')
      .pause(500)
      .useXpath().assert.containsText("//div[.='Transactions']/following-sibling::div[1]", '0')
    browser
      .useCss().expect.element('h2').to.not.be.present
    browser
      .expect.element('div.table-component').to.not.be.present
    browser.end()
  },

  'it should contain a transaction table if block has 1 or more transactions': function(browser) {
    browser
      .url(browser.globals.devServerURL + '/#/block/11217043835834306811')
      .pause(500)
      .waitForElementVisible('div.table-component')
      .useCss().expect.element('h2').to.be.present
    browser
      .expect.element('div.table-component').to.be.present
    browser
      .elements('css selector', '.table-component__table__body tr', function(result) {
        browser.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to copy the block ID': function(browser) {
    browser
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should refresh the confirmation count automatically': function (browser) {
    browser
      .waitForElementVisible('div.list-row-border-b')
      .useXpath().getText("//div[contains(@class, 'list-row-border-b')][2]//div[2]", function(result) {
        const confirmations = result.value

        browser
          .pause(15500)
          .getText("//div[contains(@class, 'list-row-border-b')][2]//div[2]", function(result) {
            browser.assert.notEqual(result.value, confirmations)
          })
      })
  },

  'it should be possible to click on the delegate': function(browser) {
    browser
      .url(browser.globals.devServerURL + '/#/block/1736798214896808157')
      .useCss().waitForElementVisible('div.list-row a')
      .click('div.list-row a')
      .useXpath().waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('wallets/BFrwD4Fx94cwbsUjiUirsBbSNj5jAgmhEX')
      .end()
  }
}
