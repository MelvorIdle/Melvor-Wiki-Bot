// Functions to generate the content for an entire page

/**
 * @description Creates the wikitext for an item page
 * @param {number} itemID Index of items array
 * @return {string}
 */
function createItemPageContent(itemID) {
	let pageContent = "";
	pageContent += VERSIONTEMPLATE;
	pageContent += `${fillItemTemplate(itemID)}\n`; // linebreak is only there sometimes?
	// pageContent += createItemDescription(itemID); Too difficult to do, I give up
	if (items[itemID].canOpen) {
		pageContent += createSection("Loot Table");
		pageContent += `{{${items[itemID].name}LootTable}}` + "\n";
	}
	if (items[itemID].equipmentSlot !== undefined) {
		if (items[itemID].equipmentSlot === 4) {
			pageContent += `${fillWeaponStatsTemplate(itemID)}\n`;
		} else {
			if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Quiver && (items[itemID].ammoType === 2 || items[itemID].ammoType === 3)) {
				pageContent += `${fillWeaponStatsTemplate(itemID)}\n`;
			} else {
				pageContent += `${fillArmourStatsTemplate(itemID)}\n`;
			}
		}
	}
	// Creation Template
	pageContent += createSection("Item Sources");
	pageContent += `{{${items[itemID].name} Sources}}`;
	pageContent += "[[Category:Items]]";
	if (itemID > 683 && itemID < 820) {
		pageContent += "[[Category:Released in v0.15]]";
	}
	pageContent += "\n{{Menu}}";
	return pageContent;
}

/**
 * @description Creates the wikitext for a combat area page
 * @param {number} areaID Index of combatAreas
 * @return {string}
 */
function createCombatAreaPageContent(areaID) {
	let pageContent = "";
	pageContent += `${VERSIONTEMPLATE}\n`;
	pageContent += `${fillCombatAreaTemplate(areaID)}\n`;
	pageContent += "[[Category:Combat Areas]]\n";
	pageContent += "{{Menu}}";
	return pageContent;
}
/**
 * @description Creates the wikitext for a slayer area page
 * @param {number} areaID Index of slayerAreas
 * @return {string}
 */
function createSlayerAreaPageContent(areaID) {
	let pageContent = "";
	pageContent += `${VERSIONTEMPLATE}\n`;
	pageContent += `${fillSlayerAreaTemplate(areaID)}\n`;
	pageContent += "[[Category:Slayer Areas]]\n";
	pageContent += "{{Menu}}";
	return pageContent;
}
/**
 * @description Creates the wikitext for a dungeon page
 * @param {number} dungeonID Index of DUNGEONS array
 * @return {string}
 */
function createDungeonPageContent(dungeonID) {
	let pageContent = "";
	pageContent += `${VERSIONTEMPLATE}\n`;
	pageContent += `${fillDungeonTemplate(dungeonID)}\n`;
	pageContent += "[[Category:Dungeons]]\n";
	pageContent += "{{Menu}}";
	return pageContent;
}

/**
 * @description Creates the wikitext for a monster page
 * @param {number} monsterID Index of MONSTERS array
 * @return {string}
 */
function createMonsterPageContent(monsterID) {
	let pageContent = "";
	pageContent += VERSIONTEMPLATE;
	pageContent += fillMonsterTemplate(monsterID);
	pageContent += "[[Category:Monsters]]";
	pageContent += "{{CombatNav}}";
	pageContent += "{{Menu}}";
	return pageContent;
}

/**
 * @description Creates the wikitext for a spell page
 * @param {number} spellID Index of SPELLS
 * @return {string}
 */
function createSpellPageContent(spellID) {
	let pageContent = "";
	pageContent += VERSIONTEMPLATE;
	pageContent += fillSpellTemplate(spellID);
	pageContent += "[[Category:Spells]]";
	pageContent += "[[Category:Standard Magic]]";
	pageContent += "{{Menu}}";
	return pageContent;
}

/**
 * @description Creates the wikitext for a curse page
 * @param {number} curseID Index of CURSES
 * @return {string}
 */
