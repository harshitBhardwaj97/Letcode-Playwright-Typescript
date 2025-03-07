import {expect, test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/dropdowns')
});

test.describe("Dropdowns page tests", () => {
    test('Dropdowns page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Dropdowns/)
    })

    test('Can select apple using visible text', async ({page}) => {
        const fruitDropdown = page.locator("#fruits")
        const options = await fruitDropdown.locator('option').allTextContents()
        console.log('All Options are:', options)

        const selectedOption = page.locator("//div[contains(@class,'is-success')]//p")
        await fruitDropdown.selectOption("Apple")
        const selectedOptionText = await selectedOption.textContent()
        console.log(selectedOptionText)
        expect(selectedOptionText).toContain('Apple')
    })

    test('Can select last language', async ({page}) => {
        const languageOptions = await page.$$("#lang option")

        const languageSelect = page.locator("#lang")
        if (languageOptions) {
            const totalLength = languageOptions.length
            console.log(`Total language: ${languageOptions.length}`)
            await languageSelect.selectOption({index: languageOptions.length - 1})

            const selectedValue = await languageSelect.locator('option:checked').getAttribute('value')
            const selectedValueText = await languageSelect.locator('option:checked').textContent()
            console.log(`Selected value: ${selectedValue}`)
            console.log(`Selected valueText: ${selectedValueText}`)

            expect(selectedValueText).toBe("C#")
        }
    })

    test('Can select India using value', async ({page}) => {
        const countrySelect = page.locator("select#country")

        await countrySelect.selectOption("India")
        const selectedValue = await countrySelect.locator('option:checked').getAttribute('value')
        const selectedValueText = await countrySelect.locator('option:checked').textContent()

        console.log(`Selected value: ${selectedValue}`)
        console.log(`Selected valueText: ${selectedValueText}`)
        expect(selectedValueText).toBe("India")
    })
})