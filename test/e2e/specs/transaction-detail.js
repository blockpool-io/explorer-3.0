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

  'it should be possible to show the amount tooltip': function(browser) {
    browser
      .useXpath()
      .moveToElement("//div/div[contains(@class, 'list-row')][4]//div[2]", 0, 0, () => {
        browser
          .waitForElementVisible("//div[contains(@class, 'vue-tooltip')]")
        browser
          .assert.containsText("//div[contains(@class, 'vue-tooltip')]", '2.29 $')
      })
  },

  'it should be possible to click on the sender': function(browser) {
    browser
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
    browser.end()
  }
}
