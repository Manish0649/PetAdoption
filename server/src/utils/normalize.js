function normalizeKey(key) {
  return key.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

function normalizeRow(row = {}) {
  const result = {};
  Object.keys(row || {}).forEach((key) => {
    result[normalizeKey(key)] = row[key];
  });
  return result;
}

function normalizeRows(rows = []) {
  return rows.map((row) => normalizeRow(row));
}

module.exports = {
  normalizeRow,
  normalizeRows,
};


