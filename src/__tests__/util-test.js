jest.unmock('../util');
import {multiAssign} from '../util';

describe('test util', function() {


  describe('multiAssign() should let (N|name => name, V|values => values).',
  function() {
    let target;
    let src={};
    const targetShouldBE ={
      name:'src',
      values:['a', 'c', 'd'],
      text: 'hello!'
    };
    beforeEach( function() {
      target = {
        name:'jim',
        values:[1, 2, 3],
        text: 'hello!'
      };
      src={};
      src.assign = multiAssign;
    });

    it('test {N,V} to target', function() {
      src.N = targetShouldBE.name;
      src.V = targetShouldBE.values;

      src.assign('V', 'values').to(target, 'values');
      src.assign('N', 'name').to(target, 'name');
      expect(target).toEqual(targetShouldBE);
    });

    it('test {name,V} to target', function() {
      src.name = targetShouldBE.name;
      src.V = targetShouldBE.values;

      src.assign('V', 'values').to(target, 'values');
      src.assign('N', 'name').to(target, 'name');
      expect(target).toEqual(targetShouldBE);
    });

    it('test {name,values} to target', function() {
      src.name = targetShouldBE.name;
      src.values = targetShouldBE.values;

      src.assign('V', 'values').to(target, 'values');
      src.assign('N', 'name').to(target, 'name');
      expect(target).toEqual(targetShouldBE);
    });

    it('test {name,values,N,V} to target', function() {
      src.name = targetShouldBE.name;
      src.values = targetShouldBE.values;
      src.N = targetShouldBE.name;
      src.V = targetShouldBE.values;

      src.assign('V', 'values').to(target, 'values');
      src.assign('N', 'name').to(target, 'name');
      expect(target).toEqual(targetShouldBE);
    });

  });

});
