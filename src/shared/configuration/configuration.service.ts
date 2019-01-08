import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

@Injectable()
export class ConfigurationService {
    private config: any = {
        mq: {},
        db: {},
    };
    constructor(private configFile: string) { }

    public load(): void {
        try {
            const content: string = fs.readFileSync(this.configFile, 'utf8');
            this.config = yaml.safeLoad(content);
        } catch (e) {
             // tslint:disable-next-line:no-console
             console.log(`Error loading configuration file: ${JSON.stringify(e)}`);
        }
    }

    public getSettings() {
        return this.config;
    }
}
