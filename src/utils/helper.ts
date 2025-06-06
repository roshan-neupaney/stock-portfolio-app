export const UUidGenerator = () => {
    let uuid =
      new Date().getTime().toString(36) +
      '_' +
      (Date.now() + Math.random().toString()).split('.').join('_');
    return uuid;
  };