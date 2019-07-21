export const LocalStored = (version: number, id?: string) => {
  return (target, key: string) => {
    const value = {data: undefined};
    const ident = id || `${target.constructor.name}.${key}`;
    Object.defineProperty(target, key, {
      set: (val: any) => {
        value.data = new StoreService(localStorage).loadCfg({...val, id: ident, version});
      },
      get: () => {
        return value.data;
      }
    });
  };
};

export const SessionStored = (id?: string) => {
  return (target, key: string) => {
    const value = {data: undefined};
    const ident = id || `${target.constructor.name}.${key}`;
    Object.defineProperty(target, key, {
      set: (val: any) => {
        value.data = new StoreService(sessionStorage).loadCfg({...val, id: ident, version: NaN});
      },
      get: () => {
        return value.data;
      }
    });
  };
};

export class StoreService {
  constructor(private storage: Storage) {
  }

  public loadCfg(cfg: any): any {
    let currentCfg: any = cfg;
    const entry: string = this.storage.getItem(`${cfg.id}`);
    if (entry) {
      const fromStore: any = JSON.parse(entry);
      if (currentCfg.version === fromStore.version) {
        currentCfg = fromStore;
      } else {
        this.saveCfg(currentCfg);
      }
    }
    const res = this.transformObject(currentCfg);
    const toJson = this.toJson.bind(this);
    res.toJson = () => {
      return toJson(res, 'toJson', 'version', 'id');
    };
    return res;
  }

  private transformObject(obj: any, root?: any) {
    if (typeof obj !== 'object') {
      return obj;
    }
    const res: any = {};
    const innerObject = {};
    Object.keys(obj).forEach((key: string) => {
      if (key === 'version' || key === 'id') { // readonly
        innerObject[key] = obj[key];
        Object.defineProperty(res, key, {
          enumerable: true,
          get: () => innerObject[key]
        });
      } else {
        if (obj[key] instanceof Array) {
          innerObject[key] = this.transformArray(obj[key], root || res);
          Object.defineProperty(res, key, {
            enumerable: true,
            get: () => innerObject[key],
            set: (v: any) => {
              innerObject[key] = this.transformArray(v, root || res);
              this.saveCfg(root || res);
            }
          });
        } else if (typeof obj[key] === 'object') {
          innerObject[key] = this.transformObject(obj[key], root || res);
          Object.defineProperty(res, key, {
            enumerable: true,
            get: () => innerObject[key],
            set: (v: any) => {
              innerObject[key] = this.transformObject(v, root || res);
              this.saveCfg(root || res);
            }
          });
        } else {
          innerObject[key] = obj[key];
          Object.defineProperty(res, key, {
            enumerable: true,
            get: () => innerObject[key],
            set: (v: any) => {
              innerObject[key] = v;
              this.saveCfg(root || res);
            }
          });
        }
      }
    });
    return res;
  }

  private transformArray(arr: any[], root: any): any[] {
    const transformArray = this.transformArray.bind(this);
    const transformObject = this.transformObject.bind(this);
    const transformArr = arr.map(item => (item instanceof Array ? transformArray(item, root) : transformObject(item, root)));
    ['push', 'pop', 'shift', 'unshift', 'copyWithin', 'fill', 'reverse', 'sort', 'splice'].forEach(method => {
      (transformArr as any)[method] = (...args: any) => {
        const res = Array.prototype[method].bind(transformArr)(...args);
        this.saveCfg(root);
        return res;
      };
    });
    return transformArr;
  }

  private saveCfg(root: any) {
    this.storage.setItem(`${root.id}`, JSON.stringify(this.toJson(root)));
  }

  private toJson(ori: any, ...excludes: string[]) {
    if (typeof ori !== 'object') {
      return ori;
    }
    const toJson = this.toJson.bind(this);
    let res;
    if (ori instanceof Array) {
      res = [];
      ori.forEach((item: any) => {
        res.push(toJson(item));
      });
    } else {
      res = Object.keys(ori)
        .filter(this.log) // log
        .filter(key => excludes.indexOf(key) === -1) // excludes
        .reduce((r, key) => this.addJson(r, key, ori[key]), {}); // transform to json
    }
    return res;
  }

  addJson(obj: any, key: string, value: any) {
    obj[key] = this.toJson(value);
    return obj;
  }

  log(value: any) {
//    console.log(value);
    return true;
  }

}
