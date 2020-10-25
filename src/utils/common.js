export const betterRequire = (absPath) => {
  const module = require(absPath);
  return module.default ? module.default : module;
};
