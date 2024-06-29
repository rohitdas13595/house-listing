import { IResult } from "./result";
import { DaoClass } from "./dao";

export class Service<T> {
  dao: DaoClass<T>;

  constructor(dao: DaoClass<T>) {
    this.dao = dao;
  }

  public async deleteOne(id: string ): Promise<IResult<T>> {
    return await this.dao.deleteOne(id);
  }

  public async getOne(id: string ): Promise<IResult<T>> {
    return await this.dao.getOne(id);
  }

  public async updateOne(
    id: string ,
    body: Partial<T>
  ): Promise<IResult<T>> {
    return await this.dao.updateOne(id, body);
  }

  public async create(
    body: Partial<T>
  ): Promise<IResult<T | null | undefined | Partial<T> >> {
    return await this.dao.create(body);
  }

  public async getMany(query: any): Promise<IResult<T>> {
    return await this.dao.getMany(query);
  }
}
