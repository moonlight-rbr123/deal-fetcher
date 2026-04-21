const color = {
  key: "§",
  resetKey: "§§",

  /**
   * @param {string} text
   */
  log(text) {
    let colors = this.colors;
    if (!colors) return;

    let matchOnlyKey = /(?<=§\[).*?(?=\])/gm;
    let matchReset = new RegExp(this.resetKey, "gm");
    let textColors = text.match(matchOnlyKey);

    let newText;

    newText = text.replace(matchReset, "\u001b[0m");

    if (textColors) textColors.forEach((a) => replaceText(a));

    console.log(newText);

    function replaceText(key) {
      let matchKey = new RegExp(`§\\[${key}\\]`, "gm");
      let found = findColorByKey(key);
      newText = newText.replace(matchKey, `\u001b[${found}m`);
    }

    function findColorByKey(key) {
      let keyMatch = new RegExp(`^${key}`);
      let sortedColors = colors.filter((o) => o.name.match(keyMatch) !== null);
      return sortedColors[0].color;
    }
  },
};

module.exports = color;
