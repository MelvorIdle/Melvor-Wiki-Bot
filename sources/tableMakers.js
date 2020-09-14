/**
 * @description Creates a table of all cookable items in game
 * @return {string}
 */
function createCookingTable() {
  const cookableItems = getObjectArraySubset(items, selectCookable);
  const cookSpec = new TableSpecMaker();
  cookSpec.appendColumn('Item', 'left', 'cookedItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  cookSpec.appendColumn('Name', 'left', 'cookedItemID', 0, formatItemIDAsLink);
  cookSpec.appendColumn('Cooking Level', 'right', 'cookingLevel', 1, formatAsInt);
  cookSpec.appendColumn('Experience', 'right', 'cookingXP', 0, formatAsInt);
  cookSpec.appendColumn('Healing', 'right', 'cookedItemID', 0, (id) => {
    return formatAsInt(items[id].healsFor * numberMultiplier);
  });
  cookSpec.appendColumn('Price', 'right', 'cookedItemID', 0, formatItemIDasPrice);
  cookSpec.appendColumn('Ingredients', 'right', 'id', 0, (id) => {
    return `1 ${formatItemIDAsImageLink(id, 25, 'middle')} ${formatItemIDAsLink(id)}`;
  });
  return formatObjectArrayAsTable(cookableItems, cookSpec.tableSpec);
}

/**
 * @description Creates a table of farming areas
 * @param {number} areaID ID of area array, 0 is allotments, 1 is herbs, 2 is trees
 * @return {string}
 */
function createFarmingPlotsTable(areaID) {
  const plotSpec = new TableSpecMaker();
  plotSpec.appendColumn('Farming Level', 'right', 'level', 0, formatAsInt);
  plotSpec.appendColumn('Plot Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(newFarmingAreas[areaID].patches, plotSpec.tableSpec);
}
/**
 * @description Creates a table of farmable crops for the farming page
 * @return {string}
 */
function createFarmingAllotmentTable() {
  const farmableItems = getObjectArraySubset(items, selectAllotmentSeed);
  const farmSpec = new TableSpecMaker();
  farmSpec.appendColumn('Seeds', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Farming Level', 'right', 'farmingLevel', 1, formatAsInt);
  farmSpec.appendColumn('Experience', 'right', 'farmingXP', 0, formatAsInt);
  farmSpec.appendColumn('Time to Grow (S)', 'right', 'timeToGrow', 0, formatAsInt);
  farmSpec.appendColumn('Seed Value', 'right', 'sellsFor', 0, formatAsInt);
  farmSpec.appendColumn('Crop', 'left', 'grownItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Crop Name', 'left', 'grownItemID', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Crop Healing', 'right', 'grownItemID', 0, (x) => formatAsInt(items[x].healsFor * numberMultiplier));
  farmSpec.appendColumn('Crop Value', 'right', 'grownItemID', 0, formatItemIDasPrice);
  farmSpec.appendColumn('Seed Sources', 'right', 'id', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  return formatObjectArrayAsTable(farmableItems, farmSpec.tableSpec);
}
/**
 * @description Creates a table of farmable trees for the farming page
 * @return {string}
 */
function createFarmingTreeTable() {
  const farmableItems = getObjectArraySubset(items, selectTreeseed);
  const farmSpec = new TableSpecMaker();
  farmSpec.appendColumn('Seeds', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Farming Level', 'right', 'farmingLevel', 1, formatAsInt);
  farmSpec.appendColumn('Experience', 'right', 'farmingXP', 0, formatAsInt);
  farmSpec.appendColumn('Time to Grow (S)', 'right', 'timeToGrow', 0, formatAsInt);
  farmSpec.appendColumn('Seed Value', 'right', 'sellsFor', 0, formatAsInt);
  farmSpec.appendColumn('Logs', 'left', 'grownItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Log Name', 'left', 'grownItemID', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Log Value', 'right', 'grownItemID', 0, formatItemIDasPrice);
  farmSpec.appendColumn('Seed Sources', 'right', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  return formatObjectArrayAsTable(farmableItems, farmSpec.tableSpec);
}

/**
 * @description Creates a table of farmable trees for the farming page
 * @return {string}
 */
function createFarmingHerbTable() {
  const farmableItems = getObjectArraySubset(items, selectHerbSeed);
  const farmSpec = new TableSpecMaker();
  farmSpec.appendColumn('Seeds', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Farming Level', 'right', 'farmingLevel', 1, formatAsInt);
  farmSpec.appendColumn('Experience', 'right', 'farmingXP', 0, formatAsInt);
  farmSpec.appendColumn('Time to Grow (S)', 'right', 'timeToGrow', 0, formatAsInt);
  farmSpec.appendColumn('Seed Value', 'right', 'sellsFor', 0, formatAsInt);
  farmSpec.appendColumn('Herb', 'left', 'grownItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  farmSpec.appendColumn('Herb Name', 'left', 'grownItemID', 0, formatItemIDAsLink);
  farmSpec.appendColumn('Herb Value', 'right', 'grownItemID', 0, formatItemIDasPrice);
  farmSpec.appendColumn('Seed Sources', 'right', 'id', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  return formatObjectArrayAsTable(farmableItems, farmSpec.tableSpec);
}

/**
 * @description Creates a table of burnable logs for the Firmaking Page
 * @return {string}
 */
function createFiremakingTable() {
  const logs = getObjectArraySubset(logsData, () => {
    return true;
  });
  const logSpec = new TableSpecMaker();
  logSpec.appendColumn('Logs', 'left', 'parentIndex', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  logSpec.appendColumn('Name', 'left', 'parentIndex', 0, formatItemIDAsLink);
  logSpec.appendColumn('Firemaking Level', 'right', 'level', 1, formatAsInt);
  logSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
  logSpec.appendColumn('Burn Time (S)', 'right', 'interval', 0, formatMSasS);
  logSpec.appendColumn('XP/s', 'right', ['xp', 'interval'], [0, 1], formatAsRate);
  logSpec.appendColumn('Bonfire bonus', 'right', 'bonfireBonus', 0, (a) => formatNumberPerc(a, 0));
  logSpec.appendColumn('Bonfire Time (s)', 'right', 'bonfireInterval', 0, formatMSasS);
  return formatObjectArrayAsTable(logs, logSpec.tableSpec);
}

/**
 * @description Creates a table of ores for the Mining page
 * @return {string}
 */
function createMiningTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Ore', 'left', 'ore', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'ore', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Mining Level', 'right', 'level', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'ore', 0, (id) => {
    return formatAsInt(items[id].miningXP);
  });
  tabSpec.appendColumn('Respawn Time (s)', 'right', 'respawnInterval', 0, formatMSasS);
  tabSpec.appendColumn('Ore Price', 'right', 'ore', 0, formatItemIDasPrice);
  // tabSpec.appendColumn('XP/s', 'right', 'ore', 0, id => { return formatNumberDec(items[id].miningXP / baseMiningInterval * 1000, 2) });
  // tabSpec.appendColumn('GP/s', 'right', 'ore', 0, id => { return formatNumberDec(items[id].sellsFor / baseMiningInterval * 1000, 2) });

  const miningData2 = getObjectArraySubset(miningData, () => {
    return true;
  });
  miningData2.sort((a, b) => {
    return a.level - b.level;
  });
  return formatObjectArrayAsTable(miningData2, tabSpec.tableSpec);
}

/**
 * @description Creates a table of gems for the Mining page
 * @return {string}
 */
function createGemTable() {
  // Gem information is hardcoded due to how the game handles gems
  const gems = [
    {
      id: CONSTANTS.item.Topaz,
      chance: 50,
    },
    {
      id: CONSTANTS.item.Sapphire,
      chance: 17.5,
    },
    {
      id: CONSTANTS.item.Ruby,
      chance: 17.5,
    },
    {
      id: CONSTANTS.item.Emerald,
      chance: 10,
    },
    {
      id: CONSTANTS.item.Diamond,
      chance: 5,
    },
  ];

  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Gem', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Gem Chance', 'right', 'chance', 0, (a) => formatNumberPerc(a, 1));
  tabSpec.appendColumn('Gem Price', 'right', 'id', 0, formatItemIDasPrice);
  return formatObjectArrayAsTable(gems, tabSpec.tableSpec);
}

/** @description Creates a table of items that can be fished
 * @return {string}
 */
function createFishingTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Fish', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Fishing Level', 'right', 'fishingLevel', 1, formatAsInt);
  tabSpec.appendColumn('Catch Time', 'right', 'itemID', '0s', (id) => {
    return `${(items[id].minFishingInterval / 1000).toFixed(1)}-${(items[id].maxFishingInterval / 1000).toFixed(1)}s`;
  }, (id) =>{
    return (items[id].minFishingInterval + items[id].maxFishingInterval) / 2;
  });
  tabSpec.appendColumn('Experience', 'right', 'itemID', 0, (id) => {
    return formatAsInt(items[id].fishingXP);
  });
  tabSpec.appendColumn('Fish Price', 'right', 'itemID', 0, formatItemIDasPrice);
  tabSpec.appendColumn('Cookable', 'right', 'itemID', 0, (id) => {
    return (items[id].cookedItemID !== undefined) ? 'Yes' : 'No';
  });
  return formatObjectArrayAsTable(fishingItems, tabSpec.tableSpec);
}

/**
 * Creates a table of fishing areas
 * @return {string}
 */
function createFishingAreasTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Name', 'left', 'name', '', returnSelf);
  tabSpec.appendColumn('Fish', 'right', 'fish', [], (fish) => {
    const fishLinks = [];
    for (let i = 0; i < fish.length; i++) {
      const {itemID} = fishingItems[fish[i]];
      fishLinks.push(`${formatItemIDAsImageLink(itemID, 25, 'middle')} ${formatItemIDAsLink(itemID)}`);
    }
    return formatArrayAsNewlines(fishLinks);
  });
  tabSpec.appendColumn('Fish Chance', 'right', 'fishChance', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Junk Chance', 'right', 'junkChance', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Special Chance', 'right', 'specialChance', 0, (x) => formatNumberPerc(x, 0));
  return formatObjectArrayAsTable(fishingAreas, tabSpec.tableSpec);
}

/**
 * @description Creates a table of equipment that can be upgraded
 * @param {number} equipmentSlot
 * @return {string}
 */
function createUpgradeableGearTable(equipmentSlot) {
  const itemSubset = getObjectArraySubset(items, (item) => selectGearUpgradeable(item, equipmentSlot));
  itemSubset.sort(sortByDefenceLevel);
  itemSubset.sort(sortByAttackLevel);
  itemSubset.sort(sortByRangedLevel);
  itemSubset.sort(sortByMagicLevel);
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', '', (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', '', formatItemIDAsLink);
  tabSpec.appendColumn('Ingredients', 'right', 'trimmedItemID', 0, formatItemTrimCost);
  tabSpec.appendColumn('Upgraded Item', 'left', 'trimmedItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'trimmedItemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Stat Change', 'left', 'parentIndex', 0, formatUpgradeChange);
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Creates a table of non equipment that can be upgraded
 * @return {string}
 */
function createNonGearUpgradeTable() {
  const itemSubset = getObjectArraySubset(items, selectNonGearUpgradeable);
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', '', (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', '', formatItemIDAsLink);
  tabSpec.appendColumn('Ingredients', 'right', 'trimmedItemID', 0, formatItemTrimCost);
  tabSpec.appendColumn('Upgraded Item', 'left', 'trimmedItemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'trimmedItemID', 0, formatItemIDAsLink);
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Creates a table of monsters that are found in Combat Areas and Dungeons
 * @return {string}
 */
function createMonsterTable() {
  const monsterSubset = getObjectArraySubset(MONSTERS, selectMonsters);
  const tabSpec = new TableSpecMaker();
  tabSpec.appendSpan('|', 5); // Monster, Name, ID, Hitpoints
  tabSpec.appendColumn('Monster', 'left', 'id', '', (id) => formatMonsterIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', '', formatMonsterIDAsLink);
  tabSpec.appendColumn('Id', 'right', 'parentIndex', 0, formatAsInt);
  tabSpec.appendColumn('Combat Level', 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterCombatLevel(x)));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Hitpoints', 25, 'middle')} Hitpoints`, 'right', 'hitpoints', 0, (x) => formatAsInt(x * numberMultiplier));
  /*
       tabSpec.appendSpan('|Skill Levels', 5)
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Attack', 25, 'middle')}`, 'right', 'attackLevel', 1, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Strength', 25, 'middle')}`, 'right', 'strengthLevel', 1, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right', 'defenceLevel', 1, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right', 'rangedLevel', 1, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right', 'magicLevel', 1, formatAsInt);
       */
  tabSpec.appendSpan('|Offensive Stats', 4);
  tabSpec.appendColumn('Attack Type', 'right;white-space: nowrap', 'attackType', CONSTANTS.attackType.Melee, formatAttackType);
  tabSpec.appendColumn('Attack Speed (s)', 'right', 'attackSpeed', 3000, (t) => formatNumberDec(t / 1000, 1));
  tabSpec.appendColumn('Max Hit', 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterTrueMaxHit(x)));
  tabSpec.appendColumn('Accuracy', 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterAccuracy(x)));

  tabSpec.appendSpan('|Evasion Rating', 3);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterMeleeEvasion(x)));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterRangedEvasion(x)));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right', 'parentIndex', 0, (x) => formatAsInt(getMonsterMagicEvasion(x)));
  /*
       tabSpec.appendColumn(`${formatCombatImage(25, 'middle')} Attack Bonus`, 'right', 'attackBonus', 0, formatAsInt);
       tabSpec.appendColumn(`${formatCombatImage(25, 'middle')} Strength Bonus`, 'right', 'strengthBonus', 0, formatAsInt);
       tabSpec.appendSpan('|Defence Bonus', 3)
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right', 'defenceBonus', 0, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right', 'defenceBonusRanged', 0, formatAsInt);
       tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right', 'defenceBonusMagic', 0, formatAsInt);
       */
  tabSpec.appendSpan('|', 4); // Drop chance, coins, bones, locations
  tabSpec.appendColumn('Drop Chance', 'right', 'parentIndex', 0, formatMonsterIDAsDropChance);
  tabSpec.appendColumn('Coins', 'right', 'dropCoins', [0, 0], (x) => {
    return `${x[0]}-${x[1]}`;
  }, (x)=>{
    return (x[0] + x[1]) / 2;
  });
  tabSpec.appendColumn('Bones', 'right', ['bones', 'canDropBones'], [0, false], (boneData) => {
    if (boneData[1] && boneData[0] !== null) {
      return formatItemIDAsImageLink(boneData[0], 25, 'middle');
    }
    return 'None';
  });
  tabSpec.appendColumn('Locations', 'right;white-space: nowrap', 'parentIndex', 0, (id) => formatArrayAsNewlines(getMonsterLocationArray(id)));

  return formatObjectArrayAsTableWSH(monsterSubset, tabSpec.tableSpec, tabSpec.spanSpec);
}

/**
 * @description Creates a table of smithing items with names that contain type
 * @param {string} type String to search items for
 * @return {string}
 */
function createSmithingTable(type) {
  const itemSubset = getObjectArraySubset(smithingItems, (item) => selectSmithingItem(item, type));
  itemSubset.sort((a, b) => {
    return a.smithingLevel - b.smithingLevel;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Smithing Level', 'right', 'smithingLevel', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'itemID', 0, (id) => formatAsInt(items[id].smithingXP));
  if (type !== 'Bar') {
    tabSpec.appendColumn('Smithing Quantity', 'right', 'itemID', 0, formatItemIDasSmithingQty);
  }
  tabSpec.appendColumn('Item Price', 'right', 'itemID', 0, formatItemIDasPrice);
  tabSpec.appendColumn('Ingredients', 'right', 'itemID', 0, (id) => formatCraftReq(items[id].smithReq));
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Creates the tables on the smithing table in a single string
 * @return {string}
 */
function createSmithingPage() {
  let outStr = '';
  outStr += createSubSection('Bars');
  outStr += createSmithingTable('Bar');
  outStr += createSubSection('Bronze Gear');
  outStr += createSmithingTable('Bronze');
  outStr += createSubSection('Iron Gear');
  outStr += createSmithingTable('Iron');
  outStr += createSubSection('Steel Gear');
  outStr += createSmithingTable('Steel');
  outStr += createSubSection('Mithril Gear');
  outStr += createSmithingTable('Mithril');
  outStr += createSubSection('Adamant Gear');
  outStr += createSmithingTable('Adamant');
  outStr += createSubSection('Rune Gear');
  outStr += createSmithingTable('Rune');
  outStr += createSubSection('Dragon Gear');
  outStr += createSmithingTable('Dragon');
  return outStr;
}

/**
 * @description Creates a table of equipment of the given type for the provided slot
 * @param {number} equipmentSlot
 * @param {string} type Type of equipment: 'Melee','Ranged,'Magic','All','Skill'
 * @param {number} ammoType Type of ammo of equipment to match
 * @return {string}
 */
function createArmourTable(equipmentSlot, type, ammoType = -1) {
  const isSkillItem = (equipmentSlot === CONSTANTS.equipmentSlot.Gloves && type === 'None');
  const itemSubset = getObjectArraySubset(items, (item) => selectArmourItem(item, equipmentSlot, type, ammoType));
  if (type === 'Melee') {
    itemSubset.sort(sortByDefenceLevel);
  } else if (type === 'Ranged' || (type === 'All' && equipmentSlot === CONSTANTS.equipmentSlot.Quiver)) {
    itemSubset.sort(sortByRangedLevel);
  } else if (type === 'Magic') {
    itemSubset.sort(sortByMagicLevel);
  }
  const tabSpec = new TableSpecMaker();
  if (ammoType === 2 || ammoType === 3) {
    tabSpec.appendSpan('|', 3); // Name, Image and Speed
  } else {
    tabSpec.appendSpan('|', 2); // Name and image
  }
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Item', 'left;padding: 0 0 0 0', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Name', 'left;padding: 0 0.5em 0 0.5em', 'id', 0, formatItemIDAsLink);
  if (!isSkillItem) {
    if (ammoType === 2 || ammoType === 3) {
      tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Attack Speed', 'right;padding: 0 0.5em 0 0', 'attackSpeed', 0, formatAsInt);
    }
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Attack Bonus', 5);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Attack', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[0]));
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Strength', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[1]));
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[2]));
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedAttackBonus', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicAttackBonus', 0, formatAsInt);
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Strength Bonus', 2);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Strength', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'strengthBonus', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedStrengthBonus', 0, formatAsInt);
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|% Damage Bonus', 1); // Magic %
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicDamageBonus', 0, (x) => formatNumberPerc(x, 0));
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Defence Bonus', 3);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'defenceBonus', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedDefenceBonus', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicDefenceBonus', 0, formatAsInt);
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Damage Reduction', 1); // Dmg Red
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'damageReduction', 0, formatAsInt);
  }
  // Items that may have extra effects: Capes, Rings, Amulets, Gloves (Skill)
  if (equipmentSlot === CONSTANTS.equipmentSlot.Cape || equipmentSlot === CONSTANTS.equipmentSlot.Ring || equipmentSlot === CONSTANTS.equipmentSlot.Amulet || (equipmentSlot === CONSTANTS.equipmentSlot.Gloves && type === 'None')) {
    tabSpec.appendSpan('|', 1); // Description
    tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Description', 'right;padding: 0 0.5em 0 0.5em', 'description', 'None', (a) => {
      return a;
    });
  }
  if (!isSkillItem) {
    tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Levels Required', 3);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'defenceLevelRequired', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedLevelRequired', 0, formatAsInt);
    tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicLevelRequired', 0, formatAsInt);
  }
  tabSpec.appendSpan('|', 1); // Sources
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Sources', 'right;white-space: nowrap;padding: 0 0.5em 0 0.5em', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));

  if (isSkillItem) {
    return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
  }
  return formatObjectArrayAsTableWSH(itemSubset, tabSpec.tableSpec, tabSpec.spanSpec);
}

