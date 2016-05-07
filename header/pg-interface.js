/*
 * @flow
 */
declare module 'es7-postgres' {
// copy from tagged-literals
  declare type InsertValue = {
    value: string
  };

  declare type pgQueryConfig = {
    text:string,
    values:mixed[]
  };

  declare function inst(value:string):InsertValue;

  declare function SQL(strs:string[], ...args:mixed[]): pgQueryConfig;

// --client.js-------------------------
  declare type Result = {
    command:string,
    rowCount:number,
    oid:mixed,
    rows:Array<mixed>,
    addRow: (row:mixed) => void
  };

  declare type queryParams = {
    V:?mixed[],
    values:?mixed[],
    N:?string,
    name: ?string,
    rowHandle: ?(row:mixed, result:Result) =>void
  };

  declare interface ClientWrapper {
    client: any;
    query(sqlCommand:pgQueryConfig, params: ?queryParams ):Promise<Result>;
  }

// -- pg.js --
  declare type pgWrapper = {
    pg:mixed,
    connect(conString : string):Promise<ClientWrapper>;
  };

// -- module export --
  declare var exports: {
    pgWrapper:pgWrapper,
    SQL:SQL,
    inst:inst
  };
}
