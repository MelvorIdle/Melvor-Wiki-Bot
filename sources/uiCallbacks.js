// Callback functions for UI elements
/**
 * Callback for master table browser dropdown
 * @param {Event} event change event for select element
 */
function tableChanged(event) {
  const masterID = parseInt(event.currentTarget.selectedOptions[0].value);
  try {
    wikiTableOutput.textContent = masterTable[masterID].generate();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Callback for item page browser dropdown
 * @param {Event} event change event for select element
 */
function itemChanged(event) {
  const itemID = parseInt(event.currentTarget.selectedOptions[0].value);
  try {
    wikiTableOutput.textContent = createItemPageContent(itemID);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Callback for login button in bottom menu
 */
function loginButton() {
  document.getElementById('wikiLogin').style.display = '';
}

/**
 * Callback for request page button
 * Returns the Chest of Witwix page for testing
 * @async
 */
async function buttonRequestPage() {
  // let pageContent = getFullWikiPage('Chest of Witwix');
  try {
    const pageContent = await getFullWikiPage('Chest of Witwix');
    console.log(pageContent);
    const itemTemplate = pageContent.match(ITEMTEMPLATEREGEX);
    console.log(itemTemplate);
    wikiTableOutput.textContent = pageContent;
    /*
        let pageSectionID = await getSectionID('Chest of Witwix', 'Loot Table');
        console.log(pageSectionID);
        let pageContent = await getWikiPageSection('Chest of Witwix', pageSectionID);
        */
  } catch (e) {
    console.error(e);
  }
}

/**
 * Callback for cancel button on login screen
 */
function loginCancel() {
  document.getElementById('wikiLogin').style.display = 'none';
}

/**
 * Callback for the true login button on the login screen
 * Attempts to log into the wiki with the provided credentials
 * @async
 */
async function trueLogin() {
  console.log('Logging In...');
  const logintoken = await getLoginToken();
  getLoginRequest(logintoken, document.getElementById('wikiUserInput').value, document.getElementById('wikiPassInput').value);
}

/**
 * Callback for the logout button on the bottom menu
 * Attempts to log out of the wiki
 * @async
 */
async function logoutButton() {
  console.log('Logging Out...');
  const csrftoken = await getCsrfToken();
  getLogoutRequest(csrftoken);
}

/**
 * Callback for a testing function to upload a single image
 * Attempts to upload the Slayer Coins image to the wiki via URL upload
 * @async
 * @deprecated
 */
async function buttonImageUploadURL() {
  console.log('Attempting Image Upload From URL');
  const csrftoken = await getCsrfToken();
  uploadImageFromUrl('Slayer Coins.svg', 'Automatically uploaded by coolbot95.', 'https://melvoridle.com/assets/media/main/slayer_coins.svg', csrftoken);
}

/**
 * Callback for a testing function to upload a single image via Blob
 * Attempts to upload the Equipment Set upgrade image via Blob
 * @async
 */
async function buttonImageUploadBlob() {
  console.log('Attempting Image Upload From Blob');
  const csrftoken = await getCsrfToken();
  const imageURL = GAMEURL + 'assets/media/shop/equipment_set.svg';
  const response = await uploadImageFromUrlViaBlob('Equipment Set (upgrade).svg', '[[Category:Upgrades]]', imageURL, csrftoken);
  console.log(response);
}

/**
 * Callback for testing the creation of an item page
 * @param {Number} itemID Index of items
 * @async
 */
async function uploadTestItemPage(itemID) {
  console.log('Attempting to create item test Page');
  if (wikiDataLoaded) {
    const csrftoken = await getCsrfToken();
    const response = await createWikiPage(items[itemID].name, createItemPageContent(itemID), 'Page autogenerated by coolbot95. This is a test.', csrftoken);
    console.log(response);
  } else {
    console.error('Wiki Data has not loaded.');
  }
}

/**
 * Callback for uploading all dungeon images
 */
function uploadDungeonImages() {
  if (wikiDataLoaded) {
    // Generate image sources and filenames
    const dungeonImageSources = [];
    const dungeonImageFilenames = [];
    for (let i = 0; i < DUNGEONS.length; i++) {
      dungeonImageSources.push(GAMEURL + DUNGEONS[i].media);
      dungeonImageFilenames.push(`${DUNGEONS[i].name} (dungeon).svg`);
    }
    bulkUploadImages(dungeonImageFilenames, dungeonImageSources, '[[Category:Dungeons]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all prayer images
 */
function uploadPrayerImages() {
  if (wikiDataLoaded) {
    // Generate image sources and filenames
    const prayerImageSources = [];
    const prayerImageFilenames = [];
    for (let i = 0; i < PRAYER.length; i++) {
      prayerImageSources.push(GAMEURL + PRAYER[i].media);
      prayerImageFilenames.push(`${PRAYER[i].name} (prayer).svg`);
    }
    bulkUploadImages(prayerImageFilenames, prayerImageSources, '[[Category:Prayers]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all item images
 */
function uploadItemImages() {
  if (wikiDataLoaded) {
    // Generate image sources and filenames
    const itemImageSources = [];
    const itemImageFilenames = [];
    for (let i = 0; i < items.length; i++) {
      itemImageSources.push(GAMEURL + items[i].media);
      itemImageFilenames.push(`${items[i].name} (item)${getFileExtension(items[i].media)}`);
    }
    bulkUploadImages(itemImageFilenames, itemImageSources, '[[Category:Items]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all item images from startIndex to the end of items
 * @param {Number} startIndex Starting index of items
 */
function uploadNewItemImages(startIndex) {
  if (wikiDataLoaded) {
    // Generate image sources and filenames
    const itemImageSources = [];
    const itemImageFilenames = [];
    for (let i = startIndex; i < items.length; i++) {
      itemImageSources.push(GAMEURL + items[i].media);
      itemImageFilenames.push(`${items[i].name} (item)${getFileExtension(items[i].media)}`);
    }
    bulkUploadImages(itemImageFilenames, itemImageSources, '[[Category:Items]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating item pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of items
 */
function createItemPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateItemPages(startIndex, items.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating monster pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of MONSTERS
 */
function createMonsterPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateMonsterPages(startIndex, MONSTERS.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating combat area pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of combatAreas
 */
function createCombatAreaPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateCombatAreaPages(startIndex, combatAreas.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating slayer area pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of slayerAreas
 */
function createSlayerAreaPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateSlayerAreaPages(startIndex, slayerAreas.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating dungeon pages. Will not overwrite existing pages.
 * @param {Number} startIndex  Starting index of DUNGEONS
 */
function createDungeonPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateDungeonPages(startIndex, 8);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating spell pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting Index of SPELLS
 */
function createSpellPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateSpellPages(startIndex, SPELLS.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating prayer pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of PRAYER
 */
function createPrayerPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreatePrayerPages(startIndex, PRAYER.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating thieving target pages. Will not overwrite existing pages.
 * @param {Number} startIndex Starting index of thievingNPC
 */
function createThievingPages(startIndex) {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateThievingPages(startIndex, thievingNPC.length - 1);
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating upgrade pages. Will not overwrite existing pages.
 */
function createUpgradePages() {
  if (wikiDataLoaded) {
    // Create item pages
    bulkCreateUpgradePages();
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating table templates in master table. Will overwrite existing pages.
 */
function createTableTemplates() {
  if (wikiDataLoaded) {
    // Create table templates
    bulkCreateTableTemplates();
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for creating item source templates. Will overwrite existing pages.
 */
function createItemSourceTemplates() {
  if (wikiDataLoaded) {
    // Create table templates
    bulkCreateItemSourceTemplates();
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all monster images
 */
function uploadMonsterImages() {
  if (wikiDataLoaded) {
    const monstersOnList = [];
    for (let i = 0; i < MONSTERS.length; i++) {
      monstersOnList.push(false);
    }
    const monsterImageSources = [];
    const monsterImageFilenames = [];
    for (let i = 0; i < combatAreas.length; i++) {
      for (let j = 0; j < combatAreas[i].monsters.length; j++) {
        const monsterID = combatAreas[i].monsters[j];
        if (!monstersOnList[monsterID] && !isItemOnArray(`${MONSTERS[monsterID].name} (monster).svg`, monsterImageFilenames)) {
          monstersOnList[monsterID] = true;
          monsterImageSources.push(GAMEURL + MONSTERS[monsterID].media);
          monsterImageFilenames.push(`${MONSTERS[monsterID].name} (monster).svg`);
        }
      }
    }
    for (let i = 0; i < DUNGEONS.length; i++) {
      for (let j = 0; j < DUNGEONS[i].monsters.length; j++) {
        const monsterID = DUNGEONS[i].monsters[j];
        if (!monstersOnList[monsterID] && !isItemOnArray(`${MONSTERS[monsterID].name} (monster).svg`, monsterImageFilenames)) {
          monstersOnList[monsterID] = true;
          monsterImageSources.push(GAMEURL + MONSTERS[monsterID].media);
          monsterImageFilenames.push(`${MONSTERS[monsterID].name} (monster).svg`);
        }
      }
    }
    bulkUploadImages(monsterImageFilenames, monsterImageSources, '[[Category:Monsters]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all combat area and slayer area images
 */
function uploadCombatAreaImages() {
  if (wikiDataLoaded) {
    // Generate image sources and filenames
    const areaImageSources = [];
    const areaImageFilenames = [];
    for (let i = 0; i < combatAreas.length; i++) {
      areaImageSources.push(GAMEURL + combatAreas[i].media);
      areaImageFilenames.push(`${combatAreas[i].areaName} (combatArea).svg`);
    }
    for (let i = 0; i < slayerAreas.length; i++) {
      areaImageSources.push(GAMEURL + slayerAreas[i].media);
      areaImageFilenames.push(`${slayerAreas[i].areaName} (combatArea).svg`);
    }
    bulkUploadImages(areaImageFilenames, areaImageSources, '[[Category:Combat Areas]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for uploading all spell images
 */
function uploadSpellImages() {
  if (wikiDataLoaded) {
    const spellImageSources = [];
    const spellImageFilenames = [];
    for (let i = 0; i < SPELLS.length; i++) {
      spellImageSources.push(GAMEURL + SPELLS[i].media);
      spellImageFilenames.push(`${SPELLS[i].name} (spell).svg`);
    }
    bulkUploadImages(spellImageFilenames, spellImageSources, '[[Category:Spells]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}
/**
 * Callback for uploading shop upgrade images
 */
function uploadUpgradeImages() {
  if (wikiDataLoaded) {
    const upgradeImageSources = [];
    const upgradeImageFilenames = [];
    // Bank Slot
    upgradeImageSources.push(GAMEURL + 'assets/media/main/bank_header.svg');
    upgradeImageFilenames.push('Bank Slot (upgrade).svg');
    // Multi Tree
    upgradeImageSources.push(GAMEURL + 'assets/media/shop/woodcutting_multi_tree.svg');
    upgradeImageFilenames.push('Multi-Tree (upgrade).svg');
    for (let i = 1; i < tiers.length; i++) {
      // Axes
      upgradeImageSources.push(GAMEURL + 'assets/media/shop/axe_' + tiers[i] + '.svg');
      upgradeImageFilenames.push(`${setToUppercase(tiers[i])} Axe (upgrade).svg`);
      // Fishing Rods
      upgradeImageSources.push(GAMEURL + 'assets/media/shop/fishing_' + tiers[i] + '.svg');
      upgradeImageFilenames.push(`${setToUppercase(tiers[i])} Fishing Rod (upgrade).svg`);
      // Cooking Fires
      upgradeImageSources.push(GAMEURL + 'assets/media/shop/pickaxe_' + tiers[i] + '.svg');
      upgradeImageFilenames.push(`${setToUppercase(tiers[i])} Pickaxe (upgrade).svg`);
    }
    // Cooking fires
    for (let i = 0; i < cookingFireData.length; i++) {
      upgradeImageSources.push(GAMEURL + cookingFireData[i].media);
      upgradeImageFilenames.push(`${setToUppercase(cookingFireData[i].tier)} Cooking Fire (upgrade).svg`);
    }
    // Auto Eat
    for (let i = 0; i < autoEatData.length; i++) {
      upgradeImageSources.push(GAMEURL + 'assets/media/shop/autoeat.svg');
      upgradeImageFilenames.push(`${autoEatData[i].title} (upgrade).svg`);
    }
    for (let i = 0; i < godUpgradeData.length; i++) {
      upgradeImageSources.push(GAMEURL + godUpgradeData[i].media);
      upgradeImageFilenames.push(`${godUpgradeData[i].name} (upgrade).svg`);
    }
    bulkUploadImages(upgradeImageFilenames, upgradeImageSources, '[[Category:Upgrades]]');
  } else {
    console.error('Wiki data is not loaded.');
  }
}
/**
 * Callback for updating item pages. Will automatically replace templates and version if the templated data has not changed.
 */
async function updateItemPages() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    for (let i = 803; i < items.length; i++) {
      let updateSuccess = true;
      let dataChanged = false;
      const pageName = wikiPageNames.items[i];
      const pullResult = await getFullWikiPage(pageName, 0);
      if (pullResult.success) {
        const oldItemPage = pullResult.text;
        // Replace Main Item Template
        let newItemPage = oldItemPage.replace(ITEMTEMPLATEREGEX, fillItemTemplate(i));
        // Replace Stats Templates
        if (items[i].equipmentSlot != undefined) {
          if (items[i].equipmentSlot == CONSTANTS.equipmentSlot.Quiver && (items[i].ammoType == 2 || items[i].ammoType == 3)) {
            newItemPage = newItemPage.replace(WEAPONSTATSREGEX, fillWeaponStatsTemplate(i));
          } else if (items[i].equipmentSlot == CONSTANTS.equipmentSlot.Weapon) {
            newItemPage = newItemPage.replace(WEAPONSTATSREGEX, fillWeaponStatsTemplate(i));
          } else {
            newItemPage = newItemPage.replace(ARMOURSTATSREGEX, fillArmourStatsTemplate(i));
          }
        }
        if (newItemPage != oldItemPage) {
          dataChanged = true;
        }
        // Check Loot Table Template for Changes:
        if (items[i].canOpen) {
          const lootPullResult = await getFullWikiPage(`Template:${items[i].name}LootTable`, 0);
          if (lootPullResult.success) {
            const oldLootPage = lootPullResult.text;
            const newLootPage = oldLootPage.replace(TABLEREGEX, createChestDropTable(i));
            if (oldLootPage != newLootPage) {
              dataChanged = true;
            }
          } else {
            updateSuccess = false;
            console.warn(`Cannot update page: ${pageName}. ${lootPullResult.error}`);
          }
        }
        // Check Source Template for Changes:
        const sourcePullResult = await getFullWikiPage(`Template:${items[i].name} Sources`);
        if (sourcePullResult.success) {
          let oldSourcePage = sourcePullResult.text;
          oldSourcePage = oldSourcePage.replace(OLDVERSIONCATEGORYREGEX, VERSIONCATEGORY);
          const newSourcePage = createItemSourceTemplatePage(i);
          /* Troubleshooting code for different strings that should be the same
                    for (let j=0;j<oldSourcePage.length;j++) {
                        if (oldSourcePage.charCodeAt(j) != newSourcePage.charCodeAt(j)) {
                            console.log(`Character code is different at: ${j}`);
                            console.log(`Old Page Has: ${oldSourcePage.charAt(j)}`);
                            console.log(`New Page Has: ${newSourcePage.charAt(j)}`)
                            break;
                        }
                    }
                    console.log(oldSourcePage.length);
                    console.log(oldSourcePage);
                    console.log(newSourcePage.length);
                    console.log(newSourcePage.charCodeAt(newSourcePage.length-1))
                    console.log(newSourcePage);
                    wikiTableOutput.textContent = oldSourcePage;
                                        */
          if (oldSourcePage != newSourcePage) {
            dataChanged = true;
          }
        } else {
          updateSuccess = false;
          console.warn(`Cannot update page: ${pageName}. ${sourcePullResult.error}`);
        }

        if (updateSuccess) {
          if (dataChanged) {
            const autoGeneratedPage = createItemPageContent(i);
            let versionModifiedNew = newItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
            // Try to fix the linebreak problem
            if (autoGeneratedPage != versionModifiedNew) {
              const lineBreakAdded = versionModifiedNew.replace(ITEMTEMPLATEREGEX, fillItemTemplate(i) + '\n');
              if (lineBreakAdded == autoGeneratedPage) {
                versionModifiedNew = lineBreakAdded;
                console.log(`Adding Linebreak To Page: ${pageName} to fix generic difference.`);
              }
            }
            /*
                        console.log(autoGeneratedPage.length);
                        console.log(versionModifiedNew.length);
                        for (let j = 0; j < versionModifiedNew.length; j++) {
                            if (autoGeneratedPage.charCodeAt(j) != versionModifiedNew.charCodeAt(j)) {
                                console.log(`Character code is different at: ${j}`);
                                console.log(`Gen Page Has: "${autoGeneratedPage.charAt(j)}" : ${autoGeneratedPage.charCodeAt(j)}`);
                                console.log(`New Page Has: "${versionModifiedNew.charAt(j)}" : ${versionModifiedNew.charCodeAt(j)}`)
                                console.log(autoGeneratedPage.slice(j))
                                console.log(versionModifiedNew.slice(j))
                                break;
                            }
                        }
                        */
            if (autoGeneratedPage == versionModifiedNew) {
              console.log(`Page: ${pageName}: Data Changed, but matches generic. Updating Version`);
              pagesToEdit.push({name: pageName, content: versionModifiedNew});
            } else {
              console.log(`Page: ${pageName}: Data Changed, but does not match generic. Manual Review Required.`);
              pagesToEdit.push({name: pageName, content: newItemPage});
            }
          } else {
            newItemPage = newItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
            console.log(`Page: ${pageName}: No Changes To Data, Updating Version`);
            pagesToEdit.push({name: pageName, content: newItemPage});
          }
        }
      } else {
        console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
      }
    }
    const numChanged = pagesToEdit.length;
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      // console.log('Pushing updates to wiki (but not really)')
      bulkEditPages(pagesToEdit, 'Automatic update of Item Page');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for updating monster page monster templates.
 */
async function updateMonsterPageTemplates() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < MONSTERS.length; i++) {
      const pageName = wikiPageNames.monsters[i];
      const pullResult = await getFullWikiPage(pageName, 0);
      if (pullResult.success) {
        const oldItemPage = pullResult.text;
        let newItemPage = oldItemPage.replace(MONSTERTEMPLATEREGEX, fillMonsterTemplate(i));
        if (oldItemPage == newItemPage) {
          newItemPage = oldItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: No Changes`);
          } else {
            console.log(`Page: ${pageName}: No Template Changes, Auto Updating Version`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          console.log(`Page: ${pageName}: Monster Template Changed`);
          pagesToEdit.push({name: pageName, content: newItemPage});
          numChanged++;
        }
      } else {
        console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      console.log(pagesToEdit);
      bulkEditPages(pagesToEdit, 'Automatic update of Monster Page.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for updating dungeon page templates
 */
async function updateDungeonPageTemplates() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < DUNGEONS.length; i++) {
      const pageName = wikiPageNames.dungeons[i];
      const pullResult = await getFullWikiPage(pageName, 0);
      if (pullResult.success) {
        const oldItemPage = pullResult.text;
        let newItemPage = oldItemPage.replace(DUNGEONTEMPLATEREGEX, fillDungeonTemplate(i));
        if (oldItemPage == newItemPage) {
          newItemPage = oldItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: No Changes`);
          } else {
            console.log(`Page: ${pageName}: No Template Changes, Auto Updating Version`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          const versionReplacedPage = newItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
          if (versionReplacedPage == createDungeonPageContent(i)) {
            console.log(`Page: ${pageName}: Dungeon Template Changed, But page is same as Default`);
            pagesToEdit.push({name: pageName, content: versionReplacedPage});
          } else {
            console.log(`Page: ${pageName}: Dungeon Template Changed, User Data may be inaccurate`);
            pagesToEdit.push({name: pageName, content: newItemPage});
          }
          numChanged++;
        }
      } else {
        console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      console.log(pagesToEdit);
      bulkEditPages(pagesToEdit, 'Automatic update of Dungeon page.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Callback for updating upgrade page templates
 */
async function updateUpgradePages() {
  await updatePageTemplates(tiers, 'axeUpgrades', UPGRADETEMPLATEREGEX, fillAxeUpgradeTemplate, (i) => createUpgradePageContent(fillAxeUpgradeTemplate(i)), 1);
  await updatePageTemplates(tiers, 'pickUpgrades', UPGRADETEMPLATEREGEX, fillPickUpgradeTemplate, (i) => createUpgradePageContent(fillPickUpgradeTemplate(i)), 1);
  await updatePageTemplates(tiers, 'rodUpgrades', UPGRADETEMPLATEREGEX, fillRodUpgradeTemplate, (i) => createUpgradePageContent(fillRodUpgradeTemplate(i)), 1);
  await updatePageTemplates(cookingFireData, 'fireUpgrades', UPGRADETEMPLATEREGEX, fillFireUpgradeTemplate, (i) => createUpgradePageContent(fillFireUpgradeTemplate(i)));
  await updatePageTemplates(autoEatData, 'eatUpgrades', UPGRADETEMPLATEREGEX, fillEatUpgradeTemplate, (i) => createUpgradePageContent(fillEatUpgradeTemplate(i)));
  await updatePageTemplates(godUpgradeData, 'godUpgrades', UPGRADETEMPLATEREGEX, fillGodUpgradeTemplate, (i) => createUpgradePageContent(fillGodUpgradeTemplate(i)));
}

/**
 * Callback for updating combat area page templates
 */
function updateCombatAreaPageTemplates() {
  updatePageTemplates(combatAreas, 'combatAreas', COMBATAREATEMPLATEREGEX, fillCombatAreaTemplate, createCombatAreaPageContent);
}
/**
 * Callback for updating slayer area page templates
 */
function updateSlayerAreaPageTemplates() {
  updatePageTemplates(slayerAreas, 'slayerAreas', SLAYERAREATEMPLATEREGEX, fillSlayerAreaTemplate, createSlayerAreaPageContent);
}
/**
 * Callback for updating prayer page templates
 */
function updatePrayerPageTemplates() {
  updatePageTemplates(PRAYER, 'prayers', PRAYERTEMPLATEREGEX, fillPrayerTemplate, createPrayerPageContent);
}
/**
 * Callback for updating spell page templates
 */
function updateSpellPageTemplates() {
  updatePageTemplates(SPELLS, 'spells', SPELLTEMPLATEREGEX, fillSpellTemplate, createSpellPageContent);
}
/**
 * Callback for updating thieving target page templates
 */
function updateThievingPageTemplates() {
  updatePageTemplates(thievingNPC, 'thievingTarget', THIEVINGTARGETREGEX, fillThievingTemplate, createThievingTargetPage);
}
/**
 * Callback for updating only the item template on item pages.
 */
function updateItemPageItemTemplates() {
  updatePageTemplates(items, 'items', ITEMTEMPLATEREGEX, fillItemTemplate, createItemPageContent);
}
/**
 * Callback for updating the weapon stats template for item pages
 */
async function updateWeaponPageStats() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].equipmentSlot === CONSTANTS.equipmentSlot.Weapon) {
        const pageName = wikiPageNames.items[i];
        const pullResult = await getFullWikiPage(pageName, 0);
        if (pullResult.success) {
          const oldItemPage = pullResult.text;
          const newItemPage = oldItemPage.replace(WEAPONSTATSREGEX, fillWeaponStatsTemplate(i));
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: No Changes`);
          } else {
            console.log(`Page: ${pageName}: Weapon Template Changed`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
        }
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      bulkEditPages(pagesToEdit, 'Automatic update of Weapon template data.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}
/**
 * Callback for updating the armour stats template for item pages
 */
async function updateArmourPageStats() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].equipmentSlot !== CONSTANTS.equipmentSlot.Weapon && items[i].equipmentSlot !== undefined) {
        const pageName = wikiPageNames.items[i];
        const pullResult = await getFullWikiPage(pageName, 0);
        if (pullResult.success) {
          const oldItemPage = pullResult.text;
          const newItemPage = oldItemPage.replace(ARMOURSTATSREGEX, fillArmourStatsTemplate(i));
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: No Changes`);
          } else {
            console.log(`Page: ${pageName}: Armour Template Changed`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
        }
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      bulkEditPages(pagesToEdit, 'Automatic update of Armour template data.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Updates pages by replacing the template found by templateRegex with the output of templateGenerator.
 * Will automatically update page version template if there are no changes
 * @param {Array} pageArray Array to loop through
 * @param {String} pageNameKey Key of wikiPageNames
 * @param {RegExp} templateRegex Regex of template to replace
 * @param {Function} templateGenerator Function to fill template
 * @param {Function} pageGenerator Function to generate default page
 * @param {Number} startIndex Starting index of pageArray
 */
async function updatePageTemplates(pageArray, pageNameKey, templateRegex, templateGenerator, pageGenerator, startIndex = 0) {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = startIndex; i < pageArray.length; i++) {
      const pageName = wikiPageNames[pageNameKey][i];
      const pullResult = await getFullWikiPage(pageName, 0);
      if (pullResult.success) {
        const oldItemPage = pullResult.text;
        let newItemPage = oldItemPage.replace(templateRegex, templateGenerator(i));
        if (oldItemPage == newItemPage) {
          newItemPage = oldItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: No Changes`);
          } else {
            console.log(`Page: ${pageName}: No Template Changes, Auto Updating Version`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          const versionReplacedPage = newItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
          if (versionReplacedPage == pageGenerator(i)) {
            console.log(`Page: ${pageName}: Template Changed, But page is same as Default`);
            pagesToEdit.push({name: pageName, content: versionReplacedPage});
          } else {
            console.log(`Page: ${pageName}: Template Changed, User Data may be inaccurate`);
            pagesToEdit.push({name: pageName, content: newItemPage});
          }
          numChanged++;
        }
      } else {
        console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      console.log(pagesToEdit);
      await bulkEditPages(pagesToEdit, `Automatic update of ${pageNameKey} page.`);
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}
/**
 * Changes the version of pages to the most recent if the page content pages the pageGenerator output
 * @param {Array} pageArray Array to loop through
 * @param {String} pageNameKey Key of wikiPageNames
 * @param {Function} pageGenerator Function to generate default page
 */
async function fixPageVersions(pageArray, pageNameKey, pageGenerator) {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < pageArray.length; i++) {
      const pageName = wikiPageNames[pageNameKey][i];
      const pullResult = await getFullWikiPage(pageName, 0);
      if (pullResult.success) {
        const oldItemPage = pullResult.text;
        const newItemPage = oldItemPage.replace(OLDVERSIONREGEX, VERSIONTEMPLATE);
        if (newItemPage == pageGenerator(i)) {
          if (oldItemPage == newItemPage) {
            console.log(`Page: ${pageName}: is already up to date.`);
          } else {
            console.log(`Page: ${pageName}: matches generate, changing version`);
            pagesToEdit.push({name: pageName, content: newItemPage});
            numChanged++;
          }
        } else {
          console.log(`Page: ${pageName}: Can't update version, still OOD`);
        }
      } else {
        console.warn(`Cannot update page: ${pageName}. ${pullResult.error}.`);
      }
    }
    console.log(`${numChanged} Pages changed and ready to update.`);
    if (numChanged > 0) {
      console.log(pagesToEdit);
      bulkEditPages(pagesToEdit, 'Automatic update of Combat Area page.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}
/**
 * Temporary function to undo a bad revision
 * @param {String} pageTitle The title of the page to rollback
 * @deprecated
 * @async
 */
async function rollBackBadSectionRemoval(pageTitle) {
  revisions = await getLastRevisions(pageTitle, 2);
  if (revisions[0].comment == 'Removal of old section.') {
    const firstID = revisions[0].revid;
    const secondID = revisions[1].revid;
    const token = await getCsrfToken();
    result = await undoLastEdit(pageTitle, token, firstID, secondID);
  }
  console.log(result);
}

/**
 * Temporary function to undo some bad item page edits
 * @deprecated
 * @async
 */
async function fixBadItemPageEdits() {
  if (wikiDataLoaded) {
    for (let i = 0; i < items.length; i++) {
      const pageName = wikiPageNames.items[i];
      const revisions = await getLastRevisions(pageName, 2);
      if (revisions[0].comment == 'Removal of old section.' && revisions[1].comment == 'Removal of old section.') {
        const firstID = revisions[0].revid;
        const secondID = revisions[1].revid;
        const token = await getCsrfToken();
        result = await undoLastEdit(pageName, token, firstID, secondID);
        console.log('Undid bad Revision');
      }
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Updates item source templates for fishing special item pages
 */
async function updateSpecificSourceTemplates() {
  if (wikiDataLoaded) {
    const pagesToEdit = [];
    let numChanged = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].isFishingSpecial || items[i].isJunk > 0) {
        const pageName = `Template:${items[i].name} Sources`;
        pagesToEdit.push({name: pageName, content: createItemSourceTemplatePage(i)});
        numChanged++;
      }
    }
    if (numChanged > 0) {
      console.log(pagesToEdit);
      await bulkEditPages(pagesToEdit, 'Automatic Update of Item Source Template');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Removes a section from an item page, and all the content in it
 * @param {String} sectionName The name of the section to remove
 * @async
 * @deprecated
 */
async function removeItemPageSections(sectionName) {
  if (wikiDataLoaded) {
    const pageData = [];
    for (let i = 2; i < 3; i++) {
      const pageName = wikiPageNames.items[i];
      const sectionIDs = await getSectionIDs(pageName, sectionName);
      if (sectionIDs.length != 0) {
        pageData.push({name: pageName, content: '', section: sectionIDs[0]});
      }
    }
    if (pageData.length > 0) {
      console.log(`${pageData.length} Section ready to remove.`);
      console.log(pageData);
      await bulkEditPageSections(pageData, `Removal of old section.`);
    } else {
      console.log('No sections to remove.');
    }
  } else {
    console.error('Wiki data is not loaded.');
  }
}

/**
 * Opens the manual review screen to help update pages to new versions
 * @param {String} version Version Category to go through
 * @async
 */
async function manualVersionReview(version) {
  oldVersionReview.pages = await getCategoryPageMembers(version);
  console.log(oldVersionReview.pages);
  oldVersionReview.currentPage = 0;
  oldVersionReview.updatePage = [];
  oldVersionReview.titleElement.textContent = oldVersionReview.pages[oldVersionReview.currentPage].title;
  oldVersionReview.currentPageContent = (await getFullWikiPage(oldVersionReview.pages[oldVersionReview.currentPage].title)).text;
  oldVersionReview.outputField.textContent = oldVersionReview.currentPageContent;
  oldVersionReview.panel.style.display = '';
}

/**
 * Callback for the manual review screen, for when a page should have it's version updated
 */
function updateVersion() {
  oldVersionReview.updatePages.push(
      {name: oldVersionReview.pages[oldVersionReview.currentPage].title, content: oldVersionReview.currentPageContent.replace(OLDVERSIONREGEX, VERSIONTEMPLATE)},
  );
  proceedToNextPage();
}
/**
 * Callback for the manual review screen, for when a page should not have it's version updated.
 * Also handles when the last page is reviewed.
 * @async
 */
async function proceedToNextPage() {
  oldVersionReview.currentPage++;
  if (oldVersionReview.pages.length > oldVersionReview.currentPage) {
    oldVersionReview.titleElement.textContent = oldVersionReview.pages[oldVersionReview.currentPage].title;
    oldVersionReview.currentPageContent = (await getFullWikiPage(oldVersionReview.pages[oldVersionReview.currentPage].title)).text;
    oldVersionReview.outputField.textContent = oldVersionReview.currentPageContent;
  } else {
    console.log(oldVersionReview.updatePages);
    bulkEditPages(oldVersionReview.updatePages, 'Manual Review: No Changes. Updating Version.');
    oldVersionReview.panel.style.display = 'none';
  }
}