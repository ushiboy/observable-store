export function same(src, dest) {
  if (isObjectOrArray(src) && isObjectOrArray(dest)) {
    const destProps = new Set();
    Object.keys(dest).forEach(p => {
      destProps.add(p);
    });
    for (const k of Object.keys(src)) {
      destProps.delete(k);
      if (!same(src[k], dest[k])) {
        // break and return
        return false;
      }
    }
    if (destProps.size > 0) {
      // 追加されたプロパティがある
      return false;
    }
    return true;
  } else if (isDate(src) && isDate(dest)) {
    return src.getTime() === dest.getTime();
  } else {
    return src === dest;
  }
}

function isDate(val) {
  return val !== undefined && val.constructor === Date;
}

export function isObjectOrArray(val) {
  return !isDate(val) && typeof val === 'object';
}
