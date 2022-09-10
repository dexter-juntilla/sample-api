interface DatabaseInterface {
  read(name: string, query: any, options?: any, bulk?: any): Promise<any>;

  create(name: string, data: any): Promise<any>;

  delete(name: string, query: object): Promise<any>;

  update(
    name: string,
    query: object,
    data: object,
    options?: object,
  ): Promise<any>;
}
