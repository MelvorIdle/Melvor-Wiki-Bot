// User Interface Generating Functions
/**
 * Creates a button
 * @param {string} text Text on button
 * @param {Function} funOnClick callback function when button is clicked
 * @return {HTMLButtonElement}
 */
function createButton(text, funOnClick) {
	// Create a newButton
	const newButton = document.createElement("button");
	newButton.setAttribute("type", "button");
	newButton.className = "mweButton";
	newButton.onclick = funOnClick;
	newButton.textContent = text;
	return newButton;
}

/**
 * Creates a dropdown element
 * @param {string[]} optionText Text of options
 * @param {Array} optionValues Values of options
 * @param {string} dropDownID DOM ID string
 * @param {Function} onChangeCallback Callback when option changes
 * @param {string} width Style width
 * @return {HTMLSelectElement}
 */
function createDropdown(optionText, optionValues, dropDownID, onChangeCallback, width) {
	const newDropdown = document.createElement("select");
	newDropdown.className = "mweDropdown";
	newDropdown.style.width = width;
	newDropdown.id = dropDownID;
	for (let i = 0; i < optionText.length; i++) {
		const newOption = document.createElement("option");
		newOption.text = optionText[i];
		newOption.value = optionValues[i];
		newOption.className = "mweOption";
		newDropdown.add(newOption);
	}
	newDropdown.addEventListener("change", onChangeCallback);
	return newDropdown;
}

/**
 * Creates the login screen and appends it to the document body
 */
function createLoginScreen() {
	const loginPanel = document.createElement("div");
	loginPanel.className = "mweLogin mweFlexCol";
	loginPanel.id = "wikiLogin";
	document.body.appendChild(loginPanel);

	const loginForm = document.createElement("form");
	loginForm.className = "mweFlexCol";
	loginPanel.appendChild(loginForm);

	const userNameLabel = document.createElement("label");
	userNameLabel.textContent = "Username";
	userNameLabel.setAttribute("for", "wikiUsername");
	loginForm.appendChild(userNameLabel);
	const userNameInput = document.createElement("input");
	userNameInput.setAttribute("type", "text");
	userNameInput.setAttribute("placeHolder", "Enter Username");
	userNameInput.setAttribute("name", "wikiUsername");
	userNameInput.className = "mweInput";
	userNameInput.id = "wikiUserInput";
	loginForm.appendChild(userNameInput);

	const passLabel = document.createElement("label");
	passLabel.textContent = "Password";
	passLabel.setAttribute("for", "wikiPassword");
	loginForm.appendChild(passLabel);
	const passInput = document.createElement("input");
	passInput.setAttribute("type", "password");
	passInput.setAttribute("placeHolder", "Enter Password");
	passInput.setAttribute("name", "wikiPassword");
	passInput.className = "mweInput";
	passInput.id = "wikiPassInput";
	loginForm.appendChild(passInput);

	const submitButton = document.createElement("button");
	submitButton.setAttribute("type", "button");
	submitButton.textContent = "Login";
	submitButton.className = "mweButton";
	submitButton.onclick = trueLogin;
	loginForm.appendChild(submitButton);

	const cancelButton = document.createElement("button");
	cancelButton.setAttribute("type", "button");
	cancelButton.textContent = "Cancel";
	cancelButton.className = "mweButton";
	cancelButton.onclick = loginCancel;
	loginPanel.appendChild(cancelButton);

	loginPanel.style.display = "none";
}
const oldVersionReview = {
	pages: [],
	currentPage: 0,
	currentPageContent: "",
	updatePages: [],
	panel: document.createElement("div"),
	titleElement: document.createElement("h1"),
	outputField: document.createElement("textarea"),
};
/**
 * Creates the version update assist screen and appends it to the document body
 */
function createVersionUpdateAssistScreen() {
	oldVersionReview.panel.className = "mweVerAssist mweFlexCol";
	document.body.appendChild(oldVersionReview.panel);
	oldVersionReview.panel.appendChild(oldVersionReview.titleElement);
	oldVersionReview.outputField.className = "mweTextOutput";
	oldVersionReview.panel.appendChild(oldVersionReview.outputField);

	const submitButton = document.createElement("button");
	submitButton.setAttribute("type", "button");
	submitButton.textContent = "Update Version";
	submitButton.className = "mweButton";
	submitButton.onclick = updateVersion;
	oldVersionReview.panel.appendChild(submitButton);

	const cancelButton = document.createElement("button");
	cancelButton.setAttribute("type", "button");
	cancelButton.textContent = "Don't Update";
	cancelButton.className = "mweButton";
	cancelButton.onclick = proceedToNextPage;
	oldVersionReview.panel.appendChild(cancelButton);

	oldVersionReview.panel.style.display = "none";
}

// Add user interface
const wikiMenu = document.createElement("div");
wikiMenu.className = "mweMenu";
wikiMenu.setAttribute("id", "wikiMenu");

// Header text for my menu
const newHeader = document.createElement("h1");
newHeader.textContent = "Melvor Wiki Exporter";
wikiMenu.appendChild(newHeader);

const wikiMenuContent = document.createElement("div");
wikiMenuContent.className = "mweFlexRow";
wikiMenu.appendChild(wikiMenuContent);

// Sub division on menu
const menuDivA = document.createElement("div");
menuDivA.className = "mweMenuDiv";
wikiMenuContent.appendChild(menuDivA);
const menuDivB = document.createElement("div");
menuDivB.className = "mweMenuDiv";
wikiMenuContent.appendChild(menuDivB);

menuDivA.appendChild(createButton("Log in", loginButton));
menuDivA.appendChild(createButton("Log out", logoutButton));
// menuDivA.appendChild(createButton('Upload Single Image', buttonImageUploadBlob));
// menuDivA.appendChild(createButton('Test Upload Item Page', () => uploadTestItemPage(0)));
// menuDivA.appendChild(createButton('Test Upload Armour Page', () => uploadTestItemPage(67)));
// menuDivA.appendChild(createButton('Test Upload Weapon Page', () => uploadTestItemPage(63)));
// menuDivA.appendChild(createButton('Test Upload Chest Page', () => uploadTestItemPage(382)));
// menuDivA.appendChild(createButton('Test Upload Food Page', () => uploadTestItemPage(26)));
// menuDivA.appendChild(createButton('Request Melvor Wiki', buttonOnClick));
menuDivA.appendChild(createButton("Create Item Pages", () => createItemPages(891)));
menuDivA.appendChild(createButton("Create Monster Pages", () => createMonsterPages(111)));
menuDivA.appendChild(createButton("Create Combat Area Pages", () => createCombatAreaPages(0)));
menuDivA.appendChild(createButton("Create Slayer Area Pages", () => createSlayerAreaPages(0)));
menuDivA.appendChild(createButton("Create Dungeon Pages", () => createDungeonPages(8)));
menuDivA.appendChild(createButton("Create Standard Spell Pages", () => createSpellPages(0)));
menuDivA.appendChild(createButton("Create Curse Pages", createCursePages));
menuDivA.appendChild(createButton("Create Aurora Pages", createAuroraPages));
menuDivA.appendChild(createButton("Create Ancient Magick Pages", createAncientMagickPages));
menuDivA.appendChild(createButton("Create Alt Magic Pages", createAltMagicPages));
menuDivA.appendChild(createButton("Create Pet Pages", createPetPages));
menuDivA.appendChild(createButton("Create Prayer Pages", () => createPrayerPages(25)));
menuDivA.appendChild(createButton("Create Thieving Pages", () => createThievingPages(0)));
menuDivA.appendChild(createButton("Create Upgrade Pages", createUpgradePages));
menuDivA.appendChild(createButton("Create Table Template Pages", createTableTemplates));
menuDivA.appendChild(createButton("Create Item Source Template Pages", createItemSourceTemplates));
menuDivA.appendChild(createButton("Create God Upgrade Pages", createGodUpgradePages));
menuDivA.appendChild(createButton("Create Monster Drop Template Pages", createMonsterDropTemplates));

menuDivB.appendChild(createButton("Upload Dungeon Images", uploadDungeonImages));
menuDivB.appendChild(createButton("Upload Combat Area Images", uploadCombatAreaImages));
menuDivB.appendChild(createButton("Upload Item Images", uploadItemImages));
menuDivB.appendChild(createButton("Upload New Item Images", () => uploadNewItemImages(891)));
menuDivB.appendChild(createButton("Upload Monster Images", uploadMonsterImages));
menuDivB.appendChild(createButton("Upload Spell Images", uploadSpellImages));
menuDivB.appendChild(createButton("Upload Upgrade Images", uploadUpgradeImages));
menuDivB.appendChild(createButton("Upload Prayer Images", uploadPrayerImages));
menuDivB.appendChild(createButton("Upload Pet Images", uploadPetImages));

menuDivA.appendChild(createButton("Request Wiki Page", buttonRequestPage));

menuDivA.appendChild(
	createButton("Show Dupe Pages", () => {
		try {
			console.log(findDuplicatePageNames());
		} catch (e) {
			console.error(e);
		}
	})
);

menuDivA.appendChild(createButton("Test Generators", testGenerators));

// Divider for Update Functions
const menuDivD = document.createElement("div");
menuDivD.className = "mweMenuDiv";
wikiMenuContent.appendChild(menuDivD);
menuDivD.appendChild(createButton("Update Item Pages", () => updateItemPages()));
menuDivD.appendChild(createButton("Update Bone Pages", () => updateItemPages("prayerPoints")));
menuDivD.appendChild(createButton("Update Monster Page Templates", updateMonsterPageTemplates));
menuDivD.appendChild(createButton("Update Dungeon Page Templates", updateDungeonPageTemplates));
menuDivD.appendChild(createButton("Update Combat Area Page Templates", updateCombatAreaPageTemplates));
menuDivD.appendChild(createButton("Update Slayer Area Page Templates", updateSlayerAreaPageTemplates));
menuDivD.appendChild(createButton("Update Prayer Page Templates", updatePrayerPageTemplates));
menuDivD.appendChild(createButton("Update Spell Page Templates", updateSpellPageTemplates));
menuDivD.appendChild(createButton("Update Thieving Target Templates", updateThievingPageTemplates));
menuDivD.appendChild(createButton("Update Upgrade Templates", updateUpgradePages));
menuDivD.appendChild(createButton("Update Pet Templates", updatePetPageTemplates));

