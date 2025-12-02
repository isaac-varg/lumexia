export class ErrorBase<T extends string, D = Record<string, any>> extends Error {
  public name: T;
  public message: string;
  public cause: any;
  public data?: D; // We add the data property here

  constructor(name: T, message: string, data?: D, cause?: any) {
    super(message);
    this.name = name;
    this.message = message;
    this.cause = cause;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
