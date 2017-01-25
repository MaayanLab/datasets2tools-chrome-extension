//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function prepareBrowseTable(pairCannedAnalyses, toolIconUrl, pageNr, maxDescriptionLength, pageSize=5) {

	// Define variables
	var browseTableHTML = '<table class="datasets2tools-browse-table"><tr><th class="datasets2tools-link-col">Link</th><th class="datasets2tools-description-col">Description</th><th class="datasets2tools-metadata-col">Metadata</th><th class="datasets2tools-share-col">Share</th></tr>',
		pairCannedAnalysesSubset = browseFunctions.firstN(pairCannedAnalyses, pageNr, pageSize);

	// Create table
	if (Object.keys(pairCannedAnalysesSubset).length === 0) {

		// Add no results
		browseTableHTML += '<tr><td class="datasets2tools-no-results-tab" colspan="4">No Results Found.</td></tr>';

	} else {

		// Add results
		browseTableHTML = getTableHTML.main(browseTableHTML, pairCannedAnalysesSubset, toolIconUrl, maxDescriptionLength);

	}

	// Add browse functions
	browseTableHTML = browseFunctions.add(browseTableHTML, pageNr, pageSize, pairCannedAnalyses);

	// Return HTML string
	return browseTableHTML;
};

//////////////////////////////////////////////////////////////////////
///////// 2. Define Main Variables ///////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var getLinkHTML = {

	/////////////////////////////////
	////// 2.1. main
	/////////////////////////////////

	main: function(cannedAnalysisObj, toolIconUrl) {
		return '<td><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img class="datasets2tools-cannedanalysis-link-img" src="' + toolIconUrl + '"></a></td>';
	}
};

////////////////////////////////////////////////////////////
///// 2.  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var getDescriptionHTML = {

	/////////////////////////////////
	////// 2.. main
	/////////////////////////////////

	main: function(cannedAnalysisObj, maxDescriptionLength) {

		// Get description
		var cannedAnalysisDescription = cannedAnalysisObj['description'],
			displayedDescription;

		// Prepare Displayed Description
		if (cannedAnalysisDescription.length > maxDescriptionLength) {

			displayedDescription = cannedAnalysisDescription.substring(0, maxDescriptionLength) + '<span class="datasets2tools-tooltip-hover datasets2tools-description-tooltip-hover">...<div class="datasets2tools-tooltip-text datasets2tools-description-tooltip-text">' + cannedAnalysisDescription + '</div></span>';

		} else {

			displayedDescription = cannedAnalysisDescription;

		}

		// Return
		return '<td class="datasets2tools-canned-analysis-description">' + displayedDescription + '</td>';
	},
};

////////////////////////////////////////////////////////////
///// 2.  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var getMetadataHTML = {

	/////////////////////////////////
	////// 2.5.4 view
	/////////////////////////////////

	view: function(cannedAnalysisObj) {

		// Define variables
		var metadataKeys = Object.keys(cannedAnalysisObj),
			metadataKeyNumber = metadataKeys.length,
			metadataTooltipString = '', //<b>Metadata</b><br>
			viewMetadataHTML,
			metadataKey;

		// Loop through tags
		if (metadataKeyNumber > 2) {

			for (var j = 0; j < metadataKeyNumber; j++) {

				// Get Metadata Key
				metadataKey = metadataKeys[j];

				// Get Metadata Value
				if (!(['canned_analysis_url', 'description'].indexOf(metadataKey) >= 0)) {
					metadataTooltipString += '<b>' + metadataKey + '</b>: ' + cannedAnalysisObj[metadataKey] + '<br>';
				}
			}

		} else {

			metadataTooltipString += 'No metadata available.';

		}

		// Close DIV
		viewMetadataHTML = '<div class="datasets2tools-tooltip-hover datasets2tools-metadata-tooltip-hover"><img class="datasets2tools-view-metadata-img datasets2tools-metadata-img" src="' + chrome.extension.getURL("icons/info.png") + '"><div class="datasets2tools-tooltip-text datasets2tools-metadata-tooltip-text">'+metadataTooltipString+'</div></div>';

		// Return
		return viewMetadataHTML;
	},

	/////////////////////////////////
	////// 2.5.5 download
	/////////////////////////////////

	download: function(cannedAnalysisObj) {

		// Define variables
		var downloadMetadataHTML = '<div class="datasets2tools-dropdown-hover datasets2tools-metadata-dropdown-hover">';

		// Add Stuff
		downloadMetadataHTML += '<button class="datasets2tools-button datasets2tools-dropdown-button datasets2tools-download-metadata-button"></button>';
		
		// Add Stuff
		downloadMetadataHTML += '<div class="datasets2tools-dropdown-text datasets2tools-metadata-dropdown-text">';

		// Add functionality
		downloadMetadataHTML += '<b>Download Metadata:</b><br>';

		// Add TXT Button
		downloadMetadataHTML += '<ul style="margin:0;padding-left:20px;"><li><button class="datasets2tools-button datasets2tools-metadata-download-button" id="getTXT">TXT</button></li>';

		// Add JSON Button
		downloadMetadataHTML += '<li><button class="datasets2tools-button datasets2tools-metadata-download-button" id="getJSON">JSON</button></li></ul>';
		
		// Close DIV
		downloadMetadataHTML += '</div></div>';

		// Return
		return downloadMetadataHTML;
	},

	/////////////////////////////////
	////// 2.5.3 metadataHTML
	/////////////////////////////////

	main: function(cannedAnalysisObj) {

		// Keys
		var self = this;

		// Return
		return '<td class="datasets2tools-metadata-col">' + self.view(cannedAnalysisObj) + self.download(cannedAnalysisObj) + '</td>';
	}
};

