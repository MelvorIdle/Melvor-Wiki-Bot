/**
 * @description Fills the monster template for a particular monster
 * @param {number} monsterID Index of MONSTERS array
 * @return {string}
 */
function fillMonsterTemplate(monsterID) {
	let template = "{{Monster";
	template += `|name=${MONSTERS[monsterID].name}`;
	template += `|monsterID=${monsterID}`;
	template += `|combatLevel=${getMonsterCombatLevel(monsterID)}`;
	template += `|hitpoints=${numberMultiplier * MONSTERS[monsterID].hitpoints}`;
	template += `|attackspeed=${(MONSTERS[monsterID].attackSpeed / 1000).toFixed(1)}`;
	template += `|attacks=${formatMonsterAttacks(monsterID)}`;
	template += `|accuracyRating=${getMonsterAccuracy(monsterID)}`;
	template += `|meleeEvasionRating=${getMonsterMeleeEvasion(monsterID)}`;
	template += `|rangedEvasionRating=${getMonsterRangedEvasion(monsterID)}`;
	template += `|magicEvasionRating=${getMonsterMagicEvasion(monsterID)}`;
	template += `|attackLevel=${MONSTERS[monsterID].attackLevel}`;
	template += `|strengthLevel=${MONSTERS[monsterID].strengthLevel}`;
	template += `|defenceLevel=${MONSTERS[monsterID].defenceLevel}`;
	template += `|rangedLevel=${MONSTERS[monsterID].rangedLevel}`;
	template += `|magicLevel=${MONSTERS[monsterID].magicLevel}`;
	template += `|zones=${formatArrayAsNewlines(getMonsterLocationArray(monsterID))}`;
	template += `|drops=`;
	//template += `|drops=${formatMonsterDrops(monsterID)}`;
	template += "}}";
	template += `${formatMonsterDrops(monsterID)}`;
	return template;
}

/**
 * @description Fills the armour stats template for an item
 * @param {number} itemID Index of items array
 * @return {string}
 */
function fillArmourStatsTemplate(itemID) {
	const statKeys = ["stabAttackBonus", "slashAttackBonus", "blockAttackBonus", "rangedAttackBonus", "magicAttackBonus", "strengthBonus", "rangedStrengthBonus", "magicDamageBonus", "defenceBonus", "rangedDefenceBonus", "magicDefenceBonus", "damageReduction", "defenceLevelRequired", "rangedLevelRequired", "magicLevelRequired", "slayerBonusXP"];
	let template = "{{ArmourStats";
	for (let i = 0; i < statKeys.length; i++) {
		let statValue = 0;
		if (statKeys[i] === "stabAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[0];
			}
		} else if (statKeys[i] === "slashAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[1];
			}
		} else if (statKeys[i] === "blockAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[2];
			}
		} else {
			if (items[itemID][statKeys[i]]) {
				statValue = items[itemID][statKeys[i]];
			}
		}
		template += `|${statKeys[i]}=${statValue}`;
	}
	template += "}}";
	return template;
}

/**
 * @description Automatically fills in the weapon stats template for an item page
 * @param {number} itemID Index of items array
 * @return {string}
 */
