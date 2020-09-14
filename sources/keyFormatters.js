// Contains a collection of functions that format object array keys for Melvor Idle
/**
 * @description Formats a number with the specified number of decimals, padding with 0s
 * @param {number} number Number
 * @param {number} numDecimals Number of decimals
 * @return {string}
 */
function formatNumberDec(number, numDecimals) {
	let outStr = number.toString(10);
	const lengthFront = Math.trunc(number).toString(10).length;
	const lengthEnd = outStr.length - lengthFront - (outStr.length === lengthFront ? 1 : 0);
	let expectedLength = lengthFront + numDecimals + (numDecimals === 0 ? 0 : 1);
	if (outStr.length === lengthFront && numDecimals > 0) {
		// String has no decimal and is expected to
		outStr += ".";
	} else if (lengthEnd > numDecimals) {
		// String has too many decimals and needs to be rounded
		let roundPos = lengthFront + numDecimals + 1;
		if (outStr.charCodeAt(roundPos) > 52) {
			// Round up
			roundPos--;
			let isRounded = false;
			while (!isRounded) {
				// Hit the decimal decrease round position
				if (outStr.charCodeAt(roundPos) === 46) {
					roundPos--;
				}
				if (outStr.charCodeAt(roundPos) === 57) {
					// Case for rounding up a 9
					outStr = `${outStr.substring(0, roundPos)}0${outStr.substring(roundPos + 1)}`;
					if (roundPos === 0) {
						outStr = `1${outStr}`;
						expectedLength++;
						isRounded = true;
					}
					roundPos--;
				} else {
					outStr = outStr.substring(0, roundPos) + String.fromCharCode(outStr.charCodeAt(roundPos) + 1) + outStr.substring(roundPos + 1);
					isRounded = true;
				}
			}
		}
		// Truncate string
		outStr = outStr.substr(0, expectedLength);
	}
	return outStr.padEnd(expectedLength, "0");
}

/**
 * @description Formats a number as a percentage with the specified number of decimals, padding with 0s
 * @param {number} percent Percentage
 * @param {number} numDecimals Number of decimals
 * @return {string}
 */
function formatNumberPerc(percent, numDecimals) {
	return `${formatNumberDec(percent, numDecimals)}%`;
}

/**
 * @description Formats a value as an integer in base 10
 * @param {number} value
 * @return {string}
 */
function formatAsInt(value) {
	return value.toString(10);
}

/**
 * @description Formats a string into a link to a wiki page
 * @param {string} pageTitle Title of page
 * @return {string}
 */
function formatPageLink(pageTitle) {
	return `[[${pageTitle}]]`;
}
// Functions for getting upgrade names
/**
 * Gets the name of an axe upgrade
 * @param {number} tier The tier of axe upgrade
 * @return {string}
 */
function getAxeUpgradeName(tier) {
	return `${setToUppercase(tiers[tier])} Axe`;
}
/**
 * Gets the name of a fishing rod upgrade
 * @param {number} tier The tier of rod upgrade
 * @return {string}
 */
function getRodUpgradeName(tier) {
	return `${setToUppercase(tiers[tier])} Fishing Rod`;
}
/**
 * Gets the name of a pickaxe upgrade
 * @param {number} tier The tier of pick upgrade
 * @return {string}
 */
function getPickUpgradeName(tier) {
	return `${setToUppercase(tiers[tier])} Pickaxe`;
}
/**
 * Gets the name of a cooking fire upgrade
 * @param {number} tier The tier of fire upgrade
 * @return {string}
 */
function getFireUpgradeName(tier) {
	return `${setToUppercase(cookingFireData[tier].tier)} Cooking Fire`;
}
// ID To Image
/**
 * @param {number} id Index of Items
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatItemIDAsImageLink(id, size = 25, alignment = "middle") {
	return createImageLink(`${items[id].name} (item)${getFileExtension(items[id].media)}`, wikiPageNames.items[id], size, alignment);
}
/**
 * @param {number} id Index of MONSTERS
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatMonsterIDAsImageLink(id, size, alignment) {
	return createImageLink(`${MONSTERS[id].name} (monster).svg`, wikiPageNames.monsters[id], size, alignment);
}
/**
 * @param {number} id Index of thievingNPC
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatThievingIDAsImageLink(id, size, alignment) {
	return createImageLink(`${thievingNPC[id].name} (thieving).svg`, wikiPageNames.thievingTarget[id], size, alignment);
}
/**
 * @param {number} id Index of combatAreas
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatCombatAreaIDAsImageLink(id, size, alignment) {
	return createImageLink(`${combatAreas[id].areaName} (combatArea).svg`, wikiPageNames.combatAreas[id], size, alignment);
}
/**
 * @param {number} id Index of Slayer Areas
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatSlayerAreaIDAsImageLink(id, size, alignment) {
	return createImageLink(`${slayerAreas[id].areaName} (combatArea).svg`, wikiPageNames.slayerAreas[id], size, alignment);
}
/**
 * @param {number} id Index of DUNGEONS
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatDungeonIDAsImageLink(id, size, alignment) {
	return createImageLink(`${DUNGEONS[id].name} (dungeon).svg`, wikiPageNames.dungeons[id], size, alignment);
}
/**
 * @param {number} id Index of SPELLS
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatSpellIDAsImageLink(id, size, alignment) {
	return createImageLink(`${SPELLS[id].name} (spell).svg`, wikiPageNames.spells[id], size, alignment);
}
/**
 * @param {number} id Index of axeUpgrades
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatAxeIDAsImageLink(id, size, alignment) {
	return createImageLink(`${getAxeUpgradeName(id)} (upgrade).svg`, wikiPageNames.axeUpgrades[id], size, alignment);
}
/**
 * @param {number} id Index of pickUpgrades
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatPickIDAsImageLink(id, size, alignment) {
	return createImageLink(`${getPickUpgradeName(id)} (upgrade).svg`, wikiPageNames.pickUpgrades[id], size, alignment);
}
/**
 * @param {number} id Index of rodUpgrades
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatRodIDAsImageLink(id, size, alignment) {
	return createImageLink(`${getRodUpgradeName(id)} (upgrade).svg`, wikiPageNames.rodUpgrades[id], size, alignment);
}
/**
 * @param {number} id Index of fireUpgrades
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatFireIDAsImageLink(id, size, alignment) {
	return createImageLink(`${getFireUpgradeName(id)} (upgrade).svg`, wikiPageNames.fireUpgrades[id], size, alignment);
}
/**
 * @param {number} id Index of eatUpgrades
 * @param {number} size Size of image in pixels
 * @param {string} alignment Alignment of image
 * @return {string}
 */