/**
 * Creates a table of weapons
 * @param {string} type Type of equipment: 'Melee','Ranged','Magic'
 * @param {number} ammoTypeRequired Type of ammo the weapon needs
 * @return {string}
 */
function createWeaponTable(type, ammoTypeRequired = -1) {
  const itemSubset = getObjectArraySubset(items, (item) => selectWeaponItem(item, type, ammoTypeRequired));
  if (type === 'Melee') {
    itemSubset.sort(sortByAttackLevel);
  } else if (type === 'Ranged') {
    itemSubset.sort(sortByRangedLevel);
  } else if (type === 'Magic') {
    itemSubset.sort(sortByMagicLevel);
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendSpan('|', 3); // Name,image,attack speed
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Item', 'left;padding: 0 0 0 0', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Name', 'left;padding: 0 0.5em 0 0.5em', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Attack Speed', 'right;padding: 0 0.5em 0 0', 'attackSpeed', 0, formatAsInt);
  tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Attack Bonus', 5);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Attack', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[0]));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Strength', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[1]));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackBonus', 0, (x) => formatAsInt(x[2]));
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedAttackBonus', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicAttackBonus', 0, formatAsInt);
  tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Strength Bonus', 2);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Strength', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'strengthBonus', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedStrengthBonus', 0, formatAsInt);
  tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|% Damage Bonus', 1); // Magic %
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicDamageBonus', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Defence Bonus', 3);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'defenceBonus', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedDefenceBonus', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicDefenceBonus', 0, formatAsInt);
  tabSpec.appendSpan('style="padding:0 1em 0 0.5em;"|Damage Reduction', 1); // Dmg Red
  tabSpec.appendSpan('|', 1); // Two-handed
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Defence', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0.5em', 'damageReduction', 0, formatAsInt);
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Two Handed?', 'right', 'isTwoHanded', false, formatBoolAsYesNo);
  tabSpec.appendSpan('style="padding:0 0.5em 0 0.5em;"|Levels Required', 3);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Attack', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'attackLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Ranged', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'rangedLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn(`style="padding:0 1em 0 0;"|${formatSkillImageLink('Magic', 25, 'middle')}`, 'right;padding: 0 0.5em 0 0', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendSpan('|', 1);
  tabSpec.appendColumn('style="padding:0 1em 0 0.5em;"|Sources', 'right;white-space: nowrap;padding: 0 0.5em 0 0.5em', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  return formatObjectArrayAsTableWSH(itemSubset, tabSpec.tableSpec, tabSpec.spanSpec);
}
/*
function checkItemSubsetForStats(itemSubset,statKey) {
       var foundStat = false;
       var statTotal = 0;
       for (let i=0;i<itemSubset.length;i++) {
              if (itemSubset[i][statKey] !== undefined) {
                     foundStat = true;
                     statTotal += itemSubset[i][statKey];
              }
       }
       return !(statTotal === 0 | !foundStat);
}
*/

/**
 * @description Generates subsections for a type of gear that has all combat types
 * @param {number} equipmentSlot The slot of gear
 * @return {string}
 */
function createSlotSection(equipmentSlot) {
  let outStr = '';
  outStr += createSubSection('Melee');
  outStr += createArmourTable(equipmentSlot, 'Melee');
  outStr += createSubSection('Ranged');
  outStr += createArmourTable(equipmentSlot, 'Ranged');
  outStr += createSubSection('Magic');
  outStr += createArmourTable(equipmentSlot, 'Magic');
  return outStr;
}

/**
 * @description Creates the tables for the Equipment page
 * @return {string}
 */
function createEquipmentPage() {
  let outStr = '';
  outStr += createSection('Helmets');
  outStr += createSlotSection(CONSTANTS.equipmentSlot.Helmet);
  outStr += createSection('Platebodies');
  outStr += createSlotSection(CONSTANTS.equipmentSlot.Platebody);
  outStr += createSection('Platelegs');
  outStr += createSlotSection(CONSTANTS.equipmentSlot.Platelegs);
  outStr += createSection('Boots');
  outStr += createSlotSection(CONSTANTS.equipmentSlot.Boots);

  outStr += createSection('Gloves');
  outStr += createSubSection('Melee');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves, 'Melee');
  outStr += createSubSection('Ranged');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves, 'Ranged');
  outStr += createSubSection('Magic');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves, 'Magic');
  outStr += createSubSection('Skills');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Gloves, 'None');
  outStr += createSection('Capes');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Cape, 'All');
  outStr += createSection('Ammunition');
  outStr += createSubSection('Arrows');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Quiver, 'All', 0);
  outStr += createSubSection('Bolts');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Quiver, 'All', 1);
  outStr += createSection('Rings');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Ring, 'All');
  outStr += createSection('Amulets');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Amulet, 'All');

  outStr += createSection('Offhand');
  outStr += createSubSection('Shields');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Shield, 'Melee');
  outStr += createSubSection('Ranged Shields');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Shield, 'Ranged');
  outStr += createSubSection('Books');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Shield, 'Magic');
  outStr += createSection('Weapons');
  outStr += createSubSection('Melee');
  outStr += createWeaponTable('Melee');
  outStr += createSubSection('Ranged');
  outStr += createSubSubSection('Bows');
  outStr += createWeaponTable('Ranged', 0);
  outStr += createSubSubSection('Crossbows');
  outStr += createWeaponTable('Ranged', 1);
  outStr += createSubSubSection('Javelins');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Quiver, 'All', 2);
  outStr += createSubSubSection('Throwing Knives');
  outStr += createArmourTable(CONSTANTS.equipmentSlot.Quiver, 'All', 3);
  outStr += createSubSection('Magic');
  outStr += createWeaponTable('Magic');
  return outStr;
}

