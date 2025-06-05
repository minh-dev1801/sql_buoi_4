import { statusCodes } from "./status-code.helper";

export class BadrequestException extends Error {
  constructor(message = "BadrequestException") {
    super(message);
    this.code = statusCodes.BAD_REQUEST;
  }
}

export class UnauthorizedException extends Error {
  constructor(message = "BadrequestException") {
    super(message);
    this.code = statusCodes.UNAUTHORIZED;
  }
}

export class NotFoundException extends Error {
  constructor(message = "NotFoundException") {
    super(message);
    this.code = statusCodes.NOT_FOUND;
  }
}

export class ConflictException extends Error {
  constructor(message = "ConflictException") {
    super(message);
    this.code = statusCodes.CONFLICT;
  }
}
