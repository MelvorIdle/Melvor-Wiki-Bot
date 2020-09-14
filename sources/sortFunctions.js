// Contains a number of functions to be used with Array.sort
/**
 * @description Sorts items by defence level requirements
 * @param {Object} item1
 * @param {Object} item2
 * @return {number}
 */
function sortByDefenceLevel(item1, item2) {
  const x = (item1.defenceLevelRequired === undefined) ? 0 : item1.defenceLevelRequired;
  const y = (item2.defenceLevelRequired === undefined) ? 0 : item2.defenceLevelRequired;
  return (x - y);
}
/**
 * @description Sorts items by ranged level requirements
 * @param {Object} item1
 * @param {Object} item2
 * @return {number}
 */
function sortByRangedLevel(item1, item2) {
  const x = (item1.rangedLevelRequired === undefined) ? 0 : item1.rangedLevelRequired;
  const y = (item2.rangedLevelRequired === undefined) ? 0 : item2.rangedLevelRequired;
  return (x - y);
}
/**
 * @description Sorts items by magic level requirements
 * @param {Object} item1
 * @param {Object} item2
 * @return {number}
 */
function sortByMagicLevel(item1, item2) {
  const x = (item1.magicLevelRequired === undefined) ? 0 : item1.magicLevelRequired;
  const y = (item2.magicLevelRequired === undefined) ? 0 : item2.magicLevelRequired;
  return (x - y);
}

/**
 * @description Sorts items by attack level requirements
 * @param {Object} item1
 * @param {Object} item2
 * @return {number}
 */
function sortByAttackLevel(item1, item2) {
  const x = (item1.attackLevelRequired === undefined) ? 0 : item1.attackLevelRequired;
  const y = (item2.attackLevelRequired === undefined) ? 0 : item2.attackLevelRequired;
  return (x - y);
}

/**
 * Sorts a drop/loot table by weight (descending)
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
function sortByDropWeight(a, b) {
  return b[1] - a[1];
}