/**
 * @description Creates a table of spells
 * @return {string}
 */
function createSpellTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Spell', 'left', 'name', '', (name) => formatSpellImage(name, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn('Max Hit', 'right', 'maxHit', 0, (x) => formatAsInt(x * numberMultiplier));
  tabSpec.appendColumn('Runes', 'right', ['runesRequired', 'runesRequiredAlt'], [undefined, undefined], (x)=>formatSpellAsRuneRequirements({runesRequired: x[0], runesRequiredAlt: x[1]}, formatArrayAsNewlines));
  return formatObjectArrayAsTable(SPELLS, tabSpec.tableSpec);
}
/**
 * @description Creates a table of curses
 * @return {string}
 */
function createCurseTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Curse', 'left', 'name', '', (name) => formatCurseImage(name, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn('Effect Chance', 'right', 'chance', 0, (chance)=>formatNumberPerc(chance, 0));
  tabSpec.appendColumn('Effect', 'right;width: 200px', 'description', '', returnSelf);
  tabSpec.appendColumn('Runes', 'right', ['runesRequired', 'runesRequiredAlt'], [undefined, undefined], (x)=>formatSpellAsRuneRequirements({runesRequired: x[0], runesRequiredAlt: x[1]}, formatArrayAsNewlines));
  return formatObjectArrayAsTable(CURSES, tabSpec.tableSpec);
}