function createCursePageContent(curseID) {
	return `${VERSIONTEMPLATE}
${fillCurseTemplate(curseID)}
[[Category:Spells]]
[[Category:Curses]]
{{Menu}}`;
}

/**
 * @description Creates the wikitext for an aurora page
 * @param {number} auroraID Index of AURORAS
 * @return {string}
 */
function createAuroraPageContent(auroraID) {
	return `${VERSIONTEMPLATE}
${fillAuroraTemplate(auroraID)}
[[Category:Spells]]
[[Category:Auroras]]
{{Menu}}`;
}

/**
 * @description Creates the wikitext for an ancient magick page
 * @param {number} spellID Index of ANCIENT
 * @return {string}
 */
function createAncientMagickPageContent(spellID) {
	return `${VERSIONTEMPLATE}
${fillAncientTemplate(spellID)}
[[Category:Spells]]
[[Category:Ancient Magick]]
{{Menu}}`;
}
/**
 * @description Creates the wikitext for an individual pet page
 * @param {number} petID Index of PETS
 * @return {string}
 */
function createPetPageContent(petID) {
	return `${VERSIONTEMPLATE}
  ${fillPetTemplate(petID)}
[[Category:Pets]]
{{Menu}}`;
}
/**
 * @description Creates the wikitext for an alt magic spell page
 * @param {number} spellID Index of ALTMAGIC
 * @return {string}
 */
function createAltMagicPageContent(spellID) {
	return `${VERSIONTEMPLATE}
${fillAltMagicSpellTemplate(spellID)}
[[Category:Spells]]
[[Category:Alt Magic]]
{{Menu}}`;
}

/**
 * @description Creates the wikitext for a prayer page
 * @param {number} prayerID Index of PRAYER
 * @return {string}
 */
function createPrayerPageContent(prayerID) {
	let pageContent = "";
	pageContent += VERSIONTEMPLATE;
	pageContent += fillPrayerTemplate(prayerID);
	pageContent += "[[Category:Prayers]]";
	pageContent += "{{Menu}}";
	return pageContent;
}

/**
 * @description Generates a thieving target page
 * @param {number} targetInd The ID of the target in the thievingNPC array
 * @return {string}
 */
function createThievingTargetPage(targetInd) {
	let outputStr = "";
	outputStr += `${VERSIONTEMPLATE}\n`;
	outputStr += fillThievingTemplate(targetInd);
	const orderNames = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
	outputStr += "\n\n";
	outputStr += `The ${thievingNPC[targetInd].name} is the ${orderNames[targetInd]} NPC in the thieving skill. On successful pickpockets players receive ${thievingNPC[targetInd].xp} xp and up to ${thievingNPC[targetInd].maxCoins} gold.\n\n`;
	outputStr += "{{Menu}}";
	outputStr += "[[Category:Thieving Targets]]";
	return outputStr;
}

/**
 * Generates an upgrade page
 * @param {string} templateString The filled upgrade template
 * @return {string}
 */
function createUpgradePageContent(templateString) {
	let pageContent = "";
	pageContent += VERSIONTEMPLATE;
	pageContent += templateString;
	pageContent += "[[Category:Upgrades]]";
	pageContent += "{{Menu}}";
	return pageContent;
}

/**
 * @description Creates the table content for the page Monster Loot Tables
 * @return {string}
 */
function createMonsterLootTablePage() {
	let outStr = "";
	for (let i = 0; i < combatAreas.length; i++) {
		outStr += createSubSection(formatCombatAreaIDAsLink(i));
		for (let j = 0; j < combatAreas[i].monsters.length; j++) {
			const lootChance = getMonsterLootChance(combatAreas[i].monsters[j]);
			outStr += createSubSubSection(formatMonsterIDAsLink(combatAreas[i].monsters[j]));
			outStr += `Drop Chance: ${formatNumberPerc(lootChance, 2)}\n`;
			outStr += createMonsterLootTable(combatAreas[i].monsters[j]);
		}
	}
	for (let i = 0; i < slayerAreas.length; i++) {
		outStr += createSubSection(formatSlayerAreaIDAsLink(i));
		for (let j = 0; j < slayerAreas[i].monsters.length; j++) {
			const lootChance = getMonsterLootChance(slayerAreas[i].monsters[j]);
			outStr += createSubSubSection(formatMonsterIDAsLink(slayerAreas[i].monsters[j]));
			outStr += `Drop Chance: ${formatNumberPerc(lootChance, 2)}\n`;
			outStr += createMonsterLootTable(slayerAreas[i].monsters[j]);
		}
	}
	return outStr;
}

