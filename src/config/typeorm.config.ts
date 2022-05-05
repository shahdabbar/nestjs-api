import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../src/user/shared/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest',
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
};
