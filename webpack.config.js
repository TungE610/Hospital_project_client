const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ],
		devServer: {
			allowedHosts: "all"
		}
}