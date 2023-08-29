import { z } from 'zod';

import { AbstractDTO } from '../../../shared/dtos/AbstractDTO';

const updateTaskSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export class UpdateTaskDTO extends AbstractDTO<typeof updateTaskSchema> {
  protected rules() {
    return updateTaskSchema;
  }
}
