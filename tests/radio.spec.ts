import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('/radio')
});

test.describe("Radio page tests", () => {
    test('Radio page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Radio/)
    })

    test('Selecting one radio test', async ({page}) => {
        const template = "//label[.='Select any one']//parent::div//div//*[@id='%s']"
        const valueToBeChecked = Math.random() < 0.5 ? "yes" : "no"
        console.log(`Checking ${valueToBeChecked}`)
        const radioButton = page.locator(template.replace("%s", valueToBeChecked))
        await radioButton.check()
        await expect(radioButton).toBeChecked()
    })

    test('Confirm only one radio button can be selected', async ({page}) => {
        const firstRadioButton = page.locator("#one")
        const secondRadioButton = page.locator("#two")

        // Initially none of the button is checked
        await expect(firstRadioButton).not.toBeChecked()
        await expect(secondRadioButton).not.toBeChecked()

        // Check firstButton and secondButton, hence only leaving secondButton checked
        await (firstRadioButton).check()
        await (secondRadioButton).check()
        await expect(firstRadioButton).not.toBeChecked()
        await expect(secondRadioButton).toBeChecked()

        // Now once again check firstButton, hence only leaving firstButton checked
        await (firstRadioButton).check()
        await expect(firstRadioButton).toBeChecked()
        await expect(secondRadioButton).not.toBeChecked()
    })

    test('Confirm both radio buttons can be selected', async ({page}) => {
        const firstBugRadioButton = page.locator("#nobug")
        const secondBugRadioButton = page.locator("#bug")

        // Initially none of the button is checked
        await expect(firstBugRadioButton).not.toBeChecked()
        await expect(secondBugRadioButton).not.toBeChecked()

        // Check firstButton and secondButton, and confirm both are checked
        await (firstBugRadioButton).check()
        await (secondBugRadioButton).check()
        await expect(firstBugRadioButton).toBeChecked()
        await expect(secondBugRadioButton).toBeChecked()
    })

    const enabledRadioButtons = ["#going", "#notG"]

    enabledRadioButtons.forEach((button) => {
        test(`Checking if ${button} radio button can be checked`, async ({page}) => {
            const radioButton = page.locator(`${button}`)
            await radioButton.check()
            await expect(radioButton).toBeChecked()
        })
    })

    test('Checking if last radio button is disabled', async ({page}) => {
        const disabledRadioButton = page.locator("#maybe")
        await expect(disabledRadioButton).toBeDisabled()
    })

    test('Checking if terms and conditions radio button can be selected', async ({page}) => {
        const tcRadioButton = page.locator("//label[.//a[text()='FAKE terms and conditions']]//preceding-sibling::input")
        await tcRadioButton.check()
        await expect(tcRadioButton).toBeChecked()
    })
})