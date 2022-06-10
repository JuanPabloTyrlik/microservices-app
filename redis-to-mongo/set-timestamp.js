const setTimestamp = () => {
  return new Date().toISOString().replace("T", " ").replace(/\..+$/, "");
};

module.exports = {
  setTimestamp,
};
