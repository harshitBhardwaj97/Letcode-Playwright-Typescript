import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('/alert')
});

test.describe("Alert page tests", () => {
    test('Alert page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Alert/)
    })

    test('Simple alert test', async ({page}) => {
        page.on("dialog", async (dialog) => {
            const text = dialog.message()
            console.log(text)
            expect(text).toContain("Hey! Welcome to LetCode")
            await page.waitForTimeout(1000)
            await dialog.accept()
        })
        await page.locator("#accept").click()
    })

    test('Confirm alert test', async ({page}) => {
        page.on("dialog", async (dialog) => {
            const text = dialog.message()
            console.log(text)
            expect(text).toContain("Are you happy with LetCode?")
            await page.waitForTimeout(1000)
            await dialog.accept()
        })
        await page.locator("#confirm").click()
    })

    test('Prompt alert test', async ({page}) => {
        page.on("dialog", async (dialog) => {
            const text = dialog.message()
            console.log(text)
            expect(text).toContain("Enter your name")
            await page.waitForTimeout(1000)
            await dialog.accept("Harshit")
        })
        await page.locator("#prompt").click()

        const promptText = await page.locator("#myName").textContent()
        console.log(`Prompt text is ${promptText}`)
        expect(promptText).toContain("Harshit")
    })

    test('Modern alert test', async ({page}) => {
        await page.locator("#modern").click()

        const modernText = "Modern Alert - Some people address me as sweet alert as well"
        const modernTextLocator = page.locator(`//p[contains(.,"${modernText}")]`)

        await expect(modernTextLocator).toBeVisible()

        const closeButton = page.locator("[aria-label='close']")
        await closeButton.click()

        await expect(modernTextLocator).not.toBeVisible()
    })
})