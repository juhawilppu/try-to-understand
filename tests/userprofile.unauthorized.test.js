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

describe('When not logged in', async () => {
    beforeEach(async () => {
        await page.click('.product-name');
        await page.waitFor('h2');
    })

    const actions = [
        {
            method: 'get',
            path: '/api/orders/2019-01-01/2019-02-01'
        },
        {
            method: 'get',
            path: '/api/customers'
        }
    ];
    
    test('Orders related actions are prohibited', async () => {
        const results = await page.execRequests(actions);

        for (let result of results) {
            expect(result).toEqual({ error: 'Login required' });
        }
    });

});