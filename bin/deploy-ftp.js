#!/usr/bin/env node
require("../utils/strings");
const fs          = require("fs");
const chalk       = require("chalk");
const {execSync}  = require("child_process");
const FtpDeploy   = require("ftp-deploy");
const ftpDeploy   = new FtpDeploy();
const cwd         = process.cwd();
const projectJson = require(cwd + '/package.json');
const deployJson  = require('../package.json');
const envFilename = process.argv[2] || '.env.local';

// load configuration from .env.local file
require('dotenv').config({path: cwd + '/' + envFilename});

console.log(chalk.bgMagenta(chalk.black(`- ${deployJson.name} version: ${deployJson.version} -`)));
console.log(chalk.bgYellow(chalk.black(`DEPLOY PROJECT ${projectJson.name}`)));

// check if configuration is defined
if (!process.env.DSDEPLOY_FTP_USER || !process.env.DSDEPLOY_FTP_HOST) {
    console.error(chalk.red(`\nConfiguration not found in ${cwd}/${envFilename}`));
    process.exit(1);
}

// execute pre-deploy commands
if ((process.env.DSDEPLOY_FTP_PREDEPLOY + '').trim() !== 'none') {
    console.log(chalk.bgCyan(chalk.white('\nPre-deploy commands...')));

    const preDeployCommands = (process.env.DSDEPLOY_FTP_PREDEPLOY || 'npm run build').split(';').map(c => c.trim());
    for (let i = 0; i < preDeployCommands.length; i++) {
        console.log(chalk.cyan(`\nExecute command: ${preDeployCommands[i]}`));
        try {
            console.log(execSync(preDeployCommands[i]).toString().trim());
        } catch (err) {
            console.log(chalk.red(err.toString()));
            process.exit(1);
        }
    }
}
else{
    console.log(chalk.cyan('\nNo pre-deploy commands found'));
}

// get local dir to upload if not passed from env variables
let localDir = process.env.DSDEPLOY_FTP_LOCAL_DIR || null;
if (localDir === null) {
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
} else {
    localDir = `${cwd}/${localDir}`;
    if (!fs.existsSync(localDir)) {
        console.error(chalk.red('No local dir to upload found, directory searched: ' + localDir));
        process.exit(1);
    }
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
    remoteRoot:   '/' + ((process.env.DSDEPLOY_FTP_REMOTE_DIR || cwd.split('/').reverse()[0])).trim().trimChar('/') + '/',
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

        process.exit(1);
    });