function fillWeaponStatsTemplate(itemID) {
	const statKeys = ["attackSpeed", "attackType", "isTwoHanded", "stabAttackBonus", "slashAttackBonus", "blockAttackBonus", "rangedAttackBonus", "magicAttackBonus", "strengthBonus", "rangedStrengthBonus", "magicDamageBonus", "defenceBonus", "rangedDefenceBonus", "magicDefenceBonus", "damageReduction", "attackLevelRequired", "rangedLevelRequired", "magicLevelRequired", "slayerBonusXP"];
	let template = "{{WeaponStats";
	for (let i = 0; i < statKeys.length; i++) {
		let statValue = 0;
		if (statKeys[i] === "stabAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[0];
			}
		} else if (statKeys[i] === "slashAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[1];
			}
		} else if (statKeys[i] === "blockAttackBonus") {
			if (items[itemID].attackBonus) {
				statValue = items[itemID].attackBonus[2];
			}
		} else if (statKeys[i] === "attackType") {
			if (items[itemID].type === "Ranged Weapon" || items[itemID].isRanged) {
				statValue = "[[File:Ranged (skill).svg|25px|middle|link=Ranged]] Ranged";
			} else if (items[itemID].isMagic) {
				statValue = "[[File:Magic (skill).svg|25px|middle|link=Magic]] Magic";
			} else {
				statValue = "[[File:Combat.svg|25px|middle]] Melee";
			}
		} else if (statKeys[i] === "isTwoHanded") {
			statValue = items[itemID].isTwoHanded ? "Yes" : "No";
		} else {
			if (items[itemID][statKeys[i]]) {
				statValue = items[itemID][statKeys[i]];
			}
		}
		template += `|${statKeys[i]}=${statValue}`;
	}
	template += "}}";
	return template;
}

/**
 * @description Fills in the combat area template
 * @param {number} areaID Index of combatAreas
 * @return {string}
 */
