import { IResult , Result } from './result'
import { HttpStatusCode } from "./statusCodes";
import * as lodash from "lodash";
import { log } from "./log";
import {connection, db} from "../db/connection";
import Pg from  'pg'
import {
  PgTableWithColumns
  ,
  TableConfig
} from "drizzle-orm/pg-core";
import { eq, isNotNull } from 'drizzle-orm';
import { DbTables } from '../db/schema';


export class DaoClass<T>  {
   private entity : DbTables
   constructor(
    entity : DbTables
   ) {
    this.entity = entity
   }
  private async parseFilter1(where: any) {
    if (where instanceof Array) {
      where.forEach(() => this.parseFilter1(where));
    }
    Object.keys(where).forEach((key) => {
      if ((where as any)[key] instanceof Array) {
        (where as any)[key] = { in: where[key] };
      }
      if ((where as any)[key] === "true") {
        (where as any)[key] = true;
      }
      if ((where as any)[key] === "false") {
        (where as any)[key] = false;
      }
      if (key.indexOf(".") >= 0) {
        const temp = lodash.set({}, key, (where as any)[key]);
        where = { ...temp, ...where };
        delete (where as any)[key];
      }
    });
    return where;
  }

  public async deleteOne(id: string ): Promise<IResult<any>> {
    try {
     const  response =  await  db.delete(this.entity).where(eq(this.entity.id, id)).returning();
      if (response) {
        return new Result(false, HttpStatusCode.OK, "deleted", response);
      }
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "error in deletion"
      );
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.message || "error in deletion"
      );
    }
  }

  public async getOne(id: string ): Promise<IResult<any>> {
    try {
      const response = await db.select().from(this.entity).where(eq(this.entity.id, id));
      console.log("here.....", response);
      log.info("read", "hello", "hello");
      if (response[0]) {
        return new Result(false, HttpStatusCode.OK, "Found", response[0]);
      }

      return new Result(true, HttpStatusCode.NOT_FOUND, "not found");
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.NOT_FOUND,
        error?.message || "error  in reading"
      );
    }
  }

  public async updateOne(
    id: string,
    body: Partial<T>
  ): Promise<IResult<T | null | undefined | any>> {
    try {
      const response = await  db.update(this.entity).set(body).where(eq(this.entity.id, id)).returning({id: this.entity.id});   
      if (response) {
        return new Result(false, HttpStatusCode.OK, "updated", {
          id: id
        });
      }

      return new Result(true, HttpStatusCode.NOT_FOUND, "not found");
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.NOT_FOUND,
        error?.message || "error  in reading"
      );
    }
  }

  public async create(body: Partial<T>): Promise<IResult<T>> {
    try {
      const response = await db.insert(this.entity).values(body).returning();
      if (response[0]) {
        return new Result(false, HttpStatusCode.OK, "created", response[0] as T);
      }

      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "error in creating"
      );
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.NOT_FOUND,
        error?.message || "error  in reading"
      );
    }
  }

  public async getMany(query: any): Promise<IResult<T |any>> {
    // const { searchParams } = new URL(queryUrl);
    // let query: any = {};
    // const keys = searchParams.keys();
    // let result = keys.next();
    // while (!result.done) {
    //   // console.log(result.value); // 1 3 5 7 9
    //   query[`${result.value}`] = searchParams.get(`${result.value}`);
    //   result = keys.next();
    // }

    let findOptions: any = {};

    //page
    if (query?.page && query?.count) {
      findOptions["take"] = Number(query?.count);
      findOptions["skip"] = (Number(query?.page) - 1) * Number(query?.count);
      delete query.count;
      delete query.page;
    }
    if (!query?.page || !query?.count) {
      if (query.count) {
        delete query.count;
      }
      if (query.page) {
        delete query.page;
      }
    }

    //sort
    if (query?.orderBy && query?.order) {
      let ob: any = {};
      ob[`${query?.orderBy}`] = String(query?.order).toLowerCase();
      findOptions["orderBy"] = ob;
      delete query?.orderBy;
      delete query?.order;
    }

    if (!query?.orderBy || query?.order) {
      if (query?.orderBy) {
        delete query?.orderBy;
      }
      if (query?.order) {
        delete query?.order;
      }
    }
    let wh: any = {};

    findOptions["where"] = await this.parseFilter1(query);

    

    console.log("findOptions", findOptions);

    try {
      const a  = await  db.transaction( async (tx)=>{
        console.log("tx", tx);

        // tx.select().from(this.entity).where(findOptions.where);

        const  response = await tx.select().from(this.entity)

        console.log("response", response);

        return response

      })

      

      return new Result(false, HttpStatusCode.OK, "found", a);
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.message
      );
    }
  }
}