function formatEatIDAsImageLink(id, size, alignment) {
	return createImageLink(`${autoEatData[id].title} (upgrade).svg`, wikiPageNames.eatUpgrades[id], size, alignment);
}

// ID To Link
/**
 * @description Formats an itemID as a page link
 * @param {number} id Index of items
 * @return {string}
 */
function formatItemIDAsLink(id) {
	if (wikiPageNames.items[id] === items[id].name) {
		return formatPageLink(items[id].name);
	}
	return createPageLink(items[id].name, wikiPageNames.items[id]);
}
/**
 * @description Formats a monsterID as a page link
 * @param {number} id Index of MONSTERS
 * @return {string}
 */
function formatMonsterIDAsLink(id) {
	if (wikiPageNames.monsters[id] === MONSTERS[id].name) {
		return formatPageLink(MONSTERS[id].name);
	}
	return createPageLink(MONSTERS[id].name, wikiPageNames.monsters[id]);
}
/**
 * @description Formats a thieving ID as a page link
 * @param {number} id Index of thievingNPC
 * @return {string}
 */
function formatThievingIDAsLink(id) {
	if (wikiPageNames.thievingTarget[id] === thievingNPC[id].name) {
		return formatPageLink(thievingNPC[id].name);
	}
	return createPageLink(thievingNPC[id].name, wikiPageNames.thievingTarget[id]);
}
/**
 * @description Formats a combat area as a page link
 * @param {number} id Index of combatAreas
 * @return {string}
 */
function formatCombatAreaIDAsLink(id) {
	if (wikiPageNames.combatAreas[id] === combatAreas[id].areaName) {
		return formatPageLink(combatAreas[id].areaName);
	}
	return createPageLink(combatAreas[id].areaName, wikiPageNames.combatAreas[id]);
}
/**
 * @description Formats a slayer area as a page link
 * @param {number} id Index of slayerAreas
 * @return {string}
 */
function formatSlayerAreaIDAsLink(id) {
	if (wikiPageNames.slayerAreas[id] === slayerAreas[id].areaName) {
		return formatPageLink(slayerAreas[id].areaName);
	}
	return createPageLink(slayerAreas[id].areaName, wikiPageNames.slayerAreas[id]);
}
/**
 * @description Formats a dungeon as a page link
 * @param {number} id Index of DUNGEONS
 * @return {string}
 */
function formatDungeonIDAsLink(id) {
	if (wikiPageNames.dungeons[id] === DUNGEONS[id].name) {
		return formatPageLink(DUNGEONS[id].name);
	}
	return createPageLink(DUNGEONS[id].name, wikiPageNames.dungeons[id]);
}
/**
 * @description Formats a spell as a page link
 * @param {number} id Index of SPELLS
 * @return {string}
 */
function formatSpellIDAsLink(id) {
	if (wikiPageNames.spells[id] === SPELLS[id].name) {
		return formatPageLink(SPELLS[id].name);
	}
	return createPageLink(SPELLS[id].name, wikiPageNames.spells[id]);
}
/**
 * @description Formats an axe upgrade as a page link
 * @param {number} id Index of axeUpgrades
 * @return {string}
 */
function formatAxeIDAsLink(id) {
	if (wikiPageNames.axeUpgrades[id] === getAxeUpgradeName(id)) {
		return formatPageLink(getAxeUpgradeName(id));
	}
	return createPageLink(getAxeUpgradeName(id), wikiPageNames.axeUpgrades[id]);
}
/**
 * @description Formats a rod upgrade as a page link
 * @param {number} id Index of rodUpgrades
 * @return {string}
 */
function formatRodIDAsLink(id) {
	if (wikiPageNames.rodUpgrades[id] === getRodUpgradeName(id)) {
		return formatPageLink(getRodUpgradeName(id));
	}
	return createPageLink(getRodUpgradeName(id), wikiPageNames.rodUpgrades[id]);
}
/**
 * @description Formats a pick upgrade as a page link
 * @param {number} id Index of pickUpgrades
 * @return {string}
 */
function formatPickIDAsLink(id) {
	if (wikiPageNames.pickUpgrades[id] === getPickUpgradeName(id)) {
		return formatPageLink(getPickUpgradeName(id));
	}
	return createPageLink(getPickUpgradeName(id), wikiPageNames.pickUpgrades[id]);
}
/**
 * @description Formats a cooking fire upgrade as a page link
 * @param {number} id Index of fireUpgrades
 * @return {string}
 */
function formatFireIDAsLink(id) {
	if (wikiPageNames.fireUpgrades[id] === getFireUpgradeName(id)) {
		return formatPageLink(getFireUpgradeName(id));
	}
	return createPageLink(getFireUpgradeName(id), wikiPageNames.fireUpgrades[id]);
}
/**
 * @description Formats an auto-eat upgrade as a page link
 * @param {number} id Index of eatUpgrades
 * @return {string}
 */
function formatEatIDAsLink(id) {
	if (wikiPageNames.eatUpgrades[id] === autoEatData[id].title) {
		return formatPageLink(autoEatData[id].title);
	}
	return createPageLink(autoEatData[id].title, wikiPageNames.eatUpgrades[id]);
}

/**
 * @description Formats a skillName as a skill image
 * @param {string} skillName The name of the skill
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatSkillImage(skillName, size, alignment) {
	return `[[File:${skillName} (skill).svg|${size}px|${alignment}]]`;
}
/**
 * @description Adds a combat image
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatCombatImage(size, alignment) {
	return `[[File:Combat.svg|${size}px|${alignment}]]`;
}
/**
 * @description Formats a skillName as a skill image with a link to the skill page
 * @param {string} skillName The name of the skill
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatSkillImageLink(skillName, size, alignment) {
	return `[[File:${skillName} (skill).svg|${size}px|${alignment}|link=${skillName}]]`;
}

/**
 * Creates an image of the mastery icon
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatMasteryImageLink(size, alignment) {
	return `[[File:Mastery.svg|${size}px|${alignment}|link=Mastery]]`;
}

/**
 * @description Formats the requirement for a skill
 * @param {string} skillName The name of the skill
 * @param {number} levelRequired The level requirement for the skill
 * @return {string}
 */
function formatSkillRequirement(skillName, levelRequired) {
	return `${formatSkillImageLink(skillName, 25, "middle")} ${levelRequired} ${formatPageLink(skillName)}`;
}

/**
 * @description Formats an item requirement
 * @param {number} itemID Index of items array
 * @param {number} quantity Quantity of items required
 * @return {string}
 */