/**
 * @description Creates a table of auroras
 * @return {string}
 */
function createAuroraTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Aurora', 'left', 'name', '', (name) => formatAuroraImage(name, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn('Item Required', 'right', 'requiredItem', -1, (itemID)=>{
    if (itemID === -1) {
      return 'None';
    }
    return `${formatItemIDAsImageLink(itemID, 25, 'middle')} ${formatItemIDAsLink(itemID)}`;
  });
  tabSpec.appendColumn('Effect', 'right;width: 200px', 'description', '', returnSelf);
  tabSpec.appendColumn('Runes', 'right', ['runesRequired', 'runesRequiredAlt'], [undefined, undefined], (x)=>formatSpellAsRuneRequirements({runesRequired: x[0], runesRequiredAlt: x[1]}, formatArrayAsNewlines));
  return formatObjectArrayAsTable(AURORAS, tabSpec.tableSpec);
}
/**
 * @description Creates a table of ancient magicks
 * @return {string}
 */
function createAncientMagickTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Magick', 'left', 'name', '', (name) => formatSpellImage(name, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn('Unlocks After', 'right', 'requiredDungeonCompletion', [0, 100], (x)=>{
    return `${x[1]} ${formatDungeonIDAsImageLink(x[0], 25, 'middle')} ${formatDungeonIDAsLink(x[0])} clears`;
  });
  tabSpec.appendColumn('Max Hit', 'right', 'maxHit', 0, (x) => formatAsInt(x * numberMultiplier));
  tabSpec.appendColumn('Description', 'right;width: 200px', 'description', 0, returnSelf);
  tabSpec.appendColumn('Runes', 'right', ['runesRequired', 'runesRequiredAlt'], [undefined, undefined], (x)=>formatSpellAsRuneRequirements({runesRequired: x[0], runesRequiredAlt: x[1]}, formatArrayAsNewlines));
  return formatObjectArrayAsTable(ANCIENT, tabSpec.tableSpec);
}
/**
 * @description Creates a table of alt magic
 * @return {string}
 */
function createAltMagicTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Spell', 'left', 'name', '', (name) => formatSpellImage(name, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Magic Level', 'right', 'magicLevelRequired', 0, formatAsInt);
  tabSpec.appendColumn('Description', 'right;width: 200px', 'description', 0, returnSelf);
  tabSpec.appendColumn('Experience', 'right', 'magicXP', 0, formatAsInt);
  tabSpec.appendColumn('Runes', 'right', ['runesRequired', 'runesRequiredAlt'], [undefined, undefined], (x)=>formatSpellAsRuneRequirements({runesRequired: x[0], runesRequiredAlt: x[1]}, formatArrayAsNewlines));
  return formatObjectArrayAsTable(ALTMAGIC, tabSpec.tableSpec);
}
/**
 * @description Creates a table of runes for the runecrafting page
 * @param {number} category
 * @return {string}
 */
function createRuneCraftingTable(category) {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Runecrafting Level', 'right', 'runecraftingLevel', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'runecraftingXP', 0, formatAsInt);
  tabSpec.appendColumn('Item Price', 'right', 'sellsFor', 0, formatAsInt);
  tabSpec.appendColumn('Ingredients', 'right', 'runecraftReq', 0, formatCraftReq);
  tabSpec.appendColumn('XP/s', 'right', 'id', 0, (id) => {
    return formatNumberDec(items[id].runecraftingXP / runecraftInterval * 1000, 2);
  });
  tabSpec.appendColumn('GP/s', 'right', 'id', 0, (id) => {
    return formatNumberDec(items[id].sellsFor / runecraftInterval * 1000, 2);
  });
  const subArray = runecraftingItems.filter((item)=>{
    return item.runecraftingCategory === category;
  }).map((item)=>{
    return items[item.itemID];
  });
  return formatObjectArrayAsTable(subArray, tabSpec.tableSpec);
}

/**
 * @description Creates a table of the drops from monsters in combat areas
 * @param {number} monsterID
 * @return {string}
 */