menuDivD.appendChild(createButton("Update Weapon Stat Templates", updateWeaponPageStats));
menuDivD.appendChild(createButton("Update Armour Stat Templates", updateArmourPageStats));
menuDivD.appendChild(createButton("Update Item Page Item Templates", updateItemPageItemTemplates));
menuDivD.appendChild(createButton("Update Source Template Subset", updateSpecificSourceTemplates));

menuDivD.appendChild(createButton("Manually Review Previous Version", () => manualVersionReview("v0.16.2")));

menuDivD.appendChild(createButton("Log Empty Sources", showEmptySourceTemplates));

// menuDivD.appendChild(createButton('Change Chest Templates', changeChestTablesToTemplates));
// menuDivD.appendChild(createButton('Change Knife and Javelin Templates', changeKnifeJavelinTemplates));
// menuDivD.appendChild(createButton('Update Monster Page Versions', fixMonsterPageVersions));
// menuDivD.appendChild(createButton('Update Item Page Versions', fixItemPageVersions));
// menuDivD.appendChild(createButton('Undo Bad Edits', fixBadItemPageEdits));
// menuDivD.appendChild(createButton('Remove Old Sections', removeOldSectionsIfOnlyTemplates));
/* menuDivD.appendChild(createButton('Test Template', () => {
    itemID = 681;
    console.log(`|image=${items[itemID].name} (item)${getFileExtension(items[itemID].media)}`)
}));
*/

const menuDivC = document.createElement("div");
menuDivC.className = "mweMenuDiv";
wikiMenuContent.appendChild(menuDivC);

const wikiTableOutput = document.createElement("textarea");
wikiTableOutput.className = "mweTextOutput";
menuDivC.appendChild(wikiTableOutput);

document.getElementById("page-container").appendChild(wikiMenu);

createLoginScreen();
createVersionUpdateAssistScreen();

// Inject Scripts into page scope
const injectableNames = ["dataGrabber"];
for (let i = 0; i < injectableNames.length; i++) {
	const newScript = document.createElement("script");
	newScript.src = browser.runtime.getURL(`sources/injectable/${injectableNames[i]}.js`);
	document.body.appendChild(newScript);
}
/** Maps prayer bonus key name to description */
const prayerBonusDictionary = {
	prayerBonusAttack: "Melee Accuracy",
	prayerBonusStrength: "Melee Strength",
	prayerBonusDefence: "Melee Evasion",
	prayerBonusAttackRanged: "Ranged Accuracy",
	prayerBonusStrengthRanged: "Ranged Strength",
	prayerBonusDefenceRanged: "Ranged Evasion",
	prayerBonusAttackMagic: "Magic Accuracy",
	prayerBonusDamageMagic: "Magic Damage",
	prayerBonusDefenceMagic: "Magic Evasion",
	prayerBonusProtectItem: "Keep item on death",
	prayerBonusHitpoints: "2x Restore Rate for Hitpoints",
	prayerBonusProtectFromMelee: "85% chance to dodge Melee Attacks",
	prayerBonusProtectFromRanged: "85% chance to dodge Ranged Attacks",
	prayerBonusProtectFromMagic: "85% chance to dodge Magic Attacks",
	prayerBonusHitpointHeal: "Heal +20% HP when HP falls below 10%",
	prayerBonusDamageReduction: "Damage Reduction",
};
/** Does a prayer bonus description have a numberic component that should be added */
const prayerBonusNumeric = {
	prayerBonusAttack: true,
	prayerBonusStrength: true,
	prayerBonusDefence: true,
	prayerBonusAttackRanged: true,
	prayerBonusStrengthRanged: true,
	prayerBonusDefenceRanged: true,
	prayerBonusAttackMagic: true,
	prayerBonusDamageMagic: true,
	prayerBonusDefenceMagic: true,
	prayerBonusProtectItem: false,
	prayerBonusHitpoints: false,
	prayerBonusProtectFromMelee: false,
	prayerBonusProtectFromRanged: false,
	prayerBonusProtectFromMagic: false,
	prayerBonusHitpointHeal: false,
	prayerBonusDamageReduction: true,
};

// Define Game Variables
let items;
let MONSTERS;
let DUNGEONS;
let combatAreas;
let SPELLS;
let tiers;
let cookingFireData;
let thievingNPC;
let trees;
let itemUses;
let masterTable;
let numberMultiplier;
let miningData;
let smithingItems;
let runecraftingItems;
let axeLevels;
let rodLevels;
let pickaxeLevels;
let gloveID;
let skillcapeItems;
let CONSTANTS;
let baseMiningInterval;
let axeCost;
let rodCost;
let pickaxeCost;
let glovesCost;
let glovesActions;
let runecraftInterval;
let axeBonusSpeed;
let rodBonusSpeed;
let pickaxeBonus;
let pickaxeBonusSpeed;
let logsData;
let PRAYER;
let slayerItems;
let herbloreItemData;
let skillName;
let newFarmingAreas;
let autoEatData;
let smithInterval;
let fletchInterval;
let craftInterval;
let herbloreInterval;
let fishingItems;
let junkItems;
let specialItems;
let fishingAreas;
let enemySpecialAttacks;
let playerSpecialAttacks;
let forceRangedArmour;
let forceMeleeArmour;
let forceMagicArmour;
let wikiPageNames;
let disambiguationData;
let slayerAreas;
let godUpgradeData;
let godDungeonID;
let CURSES;
let AURORAS;
let ANCIENT;
let ALTMAGIC;
let PETS;
let magicInterval;
// My Variables
/** @type {number[]} */
let shopMaterials;
/** @type {number[]} */
const openableItems = [];
/** @type {number[]} */
let smithingBars;
/** @type {number[]} */
let gemItems;
const runecraftingCategoryNames = ["Standard Runes", "Combination Runes", "Staves & Wands", "Air Magic Gear", "Water Magic Gear", "Earth Magic Gear", "Fire Magic Gear"];
const godUpgradeDescriptions = ["20% Decreased Base Crafting & Fletching Interval", "20% Decreased Base Herblore & Runecrafting Interval", "20% Decreased Base Mining & Woodcutting Interval", "20% Decreased Base Cooking, Firemaking & Smithing Interval"];
let wikiData;
let wikiDataLoaded = false;
// eslint-disable-next-line prefer-const
let imageUploadInProgress = false;
const WIKURL = "https://wiki.melvoridle.com/api.php";
const GAMEURL = "https://melvoridle.com/";
const VERSIONTEMPLATE = "{{V0.16.3}}";
const VERSIONCATEGORY = "[[Category:v0.16.3]]";
const BOTCATEGORY = "[[Category:Bot Templates]]";
const TABLEREGEX = /{\| class="wikitable sortable"(.|\n)*?\|}/g;
const ITEMTEMPLATEREGEX = /{{Item\|name=(.|\n)*?\|description=(.|\n)*?\|id=(.|\n)*?\|category=(.|\n)*?\|type=(.|\n)*?\|sellsfor=(.|\n)*?\|customData=(.|\n)*?\|itemSources=(.|\n)*?\|itemUses=(.|\n)*?}}/;
const MONSTERTEMPLATEREGEX = /{{Monster\|name=(.|\n)*?\|monsterID=(.|\n)*?\|combatLevel=(.|\n)*?\|hitpoints=(.|\n)*?\|attackspeed=(.|\n)*?\|attacks=(.|\n)*?\|accuracyRating=(.|\n)*?\|meleeEvasionRating=(.|\n)*?\|rangedEvasionRating=(.|\n)*?\|magicEvasionRating=(.|\n)*?\|attackLevel=(.|\n)*?\|strengthLevel=(.|\n)*?\|defenceLevel=(.|\n)*?\|rangedLevel=(.|\n)*?\|magicLevel=(.|\n)*?\|zones=(.|\n)*?\|drops=(.|\n)*?}}/;
const DUNGEONTEMPLATEREGEX = /{{Dungeon\|name=(.|\n)*?\|id=(.|\n)*?\|rewards=(.|\n)*?\|monsterList=(.|\n)*?}}/;
const SLAYERAREATEMPLATEREGEX = /{{SlayerArea\|name=(.|\n)*?\|id=(.|\n)*?\|slayerLevel=(.|\n)*?\|slayerItem=(.|\n)*?\|monsterList=(.|\n)*?}}/;
const COMBATAREATEMPLATEREGEX = /{{CombatArea\|name=(.|\n)*?\|id=(.|\n)*?\|monsterList=(.|\n)*?}}/;
const PRAYERTEMPLATEREGEX = /{{Prayer\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|prayerEffects=(.|\n)*?\|prayerCosts=(.|\n)*?}}/;
const SPELLTEMPLATEREGEX = /{{Spell\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|maxHit=(.|\n)*?\|runeList=(.|\n)*?}}/;
const AURORATEMPLATEREGEX = /{{Aurora\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|itemRequired=(.|\n)*?\|effect=(.|\n)*?\|runeList=(.|\n)*?}}/;
const CURSETEMPLATEREGEX = /{{Curse\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|chance=(.|\n)*?\|effect=(.|\n)*?\|runeList=(.|\n)*?}}/;
const ANCIENTTEMPLATEREGEX = /{{AncientMagick\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|unlockReq=(.|\n)*?\|maxHit=(.|\n)*?\|description=(.|\n)*?\|runeList=(.|\n)*?}}/;
const ALTMAGICTEMPLATEREGEX = /{{AltMagic\|name=(.|\n)*?\|id=(.|\n)*?\|level=(.|\n)*?\|effect=(.|\n)*?\|xp=(.|\n)*?\|runeList=(.|\n)*?}}/;
const PETTEMPLATEREGEX = /{{Pet\|name=(.|\n)*?\|id=(.|\n)*?\|skill=(.|\n)*?\|effect=(.|\n)*?}}/;
const ITEMPRODUCTIONREGEX = /{{ItemProduction\|requirements=(.|\n)*?\|quantity=(.|\n)*?\|experience=(.|\n)*?\|creationTime=(.|\n)*?}}/;
const ITEMCREATIONREGEX = /{{ItemCreation\|requirements=(.|\n)*?\|materials=(.|\n)*?\|quantity=(.|\n)*?\|experience=(.|\n)*?\|creationTime=(.|\n)*?}}/;
const CURRENTVERSIONREGEX = /{{V0\.16\.1}}/;
const WEAPONSTATSREGEX = /{{WeaponStats\|attackSpeed=(.|\n)*?\|attackType=(.|\n)*?\|isTwoHanded=(.|\n)*?\|stabAttackBonus=(.|\n)*?\|slashAttackBonus=(.|\n)*?\|blockAttackBonus=(.|\n)*?\|rangedAttackBonus=(.|\n)*?\|magicAttackBonus=(.|\n)*?\|strengthBonus=(.|\n)*?\|rangedStrengthBonus=(.|\n)*?\|magicDamageBonus=(.|\n)*?\|defenceBonus=(.|\n)*?\|rangedDefenceBonus=(.|\n)*?\|magicDefenceBonus=(.|\n)*?\|damageReduction=(.|\n)*?\|attackLevelRequired=(.|\n)*?\|rangedLevelRequired=(.|\n)*?\|magicLevelRequired=(.|\n)*?\|slayerBonusXP=(.|\n)*?}}/;
const ARMOURSTATSREGEX = /{{ArmourStats\|stabAttackBonus=(.|\n)*?\|slashAttackBonus=(.|\n)*?\|blockAttackBonus=(.|\n)*?\|rangedAttackBonus=(.|\n)*?\|magicAttackBonus=(.|\n)*?\|strengthBonus=(.|\n)*?\|rangedStrengthBonus=(.|\n)*?\|magicDamageBonus=(.|\n)*?\|defenceBonus=(.|\n)*?\|rangedDefenceBonus=(.|\n)*?\|magicDefenceBonus=(.|\n)*?\|damageReduction=(.|\n)*?\|defenceLevelRequired=(.|\n)*?\|rangedLevelRequired=(.|\n)*?\|magicLevelRequired=(.|\n)*?\|slayerBonusXP=(.|\n)*?}}/;
const THIEVINGTARGETREGEX = /{{ThievingTarget\|name=(.|\n)*?\|level=(.|\n)*?\|xp=(.|\n)*?\|drops=(.|\n)*?}}/;
const UPGRADETEMPLATEREGEX = /{{Upgrade\|name=(.|\n)*?\|upgradeEffect=(.|\n)*?\|upgradeRequirements=(.|\n)*?\|upgradeCost(.|\n)*?}}/;
const EXTENSIONREGEX = /\..*$/;
const EXTENSIONREGEX2 = /\?\d*$/;
const OLDVERSIONREGEX = /{{V0\.16\.2}}/;
const OLDVERSIONCATEGORYREGEX = /\[\[Category:v0\.16\.2]\]/;

