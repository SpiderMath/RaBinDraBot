// eslint-disable-next-line no-unused-vars
const canvas = require("canvas");

class Canvas {
	/**
	 * @param {canvas.CanvasRenderingContext2D} ctx
	 * @param {String} text
	 * @param {Number} maxWidth
	 */
	static wrapText(ctx, text, maxWidth) {
		return new Promise(resolve => {
			if (ctx.measureText(text).width < maxWidth) return resolve([text]);
			if (ctx.measureText("W").width > maxWidth) return resolve(null);
			const words = text.split(" ");
			const lines = [];
			let line = "";
			while (words.length > 0) {
				let split = false;
				while (ctx.measureText(words[0]).width >= maxWidth) {
					const temp = words[0];
					words[0] = temp.slice(0, -1);
					if (split) {
						words[1] = `${temp.slice(-1)}${words[1]}`;
					}
					else {
						split = true;
						words.splice(1, 0, temp.slice(-1));
					}
				}
				if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
					line += `${words.shift()} `;
				}
				else {
					lines.push(line.trim());
					line = "";
				}
				if (words.length === 0) lines.push(line.trim());
			}
			return resolve(lines);
		});
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {String} text
	 * @param {Number} maxWidth
	 */
	static shortenText(ctx, text, maxWidth) {
		let shorten = false;
		while (ctx.measureText(`${text}...`).width > maxWidth) {
			if (!shorten) shorten = true;
			text = text.substr(0, text.length - 1);
		}
		return shorten ? `${text}...` : text;
	}

	/**
	 * @param {canvas.Image} data
	 * @param {Number} maxWidth
	 * @param {Number} maxHeight
	 * @param {Number} widthOffset
	 * @param {Number} heightOffest
	 */
	static centerImagePart(data, maxWidth, maxHeight, widthOffset, heightOffest) {
		let { width, height } = data;
		if (width > maxWidth) {
			const ratio = maxWidth / width;
			width = maxWidth;
			height *= ratio;
		}
		if (height > maxHeight) {
			const ratio = maxHeight / height;
			height = maxHeight;
			width *= ratio;
		}
		const x = widthOffset + ((maxWidth / 2) - (width / 2));
		const y = heightOffest + ((maxHeight / 2) - (height / 2));
		return { x, y, width, height };
	}

}

module.exports = Canvas;