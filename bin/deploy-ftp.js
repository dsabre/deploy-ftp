#!/usr/bin/env node
console.log(__dirname);
process.exit();
const fs          = require("fs");
const chalk       = require("chalk");
const {execSync}  = require("child_process");
const FtpDeploy   = require("ftp-deploy");
const ftpDeploy   = new FtpDeploy();
const projectJson = require('./package.json');

// load configuration from .env.local file
require('dotenv').config({path: '.env.local'});

console.log(chalk.bgYellow(chalk.black(`- DEPLOY PROJECT ${projectJson.name} -`)));

const FTP_USER       = process.env.DSDEPLOY_FTP_USER;
const FTP_HOST       = process.env.DSDEPLOY_FTP_HOST;
const FTP_PORT       = process.env.DSDEPLOY_FTP_PORT || 21;
const FTP_PASSWORD   = process.env.DSDEPLOY_FTP_PASSWORD;
const FTP_REMOTE_DIR = process.env.DSDEPLOY_FTP_REMOTE_DIR || __dirname.split('/').reverse()[0];

// build project
console.log(chalk.cyan('\nBuilding project...'));
execSync('npm run build');

// get local dir to upload
let localDir    = null;
const localDirs = ['dist', 'build'];
for (let i = 0; i < localDirs.length; i++) {
    if (fs.existsSync(localDirs[i])) {
        localDir = localDirs[i];
        break;
    }
}
if (!localDir) {
    console.error(chalk.red('No local dir to upload found, possible values are: ' + localDirs.join(', ')));
    process.exit(1);
}

const deleteBuild = () => {
    console.log(chalk.cyan('\nDelete build directory'));
    execSync(`rm -rf ${localDir}`);
};

// ftp configuration
const config = {
    user:         FTP_USER,
    host:         FTP_HOST,
    port:         FTP_PORT,
    localRoot:    __dirname + "/" + localDir,
    remoteRoot:   `/${FTP_REMOTE_DIR}/`,
    include:      ["*", "**/*"], // this would upload everything except dot files
    deleteRemote: false, // delete ALL existing files at destination before uploading, if true
    forcePasv:    true, // Passive mode is forced (EPSV command is not sent)
    sftp:         false // use sftp or ftp
};

// Password optional, prompted if none given
if (FTP_PASSWORD) {
    config.password = FTP_PASSWORD;
}

console.log(chalk.cyan('\nFTP deploy configuration:'));
console.log(config);

console.log(chalk.cyan('\nDeploying...'));
ftpDeploy
    .deploy(config)
    .then(() => {
        console.log(chalk.green('\nSUCCESS: PROJECT DEPLOYED CORRECTLY!'));

        // delete build
        deleteBuild();
    })
    .catch(err => {
        console.error(chalk.red(err));

        // delete build
        deleteBuild();
    });