/**
 * Removes HTML from a string (currently only removes &apos; and replaces with ')
 * @param {string} stringToClean The dirty string
 * @return {string}
 */
function sanatizeString(stringToClean) {
	return stringToClean.replace(/&apos;/g, "'");
}

/**
 * Populates an object with arrays that correspond to the uses an item has
 * @return {Object}
 */
function createItemUses() {
	// Potential Uses:
	// Combat (Equipable)
	// Consumable (Food Item)
	// Ingredient in a skill (Firemaking,Cooking,Smithing,Farming,Fletching,Crafting,Runecrafting,Magic)
	// Equipment bonus to a skill (All skills since skill capes) Skillcapes, Gloves, Some Amulets
	// Loot Source (Item can be opened)
	// Upgrade Ingredient (Item is used to upgrade other items)
	// Alt. Magic Ingredient
	const itemUses = {
		Combat: {
			items: [],
			format: `[[File:Combat.svg|25px|middle|link=Combat]] ${formatPageLink("Combat")}`,
		},
		Mastery: {
			items: [],
			format: `[[File:Mastery.svg|25px|middle|link=Mastery]] ${formatPageLink("Mastery")}`,
		},
		Food: {
			items: [],
			format: formatPageLink("Food"),
		},
		Chest: {
			items: [],
			format: createPageLink("Can be Opened", "Chest Drop Tables"),
		},
		Upgrading: {
			items: [],
			format: formatPageLink("Upgrading Items"),
		},
		Woodcutting: {
			items: [],
			format: `${formatSkillImageLink("Woodcutting", 25, "middle")} ${formatPageLink("Woodcutting")}`,
		},
		Fishing: {
			items: [],
			format: `${formatSkillImageLink("Fishing", 25, "middle")} ${formatPageLink("Fishing")}`,
		},
		Firemaking: {
			items: [],
			format: `${formatSkillImageLink("Firemaking", 25, "middle")} ${formatPageLink("Firemaking")}`,
		},
		Cooking: {
			items: [],
			format: `${formatSkillImageLink("Cooking", 25, "middle")} ${formatPageLink("Cooking")}`,
		},
		Mining: {
			items: [],
			format: `${formatSkillImageLink("Mining", 25, "middle")} ${formatPageLink("Mining")}`,
		},
		Smithing: {
			items: [],
			format: `${formatSkillImageLink("Smithing", 25, "middle")} ${formatPageLink("Smithing")}`,
		},
		Thieving: {
			items: [],
			format: `${formatSkillImageLink("Thieving", 25, "middle")} ${formatPageLink("Thieving")}`,
		},
		Farming: {
			items: [],
			format: `${formatSkillImageLink("Farming", 25, "middle")} ${formatPageLink("Farming")}`,
		},
		Fletching: {
			items: [],
			format: `${formatSkillImageLink("Fletching", 25, "middle")} ${formatPageLink("Fletching")}`,
		},
		Crafting: {
			items: [],
			format: `${formatSkillImageLink("Crafting", 25, "middle")} ${formatPageLink("Crafting")}`,
		},
		Runecrafting: {
			items: [],
			format: `${formatSkillImageLink("Runecrafting", 25, "middle")} ${formatPageLink("Runecrafting")}`,
		},
		Prayer: {
			items: [],
			format: `${formatSkillImageLink("Prayer", 25, "middle")} ${formatPageLink("Prayer")}`,
		},
		Slayer: {
			items: [],
			format: `${formatSkillImageLink("Slayer", 25, "middle")} ${formatPageLink("Slayer")}`,
		},
		Herblore: {
			items: [],
			format: `${formatSkillImageLink("Herblore", 25, "middle")} ${formatPageLink("Herblore")}`,
		},
		CombatMagic: {
			items: [],
			format: `${formatSkillImageLink("Magic", 25, "middle")} ${formatPageLink("Magic")}`,
		},
		AltMagic: {
			items: [],
			format: `${formatSkillImageLink("Magic", 25, "middle")} ${createPageLink("Alt. Magic", "Alternative Magic")}`,
		},
	};
	// Add Hard-Coded items
	itemUses.Woodcutting.items.push(CONSTANTS.item.Woodcutting_Skillcape);
	itemUses.Fishing.items.push(CONSTANTS.item.Fishing_Skillcape);
	itemUses.Fishing.items.push(CONSTANTS.item.Amulet_of_Fishing);
	itemUses.Fishing.items.push(CONSTANTS.item.Message_In_A_Bottle);
	itemUses.Firemaking.items.push(CONSTANTS.item.Firemaking_Skillcape);
	itemUses.Cooking.items.push(CONSTANTS.item.Cooking_Skillcape);
	itemUses.Cooking.items.push(CONSTANTS.item.Cooking_Gloves);
	itemUses.Mining.items.push(CONSTANTS.item.Mining_Gloves);
	itemUses.Mining.items.push(CONSTANTS.item.Mining_Skillcape);
	itemUses.Mining.items.push(CONSTANTS.item.Gem_Gloves);
	itemUses.Smithing.items.push(CONSTANTS.item.Smithing_Gloves);
	itemUses.Smithing.items.push(CONSTANTS.item.Smithing_Skillcape);
	itemUses.Thieving.items.push(CONSTANTS.item.Thieving_Gloves);
	itemUses.Thieving.items.push(CONSTANTS.item.Thieving_Skillcape);
	itemUses.Thieving.items.push(CONSTANTS.item.Chapeau_Noir);
	itemUses.Farming.items.push(CONSTANTS.item.Farming_Skillcape);
	itemUses.Farming.items.push(CONSTANTS.item.Compost);
	itemUses.Farming.items.push(CONSTANTS.item.Weird_Gloop);
	itemUses.Fletching.items.push(CONSTANTS.item.Fletching_Skillcape);
	itemUses.Crafting.items.push(CONSTANTS.item.Crafting_Skillcape);
	itemUses.Runecrafting.items.push(CONSTANTS.item.Runecrafting_Skillcape);
	itemUses.Prayer.items.push(CONSTANTS.item.Prayer_Skillcape);
	itemUses.Slayer.items.push(CONSTANTS.item.Slayer_Skillcape);
	// Parse item array for potential uses
	for (let i = 0; i < items.length; i++) {
		// Combat Items
		if (items[i].equipmentSlot !== undefined && !isItemOnArray(i, itemUses.Combat.items)) {
			itemUses.Combat.items.push(i);
		}
		// Food Items
		if (items[i].healsFor !== undefined) {
			itemUses.Food.items.push(i);
		}
		// Chest Items
		if (items[i].canOpen) {
			itemUses.Chest.items.push(i);
		}
		// Upgrading Items
		if (items[i].trimmedItemID !== undefined && !isItemOnArray(i, itemUses.Upgrading.items)) {
			itemUses.Upgrading.items.push(i);
		}
		if (items[i].itemsRequired !== undefined) {
			for (let j = 0; j < items[i].itemsRequired.length; j++) {
				if (!isItemOnArray(items[i].itemsRequired[j][0], itemUses.Upgrading.items)) {
					itemUses.Upgrading.items.push(items[i].itemsRequired[j][0]);
				}
			}
		}
		// Firemaking Items
		if (items[i].firemakingID !== undefined) {
			itemUses.Firemaking.items.push(i);
		}
		// Cooking Items
		if (items[i].cookedItemID !== undefined) {
			itemUses.Cooking.items.push(i);
		}
		// Smithing Items
		if (items[i].smithReq !== undefined) {
			for (let j = 0; j < items[i].smithReq.length; j++) {
				if (!isItemOnArray(items[i].smithReq[j].id, itemUses.Smithing.items)) {
					itemUses.Smithing.items.push(items[i].smithReq[j].id);
				}
			}
		}
		// Farming Items
		if (items[i].grownItemID !== undefined) {
			itemUses.Farming.items.push(i);
		}
		// Fletching Items
		if (items[i].fletchReq !== undefined) {
			for (let j = 0; j < items[i].fletchReq.length; j++) {
				if (!isItemOnArray(items[i].fletchReq[j].id, itemUses.Fletching.items)) {
					itemUses.Fletching.items.push(items[i].fletchReq[j].id);
				}
			}
		}
		// Crafting Items
		if (items[i].craftReq !== undefined) {
			for (let j = 0; j < items[i].craftReq.length; j++) {
				if (!isItemOnArray(items[i].craftReq[j].id, itemUses.Crafting.items)) {
					itemUses.Crafting.items.push(items[i].craftReq[j].id);
				}
			}
		}
		// Runecrafting Items
		if (items[i].runecraftReq !== undefined) {
			for (let j = 0; j < items[i].runecraftReq.length; j++) {
				if (!isItemOnArray(items[i].runecraftReq[j].id, itemUses.Runecrafting.items)) {
					itemUses.Runecrafting.items.push(items[i].runecraftReq[j].id);
				}
			}
		}
		// Herblore Items
		if (items[i].herbloreReq !== undefined) {
			for (let j = 0; j < items[i].herbloreReq.length; j++) {
				if (!isItemOnArray(items[i].herbloreReq[j].id, itemUses.Herblore.items)) {
					itemUses.Herblore.items.push(items[i].herbloreReq[j].id);
				}
			}
		}
		// Prayer Items
		if (items[i].prayerPoints !== undefined) {
			itemUses.Prayer.items.push(i);
		}
		// Slayer Items
		if (items[i].slayerCost !== undefined) {
			itemUses.Slayer.items.push(i);
		}
		// Mastery Tokens
		if (items[i].category === "Mastery") {
			itemUses.Mastery.items.push(i);
		}
		// Potions
		if (items[i].isPotion) {
			switch (items[i].potionPage) {
				case 0: // Woodcutting
					itemUses.Woodcutting.items.push(i);
					break;
				case 7: // Fishing
					itemUses.Fishing.items.push(i);
					break;
				case 8: // Firemaking
					itemUses.Firemaking.items.push(i);
					break;
				case 9: // Cooking
					itemUses.Cooking.items.push(i);
					break;
				case 10: // Mining
					itemUses.Mining.items.push(i);
					break;
				case 11: // Smithing
					itemUses.Smithing.items.push(i);
					break;
				case 13: // Combat
					itemUses.Combat.items.push(i);
					break;
				case 14: // Thieving
					itemUses.Thieving.items.push(i);
					break;
				case 15: // Farming
					itemUses.Farming.items.push(i);
					break;
				case 16: // Fletching
					itemUses.Fletching.items.push(i);
					break;
				case 17: // Crafting
					itemUses.Crafting.items.push(i);
					break;
				case 18: // Runecrafting
					itemUses.Runecrafting.items.push(i);
					break;
				case 19: // Herblore
					itemUses.Herblore.items.push(i);
					break;
			}
		}
	}
	const addSpellReq = (spell, useKey) => {
		spell.runesRequired.forEach((runeReq) => {
			if (!itemUses[useKey].items.includes(runeReq.id)) {
				itemUses[useKey].items.push(runeReq.id);
			}
		});
		if (spell.runesRequiredAlt !== undefined) {
			spell.runesRequiredAlt.forEach((runeReq) => {
				if (!itemUses[useKey].items.includes(runeReq.id)) {
					itemUses[useKey].items.push(runeReq.id);
				}
			});
		}
	};
	// Parse spell arrays for potential uses
	SPELLS.forEach((spell) => addSpellReq(spell, "CombatMagic"));
	ALTMAGIC.forEach((spell) => addSpellReq(spell, "AltMagic"));
	AURORAS.forEach((spell) => addSpellReq(spell, "CombatMagic"));
	CURSES.forEach((spell) => addSpellReq(spell, "CombatMagic"));
	ANCIENT.forEach((spell) => addSpellReq(spell, "CombatMagic"));
	// Add Alt magic ingredients
	junkItems.forEach((junkID) => {
		if (!itemUses.AltMagic.items.includes(junkID)) {
			itemUses.AltMagic.items.push(junkID);
		}
	});
	smithingBars.forEach((barID) => {
		items[barID].smithReq.forEach((req) => {
			if (!itemUses.AltMagic.items.includes(req.id)) {
				itemUses.AltMagic.items.push(req.id);
			}
		});
	});
	return itemUses;
}

