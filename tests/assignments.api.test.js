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

describe('When logged in', () => {

    const actions = [
        {
            method: 'get',
            path: '/api/assignments/english'
        }
    ];
    
    test('Assignment related actions should work', async () => {
        const results = await page.execRequests(actions);

        for (let result of results) {
            expect(result.word !== null).toEqual(true);
        }
    });

});