// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'transaction detail page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/7efc7dbadfa439a6e21a2bce3d3bbaf63236db92948d33bb241b57fbf6713ce0'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Transaction')
  },

  'it should be possible to copy the transaction ID': function(browser) {
    browser
      .waitForElementVisible('img.block')
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should be possible to click on the sender': function(browser) {
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][1]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('wallets/BJiMTWh6mNBYQErzQ49HVegqUUsn6trQ6H')
  },

  'it should be possible to click on the recipient': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/7efc7dbadfa439a6e21a2bce3d3bbaf63236db92948d33bb241b57fbf6713ce0'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][2]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('wallets/BDeeUQvZ61ErcpzjdUCTmwtxJcTg13HQYs')
  },

  'it should be possible to click on the transaction block id': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/7efc7dbadfa439a6e21a2bce3d3bbaf63236db92948d33bb241b57fbf6713ce0'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][7]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('block/11217043835834306811')
      .end()
  },

  'it should contain a smartbridge row if the transaction has a smartbridge value': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/60051281d52751af819056a15feea7e317ac615b0da2e800ac473c42b71ebaf2'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')

    // todo
  },
 
  'it should contain no smartbridge row if the transaction has no smartbridge value': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/7efc7dbadfa439a6e21a2bce3d3bbaf63236db92948d33bb241b57fbf6713ce0'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')

    // todo
  }
}
