// Fetch implementation of wiki api

// Support functions for fetch API
/**
 * Creates a query string to send to the wiki
 * @param {Object} params An object containing name pair values of strings
 * @return {string}
 */
function createQueryString(params) {
  let qString = '?';
  const pKeys = Object.keys(params);
  qString += `${pKeys[0]}=${params[pKeys[0]]}`;
  for (let i = 1; i < pKeys.length; i++) {
    qString += `&${pKeys[i]}=${params[pKeys[i]]}`;
  }
  return qString;
}

/**
 * Creates a FormData object to send to the wiki via POST request
 * @param {Object} data An object containing name pair values to add to the form
 * @return {FormData}
 */
function createFormData(data) {
  const dataForm = new FormData();
  Object.keys(data).forEach((keys) => {
    dataForm.append(keys, data[keys]);
  });
  return dataForm;
}

// Basic API Calls
/**
 * Attempts to get the wikitext of the page specified
 * @param {string} pageTitle The title of the page
 * @async
 */
async function getFullWikiPage(pageTitle) {
  const params = {
    origin: '*',
    action: 'parse',
    page: pageTitle,
    prop: 'wikitext',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  // console.log(`Requesting wikitext for Page: ${pageTitle}`);
  const data = await response.json();

  const output = {text: '', success: false, error: ''};
  try {
    output.text = data.parse.wikitext['*'];
    output.success = true;
  } catch {
    output.error = data.error.info;
    console.warn(`Could not get wikitext for Page: ${pageTitle}.`);
  }
  return output;
}
/**
 * Attempts to get the HTML of the page specified
 * @param {string} pageTitle Title of page to get
 */
async function getWikiHTMLFromTitle(pageTitle) {
  const params = {
    origin: '*',
    action: 'parse',
    page: pageTitle,
    prop: 'wikitext',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  // console.log(`Requesting wikitext for Page: ${pageTitle}`);
  const data = await response.json();

  const output = {text: '', success: false, error: ''};
  try {
    output.text = data.parse.wikitext['*'];
    output.success = true;
  } catch {
    output.error = data.error.info;
    console.warn(`Could not get wikitext for Page: ${pageTitle}.`);
  }
  return output;
}
/**
 * Attempts to get the wikitext for the specified page and section
 * @param {string} pageTitle The title of the page
 * @param {number} pageSection The section id of the page
 * @async
 */
async function getWikiPageSection(pageTitle, pageSection = 0) {
  const params = {
    origin: '*',
    action: 'parse',
    page: pageTitle,
    section: pageSection,
    prop: 'wikitext',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  // console.log(`Requesting wikitext for Page: ${pageTitle}, Section: ${pageSection}`);
  const data = await response.json();
  try {
    return data.parse.wikitext['*'];
  } catch {
    throw Error(`Could not get wikitext: ${data.error.info}`);
  }
}
/**
 * Attempts to get the sections of a page
 * @param {string} pageTitle The title of the page
 */
async function getPageSections(pageTitle) {
  const params = {
    origin: '*',
    action: 'parse',
    page: pageTitle,
    prop: 'sections',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(`Requesting sections for Page: ${pageTitle}`);
  try {
    return data.parse.sections;
  } catch {
    throw Error(`Could not get page sections: ${data.error.info}`);
  }
}

/**
 * Attemptes to get the revisions of a page
 * @param {string} pageTitle The title of the page
 * @param {number} maxRev The maximum number of revisions to get
 */
async function getLastRevisions(pageTitle, maxRev) {
  const params = {
    origin: '*',
    action: 'query',
    prop: 'revisions',
    titles: pageTitle,
    rvslots: '*',
    rvlimit: maxRev,
    rvprop: 'timestamp|user|comment|ids',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(`Requesting last revision for Page: ${pageTitle}`);
  try {
    let revisions;
    const {pages} = data.query;
    Object.keys(pages).forEach((pageID) => {
      ({revisions} = pages[pageID]);
    });
    console.log(revisions);
    return revisions;
  } catch {
    throw Error(`Could not get page sections: ${data.error.info}`);
  }
}

/**
 * @description Requests the members of a category that are pages
 * @param {string} categoryName The name of the category, does not include Category:
 * @async
 */
async function getCategoryPageMembers(categoryName) {
  const params = {
    origin: '*',
    action: 'query',
    list: 'categorymembers',
    cmtitle: `Category:${categoryName}`,
    cmprop: 'ids|title',
    cmtype: 'page',
    cmlimit: 'max',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(`Requesting pages in Category:${categoryName}`);
  try {
    const pages = data.query.categorymembers;
    return pages;
  } catch {
    throw Error(`Could not get get Category:${categoryName}.${data.error.info}`);
  }
}

/**
 * Attemps to get a login token from the wiki
 * @async
 */
async function getLoginToken() {
  const params = {
    action: 'query',
    meta: 'tokens',
    type: 'login',
    format: 'json',
  };
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log('Got login token');
  console.log(data.query.tokens.logintoken);
  return data.query.tokens.logintoken;
}

/**
 * Attempts to login to the wiki with the provided credentials
 * @param {string} logintoken Login Token
 * @param {string} user Username
 * @param {string} pass Password
 * @async
 */
async function getLoginRequest(logintoken, user, pass) {
  const params = {
    action: 'login',
    format: 'json',
  };
  const loginData = {
    lgtoken: logintoken,
    lgname: user,
    lgpassword: pass,
  };
  const loginData2 = createFormData(loginData);
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint, {
    method: 'POST',
    body: loginData2,
  });
  const data = await response.json();
  console.log(data);
}
/**
 * Attempts to log out of the wiki
 * @param {string} csrftoken CRSF Token
 * @async
 */
async function getLogoutRequest(csrftoken) {
  const params = {
    action: 'logout',
    format: 'json',
  };
  const logoutData = {
    token: csrftoken,
  };
  const response = await fetch(WIKURL + createQueryString(params), {
    method: 'POST',
    body: createFormData(logoutData),
  });
  const data = await response.json();
  console.log(data);
}

/**
 * Attempts to get a CRSF token from the wiki
 * You must be logged in to do this
 */
async function getCsrfToken() {
  const params = {
    action: 'query',
    meta: 'tokens',
    format: 'json',
  };
  const response = await fetch(WIKURL + createQueryString(params));
  const data = await response.json();
  try {
    return data.query.tokens.csrftoken;
  } catch {
    console.error('Could not obtain CRSF token');
  }
}

/**
 * Attempts to get a Rollback token from the wiki
 * You must be logged in to do this.
 * Rollbacks require admin permissions
 */
async function getRollBackToken() {
  const params = {
    action: 'query',
    meta: 'tokens',
    type: 'rollback',
    format: 'json',
  };
  const response = await fetch(WIKURL + createQueryString(params));
  const data = await response.json();
  try {
    return data.query.tokens.rollbacktoken;
  } catch {
    console.error('Could not obtain rollback token');
  }
}

/**
 * Attempts to upload an image to the wiki via url
 * Does not work as the wiki does not have url uploads enabled
 * @param {string} imageFileName The name of the file
 * @param {string} imageText The text to attach to the image
 * @param {string} imageURL The URL of the image
 * @param {string} csrfToken A valid csrfToken
 * @deprecated
 */
async function uploadImageFromUrlViaUrl(imageFileName, imageText, imageURL, csrfToken) {
  const params = {
    action: 'upload',
    format: 'json',
  };
  const imageData = {
    filename: imageFileName,
    comment: 'Automatically uploaded',
    text: imageText,
    url: imageURL,
    token: csrfToken,
  };
  const imageForm = createFormData(imageData);
  const endpoint = WIKURL + createQueryString(params);
  const response = await fetch(endpoint, {
    method: 'POST',
    body: imageForm,
  });
  const data = await response.json();
  console.log(data);
}

/**
 * Uploads an image to the wiki by fetching it as a blob and then making a post request
 * @param {string} imageFileName The name of the image on file on the wiki
 * @param {string} imageText Text to put on image page
 * @param {string} fileURL URL of image to upload
 * @param {string} token CRSF Token
 */
async function uploadImageFromUrlViaBlob(imageFileName, imageText, fileURL, token) {
  // Get the file as a blob from the URL
  const imageBlob = await fetch(fileURL).then((r) => r.blob());
  // Generate the request data
  const params = {
    action: 'upload',
    format: 'json',
  };
    // Create form data and append values
  const imageForm = new FormData();
  imageForm.append('filename', imageFileName);
  imageForm.append('ignorewarnings', '1');
  imageForm.append('comment', 'Automatically uploaded by MelvorWikiBot');
  imageForm.append('text', imageText);
  imageForm.append('token', token);
  imageForm.append('file', imageBlob);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: imageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}

/**
 * Attempts to create a wiki page
 * @param {string} pageTitle The title of the page to create
 * @param {string} pageContent The wikitext of the page to create
 * @param {string} editSummary The edit comment for the page creation
 * @param {string} token A valid CRSF token
 * @param {boolean} overWrite Whether or not to overwrite a page if it already exists
 * @async
 */
async function createWikiPage(pageTitle, pageContent, editSummary, token, overWrite) {
  // Generate the request data
  const params = {
    action: 'edit',
    format: 'json',
  };
    // Create form data and append values
  const pageForm = new FormData();
  pageForm.append('title', pageTitle);
  // pageForm.append('section', '0');
  pageForm.append('text', pageContent);
  pageForm.append('summary', editSummary);
  pageForm.append('notminor', '1');
  pageForm.append('bot', '1');
  pageForm.append('recreate', '1');
  if (!overWrite) {
    pageForm.append('createonly', '1');
  }
  pageForm.append('contentformat', 'text/x-wiki');
  pageForm.append('contentmodel', 'wikitext');
  pageForm.append('token', token);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: pageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}
/**
 * Attempts to rollback a page
 * Requires a user with Admin permissions
 * @param {string} pageTitle The title of the page to rollback
 * @param {string} user The user to rollback edits for
 * @param {string} summary The reason for the rollback
 */
async function rollBackPage(pageTitle, user, summary) {
  const rollbacktoken = await getRollBackToken();
  // Generate the request data
  const params = {
    action: 'rollback',
    format: 'json',
  };
    // Create form data and append values
  const pageForm = new FormData();
  pageForm.append('title', pageTitle);
  pageForm.append('user', user);
  pageForm.append('summary', summary);
  pageForm.append('markbot', '1');
  pageForm.append('token', rollbacktoken);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: pageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}

/**
 * Attempts to edit an existing wiki page
 * @param {string} pageTitle The title of the page to edit
 * @param {string} newContent The new wikitext of the page
 * @param {string} editSummary The summary comment for the edit
 * @param {string} token A valid CRSF token
 */
async function editWikiPage(pageTitle, newContent, editSummary, token) {
  // Generate the request data
  const params = {
    action: 'edit',
    format: 'json',
  };
    // Create form data and append values
  const pageForm = new FormData();
  pageForm.append('title', pageTitle);
  // pageForm.append('section', '0');
  pageForm.append('text', newContent);
  pageForm.append('summary', editSummary);
  pageForm.append('notminor', '1');
  pageForm.append('bot', '1');
  pageForm.append('nocreate', '1');
  pageForm.append('contentformat', 'text/x-wiki');
  pageForm.append('contentmodel', 'wikitext');
  pageForm.append('token', token);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: pageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}

/**
 * Attempts to undo edits to a page
 * @param {string} pageTitle The title of the page to undo edits for
 * @param {string} token A valid CRSF Token
 * @param {number} revID The revsion to undo from
 * @param {number} undoToID The revsion to undo to
 */
async function undoLastEdit(pageTitle, token, revID, undoToID) {
  // Generate the request data
  const params = {
    action: 'edit',
    format: 'json',
  };
    // Create form data and append values
  const pageForm = new FormData();
  pageForm.append('title', pageTitle);
  pageForm.append('undo', revID);
  pageForm.append('undoafter', undoToID);
  pageForm.append('summary', 'Undo bad edit.');
  pageForm.append('notminor', '1');
  pageForm.append('bot', '1');
  pageForm.append('nocreate', '1');
  pageForm.append('contentformat', 'text/x-wiki');
  pageForm.append('contentmodel', 'wikitext');
  pageForm.append('token', token);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: pageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}

/**
 * Attempts to edit a section of a wiki page
 * @param {string} pageTitle The title of the page to edit
 * @param {number} sectionID The section ID of the page
 * @param {string} newContent The new wikitext for the section
 * @param {string} editSummary The edit summary comment
 * @param {string} token A valid CRSF token
 */
async function editWikiPageSection(pageTitle, sectionID, newContent, editSummary, token) {
  // Generate the request data
  const params = {
    action: 'edit',
    format: 'json',
  };
    // Create form data and append values
  const pageForm = new FormData();
  pageForm.append('title', pageTitle);
  pageForm.append('section', `${sectionID}`);
  pageForm.append('text', newContent);
  pageForm.append('summary', editSummary);
  pageForm.append('notminor', '1');
  pageForm.append('bot', '1');
  pageForm.append('nocreate', '1');
  pageForm.append('contentformat', 'text/x-wiki');
  pageForm.append('contentmodel', 'wikitext');
  pageForm.append('token', token);
  // Create request URL
  const endpoint = WIKURL + createQueryString(params);
  // Send the request
  const response = await fetch(endpoint, {
    method: 'POST',
    body: pageForm,
  });
    // Parse the results
  const data = await response.json();
  // Log the results
  return data;
}
// API calls with output processing
/**
 * @description Searches a page for the section with the given title. Returns the matches
 * @param {string} pageTitle Title of page to search
 * @param {string} sectionTitle Title of section to search for
 */
async function getSectionIDs(pageTitle, sectionTitle) {
  const pageSections = await getPageSections(pageTitle);
  const sectionIDs = [];
  for (let i = 0; i < pageSections.length; i++) {
    if (pageSections[i].line === sectionTitle) {
      sectionIDs.push(parseInt(pageSections[i].index));
    }
  }
  return sectionIDs;
}
