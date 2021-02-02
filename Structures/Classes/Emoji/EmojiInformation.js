const BASE_URL = "https://emojipedia.org";
const fetch = require("node-fetch");
const JSDOM = require("jsdom");
const parser = require("./EmojiParser");
const Parser = new parser();
const Emoji = require("./Emoji");

class EmojiInfo {
	/**
	 * @param {String} emoji
	 */
	static async getHTML(emoji) {
		try {
			const data = await fetch(`${BASE_URL}/${encodeURIComponent(emoji)}`);
			const res = await data.text();

			return res;
		}
		catch {
			return null;
		}
	}

	/**
	 * @param {String} HTML
	 */
	static fetchData(HTML) {
		const { document } = new JSDOM(HTML).window;

		const res = {
			emoji: document.title.split(" ")[0],
			unicode: Parser.emojiToUnicode(document.title.split(" ")[0]),
			name: HTML.split(`<h1><span class="emoji">${document.title.split(" ")[0]}</span>`)[1].split("</h1>")[0].trim(),
			description: document.querySelector("section[class=\"description\"]").querySelector("p").textContent.trim(),
			images: [],
			shortCodes: [],
		};

		const vendors = document.getElementsByClassName("vendor-rollout-target");

		for (let i = 0; i < vendors.length; i++) {
			const vendor = vendors[i];

			const title = vendor.querySelector("a").textContent.trim();
			const vendorurl = vendor.querySelector("img").src;

			res.images.push({
				index: i,
				vendor: title,
				url: vendorurl,
			});
		}


		const shortcodes = document.querySelector("ul[class=\"shortcodes\"]").querySelectorAll("span[class=\"shortcode\"]");

		for (let i = 0; i < shortcodes.length; i++) {
			const r = shortcodes[i];
			res.shortCodes.push(r.textContent.trim());
		}

		return new Emoji(res);
	}
}

module.exports = EmojiInfo;