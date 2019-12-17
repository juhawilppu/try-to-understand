const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const ip = require('ip').address();

// The IP changes on Circle CI, it's not localhost.
const baseUrl = `http://${ip}:3000`;

class TryToUnderstandPage {
	static async build() {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '–disable-setuid-sandbox']
		});

		const page = await browser.newPage();
		const customPage = new TryToUnderstandPage(page);

		return new Proxy(customPage, {
			get: function(target, property) {
				return customPage[property] || browser[property] || page[property];
			}
		});
	}

	constructor(page) {
		this.page = page;
	}

	async login() {

		// Generate an access token
		const { session, sig } = sessionFactory();

		// Set the token as cookie
		await this.page.setCookie({ name: 'express:sess', value: session });
		await this.page.setCookie({ name: 'express:sess.sig', value: sig });

		// Open page
		await this.page.goto(baseUrl);
	
		// User is logged in if total score is visible
		await this.page.waitFor('.header-total-score');
	}

	async getContentsOf(selector) {
		return this.page.$eval(selector, el => el.innerHTML);
	}

	async getTextOf(selector) {
		return this.page.$eval(selector, el => el.innerText);
	}

	async findAll(selector) {
		return this.page.$$(selector);
	}

	/**
	 * Populates UI. Assumes that for each key there is a UI element like #${key}.
	 * 
	 * @param {object} data 
	 */
	async populateByIds(data) {
		for (const key of Object.keys(data)) {
			await this.page.type(`#${key}`, data[key]);
		}
	}

	/**
	 * Verifies that given data is found from UI.
	 * Assumes that for each key there is a UI element like #${key}.
	 * 
	 * @param {object} data 
	 */
	async verifyByIds(data) {
		// Get values
		const promises = Object.keys(data).map(key => {
			return this.getContentsOf(`#${key}`)
		});
		const values = await Promise.all(promises);

		// Verify that values match
		Object.keys(data).map((key, index) => {
			expect(values[index]).toEqual(data[key]);
		});
	}

	get(path) {
		return this.page.evaluate(_path => {
			return fetch(_path, {
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => res.json());
		}, path);
	}
	
	goto(path) {
		const url = baseUrl + (path ? path : '');
		return this.page.goto(url);
	}

	post(path, data) {
		return this.page.evaluate(
			(_path, _data) => {
				return fetch(_path, {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
					'Content-Type': 'application/json'
					},
					body: JSON.stringify(_data)
				}).then(res => res.json());
			},
			path, data
		);
	}
	
	execRequests(actions) {
		return Promise.all(
			actions.map(({ method, path, data }) => {
				return this[method](path, data);
			})
		);
	}

}

module.exports = TryToUnderstandPage;