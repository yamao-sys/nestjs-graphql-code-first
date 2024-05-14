import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { datasourceOptions } from './data-source';

export const typeormConfig: TypeOrmModuleOptions = datasourceOptions;
