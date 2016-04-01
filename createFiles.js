var fs = require('fs');
var rs = require('randomstring');
var path = require('path');
var _ = require('lodash');


var defaults = {
	maxChunkSize: 10000000,
	parentFolder: process.cwd(),
	numFiles: 1,
	numSubdirectories: 0,
	numSubDirectoryLevels: 0,
	fileSizeDistribution: {
		min: 100000,
		max: 1000000
	}
};

var opts;

function writeDir(dir, levels) {

	console.log('writing to', dir);
	try {
		fs.mkdirSync(dir);
	} catch(e) {};
	writeFiles(dir);
	if(!levels) return;

	for(var x = 0; x < opts.numSubdirectories; x++) {
		var dirName = path.join(dir, Math.random().toString());
		writeDir(dirName, levels - 1);
	}
}

function writeFiles(dir) {
	for(var x = 0; x < opts.numFiles; x++) {
		var filename = Math.random() + '.txt';
		filename = filename.slice(2);
		var fileSize = Math.random() * (opts.fileSizeDistribution.max - opts.fileSizeDistribution.min) + opts.fileSizeDistribution.min;
		fileSize = Math.ceil(fileSize);
		console.log('filesize:', fileSize);
		var sizeWritten = 0;
		while(sizeWritten < fileSize) {
			var sizeToWrite = Math.min(fileSize - sizeWritten, opts.maxChunkSize);
			var contents = rs.generate(sizeToWrite);
			fs.appendFileSync(path.join(dir, filename), contents);
			sizeWritten += sizeToWrite;
		}
	}
}

function moduleEntry(options) {
	opts = _.defaultsDeep(options, defaults);
	writeDir(opts.parentFolder, opts.numSubDirectoryLevels);
};

module.exports = moduleEntry;