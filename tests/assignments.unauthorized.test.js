const Page = require('./helpers/page');
let page;

jest.setTimeout(10000);

beforeEach(async () => {
    page = await Page.build();
    await page.goto();
})

afterEach(async () => {
    await page.close();
})

describe('When not logged in', () => {
    beforeEach(async () => {
        await page.click('.product-name');
        await page.waitFor('h2');
    })

    const actions = [
        {
            method: 'get',
            path: '/api/assignments/me'
        },
        {
            method: 'get',
            path: '/api/assignments/english'
        },
        {
            method: 'post',
            path: '/api/assignments/FREE_TEXT'
        }
    ];
    
    test('Assignment related actions are prohibited', async () => {
        const results = await page.execRequests(actions);

        for (let result of results) {
            expect(result).toEqual({ error: 'Login required' });
        }
    });

});