#!/usr/bin/env node
require("../utils/strings");
const fs          = require("fs");
const chalk       = require("chalk");
const {execSync}  = require("child_process");
const FtpDeploy   = require("ftp-deploy");
const ftpDeploy   = new FtpDeploy();
const cwd         = process.cwd();
const projectJson = require(cwd + '/package.json');

// load configuration from .env.local file
require('dotenv').config({path: cwd + '/.env.local'});

console.log(chalk.bgYellow(chalk.black(`- DEPLOY PROJECT ${projectJson.name} -`)));

// build project
console.log(chalk.cyan('\nBuilding project...'));
execSync('npm run build');

// get local dir to upload
let localDir    = null;
const localDirs = ['dist', 'build'];
for (let i = 0; i < localDirs.length; i++) {
    if (fs.existsSync(`${cwd}/${localDirs[i]}`)) {
        localDir = `${cwd}/${localDirs[i]}`;
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
    user:         process.env.DSDEPLOY_FTP_USER,
    host:         process.env.DSDEPLOY_FTP_HOST,
    port:         process.env.DSDEPLOY_FTP_PORT || 21,
    localRoot:    localDir,
    remoteRoot:   '/' + (process.env.DSDEPLOY_FTP_REMOTE_DIR || cwd.split('/').reverse()[0].trim())).trimChar('/') + '/',
    include:      ["*", "**/*"], // this would upload everything except dot files
    deleteRemote: parseInt(process.env.DSDEPLOY_FTP_DELETE_REMOTE) === 1, // delete ALL existing files at destination before uploading, if true
    forcePasv:    typeof process.env.DSDEPLOY_FTP_FORCE_PASSIVE_MODE !== 'undefined' ? parseInt(process.env.DSDEPLOY_FTP_FORCE_PASSIVE_MODE) === 1 : true, // Passive mode is forced (EPSV command is not sent)
    sftp:         parseInt(process.env.DSDEPLOY_FTP_USE_SFTP) === 1 // use sftp or ftp
};

// Password optional, prompted if none given
if (process.env.DSDEPLOY_FTP_PASSWORD) {
    config.password = process.env.DSDEPLOY_FTP_PASSWORD;
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
