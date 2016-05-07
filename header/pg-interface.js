/*
 * @flow
 */
declare module 'es7-postgres' {
// copy from es6-literals
  declare type InsertValue = {
    value: string
  };

  declare type pgQueryConfig = {
    text:string,
    values:mixed[]
  };

  declare function inst(value:string):InsertValue;

  declare function SQL(strs:string[], ...args:mixed[]): sqlResult;
// ---------------------------

  declare type Result = {
    command:string,
    rowCount:number,
    oid:mixed,
    rows:Array<mixed>,
    addRow: (row:mixed) => void
  };

  declare type queryParams = {
    name: string,
    rowHandle: (row:mixed, result:Result) =>void
  };

  declare interface ClientWrapper {
    client: any;
    query(sqlCommand:pgQueryConfig, params: ?queryParams ):Promise<Result>;
  }

  declare type pgWrapper = {
    pg:mixed,
    connect(conString : string):Promise<ClientWrapper>;
  };

  declare type tsType = {
    style : {
      color: 'black'|'white'|'red',
      name: 'tom'|'jack'
    },
    user : 'good'|'bad'
  };

  declare var exports: {
    pgWrapper:pgWrapper,
    SQL:SQL,
    inst:inst
  };
}