/**
 * @description Creates the table content for the Upgrading Items Page
 * @return {string}
 */
function createUpgradedGearPage() {
	let outStr = "";
	const gearNames = Object.keys(CONSTANTS.equipmentSlot);
	for (let i = 0; i < gearNames.length; i++) {
		if (getObjectArraySubset(items, (item) => selectGearUpgradeable(item, CONSTANTS.equipmentSlot[gearNames[i]])).length > 0) {
			outStr += createSection(gearNames[i]);
			outStr += createUpgradeableGearTable(CONSTANTS.equipmentSlot[gearNames[i]]);
		}
	}
	if (getObjectArraySubset(items, selectNonGearUpgradeable).length > 0) {
		outStr += createSection("Other");
		outStr += createNonGearUpgradeTable();
	}
	return outStr;
}

/**
 * Creates a table template page
 * @param {string} tableText The wikitext for a table
 * @return {string}
 */
function createTableTemplatePage(tableText) {
	let outStr = `<noinclude>This template was autogenerated by MelvorWikiBot.\n${BOTCATEGORY}\n[[Category:Tables]]\n${VERSIONCATEGORY}</noinclude>\n`;
	outStr += tableText;
	return outStr;
}

/**
 * Creates the fletching page
 * @return {string}
 * @deprecated
 */
function createFletchingPage() {
	let outstr = "";
	outstr += createSection("Arrows");
	outstr += createFletchingTable("Arrow");
	outstr += createSection("Shortbows");
	outstr += createFletchingTable("Shortbow");
	outstr += createSection("Longbows");
	outstr += createFletchingTable("Longbow");
	return outstr;
}

/**
 * @description Creates the page: Chest Drop Tables
 * @return {string}
 */
function createChestDropTablesPage() {
	let outStr = "";
	for (let i = 0; i < openableItems.length; i++) {
		outStr += createSubSection(formatItemIDAsLink(openableItems[i]));
		// outStr += createChestDropTable(openableItems[i]);
		outStr += `{{${items[openableItems[i]].name}LootTable}}`;
	}
	return outStr;
}

/**
 * @description Creates a template page for the sources of an item
 * @param {number} itemID Index of items array
 * @return {string}
 */
function createItemSourceTemplatePage(itemID) {
	let outStr = `<noinclude>This template was autogenerated by MelvorWikiBot.\n${BOTCATEGORY}\n[[Category:Item Sources]]\n${VERSIONCATEGORY}</noinclude>\n`;
	// Shop Template
	if (items[itemID].shopSources.length > 0) {
		outStr += createSubSection("Shop");
		items[itemID].shopSources.forEach((shopSource) => {
			outStr += `${fillItemShopPurchaseTemplate(shopSource)}\n`;
		});
	}
	// Creation Template
	if (items[itemID].creationSources.length > 0 || items[itemID].upgradesFrom.length > 0) {
		outStr += createSubSection("Creation");
		for (let i = 0; i < items[itemID].creationSources.length; i++) {
			outStr += `${items[itemID].creationSources[i].fillTemplate(itemID)}\n`;
		}
		if (items[itemID].upgradesFrom.length > 0) {
			outStr += `${fillItemUpgradeTemplate(itemID)}\n`;
		}
	}
	// Loot sources Template
	if (items[itemID].hasLootSource) {
		outStr += createSubSection("Loot");
		outStr += `${createItemLootSourcesTable(itemID)}\n`;
	}
	outStr = outStr.slice(0, -1);
	return outStr;
}
