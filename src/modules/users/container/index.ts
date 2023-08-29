import { container } from 'tsyringe';

import { TypeOrmUsersRepository } from '../repositories/typeorm/typeorm.users.repository';
import { TypeOrmRolesRepository } from '../repositories/typeorm/typeorm.roles.repository';
import { TypeOrmPermissionsRepository } from '../repositories/typeorm/typeorm.permissions.repository';

container.register('UsersRepository', TypeOrmUsersRepository);
container.register('RolesRepository', TypeOrmRolesRepository);
container.register('PermissionsRepository', TypeOrmPermissionsRepository);
