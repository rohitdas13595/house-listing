import { t } from "elysia";
import { HttpStatusCode } from "./statusCodes";

export interface IResult<T> {
  status: {
    code: HttpStatusCode;
    error: boolean;
  };
  message: string;
  result?: T;
  count?: number;
}

export class Result<T> implements IResult<T> {
  status: {
    code: HttpStatusCode;
    error: boolean;
  };
  message: string;
  result?: T;
  count?: number;
  constructor(
    error: boolean,
    code: HttpStatusCode,
    message: string,
    result?: T,
    count?: number
  ) {
    this.status = {
      code: code,
      error: error,
    };
    this.message = message;
    this.result = result;
    this.count = count;
  }
}

export function getElysiaResult(
  model: any,
  code: HttpStatusCode,
  count?: boolean
) {
  if (code === HttpStatusCode.OK) {
    if (count) {
      return t.Object({
        status: t.Object({
          code: t.Enum(HttpStatusCode, { default: HttpStatusCode.OK }),
          error: t.Boolean(),
        }),
        result: t.Optional( t.Any(model )),
        message: t.String(),
        total: t.Optional(t.Number()),
      });
    }
    return t.Object({
      status: t.Object({
        code: t.Enum(HttpStatusCode, { default: HttpStatusCode.OK }),
        error: t.Boolean(),
      }),
      result: t.Optional(model),
      message: t.String(),
    });
  }

  return t.Object({
    status: t.Object({
      code: t.Enum(HttpStatusCode, { default: code }),
      error: t.Boolean(),
    }),
    message: t.String(),
  });
}
