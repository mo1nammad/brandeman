class Response {
  public send<T>(data: T) {
    return {
      data,
      error: null,
    };
  }
  public refuse(message: string) {
    return {
      data: null,
      error: new Error(message),
    };
  }
  public error(error: Error) {
    return {
      data: null,
      error,
    };
  }
}
const instance = new Response();
export default instance;