////////////////////////////////////////////////////////////
///// 2.  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var getShareHTML = {

	/////////////////////////////////
	////// 2.5.4 main
	/////////////////////////////////

	main: function(cannedAnalysisObj) {

	// Define HTML String
		var shareHTML = '<td>';

		// Interactive DIV HTML
		var interactiveDivHTML = '<div class="datasets2tools-dropdown-hover datasets2tools-share-dropdown-hover">';

		// Dropdown DIV HTML
		var dropdownDivHTML = '<div class="datasets2tools-dropdown-text datasets2tools-share-dropdown-text">';

		// Share Image
		var shareImageHTML = '<button class="datasets2tools-button datasets2tools-dropdown-button datasets2tools-share-button"></button>';

		// Link Image
		var linkImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/link.png") + '"><b>Canned Analysis URL:</b>';

		// Embed Image
		var embedImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/embed.png") + '"><b>Embed Icon:</b>';

		// Get Copy Button HTML
		var buttonHTML = '<button class="datasets2tools-button datasets2tools-copy-button"><img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/copy.png") + '">Copy</button>';

		// Text Area HTML
		var textAreaHTML = function(content, nRows) {return '<textarea class="datasets2tools-textarea" rows="' + nRows + '">'+content+'</textarea>'};

		// Canned Analysis URL
		var cannedAnalysisUrl = cannedAnalysisObj['canned_analysis_url'];

		// Embed Code
		var embedCode = '<a href="' + cannedAnalysisUrl + '"><img src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png" style="height:50px;width:50px"></a>'

		shareHTML += interactiveDivHTML + shareImageHTML + dropdownDivHTML + linkImageHTML + textAreaHTML(cannedAnalysisUrl, 2) + buttonHTML + '<br><br>' + embedImageHTML + textAreaHTML(embedCode, 3) + buttonHTML + '</div></div></td>';

		return shareHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var getTableHTML = {

	/////////////////////////////////
	////// 2.5.4 getRowHTML
	/////////////////////////////////

	getRowHTML: function(cannedAnalysisId, linkHTML, descriptionHTML, metadataHTML, shareHTML) {
		return '<tr class="datasets2tools-canned-analysis-row" id="' + cannedAnalysisId + '">' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('') + '</tr>';
	},

	/////////////////////////////////
	////// 2.5.4 main
	/////////////////////////////////

	main: function(browseTableHTML, pairCannedAnalysesSubset, toolIconUrl, maxDescriptionLength) {

		// Get canned analysis IDs
		var cannedAnalysisIds = Object.keys(pairCannedAnalysesSubset),
			self = this;

		// Loop Through Canned Analyses
		for (var i = 0; i < cannedAnalysisIds.length; i++) {

			// Get Canned Analysis Id
			cannedAnalysisId = cannedAnalysisIds[i];

			// Get Canned Analysis Object
			cannedAnalysisObj = pairCannedAnalysesSubset[cannedAnalysisId];

			// Add Row HTML
			browseTableHTML += self.getRowHTML(cannedAnalysisId, getLinkHTML.main(cannedAnalysisObj, toolIconUrl), getDescriptionHTML.main(cannedAnalysisObj, maxDescriptionLength), getMetadataHTML.main(cannedAnalysisObj), getShareHTML.main(cannedAnalysisObj));
		}

		// Close table
		browseTableHTML += '</table>';

		// Return HTML string
		return browseTableHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var browseFunctions = {

	/////////////////////////////////
	////// 2.5.4 main
	/////////////////////////////////

	firstN: function(obj, pageNr, pageSize) {
		if (Object.keys(obj).length > pageSize) {
		  return Object.keys(obj) //get the keys out
			    .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
			    // .slice(0, 4) //get the first N
			    .slice((pageNr-1)*pageSize, pageNr*pageSize) //get the first N
			    .reduce(function(memo, current) { //generate a new object out of them
			      memo[current] = obj[current]
			      return memo;
			    }, {});
		} else {
			return obj;
		}
	},

	/////////////////////////////////
	////// 2.5.4 main
	/////////////////////////////////

	leftArrowClass: function(pageNr) {
			if (pageNr > 1) {
				return '" id="' + (pageNr-1) + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
	},

	/////////////////////////////////
	////// 2.5.4 main
	/////////////////////////////////

	rightArrowClass: function(pageNr, pageSize, numberOfCannedAnalyses) {
			// Get Number of Canned Analyses
			var followingPageNr = parseInt(pageNr) + 1;
			if (numberOfCannedAnalyses > pageNr*(pageSize)) {
				return '" id="' + followingPageNr + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
	},

	/////////////////////////////////
	////// 2.5.4 add
	/////////////////////////////////

	add: function(browseTableHTML, pageNr, pageSize, pairCannedAnalyses) {

		// Define variables
		var numberOfCannedAnalyses = Object.keys(pairCannedAnalyses).length,
			self = this;

		// Add description
		browseTableHTML += '<div class="datasets2tools-browse-table-arrow-tab"> Showing results ' + Math.min(((pageNr-1)*pageSize+1), numberOfCannedAnalyses) + '-' + Math.min((pageNr*(pageSize)), numberOfCannedAnalyses) + ' of ' + numberOfCannedAnalyses + '.&nbsp&nbsp&nbsp'
		
		// Add left arrow
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-left' + self.leftArrowClass(pageNr) + '"></button>';

		// Add right arrow
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-right' + self.rightArrowClass(pageNr, pageSize, numberOfCannedAnalyses) + '"></button></div>';

		// Return HTML string
		return browseTableHTML;
	}
};