function createMonsterLootTable(monsterID) {
  if (MONSTERS[monsterID].lootTable) {
    let totWeight = 0;
    for (let i = 0; i < MONSTERS[monsterID].lootTable.length; i++) {
      totWeight += MONSTERS[monsterID].lootTable[i][1];
    }
    const tabSpec = new TableSpecMaker();
    tabSpec.appendColumn('Item', 'left', 0, 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
    tabSpec.appendColumn('Name', 'left', 0, 0, formatItemIDAsLink);
    tabSpec.appendColumn('Quantity', 'right', 2, 0, (maxQty) => formatAsDropQty([1, maxQty]), returnSelf);
    tabSpec.appendColumn('Weight', 'right', 1, 0, formatAsInt);
    tabSpec.appendColumn('Chance', 'right', 1, 0, (x) => formatNumberPerc(100 * x / totWeight, 2));
    return formatObjectArrayAsTable(MONSTERS[monsterID].lootTable, tabSpec.tableSpec);
  }
  return '';
}

/**
 * @description Creates a table of the drops that can come from an openable items
 * @param {number} chestID
 * @return {string}
 */
function createChestDropTable(chestID) {
  const chest = items[chestID];
  if (chest.dropTable) {
    const dropObject = [];
    let totWeight = 0;
    for (let i = 0; i < chest.dropTable.length; i++) {
      totWeight += chest.dropTable[i][1];
      dropObject.push({
        itemID: chest.dropTable[i][0],
        itemWeight: chest.dropTable[i][1],
        itemQty: chest.dropTable[i][2],
      });
    }

    const tabSpec = new TableSpecMaker();
    tabSpec.appendColumn('Item', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
    tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
    tabSpec.appendColumn('Quantity', 'right', 'itemQty', 0, (maxQty) => formatAsDropQty([1, maxQty]), returnSelf);
    tabSpec.appendColumn('Weight', 'right', 'itemWeight', 0, formatAsInt);
    tabSpec.appendColumn('Chance', 'right', 'itemWeight', 0, (x) => formatNumberPerc(100 * x / totWeight, 2));
    tabSpec.appendColumn('Price', 'right', 'itemID', 0, (x) => formatAsInt(items[x].sellsFor));
    return formatObjectArrayAsTable(dropObject, tabSpec.tableSpec);
  }
  return '';
}


/**
 * @description Creates a table of the drops that can come from fishing Treasure
 * @return {string}
 */
function createFishTreasureTable() {
  const dropObject = [];
  let totWeight = 0;
  for (let i = 0; i < specialItems.length; i++) {
    totWeight += specialItems[i][1];
    dropObject.push({
      itemID: specialItems[i][0],
      itemWeight: specialItems[i][1],
      sellsFor: items[specialItems[i][0]].sellsFor,
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Weight', 'right', 'itemWeight', 0, formatAsInt);
  tabSpec.appendColumn('Chance', 'right', 'itemWeight', 0, (x) => formatNumberPerc(100 * x / totWeight, 2));
  tabSpec.appendColumn('Price', 'right', 'sellsFor', 0, formatAsInt);
  return formatObjectArrayAsTable(dropObject, tabSpec.tableSpec);
}

/**
 * @description Creates a table of the junk items that can come from fishing
 * @return {string}
 */
function createFishingJunkTable() {
  const junkData = [];
  for (let i = 0; i < junkItems.length; i++) {
    junkData.push(items[junkItems[i]]);
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Price', 'right', 'sellsFor', 0, formatAsInt);
  return formatObjectArrayAsTable(junkData, tabSpec.tableSpec);
}
/**
 * @description Generates the table of Axes for the Shop Page
 * @return {string}
 */
function createShopAxesTable() {
  const axeData = [];
  for (let i = 1; i < tiers.length; i++) {
    axeData.push({
      level: axeLevels[i],
      cost: axeCost[i],
      name: `${setToUppercase(tiers[i])} Axe`,
      bonusSpeed: axeBonusSpeed[i],
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Axe', 'left', 'name', 0, (x) => formatUpgradeImage(x, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', 0, formatPageLink);
  tabSpec.appendColumn('Woodcutting Level', 'right', 'level', 0, formatAsInt);
  tabSpec.appendColumn('Bonus Speed', 'right', 'bonusSpeed', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(axeData, tabSpec.tableSpec);
}
/**
 * @description Generates the table of fishing rods for the Shop Page
 * @return {string}
 */
function createShopFishRodTable() {
  const axeData = [];
  for (let i = 1; i < tiers.length; i++) {
    axeData.push({
      level: rodLevels[i],
      cost: rodCost[i],
      name: `${setToUppercase(tiers[i])} Fishing Rod`,
      bonusSpeed: rodBonusSpeed[i],
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Fishing Rod', 'left', 'name', 0, (x) => formatUpgradeImage(x, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', 0, formatPageLink);
  tabSpec.appendColumn('Fishing Level', 'right', 'level', 0, formatAsInt);
  tabSpec.appendColumn('Bonus Speed', 'right', 'bonusSpeed', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(axeData, tabSpec.tableSpec);
}
/**
 * @description Generates the table of pickaxes for the Shop Page
 * @return {string}
 */
function createShopPickaxeTable() {
  const axeData = [];
  for (let i = 1; i < tiers.length; i++) {
    axeData.push({
      level: pickaxeLevels[i],
      cost: pickaxeCost[i],
      name: `${setToUppercase(tiers[i])} Pickaxe`,
      bonusOre: pickaxeBonus[i],
      bonusSpeed: pickaxeBonusSpeed[i],
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Pickaxe', 'left', 'name', 0, (x) => formatUpgradeImage(x, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', 0, formatPageLink);
  tabSpec.appendColumn('Mining Level', 'right', 'level', 0, formatAsInt);
  tabSpec.appendColumn('Chance for 2x Ores', 'right', 'bonusOre', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Bonus Speed', 'right', 'bonusSpeed', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(axeData, tabSpec.tableSpec);
}
/**
 * @description Generates the table of cooking fires for the Shop Page
 * @return {string}
 */
function createShopCookingFireTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Cooking Fire', 'left', 'tier', 0, (x) => formatUpgradeImageLink(`${setToUppercase(x)} Cooking Fire`, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'tier', 0, (x) => formatPageLink(`${setToUppercase(x)} Cooking Fire`));
  tabSpec.appendColumn('Firemaking Level', 'right', 'fmLevel', 0, formatAsInt);
  tabSpec.appendColumn('Bonus XP', 'right', 'bonusXP', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Cost', 'right', ['costGP', 'costLogs'], 0, (x) => {
    return `${formatItemIDAsImageLink(x[1][0], 25, 'middle')} ${x[1][1]}<br/>${formatAsShopCost(x[0])}`;
  }, (x)=>{
    return x[0];
  });
  return formatObjectArrayAsTable(cookingFireData, tabSpec.tableSpec);
}
/**
 * Creates the table of god upgrades for the shop
 * @return {string}
 */
function createShopGodUpgradeTable() {
  const godData = [];
  for (let i = 0; i < godUpgradeData.length; i++) {
    godData.push({
      name: godUpgradeData[i].name,
      effect: godUpgradeDescriptions[i],
      dungeon: godUpgradeData[i].dungeonID,
      cost: godUpgradeData[i].cost,
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('God Upgrade', 'left', 'name', '', (x) => formatUpgradeImageLink(x, 50, 'center'));
  tabSpec.appendColumn('Name', 'left', 'name', '', (x) => formatPageLink(x));
  tabSpec.appendColumn('Effect', 'right', 'effect', 'Unknown Effect', returnSelf);
  tabSpec.appendColumn('Dungeon', 'right', 'dungeon', 0, (x) => {
    return `${formatDungeonIDAsImageLink(x, 25, 'middle')} ${formatDungeonIDAsLink(x)}`;
  });
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(godData, tabSpec.tableSpec);
}

/**
 * Creates the table of auto eat upgrades for the shop
 * @return {string}
 */
function createShopAutoEatTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Auto Eat Tier', 'left', 'parentIndex', 0, (id) => formatEatIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'parentIndex', 0, formatEatIDAsLink);
  tabSpec.appendColumn('Minimum Threshold', 'right', 'eatAt', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Efficiency', 'right', 'efficiency', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Max Healing', 'right', 'maxHP', 0, (x) => formatNumberPerc(x, 0));
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  for (let i = 0; i < autoEatData.length; i++) {
    autoEatData[i].parentIndex = i;
  }
  return formatObjectArrayAsTable(autoEatData, tabSpec.tableSpec);
}
/**
 * @description Generates the table of skill gloves for the Shop Page
 * @return {string}
 */
function createShopGloveTable() {
  const gloveData = [];
  for (let i = 0; i < gloveID.length; i++) {
    gloveData.push({
      cost: glovesCost[i],
      itemID: gloveID[i],
      charges: glovesActions[i],
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Gloves', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Description', 'right', ['itemID', 'charges'], [0, 0], (x) => `+${x[1]} Charges<br/>${items[x[0]].description}`);
  tabSpec.appendColumn('Cost', 'right', 'cost', 0, formatAsShopCost, returnSelf);
  tabSpec.appendColumn('Cost per Charge', 'right', ['cost', 'charges'], 0, (x) => formatAsShopCost(x[0] / x[1]), (x)=>{
    return x[0] / x[1];
  });
  return formatObjectArrayAsTable(gloveData, tabSpec.tableSpec);
}

/**
 * @description Generates the table of Materials for the Shop Page
 * @return {string}
 */
function createShopMaterialTable() {
  const itemSubset = [];
  shopMaterials.forEach((x) => {
    itemSubset.push(items[x]); itemSubset[itemSubset.length - 1].itemID = x;
  });

  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Cost', 'right', ['buysFor', 'buysForLeather', 'buysForItems'], [0, 0, 0], (x) => {
    let costString = '';
    if (x[0] !== 0) {
      costString += `${formatAsShopCost(x[0])}<br/>`;
    }
    if (x[1] !== 0) {
      costString += `${formatItemIDAsImageLink(CONSTANTS.item.Leather, 25, 'middle')} ${x[1]}<br/>`;
    }
    if (x[2] !== 0) {
      for (let i = 0; i < x[2].length; i++) {
        costString += `${formatItemIDAsImageLink(x[2][i][0], 25, 'middle')} ${x[2][i][1]}<br/>`;
      }
    }
    return costString;
  }, (x)=>{
    return x[0];
  });
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Generates the table of skillcapes for the Shop page
 * @return {string}
 */
function createShopSkillcapeTable() {
  const itemSubset = [];
  for (let i = 0; i < skillcapeItems.length; i++) {
    itemSubset.push(items[skillcapeItems[i]]);
    itemSubset[itemSubset.length - 1].itemID = skillcapeItems[i];
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Cape', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Description', 'right', 'itemID', 0, (x) => {
    return items[x].description;
  });
  tabSpec.appendColumn('Cost', 'right', 'buysFor', 0, formatAsShopCost, returnSelf);
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}


/**
 * @description Generates the table of slayer items for the Shop page
 * @return {string}
 */
function createShopSlayerTable() {
  const itemSubset = [];
  for (let i = 0; i < slayerItems.length; i++) {
    itemSubset.push(items[slayerItems[i]]);
    itemSubset[itemSubset.length - 1].itemID = slayerItems[i];
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'itemID', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'itemID', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Description', 'right', 'description', 'None', (x) => {
    return x;
  });
  tabSpec.appendColumn('Cost', 'right', 'slayerCost', 0, formatAsSlayerCost, returnSelf);
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}
/**
 * @description Generates a table for the Crafting page
 * @param {string} type String to search for inside the crafted items name
 * @return {string}
 */
function createCraftingTable(type) {
  const itemSubset = getObjectArraySubset(items, (item) => selectCraftingItem(item, type));
  itemSubset.sort((a, b) => {
    return a.craftingLevel - b.craftingLevel;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Crafting Level', 'right', 'craftingLevel', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'craftingXP', 0, formatAsInt);
  tabSpec.appendColumn('Item Price', 'right', 'sellsFor', 0, formatAsInt);
  tabSpec.appendColumn('Ingredients', 'right', 'craftReq', 0, formatCraftReq);
  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Generates all the tables and sections for the Crafting Page
 * @return {string}
 */
function createCraftingPage() {
  let outStr = '';
  outStr += createSection('Leather Armour');
  outStr += createCraftingTable('Leather');
  outStr += createSection('Dragonhide');
  outStr += createCraftingTable('D-hide');
  outStr += createSection('Rings');
  outStr += createCraftingTable('Ring');
  outStr += createSection('Necklaces');
  outStr += createCraftingTable('Necklace');
  return outStr;
}

/**
 * @description Generates the table of pickpocket targets for the Thieving Page
 * @return {string}
 */
function createThievingTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Target', 'left', 'id', 0, (id) => formatThievingIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatThievingIDAsLink);
  tabSpec.appendColumn('Thieving Level', 'right', 'level', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
  tabSpec.appendColumn('Max Hit', 'right', 'maxHit', 0, (x) => formatAsInt(x * numberMultiplier));
  tabSpec.appendColumn('Max Coins', 'right', 'maxCoins', 0, formatAsInt);
  return formatObjectArrayAsTable(thievingNPC, tabSpec.tableSpec);
}

/**
 * @description Generates the table of logs for the Woodcutting Page
 * @return {string}
 */
function createWoodCuttingTable() {
  const treeData = getObjectArraySubset(trees, () => {
    return true;
  });
  const logSpec = new TableSpecMaker();
  logSpec.appendColumn('Tree', 'left', 'parentIndex', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  logSpec.appendColumn('Name', 'left', 'parentIndex', 0, formatItemIDAsLink);
  logSpec.appendColumn('Woodcutting Level', 'right', 'level', 1, formatAsInt);
  logSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
  logSpec.appendColumn('Cut Time (s)', 'right', 'interval', 0, formatMSasS);
  logSpec.appendColumn('XP/s', 'right', ['xp', 'interval'], [0, 1], formatAsRate);
  logSpec.appendColumn('GP/s', 'right', ['parentIndex', 'interval'], [0, 1], (x) => formatAsRate([items[x[0]].sellsFor, x[1]]));
  return formatObjectArrayAsTable(treeData, logSpec.tableSpec);
}

/**
 * @description Creates at table of all items for the Table of Items page
 * @return {string}
 */
function createItemsTable() {
  const itemData = getObjectArraySubset(items, () => {
    return true;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('ID', 'right', 'parentIndex', 0, formatAsInt);
  tabSpec.appendColumn('Category', 'left', 'category', 'No Category', (x) => {
    return x;
  });
  tabSpec.appendColumn('Type', 'left', 'type', 'No Type', (x) => {
    return x;
  });
  tabSpec.appendColumn('Sells For', 'right;white-space: nowrap;', 'sellsFor', 0, formatAsShopCost, returnSelf);
  tabSpec.appendColumn('Item Sources', 'right', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  tabSpec.appendColumn('Item Uses', 'right;white-space: nowrap;', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemUsesArray(id)));
  return formatObjectArrayAsTable(itemData, tabSpec.tableSpec);
}

/**
 * @description Creates a table of fletching items
 * @param {string} type The type of fletching item
 * @return {string}
 */
function createFletchingTable(type) {
  const fletchingItems = getObjectArraySubset(items, (item) => selectFletchingItem(item, type));
  fletchingItems.sort((a, b) => {
    return a.fletchingLevel - b.fletchingLevel;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Fletching Level', 'right', 'fletchingLevel', 0, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'fletchingXP', 0, formatAsInt);
  tabSpec.appendColumn('Quantity', 'right', ['fletchQty', 'parentIndex'], 1, (x) => {
    if (x[1] === CONSTANTS.item.Arrow_Shafts) {
      return '15-135';
    }
    return formatAsInt(x[0]);
  });
  tabSpec.appendColumn('Sells For', 'right', 'sellsFor', 0, formatAsInt);
  tabSpec.appendColumn('Ingredients', 'right', ['fletchReq', 'parentIndex'], 0, (x) => {
    if (x[1] === CONSTANTS.item.Arrow_Shafts) {
      return `1 Any ${formatItemIDAsImageLink(CONSTANTS.item.Normal_Logs, 25, 'middle')}`;
    }
    return formatCraftReq(x[0]);
  });
  return formatObjectArrayAsTable(fletchingItems, tabSpec.tableSpec);
}

/**
 * Creates the table of prayers for the Prayer page
 * @return {string}
 */
function createPrayerTable() {
  const prayerSubset = getObjectArraySubset(PRAYER, selectAll);
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Prayer', 'left', 'name', '', (name) => formatPrayerImage(name, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'name', '', formatPageLink);
  tabSpec.appendColumn('Prayer Level', 'right', 'prayerLevel', 0, formatAsInt);
  tabSpec.appendColumn('Effects', 'left', 'parentIndex', 0, (id) => formatArrayAsNewlines(getPrayerEffectArray(id)));
  tabSpec.appendColumn('Point Cost', 'left', ['pointsPerEnemy', 'pointsPerPlayer', 'pointsPerRegen'], [0, 0, 0], formatPrayerCosts, (x)=>{
    let maxCost = 0;
    x.forEach((cost)=>{
      if (cost > maxCost) {
        maxCost = cost;
      }
    });
    return maxCost;
  });
  return formatObjectArrayAsTable(prayerSubset, tabSpec.tableSpec);
}

/**
 * Creates the table of bones for the Prayer page
 * @return {string}
 */
function createBonesTable() {
  const bones = getObjectArraySubset(items, (item) => selectIfHasKey(item, 'prayerPoints'));
  bones.sort((a, b) => {
    return a.fletchingLevel - b.fletchingLevel;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Bone', 'left', 'id', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'id', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Prayer Points', 'right', 'prayerPoints', 0, formatAsInt);
  tabSpec.appendColumn('Sources', 'right', 'parentIndex', 0, (id) => formatArrayAsNewlines(getItemSourcesArray(id)));
  return formatObjectArrayAsTable(bones, tabSpec.tableSpec);
}

/**
 * Creates the table of experience for the xp page
 * @return {string}
 * @deprecated
 */
function createXPTable() {
  const xpTable = [{level: 1, xp: 0, xpToNext: 0}];
  let xp = 0;
  for (let i = 1; i < 99; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7));
    xpTable.push({
      level: i + 1,
      xp: Math.floor(xp / 4),
      xpToNext: 0,
    });
  }
  for (let i = 0; i < (xpTable.length - 1); i++) {
    xpTable[i].xpToNext = xpTable[i + 1].xp - xpTable[i].xp;
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Level', 'right', 'level', 0, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
  tabSpec.appendColumn('XP to Next', 'right', 'xpToNext', 0, formatAsInt);
  return formatObjectArrayAsTable(xpTable, tabSpec.tableSpec);
}

/**
 * Creates the table of mastery xp for the mastery page
 * @return {string}
 */
function createMasteryXPTable() {
  const xpTable = [{level: 1, xp: 0, xpToNext: 0}];
  let xp = 0;
  for (let i = 1; i < 99; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7));
    xpTable.push({
      level: i + 1,
      xp: Math.floor(xp / 48) + 1,
      xpToNext: 0,
    });
  }
  for (let i = 0; i < (xpTable.length - 1); i++) {
    xpTable[i].xpToNext = xpTable[i + 1].xp - xpTable[i].xp;
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Level', 'right', 'level', 0, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'xp', 0, formatAsInt);
  tabSpec.appendColumn('XP to Next', 'right', 'xpToNext', 0, formatAsInt);
  return formatObjectArrayAsTable(xpTable, tabSpec.tableSpec);
}
/**
var outstr = 'NPC\tMax Coins\tAvg. Loot Value\n';
for (let i = 0; i < thievingNPC.length; i++) {
       outstr += `${thievingNPC[i].name}\t`;
       let totWeight = 0;
       let gpWeight = 0;
       for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
              totWeight += thievingNPC[i].lootTable[j][1];
              gpWeight += thievingNPC[i].lootTable[j][1] * items[thievingNPC[i].lootTable[j][0]].sellsFor;
       }
       outstr += `${thievingNPC[i].maxCoins}\t${gpWeight / totWeight}\n`
}
console.log(outstr);
*/

/**
 * @description Creates a table of potions for either combat/skill
 * @param {string} type Type of potion to include in table
 * @return {string}
 */
function createPotionsTable(type) {
  let category = -1;
  if (type === 'Skill') {
    category = 1;
  } else if (type === 'Combat') {
    category = 0;
  }
  // Construct item subset for herblore because the data is seperated into 2 arrays again
  const itemSubset = [];
  let subsetIndex = -1;
  for (let i = 0; i < herbloreItemData.length; i++) {
    if (herbloreItemData[i].category === category) {
      for (let j = 0; j < herbloreItemData[i].itemID.length; j++) {
        subsetIndex++;
        itemSubset.push(items[herbloreItemData[i].itemID[j]]);
        try {
          itemSubset[subsetIndex].parentIndex = herbloreItemData[i].itemID[j];
        } catch {
          console.log('Uh oh');
          console.log(i);
          console.log(j);
        }
        itemSubset[subsetIndex].herbloreLevel = herbloreItemData[i].herbloreLevel;
        itemSubset[subsetIndex].herbloreXP = herbloreItemData[i].herbloreXP;
        itemSubset[subsetIndex].herbloreID = herbloreItemData[i].id;
        itemSubset[subsetIndex].herbloreCategory = herbloreItemData[i].category;
      }
    }
  }
  itemSubset.sort((a, b) => {
    return a.herbloreLevel - b.herbloreLevel;
  });
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Item', 'left', 'parentIndex', 0, (id) => formatItemIDAsImageLink(id, 50, 'middle'));
  tabSpec.appendColumn('Name', 'left', 'parentIndex', 0, formatItemIDAsLink);
  tabSpec.appendColumn('Herblore Level', 'right', 'herbloreLevel', 1, formatAsInt);
  tabSpec.appendColumn('Experience', 'right', 'herbloreXP', 0, formatAsInt);
  tabSpec.appendColumn('Item Price', 'right', 'sellsFor', 0, formatAsInt);
  tabSpec.appendColumn('Ingredients', 'right', 'herbloreReq', 0, formatCraftReq);
  tabSpec.appendColumn('Charges', 'right', 'potionCharges', 0, formatAsInt);
  tabSpec.appendColumn('Effect', 'left', 'description', 'None', (x) => {
    return x;
  });

  return formatObjectArrayAsTable(itemSubset, tabSpec.tableSpec);
}

/**
 * @description Creates a table of loot sources for an item
 * @param {number} itemID Index of items array
 * @return {string}
 */
function createItemLootSourcesTable(itemID) {
  const lootSourceData = [];
  for (let i = 0; i < items[itemID].monsterSources.length; i++) {
    lootSourceData.push({
      sources: formatMonsterIDAsImageLink(items[itemID].monsterSources[i].id, 25, 'middle'),
      name: formatMonsterIDAsLink(items[itemID].monsterSources[i].id),
      type: '[[Monster]]',
      minQty: (items[itemID].monsterSources[i].minQty) ? items[itemID].monsterSources[i].minQty : 1,
      maxQty: items[itemID].monsterSources[i].maxQty,
      chance: items[itemID].monsterSources[i].chance,
    });
  }
  for (let i = 0; i < items[itemID].thievingSources.length; i++) {
    lootSourceData.push({
      sources: formatThievingIDAsImageLink(items[itemID].thievingSources[i].id, 25, 'middle'),
      name: formatThievingIDAsLink(items[itemID].thievingSources[i].id),
      type: '[[Thieving]]',
      minQty: 1,
      maxQty: items[itemID].thievingSources[i].maxQty,
      chance: items[itemID].thievingSources[i].chance,
    });
  }
  for (let i = 0; i < items[itemID].chestSources.length; i++) {
    lootSourceData.push({
      sources: formatItemIDAsImageLink(items[itemID].chestSources[i].id, 25, 'middle'),
      name: formatItemIDAsLink(items[itemID].chestSources[i].id),
      type: '[[Chest]]',
      minQty: 1,
      maxQty: items[itemID].chestSources[i].maxQty,
      chance: items[itemID].chestSources[i].chance,
    });
  }
  for (let i = 0; i < items[itemID].dungeonSources.length; i++) {
    lootSourceData.push({
      sources: formatDungeonIDAsImageLink(items[itemID].dungeonSources[i].id, 25, 'middle'),
      name: formatDungeonIDAsLink(items[itemID].dungeonSources[i].id),
      type: '[[Dungeon]]',
      minQty: 1,
      maxQty: items[itemID].dungeonSources[i].maxQty,
      chance: items[itemID].dungeonSources[i].chance,
    });
  }
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Source', 'left', 'sources', '', returnSelf);
  tabSpec.appendColumn('Name', 'left', 'name', '', returnSelf);
  tabSpec.appendColumn('Source Type', 'left', 'type', '', returnSelf);
  tabSpec.appendColumn('Quantity', 'right', ['minQty', 'maxQty'], [1, 1], formatAsDropQty, (x)=>{
    return x[0] + x[1];
  });
  tabSpec.appendColumn('Chance', 'right', 'chance', 0, (x) => formatNumberPerc(x, 2));
  return formatObjectArrayAsTable(lootSourceData, tabSpec.tableSpec);
}

/**
 * Creates the table of player special attacks for the Special Attacks page
 * @return {string}
 */
function createPlayerSpecialAttacksTable() {
  const tabSpec = new TableSpecMaker();
  tabSpec.appendColumn('Weapon(s)', 'right', 'weaponsWithAttack', [], (weaponList) => {
    if (weaponList.length > 0) {
      const weaponFormat = [];
      weaponList.forEach((itemID) => {
        weaponFormat.push(`${formatItemIDAsImageLink(itemID, 50, 'middle')} ${formatItemIDAsLink(itemID)}`);
      });
      return formatArrayAsNewlines(weaponFormat);
    }
    return 'None';
  });
  tabSpec.appendColumn('Name', 'right', 'name', '', returnSelf);
  tabSpec.appendColumn('Chance', 'right', 'chance', 0, (chance) => formatNumberPerc(chance, 0));
  tabSpec.appendColumn('Effect', 'right', 'description', '', returnSelf);
  return formatObjectArrayAsTable(playerSpecialAttacks.filter((attack)=>{
    return attack.weaponsWithAttack.length > 0;
  }), tabSpec.tableSpec);
}
