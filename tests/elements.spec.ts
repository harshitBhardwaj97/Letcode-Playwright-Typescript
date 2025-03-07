import {expect, test} from '@playwright/test'
import {randomBytes} from "node:crypto"

test.beforeEach(async ({page}) => {
    await page.goto('/elements')
});

test.describe("Elements page tests", () => {
    test('Elements page has correct title', async ({page}) => {
        await expect(page).toHaveTitle(/Elements/)
    })

    test('Check git search functionality with valid user', async ({page}) => {
        const searchInput = page.getByRole('textbox', {name: 'git user name'})
        const searchButton = page.locator("#search")

        const userNameToBeEntered = "harshitBhardwaj97"

        await searchInput.fill(userNameToBeEntered)
        await searchButton.click()

        const image = page.locator("//figure//img")
        const userName = page.locator("//div[@class='media-content']//p[contains(@class,'title is-4')]")

        await expect(image).toBeVisible()
        expect(await userName.textContent()).toBe("Harshit Bhardwaj")

        const newPage = await page.context().newPage()
        await newPage.goto(`https://github.com/${userNameToBeEntered}`)

        const expectedPublicRepos = await newPage.locator("//a[contains(@data-tab-item,'repositories')]//span[contains(@class,'Counter')]")
            .first().textContent()

        console.log(`No. of public repositories: ${expectedPublicRepos}`);

        await newPage.close()

        const publicReposLocator = page.locator("//span[.='Public Repos']//following-sibling::span")
        const publicReposText = await publicReposLocator.textContent()
        //@ts-ignore
        expect(parseInt(publicReposText)).toEqual(parseInt(expectedPublicRepos))

        const displayedPublicRepos = page.$$("//div[@class='content p-4']//li")
        const publicRepos = await displayedPublicRepos

        //@ts-ignore
        expect(publicRepos.length).toBeLessThanOrEqual(parseInt(expectedPublicRepos))

        console.log(`The displayed public repos are :-`)
        for (const repo of publicRepos) {
            const i = publicRepos.indexOf(repo);
            console.log(i, await repo.textContent())
        }
    })

    test('Check git search functionality with invalid user', async ({page}) => {
        const searchInput = page.getByRole('textbox', {name: 'git user name'})
        const searchButton = page.locator("#search")

        const userNameToBeEntered = "random_" + randomBytes(8).toString('hex')

        await searchInput.fill(userNameToBeEntered)
        await searchButton.click()

        const image = page.locator("//figure//img")
        const userName = page.locator("//div[@class='media-content']//p[contains(@class,'title is-4')]")

        await expect(image).not.toBeVisible()
        await expect(userName).not.toBeVisible()

        const firstLi = page.locator("//li[.='Type and Enter your Git username']")
        // Same list is still visible as invalid user has been entered
        await expect(firstLi).toBeVisible()
    })
})