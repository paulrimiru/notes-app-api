import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  envConfig;

  constructor(filePath) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key) {
    return this.envConfig[key];
  }
}
