import {StoreService} from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeAll(() => service = new StoreService(localStorage));

  beforeEach(() => localStorage.clear());

  afterAll(() => localStorage.clear());

  it('At first load, store is not update', () => {
    service.loadCfg({version: 1, id: 'test', foo: 5});
    const stored = localStorage.getItem('test');
    expect(stored).toBeNull();
  });

  it('Update primitive value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: 5});
    res.foo = 6;
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(6);
  });

  it('Update primitive value on deep 1', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: {bar: 5}});
    res.foo.bar = 6;
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.bar).toEqual(6);
  });

  it('Update object value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: {bar: 5}});
    res.foo = {bar: 6};
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.bar).toEqual(6);
  });

  it('Update array by push value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: []});
    res.foo.push(6);
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.length).toEqual(1);
  });

  it('Update array by unshift value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: []});
    res.foo.unshift(6);
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.length).toEqual(1);
  });

  it('Update array by pop value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: [1, 2]});
    res.foo.pop();
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.length).toEqual(1);
  });

  it('Update array by shift value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: [1, 2]});
    res.foo.shift();
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo.length).toEqual(1);
  });

  it('Update array by copyWithin value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: ['a', 'b', 'c', 'd', 'e']});
    res.foo.copyWithin(0, 3, 4);
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(['d', 'b', 'c', 'd', 'e']);
  });

  it('Update array by fill value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: [1, 2, 3, 4]});
    res.foo.fill(0, 2, 4);
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual([1, 2, 0, 0]);
  });

  it('Update array by reverse value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: ['one', 'two', 'three']});
    res.foo.reverse();
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(['three', 'two', 'one']);
  });

  it('Update array by sort value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: [1, 30, 4, 21, 100000]});
    res.foo.sort();
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual([1, 100000, 21, 30, 4]);
  });

  it('Update array by splice value on deep 0', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: ['Jan', 'March', 'April', 'June']});
    res.foo.splice(1, 0, 'Feb');
    const stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(['Jan', 'Feb', 'March', 'April', 'June']);
  });

  it('Test repudiation', () => {
    const res = service.loadCfg({version: 1, id: 'test', foo: 5});
    res.foo = 6;
    let stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(6);

    service.loadCfg({version: 1, id: 'test', foo: 7});
    stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(6);

    service.loadCfg({version: 2, id: 'test', foo: 7});
    stored = JSON.parse(localStorage.getItem('test'));
    expect(stored.foo).toEqual(7);
  });
});
