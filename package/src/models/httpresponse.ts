import { HTTP_STATUS_CODES } from "./http-status-codes";

export class HttpResponse {
  status: number;
  json: Object;

  constructor(status: number, json: Object) {
    this.status = status;
    this.json = json;
  }

  static CONTINUE(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.CONTINUE.status, json);
  }
  static SWITCHING_PROTOCOLS(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.SWITCHING_PROTOCOLS.status, json);
  }
  static PROCESSING(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.PROCESSING.status, json);
  }
  static OK(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.OK.status, json);
  }
  static CREATED(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.CREATED.status, json);
  }
  static ACCEPTED(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.ACCEPTED.status, json);
  }
  static NON_AUTHORITATIVE_INFORMATION(json: Object): HttpResponse {
    return new HttpResponse(
      HTTP_STATUS_CODES.NON_AUTHORITATIVE_INFORMATION.status,
      json
    );
  }
  static NO_CONTENT(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.NO_CONTENT.status, json);
  }
  static RESET_CONTENT(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.RESET_CONTENT.status, json);
  }
  static PARTIAL_CONTENT(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.PARTIAL_CONTENT.status, json);
  }
  static MULTI_STATUS(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.MULTI_STATUS.status, json);
  }
  static MULTIPLE_CHOICES(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.MULTIPLE_CHOICES.status, json);
  }
  static MOVED_PERMANENTLY(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.MOVED_PERMANENTLY.status, json);
  }
  static MOVED_TEMPORARILY(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.MOVED_TEMPORARILY.status, json);
  }
  static SEE_OTHER(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.SEE_OTHER.status, json);
  }
  static NOT_MODIFIED(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.NOT_MODIFIED.status, json);
  }
  static USE_PROXY(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.USE_PROXY.status, json);
  }
  static TEMPORARY_REDIRECT(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.TEMPORARY_REDIRECT.status, json);
  }
  static PERMANENT_REDIRECT(json: Object): HttpResponse {
    return new HttpResponse(HTTP_STATUS_CODES.PERMANENT_REDIRECT.status, json);
  }
}
