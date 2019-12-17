const Page = require('./helpers/page');
let page;

jest.setTimeout(60000);

beforeEach(async () => {
    page = await Page.build();
    await page.goto();
    await page.login();
})

afterEach(async () => {
    await page.close();
})

describe('After clicking to Explain page', () => {
    beforeEach(async () => {
        await page.click('.Explain');
        await page.waitFor('h2');
    })

    test('Header is Explain', async () => {
        const text = await page.getContentsOf('h2');
        expect(text).toEqual("Explain");
    })

    test('A random assignment is fetched from database', async () => {
        const wordToExplain = await page.getContentsOf('.word-to-explain');
        expect(wordToExplain.length > 0).toEqual(true);
    })

});