function formatItemRequirement(itemID, quantity) {
	return `${formatItemIDAsImageLink(itemID, 25, "middle")} ${quantity} ${formatItemIDAsLink(itemID)}`;
}

/**
 * @description Formats a prayerName as a an image
 * @param {string} prayerName The name of the prayer
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatPrayerImage(prayerName, size, alignment) {
	return `[[File:${prayerName} (prayer).svg|${size}px|${alignment}]]`;
}

/**
 * @description Formats a shop upgrade as an image
 * @param {string} upgradeName The name of the upgrade
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatUpgradeImage(upgradeName, size, alignment) {
	return `[[File:${upgradeName} (upgrade).svg|${size}px|${alignment}]]`;
}

/**
 * @description Formats an upgradeName as an image with a link to the skill page
 * @param {string} upgradeName The name of the upgrade
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatUpgradeImageLink(upgradeName, size, alignment) {
	return `[[File:${upgradeName} (upgrade).svg|${size}px|${alignment}|link=${upgradeName}]]`;
}

/**
 * @description Formats a cost as the cost then the image of coins
 * @param {number} cost
 * @return {string}
 */
function formatAsShopCost(cost) {
	return `{{GP|${cost}}}`;
}

/**
 * @description Formats barsRequired as ingredients list
 * @param {number[]} ingArray
 * @return {string}
 */
function formatIngredientsRequired(ingArray) {
	return `${formatItemIDAsImageLink(ingArray[0], 25, "middle")} ${formatAsInt(ingArray[1])}`;
}

/**
 * @description formats an itemID as the bars and gp cost
 * @param {number} itemID
 * @return {string}
 */
function formatItemTrimCost(itemID) {
	let outputStr = "";
	for (let i = 0; i < items[itemID].itemsRequired.length; i++) {
		outputStr += `${formatIngredientsRequired(items[itemID].itemsRequired[i])}<br>`;
	}
	if (items[itemID].trimmedGPCost) {
		outputStr += `${formatAsShopCost(items[itemID].trimmedGPCost)}`;
	} else {
		outputStr = outputStr.slice(0, outputStr.length - 4);
	}
	return outputStr;
}

/**
 * @description Formates the cost of creating and item
 * @param {any[]} costArray Array of objects with properties id and qty
 * @return {string}
 */
function formatItemCreationCost(costArray) {
	let outputStr = "";
	for (let i = 0; i < costArray.length; i++) {
		outputStr += `${formatItemRequirement(costArray[i].id, costArray[i].qty)}<br>`;
	}
	return outputStr.slice(0, outputStr.length - 4);
}

/**
 * @description Formats a cost as the cost then the image of slayer coins
 * @param {number} cost
 * @return {string}
 */
function formatAsSlayerCost(cost) {
	return `[[File:Slayer_Coins.svg|25px|middle]] ${cost}`;
}

/**
 * @description Formats an itemID as its sale price
 * @param {number} itemID
 * @return {string}
 */
function formatItemIDasPrice(itemID) {
	return formatAsInt(items[itemID].sellsFor);
}

/**
 * @description Formats time in ms as s
 * @param {number} t time in ms
 * @return {string}
 */
function formatMSasS(t) {
	return formatNumberDec(t / 1000, 0);
}

/**
 * @description formats rateArray into rate/s
 * @param {number[]} rateArray rateArray[0] is amount, rateAray[1] is time in ms
 * @return {string}
 */
function formatAsRate(rateArray) {
	return formatNumberDec((rateArray[0] / rateArray[1]) * 1000, 2);
}

/**
 * @description Formats the stat change between an item and its trimmed version
 * @param {number} itemID
 * @return {string}
 */
function formatUpgradeChange(itemID) {
	// Key: Default if not found
	let outStr = "";
	const statsToCheck = {
		attackSpeed: 0,
		attackBonus: [0, 0, 0],
		rangedAttackBonus: 0,
		magicAttackBonus: 0,
		strengthBonus: 0,
		rangedStrengthBonus: 0,
		magicDamageBonus: 0,
		defenceBonus: 0,
		rangedDefenceBonus: 0,
		magicDefenceBonus: 0,
		damageReduction: 0,
		attackLevelRequired: 1,
		defenceLevelRequired: 1,
		rangedLevelRequired: 1,
		magicLevelRequired: 1,
	};
	const statNames = {
		attackSpeed: "Attack Speed",
		attackBonus: [`${formatSkillImageLink("Attack", 25, "middle")} Stab Bonus`, `${formatSkillImageLink("Strength", 25, "middle")} Slash Bonus`, `${formatSkillImageLink("Defence", 25, "middle")} Block Bonus`],
		rangedAttackBonus: `${formatSkillImageLink("Ranged", 25, "middle")} Attack Bonus`,
		magicAttackBonus: `${formatSkillImageLink("Magic", 25, "middle")} Attack Bonus`,
		strengthBonus: `${formatSkillImageLink("Strength", 25, "middle")} Strength Bonus`,
		rangedStrengthBonus: `${formatSkillImageLink("Ranged", 25, "middle")} Strength Bonus`,
		magicDamageBonus: `${formatSkillImageLink("Magic", 25, "middle")} Damage Bonus`,
		defenceBonus: `${formatSkillImageLink("Defence", 25, "middle")} Defence Bonus`,
		rangedDefenceBonus: `${formatSkillImageLink("Ranged", 25, "middle")} Defence Bonus`,
		magicDefenceBonus: `${formatSkillImageLink("Magic", 25, "middle")} Defence Bonus`,
		damageReduction: `${formatSkillImageLink("Defence", 25, "middle")} Damage Reduction`,
		attackLevelRequired: `${formatSkillImageLink("Attack", 25, "middle")} Level Required`,
		defenceLevelRequired: `${formatSkillImageLink("Defence", 25, "middle")} Level Required`,
		rangedLevelRequired: `${formatSkillImageLink("Ranged", 25, "middle")} Level Required`,
		magicLevelRequired: `${formatSkillImageLink("Magic", 25, "middle")} Level Required`,
	};
	const trimmedID = items[itemID].trimmedItemID;
	let statVal1 = 0;
	let statVal2 = 0;
	// Go through each available stat and add to string if there's a difference
	Object.keys(statsToCheck).forEach((key) => {
		if (key === "attackBonus") {
			let attBon1 = statsToCheck[key];
			let attBon2 = statsToCheck[key];
			if (items[itemID][key] !== undefined) {
				attBon1 = items[itemID][key];
			}
			if (items[trimmedID][key] !== undefined) {
				attBon2 = items[trimmedID][key];
			}

			for (let i = 0; i < statsToCheck[key].length; i++) {
				if (attBon2[i] > attBon1[i]) {
					outStr += `+${attBon2[i] - attBon1[i]} ${statNames[key][i]}<br />`;
				} else if (attBon2[i] < attBon1[i]) {
					outStr += `-${attBon1[i] - attBon2[i]} ${statNames[key][i]}<br />`;
				}
			}
		} else {
			if (items[itemID][key] !== undefined) {
				statVal1 = items[itemID][key];
			} else {
				statVal1 = statsToCheck[key];
			}
			if (items[trimmedID][key] !== undefined) {
				statVal2 = items[trimmedID][key];
			} else {
				statVal2 = statsToCheck[key];
			}
			if (statVal1 < statVal2) {
				outStr += `+${statVal2 - statVal1} ${statNames[key]}<br />`;
			} else if (statVal1 > statVal2) {
				outStr += `-${statVal1 - statVal2} ${statNames[key]}<br />`;
			}
		}
	});
	return outStr.substring(0, outStr.length - 6);
}

