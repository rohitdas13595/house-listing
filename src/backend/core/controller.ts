// import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { Service } from "./service";

export const enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  OPTIONS = "options",
  HEAD = "head",
  ALL = "all",
}



export interface Route {
    /**
     * Path on which the route will be mapped. The path is formed by
     * combining the controller path and the route path
     * @example /
     * @example /:id
     */
    path: string;
    /**
     * HTTP Method for the routes
     * @example GET
     * @example POST
     * @example PUT
     * @example DELETE
     * @example PATCH
     * @example OPTIONS
     * @example HEAD
     * @example ALL
     */
    method: Methods;
    /**
     * Middleware to be used for this routes
     * @example [authMiddleware]
     */
    localMiddleware: ((
      req: Request,
      res: Response,
      next: () => void
    ) => void)[];
    /**
     * Handler for the routes. Bind the class to the handler always to ensure this
     * is resolved always.
     * @example this.handler.bind(this)
     */
    handler: Handler;
  }
  


export type Handler = (
    req: Request,
    res: Response,
    next?: () => void
  ) => void | Promise<void> | Promise<Response>;

class ServiceController<T> {
  constructor(
    // app: OpenAPIHono,
    public service: Service<T>,
    public route: string
  ) {}

 
}
