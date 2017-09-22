import {
  same,
  isObjectOrArray
} from './util.js'

export default function createObservableStore(initState = {}) {
  let lock = false;
  let changedCount = 0;
  const observers = new Set();

  const proxyHandler = {
    set(state, prop, value) {
      if (!lock) {
        // 直接の操作は即エラーに
        throw new Error('Should use assign');
      }

      const oldValue = state[prop];
      if (same(oldValue, value)) {
        // 同じ場合は何もしない
        return true;
      }

      state[prop] = wrapProxyIfNeeded(value);
      changedCount++;
      return true;
    },
    deleteProperty(state, prop) {
      // 直接の削除は拒否
      return false;
    }
  };

  const rootProxy = new Proxy({}, proxyHandler);

  function wrapProxyIfNeeded(v) {
    if (Array.isArray(v)) {
      return new Proxy(v.map(wrapProxyIfNeeded), proxyHandler);
    } else if (isObjectOrArray(v)) {
      const p = new Proxy({}, proxyHandler);
      Object.assign(p, v);
      return p;
    }
    return v;
  }

  function assign(...sources) {
    changedCount = 0;
    lock = true;
    sources.forEach(s => {
      Object.assign(rootProxy, s);
    });
    lock = false;
    if (changedCount > 0) {
      observers.forEach(f => {
        f();
      });
    }
  }

  function observe(o) {
    observers.add(o);
  }

  function unobserve(o) {
    observers.delete(o);
  }

  const store = {
    get state() {
      return rootProxy;
    },
    assign,
    observe,
    unobserve
  };

  // initialize
  store.assign(initState);

  return store;
}
