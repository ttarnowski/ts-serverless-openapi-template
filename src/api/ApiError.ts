export class ApiError extends Error {
  public statusCode: number;
  public type: string;
  public details?: unknown;

  constructor({
    message,
    statusCode,
    type,
    details,
  }: {
    message?: string;
    statusCode: number;
    type: string;
    details?: unknown;
  }) {
    super(message);

    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
      details: this.details,
    };
  }
}