/**
 * Formats an attack type as an image icon with no link
 * @param {number} type Attack type ID
 * @return {string}
 */
function formatAttackTypeIcon(type) {
	if (type === CONSTANTS.attackType.Melee) {
		return `${formatCombatImage(25, "middle")}`;
	} else if (type === CONSTANTS.attackType.Ranged) {
		return `${formatSkillImage("Ranged", 25, "middle")}`;
	}
	return `${formatSkillImage("Magic", 25, "middle")}`;
}

/**
 * Formats an attack type as the name of the type
 * @param {number} type Attack type ID
 * @return {string}
 */
function formatAttackTypeName(type) {
	if (type === CONSTANTS.attackType.Melee) {
		return `Melee`;
	} else if (type === CONSTANTS.attackType.Ranged) {
		return `Ranged`;
	}
	return `Magic`;
}

/**
 * @description Formats a monsters attack type
 * @param {number} type
 * @return {string}
 */
function formatAttackType(type) {
	return `${formatAttackTypeIcon(type)} ${formatAttackTypeName(type)}`;
}

/**
 * @description Formats a requirement object array into a table
 * @param {Object} requirements
 * @return {string}
 */
function formatCraftReq(requirements) {
	let outStr = "";
	for (let i = 0; i < requirements.length; i++) {
		outStr += `${requirements[i].qty} ${formatItemIDAsImageLink(requirements[i].id, 25, "middle")} `;
	}
	return outStr;
}

/**
 * @description Formatting function for smithing quantity
 * @param {number} itemID
 * @return {string}
 */
function formatItemIDasSmithingQty(itemID) {
	if (items[itemID].smithingQty) {
		return formatAsInt(items[itemID].smithingQty);
	}
	return formatAsInt(1);
}

/*
DEPRECATED FUNCTION
//Find the sources from which an item can be obtained and add them to a string:
//Potential Sources:
//Drop from enemy
//Loot from chests/birdnests
//Loot from thieving
//Upgrading from another item
//Skills: Woodcutting, Fishing, Cooking, Mining, Smithing, Farming, Fletching and Crafting
function formatItemIDasItemSource(itemID) {
    var outputStr = '';
    //Search monster drops
    var monsterList = '';
    for (let i = 0; i < MONSTERS.length; i++) {
        if (MONSTERS[i].lootTable !== undefined && selectMonsters(MONSTERS[i])) {
            for (let j = 0; j < MONSTERS[i].lootTable.length; j++) {
                if (MONSTERS[i].lootTable[j][0] === itemID) {
                    monsterList += `${formatMonsterIDAsImageLink(i, 25, 'middle')}, `;
                    break;
                }
            }
        }
    }
    if (monsterList !== '') {
        outputStr += `Killing: ${monsterList.slice(0, monsterList.length - 2)}<br />`;
    }
    var chestList = '';
    //Search openable items
    if (window.openableItems === undefined) {
        getOpenableItems();
    }
    for (let i = 0; i < openableItems.length; i++) {
        for (let j = 0; j < items[openableItems[i]].dropTable.length; j++) {
            if (items[openableItems[i]].dropTable[j][0] === itemID) {
                chestList += `${formatItemIDAsImageLink(openableItems[i], 25, 'middle')}, `;
                break;
            }
        }
    }
    if (chestList !== '') {
        outputStr += `Opening: ${chestList.slice(0, chestList.length - 2)}<br />`;
    }
    var thieveList = '';
    //Search thieving targets
    for (let i = 0; i < thievingNPC.length; i++) {
        for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
            if (thievingNPC[i].lootTable[j][0] === itemID) {
                thieveList += `${formatThievingIDAsImageLink(i, 25, 'middle')}, `
                break;
            }
        }
    }
    if (thieveList !== '') {
        outputStr += `Pickpocketing: ${thieveList.slice(0, thieveList.length - 2)}<br />`;
    }
    var farmList = '';
    var cookList = '';
    var burnList = '';
    //Search items for upgrades, being cooked, being farmed, being burnt
    for (let i = 0; i < items.length; i++) {
        if (items[i].trimmedItemID === itemID) {
            outputStr += `Upgrading: ${formatItemIDAsImageLink(i, 25, 'middle')}<br />`
        }
        if (items[i].grownItemID === itemID) {
            farmList += `${formatItemIDAsImageLink(i, 25, 'middle')}, `
        }
        if (items[i].cookedItemID === itemID) {
            cookList += `${formatItemIDAsImageLink(i, 25, 'middle')}, `
        }
        if (items[i].burntItemID === itemID) {
            burnList += `${formatItemIDAsImageLink(i, 25, 'middle')}, `
        }
    }
    if (farmList !== '') {
        outputStr += `Growing: ${farmList.slice(0, farmList.length - 2)}<br />`;
    }
    if (cookList !== '') {
        outputStr += `Cooking: ${cookList.slice(0, cookList.length - 2)}<br />`;
    }
    if (burnList !== '') {
        outputStr += `Burning: ${burnList.slice(0, burnList.length - 2)}<br />`;
    }

    //Check for skills
    //Woodcutting
    for (let i = 0; i < trees.length; i++) {
        if (i === itemID) {
            outputStr += `${formatSkillImageLink('Woodcutting', 25, 'middle')} (Lv. ${trees[i].level})<br />`;
        }
    }
    //Fishing
    for (let i = 0; i < fishData.length; i++) {
        if (fishData[i].itemID === itemID) {
            outputStr += `${formatSkillImageLink('Fishing', 25, 'middle')} (Lv. ${fishData[i].level})<br />`;
        }
    }
    //Mining
    if (items[itemID].miningLevel !== undefined) {
        outputStr += `${formatSkillImageLink('Mining', 25, 'middle')} (Lv. ${items[itemID].miningLevel})<br />`;
    }

    //Smithing
    if (items[itemID].smithingLevel !== undefined) {
        outputStr += `${formatSkillImageLink('Smithing', 25, 'middle')} (Lv. ${items[itemID].smithingLevel})<br />`;
    }
    //Fletching
    if (items[itemID].fletchingLevel !== undefined) {
        outputStr += `${formatSkillImageLink('Fletching', 25, 'middle')} (Lv. ${items[itemID].fletchingLevel})<br />`;
    }
    //Crafting
    if (items[itemID].craftingLevel !== undefined) {
        outputStr += `${formatSkillImageLink('Crafting', 25, 'middle')} (Lv. ${items[itemID].craftingLevel})<br />`;
    }
    //Shop
    //skillcapeItems,gloveID,
    var shopItems = [CONSTANTS.item.Green_Dragonhide, CONSTANTS.item.Blue_Dragonhide, CONSTANTS.item.Red_Dragonhide, CONSTANTS.item.Cooking_Gloves, CONSTANTS.item.Mining_Gloves, CONSTANTS.item.Smithing_Gloves, CONSTANTS.item.Thieving_Gloves, CONSTANTS.item.Gem_Gloves, CONSTANTS.item.Bowstring, CONSTANTS.item.Compost, CONSTANTS.item.Leather];
    var inShop = false;
    for (let i = 0; i < shopItems.length; i++) {
        if (itemID === shopItems[i]) {
            inShop = true;
            break;
        }
    }
    for (let i = 0; i < skillcapeItems.length; i++) {
        if (itemID === skillcapeItems[i]) {
            inShop = true;
            break;
        }
    }
    if (inShop) {
        outputStr += '[[Shop]]<br />';
    }

    if (itemID === CONSTANTS.item.Fire_Cape) {
        outputStr += '[[Elite Dungeon]]<br />';
    }
    if (outputStr !== '') {
        outputStr = outputStr.slice(0, outputStr.length - 6);
    } else {
        outputStr = 'None';
    }

    return outputStr
}
*/
/**
 * @description Formats a boolean as a Yes or No entry
 * @param {boolean} bool
 * @return {string}
 */