/**
 * Processes game data and compiles information from different game objects
 */
function processWikiData() {
	try {
		{
			wikiData = JSON.parse(JSON.stringify(wikiData));
			({
				items,
				MONSTERS,
				DUNGEONS,
				combatAreas,
				SPELLS,
				tiers,
				cookingFireData,
				thievingNPC,
				trees,
				skillcapeItems,
				CONSTANTS,
				numberMultiplier,
				miningData,
				smithingItems,
				runecraftingItems,
				axeLevels,
				rodLevels,
				pickaxeLevels,
				gloveID,
				skillcapeItems,
				baseMiningInterval,
				axeCost,
				rodCost,
				pickaxeCost,
				glovesCost,
				runecraftInterval,
				axeBonusSpeed,
				rodBonusSpeed,
				pickaxeBonus,
				pickaxeBonusSpeed,
				logsData,
				PRAYER,
				slayerItems,
				herbloreItemData,
				skillName,
				newFarmingAreas,
				autoEatData,
				slayerAreas,
				smithInterval,
				fletchInterval,
				craftInterval,
				herbloreInterval,
				fishingItems,
				junkItems,
				specialItems,
				fishingAreas,
				enemySpecialAttacks,
				playerSpecialAttacks,
				godDungeonID,
				godUpgradeData,
				glovesActions,
				CURSES,
				AURORAS,
				ANCIENT,
				ALTMAGIC,
				PETS,
				magicInterval,
			} = wikiData);
		}
		shopMaterials = [CONSTANTS.item.Feathers, CONSTANTS.item.Compost, CONSTANTS.item.Weird_Gloop, CONSTANTS.item.Bowstring, CONSTANTS.item.Leather, CONSTANTS.item.Green_Dragonhide, CONSTANTS.item.Blue_Dragonhide, CONSTANTS.item.Red_Dragonhide, CONSTANTS.item.Red_Party_Hat];
		gemItems = [CONSTANTS.item.Topaz, CONSTANTS.item.Sapphire, CONSTANTS.item.Ruby, CONSTANTS.item.Emerald, CONSTANTS.item.Diamond];
		const gemChances = [50, 17.5, 17.5, 10, 5];
		gemItems.forEach((gemID, i) => {
			items[gemID].gemChance = gemChances[i];
		});
		// Data Processing
		// Sanatize all names and descriptions:
		for (let i = 0; i < items.length; i++) {
			items[i].name = sanatizeString(items[i].name);
			items[i].category = sanatizeString(items[i].category);
			items[i].type = sanatizeString(items[i].type);
			if (items[i].description) items[i].description = sanatizeString(items[i].description);
		}
		for (let i = 0; i < MONSTERS.length; i++) {
			MONSTERS[i].name = sanatizeString(MONSTERS[i].name);
		}
		for (let i = 0; i < DUNGEONS.length; i++) {
			DUNGEONS[i].name = sanatizeString(DUNGEONS[i].name);
		}
		for (let i = 0; i < combatAreas.length; i++) {
			combatAreas[i].areaName = sanatizeString(combatAreas[i].areaName);
		}
		for (let i = 0; i < SPELLS.length; i++) {
			SPELLS[i].name = sanatizeString(SPELLS[i].name);
		}
		// Additional processing is done on these descriptions to remove HTML, and make them suitable for the wiki
		CURSES.forEach((spell) => {
			spell.name = sanatizeString(spell.name);
			spell.description = sanatizeString(spell.description);
			// Remove first part of description, proc chance will be it's own field/column
			spell.description = spell.description.replace(/^.*?<br>/, "");
		});
		AURORAS.forEach((spell) => {
			spell.name = sanatizeString(spell.name);
			spell.description = sanatizeString(spell.description);
			spell.description = spell.description.replace(/^.*?<br>/, "");
		});
		ANCIENT.forEach((spell) => {
			spell.name = sanatizeString(spell.name);
			spell.description = sanatizeString(spell.description);
		});
		ALTMAGIC.forEach((spell) => {
			spell.name = sanatizeString(spell.name);
			spell.description = sanatizeString(spell.description);
			spell.description = spell.description.replace(/<br>.*?$/, "");
		});
		PETS.forEach((pet) => {
			pet.name = sanatizeString(pet.name);
			pet.description = sanatizeString(pet.description);
			pet.effect = pet.description.replace(/^<small>.*?<\/small><br>/, "");
			pet.effect = pet.effect.replace(/<br>.*?$/, "");
		});
		console.log(PETS);
		for (let i = 0; i < tiers.length; i++) {
			tiers[i] = sanatizeString(tiers[i]);
		}
		for (let i = 0; i < cookingFireData.length; i++) {
			cookingFireData[i].tier = sanatizeString(cookingFireData[i].tier);
		}
		for (let i = 0; i < thievingNPC.length; i++) {
			thievingNPC[i].name = sanatizeString(thievingNPC[i].name);
		}
		for (let i = 0; i < trees.length; i++) {
			trees[i].type = sanatizeString(trees[i].type);
		}
		for (let i = 0; i < smithingItems.length; i++) {
			smithingItems[i].name = sanatizeString(smithingItems[i].name);
		}
		for (let i = 0; i < PRAYER.length; i++) {
			PRAYER[i].name = sanatizeString(PRAYER[i].name);
		}
		for (let i = 0; i < herbloreItemData.length; i++) {
			herbloreItemData[i].name = sanatizeString(herbloreItemData[i].name);
		}
		for (let i = 0; i < skillName.length; i++) {
			skillName[i] = sanatizeString(skillName[i]);
		}
		for (let i = 0; i < autoEatData.length; i++) {
			autoEatData[i].title = sanatizeString(autoEatData[i].title);
		}
		for (let i = 0; i < slayerAreas.length; i++) {
			slayerAreas[i].areaName = sanatizeString(slayerAreas[i].areaName);
		}
		for (let i = 0; i < fishingAreas.length; i++) {
			fishingAreas[i].name = sanatizeString(fishingAreas[i].name);
		}
		for (let i = 0; i < enemySpecialAttacks.length; i++) {
			enemySpecialAttacks[i].name = sanatizeString(enemySpecialAttacks[i].name);
			enemySpecialAttacks[i].description = sanatizeString(enemySpecialAttacks[i].description);
		}
		for (let i = 0; i < godUpgradeData.length; i++) {
			godUpgradeData[i].name = sanatizeString(godUpgradeData[i].name);
		}
		// Add smithing bars
		smithingBars = smithingItems.reduce((accumulator, item) => {
			if (item.category === 0) {
				accumulator.push(item.itemID);
			}
			return accumulator;
		}, []);
		// Fix chest loot tables with quantity
		items.forEach((item) => {
			if (item.canOpen) {
				item.dropTable.forEach((drop, i) => {
					drop.push(item.dropQty[i]);
				});
			}
		});
		// Sort Loot Tables
		MONSTERS.forEach((monster) => {
			if (monster.lootTable !== undefined) {
				monster.lootTable = monster.lootTable.sort(sortByDropWeight);
			}
		});
		thievingNPC.forEach((npc) => {
			npc.lootTable = npc.lootTable.sort(sortByDropWeight);
		});
		items.forEach((item) => {
			if (item.canOpen) {
				item.dropTable = item.dropTable.sort(sortByDropWeight);
			}
		});
		// Parse Array and initialize arrays
		for (let i = 0; i < items.length; i++) {
			items[i].id = i;
			// Initialize Source Arrays
			items[i].monsterSources = []; // Monster IDs
			items[i].thievingSources = []; // Thieving Target IDs
			items[i].chestSources = []; // Chest Item IDs
			items[i].dungeonSources = []; // Dungeon IDs
			// Set up creation sources array
			items[i].creationSources = []; // Skills/references to generation template
			items[i].upgradesFrom = [];
			items[i].shopSources = [];
			items[i].fromAltMagic = false;
		}
		playerSpecialAttacks.forEach((specialAttack) => {
			specialAttack.weaponsWithAttack = [];
		});
		// Parse items array and add additional information
		for (let i = 0; i < items.length; i++) {
			// Openable Items
			if (items[i].canOpen) {
				openableItems.push(i);
			}
			// Cookings Items, cookedItemID and burntItemID, game checks for type === 'Raw Fish' and cookingLevel
			if (items[i].cookingID !== undefined) {
				items[items[i].cookedItemID].cookingReq = [
					{
						id: i,
						qty: 1,
					},
				];
				items[items[i].cookedItemID].cookingLevel = items[i].cookingLevel;
				items[items[i].cookedItemID].cookingXP = items[i].cookingXP;
				items[items[i].cookedItemID].creationSources.push({
					skill: "Cooking",
					fillTemplate: fillItemCreationTemplateForCooking,
				});
				items[items[i].burntItemID].cookingReq = [{ id: i, qty: 1 }];
				items[items[i].burntItemID].cookingLevel = items[i].cookingLevel;
				items[items[i].burntItemID].cookingXP = 1;
				items[items[i].burntItemID].creationSources.push({
					skill: "Cooking",
					fillTemplate: fillItemCreationTemplateForCooking,
				});
			}
			// Farming Items
			if (items[i].tier === "Allotment") {
				items[items[i].grownItemID].farmingReq = [{ id: i, qty: 3 }];
				items[items[i].grownItemID].farmingLevel = items[i].farmingLevel;
				items[items[i].grownItemID].farmingXP = items[i].farmingXP;
				items[items[i].grownItemID].growthTime = items[i].timeToGrow;
				items[items[i].grownItemID].creationSources.push({
					skill: "Farming",
					fillTemplate: fillItemCreationTemplateForFarming,
				});
			}
			if (items[i].tier === "Herb") {
				items[items[i].grownItemID].farmingReq = [{ id: i, qty: 2 }];
				items[items[i].grownItemID].farmingLevel = items[i].farmingLevel;
				items[items[i].grownItemID].farmingXP = items[i].farmingXP;
				items[items[i].grownItemID].growthTime = items[i].timeToGrow;
				items[items[i].grownItemID].creationSources.push({
					skill: "Farming",
					fillTemplate: fillItemCreationTemplateForFarming,
				});
			}
			if (items[i].tier === "Tree") {
				items[items[i].grownItemID].farmingReq = [{ id: i, qty: 1 }];
				items[items[i].grownItemID].farmingLevel = items[i].farmingLevel;
				items[items[i].grownItemID].farmingXP = items[i].farmingXP;
				items[items[i].grownItemID].growthTime = items[i].timeToGrow;
				items[items[i].grownItemID].creationSources.push({
					skill: "Farming",
					fillTemplate: fillItemCreationTemplateForFarming,
				});
			}
			// Smithing Items
			if (items[i].smithingID !== undefined) {
				items[i].creationSources.push({
					skill: "Smithing",
					fillTemplate: fillItemCreationTemplateForSmithing,
				});
			}
			// Fletching Items
			if (items[i].fletchingID !== undefined) {
				items[i].creationSources.push({
					skill: "Fletching",
					fillTemplate: fillItemCreationTemplateForFletching,
				});
			}
			// Crafting Items
			if (items[i].craftingID !== undefined) {
				items[i].creationSources.push({
					skill: "Crafting",
					fillTemplate: fillItemCreationTemplateForCrafting,
				});
			}
			// Runecrafting Items
			if (items[i].runecraftingID !== undefined) {
				items[i].creationSources.push({
					skill: "Runecrafting",
					fillTemplate: fillItemCreationTemplateForRunecrafting,
				});
			}
			// Special Attacks
			if (items[i].hasSpecialAttack) {
				playerSpecialAttacks[items[i].specialAttackID].weaponsWithAttack.push(i);
			}
			if (items[i].trimmedItemID !== undefined) {
				items[items[i].trimmedItemID].upgradesFrom.push(i);
			}
		}
		// Parse alt magic and add it's recipes as a creation source
		ALTMAGIC.forEach((spell, spellID) => {
			switch (spell.selectItem) {
				case -1:
					// Creates either gems or convertTo value
					if (spell.convertTo !== undefined) {
						items[spell.convertTo].creationSources.push({
							skill: "Magic",
							fillTemplate: (itemID) => fillAltMagicTemplate(spellID, itemID),
						});
						items[spell.convertTo].fromAltMagic = true;
					} else {
						gemItems.forEach((gem) => {
							items[gem].creationSources.push({
								skill: "Magic",
								fillTemplate: (itemID) => fillAltMagicTemplate(spellID, itemID),
							});
							items[gem].fromAltMagic = true;
						});
					}
					break;
				case 0:
					smithingBars.forEach((bar) => {
						items[bar].creationSources.push({
							skill: "Magic",
							fillTemplate: (itemID) => fillAltMagicTemplate(spellID, itemID),
						});
						items[bar].fromAltMagic = true;
					});
					break;
				case 1:
					if (spell.isJunk) {
						gemItems.forEach((gem) => {
							items[gem].creationSources.push({
								skill: "Magic",
								fillTemplate: (itemID) => fillAltMagicTemplate(spellID, itemID),
							});
							items[gem].fromAltMagic = true;
						});
					} else if (!spell.isAlch) {
						items[spell.convertTo].creationSources.push({
							skill: "Magic",
							fillTemplate: (itemID) => fillAltMagicTemplate(spellID, itemID),
						});
						items[spell.convertTo].fromAltMagic = true;
					}
					break;
			}
		});
		// Add missing data from herblore to items array
		for (let i = 0; i < herbloreItemData.length; i++) {
			for (let j = 0; j < herbloreItemData[i].itemID.length; j++) {
				items[herbloreItemData[i].itemID[j]].fromHerblore = true;
				items[herbloreItemData[i].itemID[j]].potionTier = j;
				items[herbloreItemData[i].itemID[j]].herbloreLevel = herbloreItemData[i].herbloreLevel;
				items[herbloreItemData[i].itemID[j]].herbloreXP = herbloreItemData[i].herbloreXP;
				items[herbloreItemData[i].itemID[j]].herbloreID = herbloreItemData[i].id;
				items[herbloreItemData[i].itemID[j]].herbloreCategory = herbloreItemData[i].category;
				items[herbloreItemData[i].itemID[j]].creationSources.push({
					skill: "Herblore",
					fillTemplate: fillItemCreationTemplateForHerblore,
				});
			}
		}
		// Add woodcutting data to items array
		for (let i = 0; i < trees.length; i++) {
			items[i].woodcuttingXP = trees[i].xp;
			items[i].woodcuttingInterval = trees[i].interval;
			items[i].woodcuttingLevel = trees[i].level;
			items[i].creationSources.push({
				skill: "Woodcutting",
				fillTemplate: fillItemProductionTemplateForWoodcutting,
			});
		}
		// Add Mining data to items array
		for (let i = 0; i < miningData.length; i++) {
			const itemID = miningData[i].ore;
			items[itemID].miningLevel = miningData[i].level;
			if (i === 10) {
				items[itemID].miningQty = 2;
			} else {
				items[itemID].miningQty = 1;
			}
			items[itemID].creationSources.push({
				skill: "Mining",
				fillTemplate: fillItemProductionTemplateForMining,
			});
		}
		// Add Fishing data to items array
		for (let i = 0; i < fishingItems.length; i++) {
			const { itemID } = fishingItems[i];
			items[itemID].creationSources.push({
				skill: "Fishing",
				fillTemplate: fillItemProductionTemplateForFishing,
			});
		}
		for (let i = 0; i < junkItems.length; i++) {
			const itemID = junkItems[i];
			items[itemID].fishingXP = 1;
			items[itemID].fishingLevel = 1;
			items[itemID].isJunk = true;
			items[itemID].junkWeight = 1;
			items[itemID].creationSources.push({
				skill: "Fishing",
				fillTemplate: fillFishingJunkTemplate,
			});
		}
		let totalSpecialWeight = 0;
		for (let i = 0; i < specialItems.length; i++) {
			const itemID = specialItems[i][0];
			items[itemID].fishingLevel = 1;
			items[itemID].isFishingSpecial = true;
			items[itemID].specialWeight = specialItems[i][1];
			totalSpecialWeight += specialItems[i][1];
			items[itemID].creationSources.push({
				skill: "Fishing",
				fillTemplate: fillFishingSpecialTemplate,
			});
		}
		specialItems.totalWeight = totalSpecialWeight;
		// Add totalWeight and id to arrays that need it
		for (let i = 0; i < MONSTERS.length; i++) {
			MONSTERS[i].id = i;
			MONSTERS[i].canDropBones = false;
			MONSTERS[i].totalWeight = 0;
			if (MONSTERS[i].lootTable !== undefined) {
				for (let j = 0; j < MONSTERS[i].lootTable.length; j++) {
					MONSTERS[i].totalWeight += MONSTERS[i].lootTable[j][1];
				}
			}
		}
		for (let i = 0; i < thievingNPC.length; i++) {
			thievingNPC[i].id = i;
			thievingNPC[i].totalWeight = 0;
			for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
				thievingNPC[i].totalWeight += thievingNPC[i].lootTable[j][1];
			}
		}
		for (let i = 0; i < openableItems.length; i++) {
			items[openableItems[i]].totalWeight = 0;
			for (let j = 0; j < items[openableItems[i]].dropTable.length; j++) {
				items[openableItems[i]].totalWeight += items[openableItems[i]].dropTable[j][1];
			}
		}
		// Add Condensed Monsters to dungeons
		DUNGEONS.forEach((dungeon) => {
			let lastMonster = -1;
			let currentIndex = -1;
			const condensedArray = [];
			dungeon.monsters.forEach((monster) => {
				if (monster === lastMonster) {
					condensedArray[currentIndex].quantity++;
				} else {
					lastMonster = monster;
					currentIndex++;
					condensedArray.push({
						id: lastMonster,
						quantity: 1,
					});
				}
			});
			dungeon.condensedMonsters = condensedArray;
		});
		// Add Shop sources to items
		// gpCost, scCost, itemCost, requirements as a string, quantity as 1, or +500/2000 charges for gloves
		// Capes
		for (let i = 0; i < skillcapeItems.length; i++) {
			if (skillcapeItems[i] === CONSTANTS.item.Max_Skillcape) {
				items[skillcapeItems[i]].shopSources.push({
					gpCost: items[skillcapeItems[i]].buysFor,
					scCost: 0,
					itemCost: [],
					requirements: "Level 99 in All [[Skills]]",
					quantity: "1",
				});
			} else {
				items[skillcapeItems[i]].shopSources.push({
					gpCost: items[skillcapeItems[i]].buysFor,
					scCost: 0,
					itemCost: [],
					requirements: formatSkillRequirement(skillName[i], 99),
					quantity: "1",
				});
			}
		}
		// Gloves
		for (let i = 0; i < gloveID.length; i++) {
			items[gloveID[i]].shopSources.push({
				gpCost: glovesCost[i],
				scCost: 0,
				itemCost: [],
				requirements: "None",
				quantity: `+${glovesActions[i]} charges`,
			});
		}
		// Slayer Items
		slayerItems.forEach((itemID) => {
			items[itemID].shopSources.push({
				gpCost: 0,
				scCost: items[itemID].slayerCost,
				itemCost: [],
				requirements: "None",
				quantity: "1",
			});
		});
		// Materials
		shopMaterials.forEach((itemID) => {
			const materialCost = [];
			if (items[itemID].buysForLeather !== undefined) {
				materialCost.push({
					itemID: CONSTANTS.item.Leather,
					quantity: items[itemID].buysForLeather,
				});
			}
			if (items[itemID].buysForItems !== undefined) {
				items[itemID].buysForItems.forEach((buyItem) => {
					materialCost.push({
						itemID: buyItem[0],
						quantity: buyItem[1],
					});
				});
			}
			items[itemID].shopSources.push({
				gpCost: items[itemID].buysFor !== undefined ? items[itemID].buysFor : 0,
				scCost: 0,
				itemCost: materialCost,
				requirements: "None",
				quantity: "1",
			});
		});
		// Fill loot sources arrays
		// Monsters
		for (let i = 0; i < combatAreas.length; i++) {
			combatAreas[i].id = i;
			for (let j = 0; j < combatAreas[i].monsters.length; j++) {
				const monID = combatAreas[i].monsters[j];
				MONSTERS[monID].canDropBones = true;
				if (MONSTERS[monID].lootTable !== undefined) {
					for (let k = 0; k < MONSTERS[monID].lootTable.length; k++) {
						items[MONSTERS[monID].lootTable[k][0]].monsterSources.push({
							id: monID,
							chance: (getMonsterLootChance(monID) * MONSTERS[monID].lootTable[k][1]) / MONSTERS[monID].totalWeight,
							maxQty: MONSTERS[monID].lootTable[k][2],
						});
					}
				}
			}
		}
		for (let i = 0; i < slayerAreas.length; i++) {
			slayerAreas[i].id = i;
			for (let j = 0; j < slayerAreas[i].monsters.length; j++) {
				const monID = slayerAreas[i].monsters[j];
				MONSTERS[monID].canDropBones = true;
				if (MONSTERS[monID].lootTable !== undefined) {
					for (let k = 0; k < MONSTERS[monID].lootTable.length; k++) {
						items[MONSTERS[monID].lootTable[k][0]].monsterSources.push({
							id: monID,
							chance: (getMonsterLootChance(monID) * MONSTERS[monID].lootTable[k][1]) / MONSTERS[monID].totalWeight,
							maxQty: MONSTERS[monID].lootTable[k][2],
						});
					}
				}
			}
		}
		// Thieving Item Loot sources
		for (let i = 0; i < thievingNPC.length; i++) {
			for (let j = 0; j < thievingNPC[i].lootTable.length; j++) {
				items[thievingNPC[i].lootTable[j][0]].thievingSources.push({
					id: i,
					chance: (75 * thievingNPC[i].lootTable[j][1]) / thievingNPC[i].totalWeight,
					maxQty: 1,
				});
			}
		}
		// Chest Item Loot Sources
		for (let i = 0; i < openableItems.length; i++) {
			const chest = items[openableItems[i]];
			for (let j = 0; j < chest.dropTable.length; j++) {
				items[chest.dropTable[j][0]].chestSources.push({
					id: openableItems[i],
					chance: (100 * chest.dropTable[j][1]) / chest.totalWeight,
					maxQty: chest.dropTable[j][2],
				});
			}
		}
		// Dungeon Item Loot Sources
		for (let i = 0; i < DUNGEONS.length; i++) {
			DUNGEONS[i].id = i;
			const monID = DUNGEONS[i].monsters[DUNGEONS[i].monsters.length - 1];
			for (let k = 0; k < MONSTERS[monID].lootTable.length; k++) {
				items[MONSTERS[monID].lootTable[k][0]].dungeonSources.push({
					id: i,
					chance: (getMonsterLootChance(monID) * MONSTERS[monID].lootTable[k][1]) / MONSTERS[monID].totalWeight,
					maxQty: MONSTERS[monID].lootTable[k][2],
				});
			}
			if (i === CONSTANTS.dungeon.Volcanic_Cave) {
				items[CONSTANTS.item.Fire_Cape].dungeonSources.push({
					id: i,
					chance: 100,
					maxQty: 1,
				});
			}
			// Shards
			if (godDungeonID.includes(i)) {
				DUNGEONS[i].condensedMonsters.forEach((monster) => {
					items[MONSTERS[monster.id].bones].monsterSources.push({
						id: monster.id,
						chance: 100,
						maxQty: MONSTERS[monster.id].boneQty ? MONSTERS[monster.id].boneQty : 1,
						minQty: MONSTERS[monster.id].boneQty ? MONSTERS[monster.id].boneQty : 1,
					});
					MONSTERS[monster.id].canDropBones = true;
					MONSTERS[monster.id].isGodMonster = true;
				});
			}
		}
		// Add if item has a loot source or not
		for (let i = 0; i < items.length; i++) {
			if (items[i].monsterSources.length > 0 || items[i].thievingSources.length > 0 || items[i].chestSources.length > 0 || items[i].dungeonSources.length > 0) {
				items[i].hasLootSource = true;
			} else {
				items[i].hasLootSource = false;
			}
		}
		// Create pageNames
		const pageNameData = findDuplicatePageNames();
		wikiPageNames = pageNameData.pageNames;
		disambiguationData = pageNameData.disambiguationData;
		itemUses = createItemUses();
		// Item subsets for slayer armour for specific combat types
		forceMeleeArmour = [CONSTANTS.item.Slayer_Helmet_Basic, CONSTANTS.item.Slayer_Platebody_Basic];
		forceRangedArmour = [CONSTANTS.item.Slayer_Cowl_Basic, CONSTANTS.item.Slayer_Leather_Body_Basic];
		forceMagicArmour = [CONSTANTS.item.Slayer_Wizard_Hat_Basic, CONSTANTS.item.Slayer_Wizard_Robes_Basic, CONSTANTS.item.Enchanted_Shield];
		// Master table containing the page and sections as well as the generating function for all tables/pages
		// Functions that generate entire pages are marked by isPageContent: true.
		masterTable = [
			{
				page: "Raw Cave Fish",
				section: "",
				subsection: "",
				subsubsection: "",
				isPageContent: true,
				generate: () => createItemPageContent(18),
			},
			// Cooking Page
			{
				name: "CookingTable",
				page: "Cooking",
				section: "Cooking Items",
				subsection: "",
				subsubsection: "",
				generate: createCookingTable,
			},
			// Farming Page
			{
				name: "FarmingAllotmentTable",
				page: "Farming",
				section: "Seeds",
				subsection: "Allotments",
				subsubsection: "",
				generate: createFarmingAllotmentTable,
			},
			{
				name: "FarmingHerbTable",
				page: "Farming",
				section: "Seeds",
				subsection: "Herbs",
				subsubsection: "",
				generate: createFarmingHerbTable,
			},
			{
				name: "FarmingTreeTable",
				page: "Farming",
				section: "Seeds",
				subsection: "Trees",
				subsubsection: "",
				generate: createFarmingTreeTable,
			},
			{
				name: "FarmingAllotmentPlotTable",
				page: "Farming",
				section: "Farming Plots",
				subsection: "Allotments",
				subsubsection: "",
				generate: () => createFarmingPlotsTable(0),
			},
			{
				name: "FarmingHerbPlotTable",
				page: "Farming",
				section: "Farming Plots",
				subsection: "Herbs",
				subsubsection: "",
				generate: () => createFarmingPlotsTable(1),
			},
			{
				name: "FarmingTreePlotTable",
				page: "Farming",
				section: "Farming Plots",
				subsection: "Trees",
				subsubsection: "",
				generate: () => createFarmingPlotsTable(2),
			},
			// Firemaking Page
			{
				name: "FiremakingLogsTable",
				page: "Firemaking",
				section: "Logs",
				subsection: "",
				subsubsection: "",
				generate: createFiremakingTable,
			},
			// Mining Page
			{
				name: "MiningOresTable",
				page: "Mining",
				section: "Allotment Ores",
				subsection: "",
				subsubsection: "",
				generate: createMiningTable,
			},
			{
				name: "MiningGemsTable",
				page: "Mining",
				section: "Gems",
				subsection: "",
				subsubsection: "",
				generate: createGemTable,
			},
			// Fishing Page
			{
				name: "FishingAreasTable",
				page: "Fishing",
				section: "Fishing Areas",
				subsection: "",
				subsubsection: "",
				generate: createFishingAreasTable,
			},
			{
				name: "FishingFishTable",
				page: "Fishing",
				section: "Fish",
				subsection: "",
				subsubsection: "",
				generate: createFishingTable,
			},
			{
				name: "FishingTreasureTable",
				page: "Fishing",
				section: "Special",
				subsection: "",
				subsubsection: "",
				generate: createFishTreasureTable,
			},
			{
				name: "FishingJunkTable",
				page: "Fishing",
				section: "Junk",
				subsection: "",
				subsubsection: "",
				generate: createFishingJunkTable,
			},
			// Upgrading Items Page
			{
				page: "Upgrading Items",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createUpgradedGearPage,
				isPageContent: true,
			},
			{
				name: "HelmetUpgradeTable",
				page: "Upgrading Items",
				section: "Helmet",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Helmet),
			},
			{
				name: "PlatebodyUpgradeTable",
				page: "Upgrading Items",
				section: "Platebody",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Platebody),
			},
			{
				name: "PlatelegUpgradeTable",
				page: "Upgrading Items",
				section: "Platelegs",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Platelegs),
			},
			{
				name: "BootsUpgradeTable",
				page: "Upgrading Items",
				section: "Boots",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Boots),
			},
			{
				name: "GlovesUpgradeTable",
				page: "Upgrading Items",
				section: "Gloves",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Gloves),
			},
			{
				name: "WeaponUpgradeTable",
				page: "Upgrading Items",
				section: "Weapon",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Weapon),
			},
			{
				name: "ShieldUpgradeTable",
				page: "Upgrading Items",
				section: "Shield",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Shield),
			},
			{
				name: "AmuletUpgradeTable",
				page: "Upgrading Items",
				section: "Amulet",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Amulet),
			},
			{
				name: "RingUpgradeTable",
				page: "Upgrading Items",
				section: "Rings",
				subsection: "",
				subsubsection: "",
				generate: () => createUpgradeableGearTable(CONSTANTS.equipmentSlot.Ring),
			},
			{
				name: "OtherUpgradeTable",
				page: "Upgrading Items",
				section: "Other",
				subsection: "",
				subsubsection: "",
				generate: createNonGearUpgradeTable,
			},
			// Monster Page
			{
				name: "MonsterTable",
				page: "Monsters",
				section: "Table of Monsters",
				subsection: "",
				subsubsection: "",
				generate: createMonsterTable,
			},
			// Smithing Page
			{
				page: "Smithing",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createSmithingPage,
				isPageContent: true,
			},
			{
				name: "SmithingBarsTable",
				page: "Smithing",
				section: "Bars",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Bar"),
			},
			{
				name: "SmithingBronzeTable",
				page: "Smithing",
				section: "Bronze Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Bronze"),
			},
			{
				name: "SmithingIronTable",
				page: "Smithing",
				section: "Iron Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Iron"),
			},
			{
				name: "SmithingSteelTable",
				page: "Smithing",
				section: "Steel Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Steel"),
			},
			{
				name: "SmithingMithrilTable",
				page: "Smithing",
				section: "Mithril Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Mithril"),
			},
			{
				name: "SmithingAdamantTable",
				page: "Smithing",
				section: "Adamant Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Adamant"),
			},
			{
				name: "SmithingRuneTable",
				page: "Smithing",
				section: "Rune Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Rune"),
			},
			{
				name: "SmithingDragonTable",
				page: "Smithing",
				section: "Dragon Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createSmithingTable("Dragon"),
			},
			// Equipment Page
			{
				page: "Equipment",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createEquipmentPage,
				isPageContent: true,
			},
			{
				name: "MeleeHelmetTable",
				page: "Equipment",
				section: "Helmets",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Helmet, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedHelmetTable",
				page: "Equipment",
				section: "Helmets",
				subsection: "Ranged",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Helmet, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicHelmetTable",
				page: "Equipment",
				section: "Helmets",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Helmet, "Magic"),
				isPageContent: false,
			},
			{
				name: "MeleePlatebodyTable",
				page: "Equipment",
				section: "Platebodys",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platebody, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedPlatebodyTable",
				page: "Equipment",
				section: "Platebodys",
				subsection: "Ranged",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platebody, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicPlatebodyTable",
				page: "Equipment",
				section: "Platebodys",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platebody, "Magic"),
				isPageContent: false,
			},
			{
				name: "MeleePlatelegsTable",
				page: "Equipment",
				section: "Platelegs",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platelegs, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedPlatelegsTable",
				page: "Equipment",
				section: "Platelegs",
				subsection: "Ranged",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platelegs, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicPlatelegsTable",
				page: "Equipment",
				section: "Platelegs",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Platelegs, "Magic"),
				isPageContent: false,
			},
			{
				name: "MeleeBootsTable",
				page: "Equipment",
				section: "Boots",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Boots, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedBootsTable",
				page: "Equipment",
				section: "Boots",
				subsection: "Ranged",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Boots, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicBootsTable",
				page: "Equipment",
				section: "Boots",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Boots, "Magic"),
				isPageContent: false,
			},
			{
				name: "MeleeGlovesTable",
				page: "Equipment",
				section: "Gloves",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Gloves, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedGlovesTable",
				page: "Equipment",
				section: "Gloves",
				subsection: "Ranged",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Gloves, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicGlovesTable",
				page: "Equipment",
				section: "Gloves",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Gloves, "Magic"),
				isPageContent: false,
			},
			{
				name: "SkillGlovesTable",
				page: "Equipment",
				section: "Gloves",
				subsection: "Skills",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Gloves, "None"),
				isPageContent: false,
			},
			{
				name: "CapesTable",
				page: "Equipment",
				section: "Capes",
				subsection: "",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Cape, "All"),
				isPageContent: false,
			},
			{
				name: "ArrowsTable",
				page: "Equipment",
				section: "Ammunition",
				subsection: "Arrows",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Quiver, "All", 0),
				isPageContent: false,
			},
			{
				name: "BoltsTable",
				page: "Equipment",
				section: "Ammunition",
				subsection: "Bolts",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Quiver, "All", 1),
				isPageContent: false,
			},
			{
				name: "RingsTable",
				page: "Equipment",
				section: "Rings",
				subsection: "",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Ring, "All"),
				isPageContent: false,
			},
			{
				name: "AmuletsTable",
				page: "Equipment",
				section: "Amulets",
				subsection: "",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Amulet, "All"),
				isPageContent: false,
			},
			{
				name: "MeleeShieldsTable",
				page: "Equipment",
				section: "Offhand",
				subsection: "Shields",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Shield, "Melee"),
				isPageContent: false,
			},
			{
				name: "RangedShieldsTable",
				page: "Equipment",
				section: "Offhand",
				subsection: "Ranged Shields",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Shield, "Ranged"),
				isPageContent: false,
			},
			{
				name: "MagicShieldsTable",
				page: "Equipment",
				section: "Offhand",
				subsection: "Books",
				subsubsection: "",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Shield, "Magic"),
				isPageContent: false,
			},
			{
				name: "MeleeWeaponsTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Melee",
				subsubsection: "",
				generate: () => createWeaponTable("Melee"),
				isPageContent: false,
			},
			{
				name: "BowsTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Ranged",
				subsubsection: "Bows",
				generate: () => createWeaponTable("Ranged", 0),
				isPageContent: false,
			},
			{
				name: "CrossbowsTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Ranged",
				subsubsection: "Crossbows",
				generate: () => createWeaponTable("Ranged", 1),
				isPageContent: false,
			},
			{
				name: "JavelinsTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Ranged",
				subsubsection: "Javelins",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Quiver, "All", 2),
				isPageContent: false,
			},
			{
				name: "ThrowingKnivesTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Ranged",
				subsubsection: "Throwing Knives",
				generate: () => createArmourTable(CONSTANTS.equipmentSlot.Quiver, "All", 3),
				isPageContent: false,
			},
			{
				name: "MagicWeaponsTable",
				page: "Equipment",
				section: "Weapons",
				subsection: "Magic",
				subsubsection: "",
				generate: () => createWeaponTable("Magic"),
				isPageContent: false,
			},
			// Magic Page
			{
				name: "MagicSpellsTable",
				page: "Magic",
				section: "Spells",
				subsection: "",
				subsubsection: "",
				generate: createSpellTable,
			},
			{
				name: "MagicCurseTable",
				page: "Magic",
				section: "Curses",
				subsection: "",
				subsubsection: "",
				generate: createCurseTable,
			},
			{
				name: "MagicAuroraTable",
				page: "Magic",
				section: "Auroras",
				subsection: "",
				subsubsection: "",
				generate: createAuroraTable,
			},
			{
				name: "MagicAncientTable",
				page: "Magic",
				section: "Ancient Magicks",
				subsection: "",
				subsubsection: "",
				generate: createAncientMagickTable,
			},
			{
				name: "AltMagicTable",
				page: "Alternative Magic",
				section: "Spells",
				subsection: "",
				subsubsection: "",
				generate: createAltMagicTable,
			},
			// Runecrafting Page
			{
				name: "RunecraftingRunesTable",
				page: "Runecrafting",
				section: "Runes",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(0),
			},
			{
				name: "RunecraftingWeaponTable",
				page: "Runecrafting",
				section: "Staves & Wands",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(1),
			},
			{
				name: "RunecraftingAirGearTable",
				page: "Runecrafting",
				section: "Air Magic Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(2),
			},
			{
				name: "RunecraftingWaterGearTable",
				page: "Runecrafting",
				section: "Water Magic Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(3),
			},
			{
				name: "RunecraftingEarthGearTable",
				page: "Runecrafting",
				section: "Earth Magic Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(4),
			},
			{
				name: "RunecraftingFireGearTable",
				page: "Runecrafting",
				section: "Fire Magic Gear",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(5),
			},
			{
				name: "RunecraftingComboRunesTable",
				page: "Runecrafting",
				section: "Combination Runes",
				subsection: "",
				subsubsection: "",
				generate: () => createRuneCraftingTable(6),
			},
			// Monster Loot Tables Page
			{
				name: "MonsterLootTables",
				page: "Monster Loot Tables",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createMonsterLootTablePage,
				isPageContent: false,
			},
			// Chest Drop Tables Page
			{
				page: "Chest Drop Tables",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createChestDropTablesPage,
				isPageContent: true,
			},
			// Shop Page
			{
				name: "AutoEatUpgradeTable",
				page: "Shop",
				section: "General Upgrades",
				subsection: "Auto Eat",
				subsubsection: "",
				generate: createShopAutoEatTable,
			},
			{
				name: "AxeUpgradeTable",
				page: "Shop",
				section: "Equipment",
				subsection: "Axes",
				subsubsection: "",
				generate: createShopAxesTable,
			},
			{
				name: "RodUpgradeTable",
				page: "Shop",
				section: "Equipment",
				subsection: "Fishing Rods",
				subsubsection: "",
				generate: createShopFishRodTable,
			},
			{
				name: "PickaxeUpgradeTable",
				page: "Shop",
				section: "Equipment",
				subsection: "Pickaxes",
				subsubsection: "",
				generate: createShopPickaxeTable,
			},
			{
				name: "CookingFireUpgradeTable",
				page: "Shop",
				section: "Equipment",
				subsection: "Cooking Fires",
				subsubsection: "",
				generate: createShopCookingFireTable,
			},
			{
				name: "ShopSkillcapeTable",
				page: "Shop",
				section: "Skillcapes",
				subsection: "",
				subsubsection: "",
				generate: createShopSkillcapeTable,
			},
			{
				name: "ShopGlovesTable",
				page: "Shop",
				section: "Gloves",
				subsection: "",
				subsubsection: "",
				generate: createShopGloveTable,
			},
			{
				name: "ShopMaterialsTable",
				page: "Shop",
				section: "Materials",
				subsection: "",
				subsubsection: "",
				generate: createShopMaterialTable,
			},
			{
				name: "ShopSlayerTable",
				page: "Shop",
				section: "Slayer Items",
				subsection: "",
				subsubsection: "",
				generate: createShopSlayerTable,
			},
			{
				name: "GodUpgradeTable",
				page: "Shop",
				section: "Skill Upgrades",
				subsection: "God Upgrades",
				subsubsection: "",
				generate: createShopGodUpgradeTable,
			},
			// Crafting Page
			{
				page: "Crafting",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createCraftingPage,
				isPageContent: true,
			},
			{
				name: "CraftingLeatherTable",
				page: "Crafting",
				section: "Leather Armour",
				subsection: "",
				subsubsection: "",
				generate: () => createCraftingTable("Leather"),
			},
			{
				name: "CraftingDragonhideTable",
				page: "Crafting",
				section: "Dragonhide",
				subsection: "",
				subsubsection: "",
				generate: () => createCraftingTable("D-hide"),
			},
			{
				name: "CraftingRingTable",
				page: "Crafting",
				section: "Rings",
				subsection: "",
				subsubsection: "",
				generate: () => createCraftingTable("Ring"),
			},
			{
				name: "CraftingNecklaceTable",
				page: "Crafting",
				section: "Necklaces",
				subsection: "",
				subsubsection: "",
				generate: () => createCraftingTable("Necklace"),
			},
			// Thieving Page
			{
				name: "ThievingTargetTable",
				page: "Thieving",
				section: "Thieving Targets",
				subsection: "",
				subsubsection: "",
				generate: createThievingTable,
			},
			// Woodcutting Page
			{
				name: "WoodcuttingLogTable",
				page: "Woodcutting",
				section: "Logs",
				subsection: "",
				subsubsection: "",
				generate: createWoodCuttingTable,
			},
			// Table of Items Page
			{
				name: "ItemsTable",
				page: "Table of Items",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createItemsTable,
			},
			// Fletching Page
			{
				page: "Fletching",
				section: "",
				subsection: "",
				subsubsection: "",
				generate: createFletchingPage,
				isPageContent: true,
			},
			{
				name: "FletchingArrowTable",
				page: "Fletching",
				section: "Arrows",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Arrow"),
			},
			{
				name: "FletchingShortbowTable",
				page: "Fletching",
				section: "Shortbows",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Shortbow"),
			},
			{
				name: "FletchingLongbowTable",
				page: "Fletching",
				section: "Longbows",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Longbow"),
			},
			{
				name: "FletchingBoltTable",
				page: "Fletching",
				section: "Gem-Tipped Bolts",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Bolts"),
			},
			{
				name: "FletchingCrossbowTable",
				page: "Fletching",
				section: "Crossbows",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Crossbow"),
			},
			{
				name: "FletchingJavelinTable",
				page: "Fletching",
				section: "Javelins",
				subsection: "",
				subsubsection: "",
				generate: () => createFletchingTable("Javelin"),
			},
			// Prayer Page
			{
				name: "PrayerTable",
				page: "Prayer",
				section: "Prayers",
				subsection: "",
				subsubsection: "",
				generate: createPrayerTable,
				isPageContent: false,
			},
			{
				name: "BonesTable",
				page: "Prayer",
				section: "Bones",
				subsection: "",
				subsubsection: "",
				generate: createBonesTable,
				isPageContent: false,
			},
			/*
            {
                page: 'Experience',
                section: 'Table of Experience',
                subsection: '',
                subsubsection: '',
                generate: createXPTable,
                isPageContent: false
            },
            */
			{
				page: "Mastery",
				section: "Table of Experience",
				subsection: "",
				subsubsection: "",
				generate: createMasteryXPTable,
				isPageContent: true,
			},
			{
				name: "HerbloreSkillPotionTable",
				page: "Herblore",
				section: "Skill Potions",
				subsection: "",
				subsubsection: "",
				generate: () => createPotionsTable("Skill"),
				isPageContent: false,
			},
			{
				name: "HerbloreCombatPotionTable",
				page: "Herblore",
				section: "Combat Potions",
				subsection: "",
				subsubsection: "",
				generate: () => createPotionsTable("Combat"),
				isPageContent: false,
			},
			{
				name: "PlayerSpecialAttackTable",
				page: "Special Attacks",
				section: "Special Attacks",
				subsection: "",
				subsubsection: "",
				generate: createPlayerSpecialAttacksTable,
				isPageContent: false,
			},
		];
		masterTable.sort((a, b) => {
			if (a.page < b.page) {
				return -1;
			}
			if (a.page > b.page) {
				return 1;
			}
			return 0;
		});
		// Create master table droplist
		let dropDownNames = [];
		let dropDownValues = [];
		for (let i = 0; i < masterTable.length; i++) {
			dropDownNames.push(`${masterTable[i].page}:${masterTable[i].section}:${masterTable[i].subsection}`);
			dropDownValues.push(i);
		}
		let tableDropdown = createDropdown(dropDownNames, dropDownValues, "mweTableDropdown", tableChanged, "100%");
		tableDropdown.style.marginBottom = "1%";
		menuDivC.appendChild(tableDropdown);
		dropDownNames = [];
		dropDownValues = [];
		for (let i = 0; i < items.length; i++) {
			dropDownNames.push(wikiPageNames.items[i]);
			dropDownValues.push(i);
		}
		tableDropdown = createDropdown(dropDownNames, dropDownValues, "mweItemDropdown", itemChanged, "100%");
		tableDropdown.style.marginBottom = "1%";
		menuDivC.appendChild(tableDropdown);
		dropDownNames = [];
		dropDownValues = [];
		items.forEach((item, i) => {
			dropDownNames.push(`Template:${item.name} Sources`);
			dropDownValues.push(i);
		});
		tableDropdown = createDropdown(dropDownNames, dropDownValues, "mweItemDropdown", itemSourceChanged, "100%");
		tableDropdown.style.marginBottom = "1%";
		menuDivC.appendChild(tableDropdown);
		wikiDataLoaded = true;
	} catch (error) {
		console.error(error);
	}
}

// Wait for game data to be ready to be set in content script scope
const wikiLoader = setInterval(() => {
	try {
		wikiData = window.wrappedJSObject.wikiData;
		if (wikiData !== undefined) {
			clearInterval(wikiLoader);
			processWikiData();
		}
	} catch (error) {
		throw error;
	}
}, 500);
