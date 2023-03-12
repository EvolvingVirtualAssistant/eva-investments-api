import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotEnvConfig } from 'dotenv';
import { readdirSync } from 'fs';
import { join as pathJoin } from 'path';

function findRootFolder(path: string): string {
  let foldersMatched = 0;
  for (const dirEntry of readdirSync(path)) {
    if (foldersMatched === 1) {
      //root folder found
      return path;
    }

    if (dirEntry === 'src' || dirEntry === 'tests') {
      foldersMatched++;
    } else if (
      dirEntry === 'libs' ||
      dirEntry === 'unit' ||
      dirEntry === 'integration'
    ) {
      return findRootFolder(path.substr(0, path.lastIndexOf('/')));
    } else if (dirEntry === 'server' || dirEntry === 'app') {
      return findRootFolder(pathJoin(path, dirEntry));
    }
  }

  if (foldersMatched === 1) {
    //root folder found
    return path;
  }

  throw new Error('Could not find root folder');
}

function initializeEnvVars() {
  // path config
  const currentWorkingDir = __dirname + '/../'; //process.cwd();
  console.log(currentWorkingDir);
  const ROOT_PATH = findRootFolder(currentWorkingDir);
  console.log(ROOT_PATH);

  const envConfig = dotEnvConfig({
    path: pathJoin(ROOT_PATH, '/resources/env/.env')
  });
}

function getEnvVar(envVar: string): string {
  const value = process.env[envVar];

  if (value == null) {
    throw new Error(`Environment variable '${envVar}' is missing`);
  }

  return value;
}

async function bootstrap() {
  initializeEnvVars();

  const port = getEnvVar('PORT');
  const apiVersion = getEnvVar('API_VERSION');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiVersion);
  await app.listen(port);
}
bootstrap();