function formatBoolAsYesNo(bool) {
	return bool ? "Yes" : "No";
}

/**
 * @description Formats an spell name as a spell image
 * @param {string} name The name of the spell
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatSpellImage(name, size, alignment) {
	return `[[File:${name} (spell).svg|${size}px|${alignment}]]`;
}

/**
 * @description Formats a curse name as a curse image
 * @param {string} name The name of the spell
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatCurseImage(name, size, alignment) {
	return `[[File:${name} (curse).svg|${size}px|${alignment}]]`;
}

/**
 * @description Formats an aurora name as an aurora image
 * @param {string} name The name of the spell
 * @param {number} size The size of the image in pixels
 * @param {string} alignment The alignment of the image
 * @return {string}
 */
function formatAuroraImage(name, size, alignment) {
	return `[[File:${name} (aurora).svg|${size}px|${alignment}]]`;
}

/**
 * @description Formats a string array into a bullet list
 * @param {string[]} sourceArray
 * @return {string}
 */
function formatArrayAsBulletList(sourceArray) {
	let outStr = "";
	for (let i = 0; i < sourceArray.length; i++) {
		outStr += `*${sourceArray[i]}\n`;
	}
	return outStr.substring(0, outStr.length - 1);
}
/**
 * @description Formats a string array by seperating each item by a newline
 * @param {string[]} sourceArray
 * @return {string}
 */
function formatArrayAsNewlines(sourceArray) {
	let outStr = "";
	for (let i = 0; i < sourceArray.length; i++) {
		outStr += `${sourceArray[i]}<br />`;
	}
	return outStr.substring(0, outStr.length - 6);
}

/**
 * @description Formats a quantity array. qty[0] is min, qty[1] is max
 * @param {number[]} qty
 * @return {string}
 */
function formatAsDropQty(qty) {
	if (qty[0] === qty[1]) {
		return `${qty[0]}`;
	}
	return `${qty[0]}-${qty[1]}`;
}
/**
 * @description Calculates the loot chance of a monster and formats as X%
 * @param {number} monsterID
 * @return {string}
 */
function formatMonsterIDAsDropChance(monsterID) {
	const lootChance = MONSTERS[monsterID].lootChance !== undefined ? MONSTERS[monsterID].lootChance / 100 : 1;
	const realChance = lootChance * 100;
	return formatNumberPerc(realChance, 0);
}

/**
 * @description Formats the description of a prayer for the table
 * @param {number} prayerID
 * @return {string[]}
 */
function getPrayerEffectArray(prayerID) {
	const effects = [];
	for (let i = 0; i < PRAYER[prayerID].vars.length; i++) {
		const prayerBonus = PRAYER[prayerID].vars[i];
		if (prayerBonusNumeric[prayerBonus]) {
			effects.push(`+${PRAYER[prayerID].values[i]}% ${prayerBonusDictionary[prayerBonus]}`);
		} else {
			effects.push(prayerBonusDictionary[prayerBonus]);
		}
	}
	if (PRAYER[prayerID].pointsPerPlayer > 0) {
		effects.push(`+${((2 / numberMultiplier) * PRAYER[prayerID].pointsPerPlayer).toFixed(2)} prayer xp per damage done`);
	}
	return effects;
}

/**
 * @description Formats the costs of a prayer
 * @param {number[]} costArray
 * @return {string}
 */
function formatPrayerCosts(costArray) {
	const costStrings = [];
	if (costArray[0] > 0) {
		costStrings.push(`${costArray[0]} per enemy attack`);
	}
	if (costArray[1] > 0) {
		costStrings.push(`${costArray[1]} per player attack`);
	}
	if (costArray[2] > 0) {
		costStrings.push(`${costArray[2]} per HP regen`);
	}
	if (costArray.length === 0) {
		costStrings.push("None");
	}
	return formatArrayAsNewlines(costStrings);
}

/**
 * @description Computes the combat level of a monster
 * @param {number} monsterID Index of MONSTERS
 * @return {number}
 */
