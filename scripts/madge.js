const path = require('path');
const madge = require('madge');
const entryPointPath = path.resolve(`${__dirname}/../src/index.ts`);
const tsConfig = path.resolve(`${__dirname}/../tsconfig.json`);
const picturePath = path.resolve(`${__dirname}/dependencyTree.svg`);
console.log(tsConfig);

const config = { fileExtensions: ['ts'], tsConfig };

madge(entryPointPath, config)
	.then(res => res.image(picturePath))
	.then(writtenImagePath => {
		console.log('Image written to ' + writtenImagePath);
	});