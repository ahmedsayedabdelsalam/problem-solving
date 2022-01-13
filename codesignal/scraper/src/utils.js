const removeDir = function (dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(dir + "/" + filename).isDirectory()) {
          removeDir(dir + "/" + filename);
        } else {
          fs.unlinkSync(dir + "/" + filename);
        }
      });
      fs.rmdirSync(dir);
    } else {
      fs.rmdirSync(dir);
    }
  } else {
    console.log("Directory path not found.");
  }
}

module.exports = { removeDir };