function getMonsterCombatLevel(monsterID) {
	const prayer = 1;
	const base = 0.25 * (MONSTERS[monsterID].defenceLevel + MONSTERS[monsterID].hitpoints + Math.floor(prayer / 2));
	const melee = 0.325 * (MONSTERS[monsterID].attackLevel + MONSTERS[monsterID].strengthLevel);
	const range = 0.325 * Math.floor((3 * MONSTERS[monsterID].rangedLevel) / 2);
	const magic = 0.325 * Math.floor((3 * MONSTERS[monsterID].magicLevel) / 2);
	const levels = [melee, range, magic];
	return Math.floor(base + Math.max(...levels));
}
/**
 * @description Computes the max hit of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterMaxHit(monsterID) {
	let maximumStrengthRoll;
	if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Melee) {
		const effectiveStrengthLevel = Math.floor(MONSTERS[monsterID].strengthLevel + 8 + 1);
		maximumStrengthRoll = Math.floor(numberMultiplier * (1.3 + effectiveStrengthLevel / 10 + MONSTERS[monsterID].strengthBonus / 80 + (effectiveStrengthLevel * MONSTERS[monsterID].strengthBonus) / 640));
	} else if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Ranged) {
		const effectiveStrengthLevel = Math.floor(MONSTERS[monsterID].rangedLevel + 8 + 1);
		maximumStrengthRoll = Math.floor(numberMultiplier * (1.3 + effectiveStrengthLevel / 10 + MONSTERS[monsterID].strengthBonusRanged / 80 + (effectiveStrengthLevel * MONSTERS[monsterID].strengthBonusRanged) / 640));
	} else if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Magic) {
		if (MONSTERS[monsterID].selectedSpell === null || MONSTERS[monsterID].selectedSpell === undefined) maximumStrengthRoll = Math.floor(numberMultiplier * (MONSTERS[monsterID].setMaxHit + MONSTERS[monsterID].setMaxHit * (MONSTERS[monsterID].damageBonusMagic / 100)));
		else maximumStrengthRoll = Math.floor(numberMultiplier * (SPELLS[MONSTERS[monsterID].selectedSpell].maxHit + SPELLS[MONSTERS[monsterID].selectedSpell].maxHit * (MONSTERS[monsterID].damageBonusMagic / 100)));
	}
	return maximumStrengthRoll;
}

/**
 * Gets the True max hit of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterTrueMaxHit(monsterID) {
	let maxHit = 0;
	let normalChance = 100;
	const normalMaxHit = getMonsterMaxHit(monsterID);
	if (MONSTERS[monsterID].hasSpecialAttack) {
		let specialMax;
		for (let i = 0; i < MONSTERS[monsterID].specialAttackID.length; i++) {
			const specialAttack = enemySpecialAttacks[MONSTERS[monsterID].specialAttackID[i]];
			if (MONSTERS[monsterID].overrideSpecialChances !== undefined) {
				normalChance -= MONSTERS[monsterID].overrideSpecialChances[i];
			} else {
				normalChance -= specialAttack.chance;
			}
			if (specialAttack.setDamage !== null) {
				specialMax = specialAttack.setDamage * numberMultiplier;
			} else {
				specialMax = normalMaxHit;
			}
			specialMax *= specialAttack.stunDamageMultiplier;
			if (specialMax > maxHit) maxHit = specialMax;
		}
	}
	if (normalChance > 0 && normalMaxHit > maxHit) maxHit = normalMaxHit;
	// Special Attack Max Hit
	return maxHit;
}
/**
 * @description Computes the accuracy of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterAccuracy(monsterID) {
	let maximumAttackRoll;
	if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Melee) {
		const effectiveAttackLevel = Math.floor(MONSTERS[monsterID].attackLevel + 8 + 1);
		maximumAttackRoll = effectiveAttackLevel * (MONSTERS[monsterID].attackBonus + 64);
	} else if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Ranged) {
		const effectiveAttackLevel = Math.floor(MONSTERS[monsterID].rangedLevel + 8 + 1);
		maximumAttackRoll = effectiveAttackLevel * (MONSTERS[monsterID].attackBonusRanged + 64);
	} else if (MONSTERS[monsterID].attackType === CONSTANTS.attackType.Magic) {
		const effectiveAttackLevel = Math.floor(MONSTERS[monsterID].magicLevel + 8 + 1);
		maximumAttackRoll = effectiveAttackLevel * (MONSTERS[monsterID].attackBonusMagic + 64);
	}
	return maximumAttackRoll;
}
/**
 * @description Computes the melee evasion of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterMeleeEvasion(monsterID) {
	const effectiveDefenceLevel = Math.floor(MONSTERS[monsterID].defenceLevel + 8 + 1);
	return effectiveDefenceLevel * (MONSTERS[monsterID].defenceBonus + 64);
}
/**
 * @description Computes the ranged evasion of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterRangedEvasion(monsterID) {
	const effectiveDefenceLevel = Math.floor(MONSTERS[monsterID].defenceLevel + 8 + 1);
	return effectiveDefenceLevel * (MONSTERS[monsterID].defenceBonusRanged + 64);
}
/**
 * @description Computes the magic evasion of a monster
 * @param {number} monsterID
 * @return {number}
 */
function getMonsterMagicEvasion(monsterID) {
	const effectiveMagicDefenceLevel = Math.floor(Math.floor(MONSTERS[monsterID].magicLevel * 0.7) + Math.floor(MONSTERS[monsterID].defenceLevel * 0.3) + 8 + 1);
	return effectiveMagicDefenceLevel * (MONSTERS[monsterID].defenceBonusMagic + 64);
}

/**
 * Gets the chance for a monster to drop items and coins
 * @param {number} monsterID Index of MONSTERS
 * @return {number}
 */
function getMonsterLootChance(monsterID) {
	return MONSTERS[monsterID].lootChance !== undefined ? MONSTERS[monsterID].lootChance : 100;
}

/**
 * @description Formats the attacks of a monster for monster templates
 * @return {string} String for template
 * @param {number} monsterID Index of MONSTERS array
 * @return {string}
 */
