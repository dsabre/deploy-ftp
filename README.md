
# Nodejs FTP deploy

Build and deploy a nodejs application (such as React, Angular, Vue ecc...).


## Usage/Examples

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


## Authors

- [Daniele Sabre](https://github.com/dsabre)


## License

[MIT](https://choosealicense.com/licenses/mit/)
