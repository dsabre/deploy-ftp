# Nodejs FTP deploy

[![Version](https://img.shields.io/npm/v/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)
[![License: MIT](https://img.shields.io/npm/l/@dsabre/deploy-ftp?registry_uri=https%3A%2F%2Fregistry.npmjs.org&style=for-the-badge)](https://github.com/dsabre/deploy-ftp/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dw/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)
[![GitHub issues](https://img.shields.io/github/issues-raw/dsabre/deploy-ftp?style=for-the-badge)](https://github.com/dsabre/deploy-ftp/issues)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)

Build and deploy a nodejs application (such as React, Angular, Vue ecc...).

From version 1.1.2, using `DSDEPLOY_FTP_PREDEPLOY` variable, you can deploy anything, even not a site.


## Configuration

Create a **.env.local** file in your project directory with following variables:

| Environment variable              | Type       | Description                                                                                                                                                                                                        |
| :-------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DSDEPLOY_FTP_USER`               | `string`   | **Required**. FTP username                                                                                                                                                                                         |
| `DSDEPLOY_FTP_HOST`               | `string`   | **Required**. FTP host                                                                                                                                                                                             |
| `DSDEPLOY_FTP_PASSWORD`           | `string`   | FTP password (prompted if none given)                                                                                                                                                                              |
| `DSDEPLOY_FTP_PORT`               | `integer`  | FTP port (default 21)                                                                                                                                                                                              |
| `DSDEPLOY_FTP_REMOTE_DIR`         | `string`   | Remote directory name where file will be placed, will use the project directory name if not provided                                                                                                               |
| `DSDEPLOY_FTP_LOCAL_DIR`          | `string`   | Local directory to upload, will look for the dist or build directory if not provided                                                                                                                               |
| `DSDEPLOY_FTP_DELETE_REMOTE`      | `integer`  | Set to `0` or `1` to delete remote files before upload (default `0`)                                                                                                                                               |
| `DSDEPLOY_FTP_FORCE_PASSIVE_MODE` | `integer`  | Set to `0` or `1` to use passive mode (default `1`)                                                                                                                                                                |
| `DSDEPLOY_FTP_USE_SFTP`           | `integer`  | Set to `0` or `1` to use SFTP (default `0`)                                                                                                                                                                        |
| `DSDEPLOY_FTP_PREDEPLOY`          | `string`   | Execute commands before deploy, you can define multiple commands to execute by separating them with a semicolon. If you don't want to execute any commands, set the variable to `none` (default: `npm run build`). |

### Example of a .env.local with default/example values
```dotenv
DSDEPLOY_FTP_USER=yourftpusername
DSDEPLOY_FTP_HOST=host.example.xyz
DSDEPLOY_FTP_PASSWORD=yourpassword
DSDEPLOY_FTP_PORT=21
DSDEPLOY_FTP_REMOTE_DIR=remote-directory
DSDEPLOY_FTP_LOCAL_DIR=dist
DSDEPLOY_FTP_DELETE_REMOTE=0
DSDEPLOY_FTP_FORCE_PASSIVE_MODE=1
DSDEPLOY_FTP_USE_SFTP=0
DSDEPLOY_FTP_PREDEPLOY="npm run build"
```


## Usage

Use this command to deploy to your FTP server:

```bash
npx @dsabre/deploy-ftp
```

Optionally, you can pass the name of the environment variables file as a command parameter:

```bash
npx @dsabre/deploy-ftp .env
```

or with any name you want:

```bash
npx @dsabre/deploy-ftp myEnvFile.txt
```


## Contributing

For contributions, issues and feature requests please check [issues page](https://github.com/dsabre/deploy-ftp/issues).


## Authors

- [Daniele Sabre](https://github.com/dsabre)


## Support me
<a href="https://www.buymeacoffee.com/daniele.sabre" target="_blank">
  <img src="https://raw.githubusercontent.com/dsabre/dsabre/main/images/bmc.png" alt="Buy Me a Coffee" title="Buy Me a Coffee" height="50" />
</a>


## License

[MIT](https://choosealicense.com/licenses/mit/)