function formatMonsterAttacks(monsterID) {
	let outStr = "";
	let normalAttackChance = 100;
	const attackChances = [];
	if (MONSTERS[monsterID].specialAttackID !== undefined) {
		for (let i = 0; i < MONSTERS[monsterID].specialAttackID.length; i++) {
			const specialID = MONSTERS[monsterID].specialAttackID[i];
			if (MONSTERS[monsterID].overrideSpecialChances !== undefined) {
				attackChances.push(MONSTERS[monsterID].overrideSpecialChances[i]);
				normalAttackChance -= MONSTERS[monsterID].overrideSpecialChances[i];
			} else {
				attackChances.push(enemySpecialAttacks[specialID].chance);
				normalAttackChance -= enemySpecialAttacks[specialID].chance;
			}
		}
	}
	if (normalAttackChance === 100) {
		outStr += `${formatAttackTypeIcon(MONSTERS[monsterID].attackType)} 1-${getMonsterMaxHit(monsterID)} ${formatAttackTypeName(MONSTERS[monsterID].attackType)} Damage\n`;
	} else if (normalAttackChance > 0) {
		outStr += `* ${normalAttackChance}% ${formatAttackTypeIcon(MONSTERS[monsterID].attackType)} 1-${getMonsterMaxHit(monsterID)} ${formatAttackTypeName(MONSTERS[monsterID].attackType)} Damage\n`;
		for (let i = 0; i < MONSTERS[monsterID].specialAttackID.length; i++) {
			const specialID = MONSTERS[monsterID].specialAttackID[i];
			outStr += `* ${attackChances[i]}% ${formatAttackTypeIcon(MONSTERS[monsterID].attackType)} ${enemySpecialAttacks[specialID].name}\n`;
			outStr += `** ${enemySpecialAttacks[specialID].description}\n`;
		}
	} else {
		for (let i = 0; i < MONSTERS[monsterID].specialAttackID.length; i++) {
			const specialID = MONSTERS[monsterID].specialAttackID[i];
			outStr += `* ${attackChances[i]}% ${formatAttackTypeIcon(MONSTERS[monsterID].attackType)} ${enemySpecialAttacks[specialID].name}\n`;
			outStr += `** ${enemySpecialAttacks[specialID].description}\n`;
		}
	}
	return outStr;
}

/**
 * @description Formats a monster's loot chance as a percentage
 * @param {number} monsterID Index of MONSTERS array
 * @return {string}
 */
function formatMonsterLootChance(monsterID) {
	const lootChance = getMonsterLootChance(monsterID);
	return `${lootChance.toFixed(2)}%`;
}

/**
 * @description Formats a monsters drops into a bullet list
 * @param {number} monsterID Index of MONSTERS array
 * @return {string}
 */
function formatMonsterDrops(monsterID) {
	let outputStr = "";
	if (isMonsterDungeonOnly(monsterID)) {
		if (MONSTERS[monsterID].isGodMonster) {
			outputStr += "'''Always Drops:''' \n";
			outputStr += '{| class="wikitable"\n';
			outputStr += "|-\n";
			outputStr += "! Img !! Item !! Max Qty !! Chance\n";
			outputStr += "|-\n";
			const boneQty = MONSTERS[monsterID].boneQty !== undefined ? MONSTERS[monsterID].boneQty : 1;
			outputStr += `| ${formatItemIDAsImageLink(MONSTERS[monsterID].bones, 25, "middle")} || ${formatItemIDAsLink(MONSTERS[monsterID].bones)} || ${formatAsDropQty([boneQty, boneQty])} || 100% \n`;
			outputStr += "|}";
		} else {
			outputStr += "None";
		}
	} else {
		if (MONSTERS[monsterID].bones !== null) {
			outputStr += "'''Always Drops:''' \n";
			outputStr += '{| class="wikitable"\n';
			outputStr += "|-\n";
			outputStr += "! Img !! Item !! Max Qty !! Chance\n";
			outputStr += "|-\n";
			outputStr += `| ${formatItemIDAsImageLink(MONSTERS[monsterID].bones, 25, "middle")} || ${formatItemIDAsLink(MONSTERS[monsterID].bones)} || 1 || 100% \n`;
			outputStr += "|}";
		}
		outputStr += `'''Can also drop:''' \n`;
		outputStr += '{| class="wikitable"\n';
		outputStr += "|-\n";
		outputStr += "! Img !! Item !! Max Qty !! Chance\n";
		outputStr += "|-\n";
		outputStr += `| [[File:Coins.svg|25px|middle|link=GP]] || [[GP]] || ${MONSTERS[monsterID].dropCoins[0]}-${MONSTERS[monsterID].dropCoins[1]} || ${formatMonsterLootChance(monsterID)}\n`;
		outputStr += `|}`;
		outputStr += `'''Can also drop:''' \n`;
		outputStr += '{| class="wikitable"\n';
		outputStr += "|-\n";
		outputStr += "! Img !! Item !! Max Qty !! Chance\n";
		if (MONSTERS[monsterID].lootTable.length > 0) {
			let tableWeight = 0;
			for (let i = 0; i < MONSTERS[monsterID].lootTable.length; i++) {
				tableWeight += MONSTERS[monsterID].lootTable[i][1];
			}
			for (let i = 0; i < MONSTERS[monsterID].lootTable.length; i++) {
				let percStr = (((100 * MONSTERS[monsterID].lootTable[i][1]) / tableWeight) * (getMonsterLootChance(monsterID) / 100)).toFixed(2);
				outputStr += "|-\n";
				outputStr += `| ${formatItemIDAsImageLink(MONSTERS[monsterID].lootTable[i][0], 25, "middle")} || ${formatItemIDAsLink(MONSTERS[monsterID].lootTable[i][0])} || ${formatAsDropQty([1, MONSTERS[monsterID].lootTable[i][2]])} || ${percStr}% \n`;
			}
		}
		outputStr += `|}`;
	}
	return outputStr;
}

/**
 * @description Experimental function to automatically generate brief descriptions for item pages
 * @param {number} itemID Index of items array
 * @return {string}
 * @deprecated
 */
function createItemDescription(itemID) {
	let description = `${items[itemID].name} `;
	if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Weapon) {
		// Items that are weapons
		let weaponType = "melee";
		if (items[itemID].type === "Ranged Weapon" || items[itemID].isRanged) {
			weaponType = "ranged";
		} else if (items[itemID].isMagic) {
			weaponType = "magic";
		}
		let weaponHandedness = "one-handed";
		if (items[itemID].isTwoHanded) {
			weaponHandedness = "two-handed";
		}
		description += `a ${weaponHandedness}, ${weaponType} weapon.`;
	} else if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Quiver) {
		// Items that are arrows
		description += `are ranged ammunition that provide +${items[itemID].rangedStrengthBonus} ranged strenth bonus.`;
	} else if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Ring) {
		description += `The ${description} can be equipped in the ring slot.`;
	} else if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Amulet) {
		description += `The ${description} can be equipped in the amulet slot.`;
	} else if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Cape) {
		description = `The ${description} can be equipped in the cape slot.`;
	} else if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Gloves) {
		if (items[itemID].defenceLevelRequired !== undefined) {
			description += `are a piece of melee armour that can be worn in the gloves slot.`;
		} else if (items[itemID].rangedLevelRequired !== undefined) {
			description += `are a piece of ranged armour that can be worn in the gloves slot.`;
		} else if (items[itemID].magicLevelRequired !== undefined) {
			description += `are a piece of magic armour that can be worn in the gloves slot.`;
		} else {
			description += `are a pair of skill gloves that provide the following bonus when worn: ${items[itemID].description}.`;
		}
	} else if (items[itemID].healsFor !== undefined) {
		// Items that can heal
		description += `is a type of food that heals for ${items[itemID].healsFor} hitpoints.`;
	} else {
		// Items that are not used
		description += `is an item that currently has no use.`;
	}
	return description;
}

