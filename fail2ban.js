
Module.register("MMM-f2b", {
	// Module config defaults.
	defaults: {
		updateInterval: 600000,
        remoteFile: "f2b.txt",
        fadeSpeed: 2000
	},
    rawText = '',
    parsed = '',

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);
    
        this.getRawText((response) => {
            this.rawText = response;
            parseText();
            this.updateDom();
        })

		// Schedule update timer.
		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/**
	 * Retrieve a file from the local filesystem
	 *
	 * @param {Function} callback Called when the file is retrieved.
	 */
	getRawText: function (callback) {
		const xobj = new XMLHttpRequest(),
			path = this.file(this.config.remoteFile);
		xobj.overrideMimeType("text/plain");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

    parseText: function () {
        this.parsed = this.rawText.subString(this.rawText.indexOf("Total banned:"), this.rawText.lastIindexOf("`-"));
        this.parsed.trim();
        console.log(this.parsed);
    },

	// Override dom generator.
	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";t
		const text = document.createElement("span");
        text.innerHTML = this.parsed;

        wrapper.appendChild(text);
		wrapper.appendChild(compliment);

		return wrapper;
	},
});