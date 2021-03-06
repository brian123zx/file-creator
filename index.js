var createFiles = require('./createFiles');

if(require.main === module) {
	var argv = require('minimist')(process.argv.slice(2));
	var filesizeParser = require('filesize-parser');
	var path = require('path');

	var opts = {
		parentFolder: path.resolve(argv.folder),
		numFiles: 1,
		numSubdirectories: argv.numSubdirectories || 0,
		numSubDirectoryLevels: argv.numSubDirectoryLevels || 0,
		fileSizeDistribution: {
			min: parseInt(filesizeParser(argv.minSize || 0)) || 100000,
			max: parseInt(filesizeParser(argv.maxSize || 0)) || 1000000
		}
	};

	createFiles(opts);
}
else {
	module.exports = createFiles;
}