/**
 * @description Formats a dungeonID as a string of drops
 * @param {number} dungeonID Index of DUNGEONS
 * @return {string}
 */
function formatDungeonDrops(dungeonID) {
	const monsterID = DUNGEONS[dungeonID].monsters[DUNGEONS[dungeonID].monsters.length - 1];
	let outputStr = `* [[File:Coins.svg|25px|middle|link=GP]] ${MONSTERS[monsterID].dropCoins[0]}-${MONSTERS[monsterID].dropCoins[1]}\n`;
	for (let i = 0; i < DUNGEONS[dungeonID].rewards.length; i++) {
		outputStr += `* ${formatItemIDAsImageLink(DUNGEONS[dungeonID].rewards[i], 25, "middle")} ${formatAsDropQty([1, 1])} ${formatItemIDAsLink(DUNGEONS[dungeonID].rewards[i])}\n`;
	}
	return outputStr;
}

/**
 * Gets a string array of a prayer's costs
 * @param {number} prayerID Index of PRAYER
 * @return {string[]}
 */
function getPrayerCostArray(prayerID) {
	const prayerCosts = [];
	if (PRAYER[prayerID].pointsPerEnemy) {
		let pointString = "Points";
		if (PRAYER[prayerID].pointsPerEnemy === 1) {
			pointString = "Point";
		}
		prayerCosts.push(`${PRAYER[prayerID].pointsPerEnemy} Prayer ${pointString} when a monster attacks`);
	}
	if (PRAYER[prayerID].pointsPerPlayer) {
		let pointString = "Points";
		if (PRAYER[prayerID].pointsPerPlayer === 1) {
			pointString = "Point";
		}
		prayerCosts.push(`${PRAYER[prayerID].pointsPerPlayer} Prayer ${pointString} when you attack`);
	}
	if (PRAYER[prayerID].pointsPerRegen) {
		let pointString = "Points";
		if (PRAYER[prayerID].pointsPerRegen === 1) {
			pointString = "Point";
		}
		prayerCosts.push(`${PRAYER[prayerID].pointsPerRegen} Prayer ${pointString} when you regenerate hitpoints`);
	}
	return prayerCosts;
}

/**
 * @description Creates a string array of 25px monster images with their names
 * @param {*} areaData Element of combatAreas or DUNGEONS
 * @return {string[]}
 */
function getMonsterArray(areaData) {
	const monsterArray = [];
	for (let i = 0; i < areaData.monsters.length; i++) {
		monsterArray.push(`${formatMonsterIDAsImageLink(areaData.monsters[i], 25, "middle")} ${formatMonsterIDAsLink(areaData.monsters[i])}`);
	}
	return monsterArray;
}

/**
 * Formats the condensed monsters of a dungeon into a string array
 * @param {*} condensedMonsters Condensed monsters of Dungeon
 * @return {string[]}
 */
function getDungeonMonsterArray(condensedMonsters) {
	const monsterArray = [];
	condensedMonsters.forEach((monster) => {
		monsterArray.push(`${formatMonsterIDAsImageLink(monster.id, 25, "middle")} ${formatMonsterIDAsLink(monster.id)} x${monster.quantity}`);
	});
	return monsterArray;
}

/**
 * @description Creates an array of the spell requirements with image, qty and name link
 * @param {number} spellID Index of spellArray array
 * @param {Array} spellArray Spell array to get cost from
 * @param {boolean} alt Get combo rune recipe
 * @return {string[]}
 */
function getSpellRuneArray(spellID, spellArray = SPELLS, alt = false) {
	const runeArray = [];
	if (alt) {
		spellArray[spellID].runesRequiredAlt.forEach((rune) => {
			runeArray.push(`${formatItemIDAsImageLink(rune.id, 25, "middle")} ${formatAsInt(rune.qty)} ${formatItemIDAsLink(rune.id)}`);
		});
	} else {
		spellArray[spellID].runesRequired.forEach((rune) => {
			runeArray.push(`${formatItemIDAsImageLink(rune.id, 25, "middle")} ${formatAsInt(rune.qty)} ${formatItemIDAsLink(rune.id)}`);
		});
	}
	return runeArray;
}

/**
 * Formats the rune requriements of a spell
 * @param {Object} spell spell object from one of the spell arrays
 * @param {Array} spell.runesRequired normal recipe
 * @param {Array} spell.runesRequiredAlt alt recipe
 * @param {Function} arrayFormat function to join the array
 * @return {string}
 */
function formatSpellAsRuneRequirements(spell, arrayFormat) {
	const formatRune = (rune) => {
		return `${formatItemIDAsImageLink(rune.id, 25, "middle")} ${formatAsInt(rune.qty)} ${formatItemIDAsLink(rune.id)}`;
	};
	// Format Normal cost
	let runeReq = arrayFormat(spell.runesRequired.map(formatRune));
	// Check for alt cost, and check if alt cost is identical
	if (spell.runesRequiredAlt !== undefined && JSON.stringify(spell.runesRequired) !== JSON.stringify(spell.runesRequiredAlt)) {
		runeReq += `<br>'''Or:'''<br>\n${arrayFormat(spell.runesRequiredAlt.map(formatRune))}`;
	}
	return runeReq;
}

/**
 * Gets a formatted string array of the items that can be upgraded into itemID
 * @param {number} itemID Index of items array
 * @return {string[]}
 */
function getUpgradesFromArray(itemID) {
	const upgradesFrom = [];
	items[itemID].upgradesFrom.forEach((sourceItem) => {
		upgradesFrom.push(`${formatItemIDAsImageLink(sourceItem, 25, "middle")} ${formatItemIDAsLink(sourceItem)}`);
	});
	return upgradesFrom;
}

/**
 * Dummy function that returns the input
 * @param {*} x input
 * @return {*}
 */
function returnSelf(x) {
	return x;
}
