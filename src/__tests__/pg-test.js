jest.unmock('../pg');
const pgWrapper = require('../pg').pgWrapper;

describe('test pgWrapper', () => {
  let conString;

  beforeEach(() => {
    conString = 'postgres://testuser:135790@localhost:5432/testuser';
  });

  it('should call pg with', () => {
    pgWrapper.connect(conString);
    expect(pgWrapper.pg.connect.mock.calls[0][0]).toBe(conString);
    expect(typeof pgWrapper.pg.connect.mock.calls[0][1]).toBe('function');
  //  let callback =jest.fn();
  //  expect(pgWrapper.pg.connect).toBeCalledWith(conString,callback);
  });
});
