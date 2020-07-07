export function getHexagonRows(hexagonList) {
  let rows = {};
  let maxX, maxY, minX, minY;
  for (let hexagon in hexagonList) {
    let hexagonCords = hexagonList[hexagon] || {};
    const { first, second } = hexagonCords;
    if (maxX === undefined || maxX < first) {
      maxX = first;
    }
    if (maxY === undefined || maxY < second) {
      maxY = second;
    }
    if (minX === undefined || minX > first) {
      minX = first;
    }
    if (minY === undefined || minY > second) {
      minY = second;
    }
    if (!rows[second]) {
      rows[second] = {};
    }
    rows[second][first] = hexagon;
  }
  return { rows, maxX, maxY, minX, minY };
}