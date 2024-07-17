module.exports.filterStringTH = (str) => {
  let result = "";
  const regex = /^[a-zA-Zก-ฮะาิีึืุูเแโำใไ่้๋็ั๊์ ]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result;
};

module.exports.filterStringParentTH = (str) => {
  // Remove any text within parentheses (including the parentheses themselves)
  str = str.replace(/\(.*?\)/g, "");

  let result = "";
  const regex = /^[a-zA-Zก-ฮะาิีึืุูเแโำใไ่้๋็ั๊์ ]$/;

  for (let i = 0; i < str.length; i++) {
    const c = str[i];

    if (regex.test(c)) {
      result += c;
    }
  }

  return result.trim();
};
