const fs = require("fs");

const path = "./db/data.json";
const saveFile = (data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

const readFile = () => {
  if (!fs.existsSync(path)) {
    return null;
  }

  const info = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
};

module.exports = {
  saveFile,
  readFile,
};
