# Nodejs FTP deploy

[![Version](https://img.shields.io/npm/v/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)
[![License: MIT](https://img.shields.io/npm/l/@dsabre/deploy-ftp?registry_uri=https%3A%2F%2Fregistry.npmjs.org&style=for-the-badge)](https://github.com/dsabre/deploy-ftp/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dw/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)
[![GitHub issues](https://img.shields.io/github/issues-raw/dsabre/deploy-ftp?style=for-the-badge)](https://github.com/dsabre/deploy-ftp/issues)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@dsabre/deploy-ftp?style=for-the-badge)](https://www.npmjs.com/package/@dsabre/deploy-ftp)

Build and deploy a nodejs application (such as React, Angular, Vue ecc...).


## Configuration

Create a **.env.local** file in your project directory with following variables:

| Environment variable              | Type       | Description                                                                                          |
| :-------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------- |
| `DSDEPLOY_FTP_USER`               | `string`   | **Required**. FTP username                                                                           |
| `DSDEPLOY_FTP_HOST`               | `string`   | **Required**. FTP host                                                                               |
| `DSDEPLOY_FTP_PASSWORD`           | `string`   | FTP password (prompted if none given)                                                                |
| `DSDEPLOY_FTP_PORT`               | `integer`  | FTP port (default 21)                                                                                |
| `DSDEPLOY_FTP_REMOTE_DIR`         | `string`   | Remote directory name where file will be placed, will use the project directory name if not provided |
| `DSDEPLOY_FTP_LOCAL_DIR`          | `string`   | Local directory to upload, will look for the dist or build directory if not provided                 |
| `DSDEPLOY_FTP_DELETE_REMOTE`      | `integer`  | Set to `0` or `1` to delete remote files before upload (default `0`)                                 |
| `DSDEPLOY_FTP_FORCE_PASSIVE_MODE` | `integer`  | Set to `0` or `1` to use passive mode (default `1`)                                                  |
| `DSDEPLOY_FTP_USE_SFTP`           | `integer`  | Set to `0` or `1` to use SFTP (default `0`)                                                          |


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


## License

[MIT](https://choosealicense.com/licenses/mit/)
