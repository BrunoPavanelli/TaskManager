import { ZodType, z } from 'zod';

export abstract class AbstractDTO<Schema extends ZodType> {
  protected data: z.infer<Schema>;

  public constructor(data: Record<string, unknown>) {
    this.validate(data);
  }

  protected abstract rules(): Schema;

  public getAll() {
    return this.data;
  }

  public get<K extends keyof z.infer<Schema>>(key: K) {
    return this.data[key];
  }

  private validate(data: Record<string, unknown>) {
    this.data = this.rules().parse(data);
  }
}