function fillCombatAreaTemplate(areaID) {
	let template = "{{CombatArea";
	template += `|name=${combatAreas[areaID].areaName}`;
	template += `|id=${areaID}`;
	template += `|monsterList=${formatArrayAsNewlines(getMonsterArray(combatAreas[areaID]))}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the slayer Area template
 * @param {number} areaID Index of combatAreas
 * @return {string}
 */
function fillSlayerAreaTemplate(areaID) {
	let template = "{{SlayerArea";
	template += `|name=${slayerAreas[areaID].areaName}`;
	template += `|id=${areaID}`;
	template += `|slayerLevel=${slayerAreas[areaID].slayerLevel !== undefined ? slayerAreas[areaID].slayerLevel : 1}`;
	template += `|slayerItem=${slayerAreas[areaID].slayerItem !== 0 ? `${formatItemIDAsImageLink(slayerAreas[areaID].slayerItem, 25, "middle")} ${formatItemIDAsLink(slayerAreas[areaID].slayerItem)}` : "None"}`;
	template += `|monsterList=${formatArrayAsNewlines(getMonsterArray(slayerAreas[areaID]))}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the combat area template
 * @param {number} dungeonID Index of combatAreas
 * @return {string}
 */
function fillDungeonTemplate(dungeonID) {
	let template = "{{Dungeon";
	template += `|name=${DUNGEONS[dungeonID].name}`;
	template += `|id=${dungeonID}`;
	template += `|rewards=${formatDungeonDrops(dungeonID)}`;
	template += `|monsterList=${formatArrayAsNewlines(getDungeonMonsterArray(DUNGEONS[dungeonID].condensedMonsters))}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the Spell template
 * @param {number} spellID Index of SPELLS
 * @return {string}
 */
function fillSpellTemplate(spellID) {
	let template = "{{Spell";
	template += `|name=${SPELLS[spellID].name}`;
	template += `|id=${spellID}`;
	template += `|level=${SPELLS[spellID].magicLevelRequired}`;
	template += `|maxHit=${SPELLS[spellID].maxHit * numberMultiplier}`;
	template += `|runeList=${formatSpellAsRuneRequirements(SPELLS[spellID], formatArrayAsBulletList)}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the Curse template
 * @param {number} curseID Index of CURSES
 * @return {string}
 */
function fillCurseTemplate(curseID) {
	const curse = CURSES[curseID];
	let template = "{{Curse";
	template += `|name=${curse.name}`;
	template += `|id=${curseID}`;
	template += `|level=${curse.magicLevelRequired}`;
	template += `|chance=${curse.chance}`;
	template += `|effect=${curse.description}`;
	template += `|runeList=${formatSpellAsRuneRequirements(curse, formatArrayAsBulletList)}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the Aurora template
 * @param {number} auroraID Index of AURORAS
 * @return {string}
 */
function fillAuroraTemplate(auroraID) {
	const aurora = AURORAS[auroraID];
	let template = "{{Aurora";
	template += `|name=${aurora.name}`;
	template += `|id=${auroraID}`;
	template += `|level=${aurora.magicLevelRequired}`;
	let itemReq = "None";
	if (aurora.requiredItem !== -1) {
		itemReq = `${formatItemIDAsImageLink(aurora.requiredItem, 25, "middle")} ${formatItemIDAsLink(aurora.requiredItem)}`;
	}
	template += `|itemRequired=${itemReq}`;
	template += `|effect=${aurora.description}`;
	template += `|runeList=${formatSpellAsRuneRequirements(aurora, formatArrayAsBulletList)}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the AncientMagick template
 * @param {number} spellID Index of ANCIENT
 * @return {string}
 */
function fillAncientTemplate(spellID) {
	const ancient = ANCIENT[spellID];
	let template = "{{AncientMagick";
	template += `|name=${ancient.name}`;
	template += `|id=${spellID}`;
	template += `|level=${ancient.magicLevelRequired}`;
	template += `|unlockReq=${ancient.requiredDungeonCompletion[1]} ${formatDungeonIDAsImageLink(ancient.requiredDungeonCompletion[0], 25, "middle")} ${formatDungeonIDAsLink(ancient.requiredDungeonCompletion[0])} clears`;
	template += `|maxHit=${ancient.maxHit * numberMultiplier}`;
	template += `|description=${ancient.description}`;
	template += `|runeList=${formatSpellAsRuneRequirements(ancient, formatArrayAsBulletList)}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the AltMagic template
 * @param {number} spellID Index of ALTMAGIC
 * @return {string}
 */
function fillAltMagicSpellTemplate(spellID) {
	const spell = ALTMAGIC[spellID];
	let template = "{{AltMagic";
	template += `|name=${spell.name}`;
	template += `|id=${spellID}`;
	template += `|level=${spell.magicLevelRequired}`;
	template += `|effect=${spell.description}`;
	template += `|xp=${spell.magicXP}`;
	template += `|runeList=${formatSpellAsRuneRequirements(spell, formatArrayAsBulletList)}`;
	template += "}}";
	return template;
}

/**
 * Fills the Pet template
 * @param {number} petID Index of PETS
 * @return {string}
 */
function fillPetTemplate(petID) {
	const pet = PETS[petID];
	let template = "{{Pet";
	template += `|name=${pet.name}`;
	template += `|ext=${getFileExtension(pet.media)}`;
	template += `|id=${petID}`;
	if (pet.skill === undefined && petID === 20) {
		template += `|skill=${formatCombatImage(25, "middle")} ${formatPageLink("Combat")}`;
	} else {
		template += `|skill=${formatSkillImageLink(skillName[pet.skill], 25, "middle")} ${formatPageLink(skillName[pet.skill])}`;
	}
	template += `|effect=${pet.effect}`;
	template += "}}";
	return template;
}

/**
 * @description Fills in the Prayer template
 * @param {number} prayerID Index of PRAYER
 * @return {string}
 */
function fillPrayerTemplate(prayerID) {
	let template = "{{Prayer";
	template += `|name=${PRAYER[prayerID].name}`;
	template += `|id=${prayerID}`;
	template += `|level=${PRAYER[prayerID].prayerLevel}`;
	template += `|prayerEffects=${formatArrayAsBulletList(getPrayerEffectArray(prayerID))}`;
	template += `|prayerCosts=${formatArrayAsNewlines(getPrayerCostArray(prayerID))}`;
	template += "}}";
	return template;
}

/**
 * Fills in the upgrade template for an axe
 * @param {number} axeID Index of axeUpgrades
 * @return {string}
 */
function fillAxeUpgradeTemplate(axeID) {
	let template = "{{Upgrade";
	template += `|name=${getAxeUpgradeName(axeID)}`;
	template += `|upgradeEffect=Reduces [[Woodcutting]] time by ${axeBonusSpeed[axeID]}%`;
	if (axeID <= 1) {
		template += `|upgradeRequirements=${formatSkillRequirement("Woodcutting", axeLevels[axeID])}`;
	} else {
		template += `|upgradeRequirements=${formatSkillRequirement("Woodcutting", axeLevels[axeID])}<br>Purchased ${formatAxeIDAsImageLink(axeID - 1, 25, "middle")} ${formatAxeIDAsLink(axeID - 1)}`;
	}
	template += `|upgradeCost=${formatAsShopCost(axeCost[axeID])}`;
	template += "}}";
	return template;
}

/**
 * Fills in the upgrade template for a fishing rod
 * @param {number} rodID INdex of rodUpgrades
 * @return {string}
 */
function fillRodUpgradeTemplate(rodID) {
	let template = "{{Upgrade";
	template += `|name=${getRodUpgradeName(rodID)}`;
	template += `|upgradeEffect=Reduces [[Fishing]] time by ${rodBonusSpeed[rodID]}%`;
	if (rodID <= 1) {
		template += `|upgradeRequirements=${formatSkillRequirement("Fishing", rodLevels[rodID])}`;
	} else {
		template += `|upgradeRequirements=${formatSkillRequirement("Fishing", rodLevels[rodID])}<br>Purchased ${formatRodIDAsImageLink(rodID - 1, 25, "middle")} ${formatRodIDAsLink(rodID - 1)}`;
	}
	template += `|upgradeCost=${formatAsShopCost(rodCost[rodID])}`;
	template += "}}";
	return template;
}

/**
 * Fills in the upgrade template for a pickaxe
 * @param {number} pickID Index of pickUpgrades
 * @return {string}
 */
function fillPickUpgradeTemplate(pickID) {
	let template = "{{Upgrade";
	template += `|name=${getPickUpgradeName(pickID)}`;
	template += `|upgradeEffect=Reduces [[Mining]] time by ${pickaxeBonusSpeed[pickID]}%<br>Increases ore double chance by ${pickaxeBonus[pickID]}%`;
	if (pickID <= 1) {
		template += `|upgradeRequirements=${formatSkillRequirement("Mining", pickaxeLevels[pickID])}`;
	} else {
		template += `|upgradeRequirements=${formatSkillRequirement("Mining", pickaxeLevels[pickID])}<br>Purchased ${formatPickIDAsImageLink(pickID - 1, 25, "middle")} ${formatPickIDAsLink(pickID - 1)}`;
	}
	template += `|upgradeCost=${formatAsShopCost(pickaxeCost[pickID])}`;
	template += "}}";
	return template;
}

/**
 * Fills in the Upgrade template for an auto eat upgrade
 * @param {number} eatID index of autoEatData
 * @return {string}
 */
function fillEatUpgradeTemplate(eatID) {
	let template = "{{Upgrade";
	template += `|name=${autoEatData[eatID].title}`;
	template += `|upgradeEffect=Automatically eats food to heal you to ${autoEatData[eatID].maxHP}% of your HP when you fall below ${autoEatData[eatID].eatAt}% HP<br>Food is eaten at ${autoEatData[eatID].efficiency}% efficiency.`;
	if (eatID <= 0) {
		template += `|upgradeRequirements=None`;
	} else {
		template += `|upgradeRequirements=Purchased ${formatEatIDAsImageLink(eatID - 1, 25, "middle")} ${formatEatIDAsLink(eatID - 1)}`;
	}
	template += `|upgradeCost=${formatAsShopCost(autoEatData[eatID].cost)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the Upgrade template for a cooking fire upgrade
 * @param {number} fireID Index of cookingFireData
 * @return {string}
 */
function fillFireUpgradeTemplate(fireID) {
	let template = "{{Upgrade";
	template += `|name=${getFireUpgradeName(fireID)}`;
	template += `|upgradeEffect=Fires do not need to be lit to cook.<br>Increases [[Cooking]] experience by ${cookingFireData[fireID].bonusXP}%.`;
	if (fireID <= 0) {
		template += `|upgradeRequirements=${formatSkillRequirement("Firemaking", cookingFireData[fireID].fmLevel)}`;
	} else {
		template += `|upgradeRequirements=${formatSkillRequirement("Firemaking", cookingFireData[fireID].fmLevel)}<br>Purchased ${formatFireIDAsImageLink(fireID - 1, 25, "middle")} ${formatFireIDAsLink(fireID - 1)}`;
	}
	template += `|upgradeCost=${`${formatItemIDAsImageLink(cookingFireData[fireID].costLogs[0], 25, "middle")} ${cookingFireData[fireID].costLogs[1]}<br>${formatAsShopCost(cookingFireData[fireID].costGP)}`}`;
	template += "}}";
	return template;
}

/**
 * Fills in the Upgrade template for a god upgrade
 * @param {number} godID Index of godUpgradeData
 * @return {string}
 */
function fillGodUpgradeTemplate(godID) {
	let template = "{{Upgrade";
	template += `|name=${godUpgradeData[godID].name}`;
	template += `|upgradeEffect=${godUpgradeDescriptions[godID]}`;
	template += `|upgradeRequirements=Complete: ${formatDungeonIDAsImageLink(godUpgradeData[godID].dungeonID, 25, "middle")} ${formatDungeonIDAsLink(godUpgradeData[godID].dungeonID, 25, "middle")} Once`;
	template += `|upgradeCost=${`${formatAsShopCost(godUpgradeData[godID].cost)}`}`;
	template += "}}";
	return template;
}

/**
 * Fills in the ItemProduction template for a log
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemProductionTemplateForWoodcutting(itemID) {
	let template = "{{ItemProduction";
	template += `|requirements=${formatSkillRequirement("Woodcutting", items[itemID].woodcuttingLevel)}`;
	template += `|quantity=${1}`;
	template += `|experience=${items[itemID].woodcuttingXP}`;
	template += `|creationTime=${(items[itemID].woodcuttingInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemProduction template for a fish
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemProductionTemplateForFishing(itemID) {
	let template = "{{ItemProduction";
	template += `|requirements=${formatSkillRequirement("Fishing", items[itemID].fishingLevel)}`;
	template += `|quantity=${1}`;
	template += `|experience=${items[itemID].fishingXP}`;
	if (items[itemID].isJunk || items[itemID].isFishTreasure) {
		template += `|creationTime=Variable `;
	} else {
		template += `|creationTime=${(items[itemID].minFishingInterval / 1000).toFixed(1)}-${(items[itemID].maxFishingInterval / 1000).toFixed(1)}`;
	}
	template += "}}";
	return template;
}
/**
 * Fills in the itemProduction template for an ore
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemProductionTemplateForMining(itemID) {
	let template = "{{ItemProduction";
	template += `|requirements=${formatSkillRequirement("Mining", items[itemID].miningLevel)}`;
	if (itemID === CONSTANTS.item.Dragonite_Ore) {
		template += `<br>${formatMasteryImageLink(25, "middle")} 271 total [[Mining]] ${formatPageLink("Mastery")}`;
	}
	template += `|quantity=${items[itemID].miningQty}`;
	template += `|experience=${items[itemID].miningXP}`;
	template += `|creationTime=${(baseMiningInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the Item Creation template for a cooked item
 * @param {number} itemID Index of item
 * @return {string}
 */
function fillItemCreationTemplateForCooking(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Cooking", items[itemID].cookingLevel)}`;
	template += `|materials=${formatItemCreationCost(items[itemID].cookingReq)}`;
	template += `|quantity=${1}`;
	template += `|experience=${items[itemID].cookingXP}`;
	template += `|creationTime=${3.0}`;
	template += "}}";
	return template;
}
/**
 * Fills in the Item Creation template for a smithing item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForSmithing(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Smithing", items[itemID].smithingLevel)}`;
	template += `|materials=${formatItemCreationCost(items[itemID].smithReq)}`;
	template += `|quantity=${items[itemID].smithingQty !== undefined ? items[itemID].smithingQty : 1}`;
	template += `|experience=${items[itemID].smithingXP}`;
	template += `|creationTime=${(smithInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the Item Creation template for a farming harvest item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForFarming(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Farming", items[itemID].farmingLevel)}`;
	template += `|materials=${formatItemCreationCost(items[itemID].farmingReq)}`;
	template += `|quantity=${5}`;
	template += `|experience=${items[itemID].farmingXP}`;
	template += `|creationTime=${items[itemID].growthTime}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemCreation template for a fletching item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForFletching(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Fletching", items[itemID].fletchingLevel)}`;
	if (itemID === CONSTANTS.item.Arrow_Shafts) {
		template += `|materials=${formatItemIDAsImageLink(0, 25, "middle")} ${1} Any [[Log]]`;
		template += `|quantity=${items[itemID].fletchQty}-${items[itemID].fletchQty * 9}`;
	} else {
		template += `|materials=${formatItemCreationCost(items[itemID].fletchReq)}`;
		template += `|quantity=${items[itemID].fletchQty}`;
	}
	template += `|experience=${items[itemID].fletchingXP}`;
	template += `|creationTime=${(fletchInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemCreation template for a crafting item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForCrafting(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Crafting", items[itemID].craftingLevel)}`;
	template += `|materials=${formatItemCreationCost(items[itemID].craftReq)}`;
	template += `|quantity=${items[itemID].craftQty}`;
	template += `|experience=${items[itemID].craftingXP}`;
	template += `|creationTime=${(craftInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemCreation template for a runecrafting item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForRunecrafting(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Runecrafting", items[itemID].runecraftingLevel)}`;
	template += `|materials=${formatItemCreationCost(items[itemID].runecraftReq)}`;
	template += `|quantity=${items[itemID].runecraftQty}`;
	template += `|experience=${items[itemID].runecraftingXP}`;
	template += `|creationTime=${(runecraftInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemCreation template for a potion
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemCreationTemplateForHerblore(itemID) {
	let template = "{{ItemCreation";
	template += `|requirements=${formatSkillRequirement("Herblore", items[itemID].herbloreLevel)}`;
	switch (items[itemID].potionTier) {
		case 1:
			template += `<br>${formatMasteryImageLink(25, "middle")} ${15} ${formatPageLink("Mastery")}`;
			break;
		case 2:
			template += `<br>${formatMasteryImageLink(25, "middle")} ${40} ${formatPageLink("Mastery")}`;
			break;
		case 3:
			template += `<br>${formatMasteryImageLink(25, "middle")} ${65} ${formatPageLink("Mastery")}`;
			break;
	}
	template += `|materials=${formatItemCreationCost(items[itemID].herbloreReq)}`;
	template += `|quantity=${1}`;
	template += `|experience=${items[itemID].herbloreXP}`;
	template += `|creationTime=${(herbloreInterval / 1000).toFixed(1)}`;
	template += "}}";
	return template;
}

/**
 * Fills in the ItemAltMagic template for a given spell and item
 * @param {number} spellID Index of ALTMAGIC
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillAltMagicTemplate(spellID, itemID) {
	const spell = ALTMAGIC[spellID];
	const item = items[itemID];
	let template = "{{ItemAltMagic";
	template += `|spellName=${spell.name}`;
	template += `|requirements=${formatSkillRequirement("Magic", spell.magicLevelRequired)}`;
	if (spell.selectItem === 0) {
		template += `<br>${formatSkillRequirement("Smithing", item.smithingLevel)}`;
	}
	let spellMats;
	switch (spell.selectItem) {
		case -1:
			// Creates either gems or convertTo value
			if (spell.needCoal) {
				spellMats = formatItemCreationCost([{ id: CONSTANTS.item.Coal_Ore, qty: 1 }]);
			} else {
				spellMats = "Nothing";
			}
			break;
		case 0:
			if (spell.ignoreCoal) {
				spellMats = formatItemCreationCost(
					item.smithReq.filter((req) => {
						return req.id !== CONSTANTS.item.Coal_Ore;
					})
				);
			} else {
				spellMats = formatItemCreationCost(item.smithReq);
			}
			break;
		case 1:
			if (spell.isJunk) {
				spellMats = `1 of any ${createPageLink("Fishing Junk", "Fishing#Junk")}`;
			} else if (!spell.isAlch) {
				spellMats = "1 of any Item";
			}
			break;
	}
	// Determine spell materials
	template += `|materials=${spellMats}`;
	template += `|runes=${formatSpellAsRuneRequirements(spell, formatArrayAsNewlines)}`;
	template += `|quantity=${spell.convertToQty}`;
	if (item.gemChance !== undefined) {
		template += `(${item.gemChance}%)`;
	}
	template += `|experience=${spell.magicXP}`;
	template += `|creationTime=${magicInterval / 1000}`;
	template += "}}";
	return template;
}
/**
 * Fills in the FishingSpecial template for a special item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillFishingSpecialTemplate(itemID) {
	let template = "{{FishingSpecial";
	template += `|requirements=${formatSkillRequirement("Fishing", 1)}`;
	template += `|quantity=1`;
	template += `|chanceRatio=${items[itemID].specialWeight}/${specialItems.totalWeight}`;
	template += `|chancePercent=${((100 * items[itemID].specialWeight) / specialItems.totalWeight).toFixed(3)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the FishingJunk template for a junk item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillFishingJunkTemplate(itemID) {
	let template = "{{FishingJunk";
	template += `|requirements=${formatSkillRequirement("Fishing", 1)}`;
	template += `|quantity=1`;
	template += `|chanceRatio=${items[itemID].junkWeight}/${junkItems.length}`;
	template += `|chancePercent=${((100 * items[itemID].junkWeight) / junkItems.length).toFixed(2)}`;
	template += "}}";
	return template;
}
/**
 * Fills in the ItemUpgrade source template for a trimmed item
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemUpgradeTemplate(itemID) {
	let template = "{{ItemUpgrade";
	template += `|upgradesFrom=${formatArrayAsNewlines(getUpgradesFromArray(itemID))}`;
	template += `|materials=${formatItemTrimCost(itemID)}`;
	template += "}}";
	return template;
}

/**
 * Fills in the item template for use on invidual item pages
 * @param {number} itemID Index of items
 * @return {string}
 */
function fillItemTemplate(itemID) {
	const item = items[itemID];
	let template = "{{Item";
	template += `|name=${item.name}`;
	let itemDescription = "No Description";
	if (item.description !== undefined) {
		itemDescription = item.description;
	}
	template += `|imagefile=${item.name} (item)${getFileExtension(item.media)}`;
	template += `|description=${itemDescription}`;
	template += `|id=${itemID}`;
	template += `|category=${item.category}`;
	template += `|type=${item.type}`;
	template += `|sellsfor={{GP|${item.sellsFor}}}`;
	let customData = "";
	if (item.healsFor) {
		customData += `{{ItemHealsFor|healsFor=${item.healsFor * numberMultiplier}}}`;
	}
	if (item.equipmentSlot !== undefined) {
		const slotKeys = Object.keys(CONSTANTS.equipmentSlot);
		for (let i = 0; i < slotKeys.length; i++) {
			if (CONSTANTS.equipmentSlot[slotKeys[i]] === item.equipmentSlot) {
				customData += `{{ItemEquipSlot|equipmentSlot=${slotKeys[i]}}}`;
				break;
			}
		}
	}
	if (item.hasSpecialAttack) {
		const specialID = item.specialAttackID;
		customData += `{{ItemSpecialAttack|specialChance=${playerSpecialAttacks[specialID].chance}|specialName=${playerSpecialAttacks[specialID].name}|specialEffect=${playerSpecialAttacks[specialID].description}}}`;
	}
	if (item.potionCharges !== undefined) {
		customData += `{{ItemCharges|charges=${item.potionCharges}}}`;
	}
	if (item.prayerPoints !== undefined) {
		customData += `{{ItemPrayerPoints|prayerPoints=${item.prayerPoints}}}`;
	}
	template += `|customData=${customData}`;
	template += `|itemSources=${formatArrayAsBulletList(getItemSourcesArray(itemID))}`;
	template += `|itemUses=${formatArrayAsBulletList(getItemUsesArray(itemID))}`;
	template += "}}";
	return template;
}

/**
 * Fills in the thieving template for individual thieving target pages
 * @param {number} targetInd Index of thievingNPC
 * @return {string}
 */
function fillThievingTemplate(targetInd) {
	let template = "{{ThievingTarget";
	template += `|name=${thievingNPC[targetInd].name}`;
	template += `|level=${thievingNPC[targetInd].level}`;
	template += `|xp=${thievingNPC[targetInd].xp}`;
	template += `|drops=*1-${thievingNPC[targetInd].maxCoins} gp\n`;
	// Add loot table to drops
	if (thievingNPC[targetInd].lootTable.length > 0) {
		template += "75% chance for:\n";
		let totalWeight = 0;
		for (let lootInd = 0; lootInd < thievingNPC[targetInd].lootTable.length; lootInd++) {
			totalWeight += thievingNPC[targetInd].lootTable[lootInd][1];
		}
		for (let lootInd = 0; lootInd < thievingNPC[targetInd].lootTable.length; lootInd++) {
			const lootChance = (100 * thievingNPC[targetInd].lootTable[lootInd][1]) / totalWeight;
			let percStr = formatNumberPerc(lootChance, 2);
			if (percStr.length < 6) {
				percStr = `&nbsp;&nbsp;${percStr}`;
			}
			template += `*${percStr} ${formatItemIDAsImageLink(thievingNPC[targetInd].lootTable[lootInd][0], 25, "middle")} ${formatItemIDAsLink(thievingNPC[targetInd].lootTable[lootInd][0])}\n`;
		}
	}
	// Add chance for patreon items
	template += `${formatNumberPerc(100 / 120, 2)} chance for:\n`;
	template += `* ${formatItemIDAsImageLink(CONSTANTS.item.Bobbys_Pocket, 25, "middle")} ${formatItemIDAsLink(CONSTANTS.item.Bobbys_Pocket)}\n`;
	template += `${formatNumberPerc(100 / 10000, 2)} chance for:\n`;
	template += `* ${formatItemIDAsImageLink(CONSTANTS.item.Chapeau_Noir, 25, "middle")} ${formatItemIDAsLink(CONSTANTS.item.Chapeau_Noir)}\n`;
	template += "}}";
	return template;
}

/**
 * Fills the ItemShopPurchase Template for an item
 * @param {*} shopSource Element of items shopSources
 * @return {string}
 */
function fillItemShopPurchaseTemplate(shopSource) {
	let template = "{{ItemShopSource";
	const costArray = [];
	if (shopSource.gpCost !== 0) {
		costArray.push(`${formatAsShopCost(shopSource.gpCost)}`);
	}
	if (shopSource.scCost !== 0) {
		costArray.push(`${formatAsSlayerCost(shopSource.scCost)}`);
	}
	if (shopSource.itemCost.length > 0) {
		shopSource.itemCost.forEach((cost) => {
			costArray.push(`${formatItemIDAsImageLink(cost.itemID, 25, "middle")} ${cost.quantity} ${formatItemIDAsLink(cost.itemID)}`);
		});
	}
	template += `|materials=${formatArrayAsNewlines(costArray)}`;
	template += `|requirements=${shopSource.requirements}`;
	template += `|quantity=${shopSource.quantity}`;
	template += "}}";
	return template;
}
