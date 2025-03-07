import {expect, test} from '@playwright/test'
import {generateRandomDate} from "../utils/utils"

test.beforeEach(async ({page}) => {
    await page.goto('/calendar')
});

test.describe("Calendar page tests", () => {
    test('Calendar page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Calendar/)
    })

    test('Check calendar functionality with random date', async ({page}) => {
        const dateToBeEntered = generateRandomDate()
        await page.locator("#birthday").fill(dateToBeEntered)

        const enteredDate = await page.locator("//input[@id='birthday']//parent::form//following-sibling::p").textContent()
        expect(enteredDate).toEqual(dateToBeEntered)
    })
})