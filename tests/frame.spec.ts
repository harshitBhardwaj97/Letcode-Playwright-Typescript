import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('/frame')
});

test.describe("Frame page tests", () => {
    test('Frame page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Frame/)
    })

    test('Frame test 1', async ({page}) => {
        const firstFrame = page.frame({name: "firstFr"})
        if (firstFrame) {
            await firstFrame.getByRole('textbox', {name: "Enter name"}).fill("Harshit")
            await firstFrame.locator("//label[.='Last Name']//following::div//input").fill("Bhardwaj")
            const text = await firstFrame.locator("//p[contains(@class,'title has-text-info')]").textContent()
            expect(text).toContain("Harshit Bhardwaj")
        } else throw new Error('No such frame')
    })

    test('Frame test 2', async ({page}) => {
        const firstFrame = page.frame({name: "firstFr"})
        if (firstFrame) {
            const childFrames = firstFrame.childFrames()
            console.log(`size ${childFrames.length} frames`)

            const childFrame = childFrames[0]

            if (childFrame) {
                console.log('Found child frame')
                const emailInput = childFrame.getByRole('textbox', {name: "Enter email"})

                await emailInput.fill("harshit@gmail.com")

                const textContent = await emailInput.inputValue()
                expect(textContent).toBe("harshit@gmail.com")
            } else {
                console.log('No child frame found')
                throw new Error('No child frame frame found')
            }
        } else throw new Error('No such frame')
    })

})