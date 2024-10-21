export interface IRepository<T, ID, Y> {
  create(entity: Y): Promise<T>;
  findById(id: ID): Promise<T | null>;
  findAll?(filter?: any, paginate?: any): Promise<T[]>;
  update(id: ID, entity: T): Promise<T | null>;
  delete?(id: ID): Promise<boolean>;
}
