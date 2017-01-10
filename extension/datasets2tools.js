//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {

	// 1.1 Locate Parents
	var $parents = Interface.locateParents();

	// 1.2 Get Canned Analysis Data
	var cannedAnalysisData = API.main($parents);

	// 1.3 Load Interface
	Interface.load($parents, cannedAnalysisData);

	// 1.4 Event Listener
	eventListener.main(cannedAnalysisData);
};

//////////////////////////////////////////////////////////////////////
///////// 2. Define Main Variables ///////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.1.1 locateParents
	/////////////////////////////////

	locateParents: function() {

		// Define variable
		var $parents;

		// Get parents
		if (Page.isDataMed()) {
			$parents = $('.search-result li');
		} else if (Page.isGEO()) {
			$parents = $('.rsltcont');
			// $('.rprt').css('position', 'relative');
		} else {
			throw 'Could not determine repository location.'
		}

		// Return result
		return $parents;
	},

	/////////////////////////////////
	////// 2.1.2 getDatasetAccession
	/////////////////////////////////

	getDatasetAccession: function($elem) {

		// Define variable
		var datasetAccession;

		// Get accession
		if (Page.isDataMed()) {
			datasetAccession = $elem.find(".result-field em:contains('ID:'), em:contains('Accession:')").next().text().replace(/\s+/g, '');
		} else if (Page.isGEO()) {
			datasetAccession = $elem.find(".rprtid dt:contains('Accession: ')").next().text();
		} else {
			throw 'Could not determine repository location.'
		}

		// Return Result
		return datasetAccession;
	},

	/////////////////////////////////
	////// 2.1.3 prepare
	/////////////////////////////////

	prepare: function($elem, cannedAnalysisData) {

		// Define Variables
		var self = this,
			interfaceHTML,
			datasetAccession = self.getDatasetAccession($elem),
			toolbarHTML = '<div class="datasets2tools-toolbar" id="' + datasetAccession + '">',
			searchBarHTML = '<div class="datasets2tools-search-bar">',
			logoTabHTML = '<div class="datasets2tools-logo-tab"><button class="datasets2tools-logo-button datasets2tools-button"></button><span style="font-size:xx-small">&nbsp</span><div class="datasets2tools-title-label">Datasets2Tools</div></div>',
			toolTabHTML = prepareToolIconTab.main(cannedAnalysisData, datasetAccession),
			selectedToolTabHTML = '<div class="datasets2tools-selected-tool-tab datasets2tools-expand"></div>',
			searchTabHTML = '<div class="datasets2tools-search-tab datasets2tools-expand"> <div class="datasets2tools-tool-info-label"> <i>Tool Information</i> </div> <form class="datasets2tools-search-form"> <div class="datasets2tools-search-label">Search:</div><div class="datasets2tools-search-input"><input class="datasets2tools-search-text-input" type="text" name="datasets2tools-search-query"></div></form></div>',
			browseTableHTML = '<div class="datasets2tools-browse-bar datasets2tools-expand"></div>';


		// Prepare Interface HTML
		interfaceHTML = toolbarHTML + searchBarHTML + logoTabHTML + toolTabHTML + selectedToolTabHTML + searchTabHTML + '</div>' + browseTableHTML + '</div>';

		// Return HTML String
		return interfaceHTML;
	},

	/////////////////////////////////
	////// 2.1.4 load
	/////////////////////////////////

	load: function($parents, cannedAnalysisData) {

		// Define Variables
		var datasetAccessions = Object.keys(cannedAnalysisData['canned_analyses']),
		 	self = this,
			datasetAccession,
			interfaceHTML,
			$elem;

		// Loop Through Parents
		$($parents).each(function(i, elem) {
			
			// Define Element
			$elem = $(elem);

			// Get Dataset Accession
			datasetAccession = self.getDatasetAccession($elem);

			// Add Toolbars
			if (datasetAccessions.indexOf(datasetAccession) > -1) {

				// Prepare HTML
				interfaceHTML = self.prepare($elem, cannedAnalysisData);

				// Add HTML
				// $elem.append(interfaceHTML);

				// Add HTML
				if (Page.isDataMed()) {
					$elem.append(interfaceHTML);
				} else if (Page.isGEO()) {
					$elem.append(interfaceHTML);
				} else {
					throw 'Could not determine repository location.'
				}

			}
		})
	}
};

////////////////////////////////////////////////////////////
///// 2.2  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var API = {

	/////////////////////////////////
	////// 2.2. getApiUrl
	/////////////////////////////////

	getApiUrl: function($parents) {

		// Define Variables
		var apiString = 'https://amp.pharm.mssm.edu/datasets2tools/data?',
			datasetAccession;

		// Loop through parents
		$($parents).each(function(i, elem) {

			// Get dataset accession
			datasetAccession = Interface.getDatasetAccession($(elem));

			// Add to API String Variable
			apiString += '+' + datasetAccession;
		})

		// Return String
		return apiString;
	},

	/////////////////////////////////
	////// 2.2. main
	/////////////////////////////////

	main: function($parents) {

		// Define Self
		var self = this,
			cannedAnalysisData;

		// Get API URL
		var apiUrl = self.getApiUrl($parents);

		// Make AJAX Request
		$.ajax({
			type: "GET",
			url: apiUrl,
			async: false,
			success: function(text) {
				cannedAnalysisData = JSON.parse(text);
			}
		});

		// Return Result
		return cannedAnalysisData;
	}
};

////////////////////////////////////////////////////////////
///// 2.3  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var eventListener = {

	/////////////////////////////////
	////// 2.3. clickLogo
	/////////////////////////////////

	clickLogo: function() {

		// Listener
		$('.datasets2tools-logo-button').click(function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variable
			var $datasets2toolsToolbar = $(evt.target).parents('.datasets2tools-toolbar');

			// Add Interactivity
			Interactive.triggerCompactMode($datasets2toolsToolbar);
		});
	},

	/////////////////////////////////
	////// 2.3. selectTool
	/////////////////////////////////

	selectTool: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-tool-icon-button').click(function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $evtTarget.attr('id');

			// Add Interactivity
			Interactive.triggerExpandMode($datasets2toolsToolbar);
			Interactive.prepareSelectedToolTab($datasets2toolsToolbar, toolId, cannedAnalysisData);
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);
			$datasets2toolsToolbar.find('.datasets2tools-selected-tool-title').hide();
			$datasets2toolsToolbar.find('.datasets2tools-search-form').show();
		});
	},

	/////////////////////////////////
	////// 2.3. filterCannedAnalyses
	/////////////////////////////////

	filterCannedAnalyses: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-search-input').on('keyup', function(evt) {
			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');

			// Add Interactivity
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);

		});
	},

	/////////////////////////////////
	////// 2.3. clickCopyButton
	/////////////////////////////////

	clickDropdownButton: function() {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-dropdown-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target);

			// Add Interactivity
			$evtTarget.parent().find('.datasets2tools-dropdown-text').toggle();

		});
	},

	/////////////////////////////////
	////// 2.3. clickCopyButton
	/////////////////////////////////

	clickCopyButton: function() {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-share-dropdown-hover .datasets2tools-copy-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Get Event Target
			var $evtTarget = $(evt.target);

			// Get Element
			var copyTextArea = $evtTarget.prev()[0];

			// Select Element
			copyTextArea.select();

			// Copy Text
			try {
				var successful = document.execCommand('copy');
			} catch (err) {
				console.log('Oops, unable to copy');
			}
		});
	},

	/////////////////////////////////
	////// 2.3. downloadMetadataButton
	/////////////////////////////////

	downloadMetadataButton: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-metadata-dropdown-hover .datasets2tools-metadata-download-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Stuff
			Interactive.downloadMetadata($(evt.target), cannedAnalysisData);

		});
	},

	/////////////////////////////////
	////// 2.3. clickTableArrow
	/////////////////////////////////

	clickTableArrow: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-browse-bar').on('click', '.datasets2tools-browse-arrow', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id'),
				pageNr = $evtTarget.attr('id');

			// Add Interactivity
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData, pageNr);

		});
	},

	/////////////////////////////////
	////// 2.3. clickToolInfoIcon
	/////////////////////////////////

	clickToolInfoIcon: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-search-bar').on('click', '.datasets2tools-tool-info-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
			
			// Add Interactivity
			Interactive.displayToolInfo($datasets2toolsToolbar, toolId, cannedAnalysisData);

		});
	},

	/////////////////////////////////
	////// 2.3. closeToolInfoTab
	/////////////////////////////////

	closeToolInfoTab: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-browse-bar').on('click', '.datasets2tools-close-tool-info-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
				$datasets2toolsToolbar.find('.datasets2tools-tool-info-label').hide();
				$datasets2toolsToolbar.find('.datasets2tools-search-form').show();

			// Add Interactivity
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);

		});
	},

	/////////////////////////////////
	////// 2.3. main
	/////////////////////////////////

	main: function(cannedAnalysisData) {

		// Define Self
		var self = this;

		// Click Logo
		self.clickLogo();

		// Select Tool
		self.selectTool(cannedAnalysisData);

		// Click Dropdown Button
		self.clickDropdownButton();

		// Filter Canned Analyses
		self.filterCannedAnalyses(cannedAnalysisData);

		// Click Arrow
		self.clickTableArrow(cannedAnalysisData);

		// Click Tool Info
		self.clickToolInfoIcon(cannedAnalysisData);

		// Close Tool Info
		self.closeToolInfoTab(cannedAnalysisData);

		// Copy Button
		self.clickCopyButton();

		// Download Metadata
		self.downloadMetadataButton(cannedAnalysisData);
	}
};

//////////////////////////////////////////////////////////////////////
///////// 3. Define Additional Variables /////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 3.1 Page /////////////////////////////////////////////
////////////////////////////////////////////////////////////

var Page = {

	/////////////////////////////////
	////// 3.1.1 isGEO
	/////////////////////////////////

	isGEO: function() {
		return Boolean(window.location.hostname === 'www.ncbi.nlm.nih.gov');
	},

	/////////////////////////////////
	////// 3.1.2 isDataMed
	/////////////////////////////////

	isDataMed: function() {
		return Boolean(window.location.hostname === 'datamed.org');
	},

	/////////////////////////////////
	////// 3.1.3 isLDP
	/////////////////////////////////

	isLDP: function() {
		return Boolean(window.location.hostname === 'lincsportal.ccs.miami.edu');
	}
};

////////////////////////////////////////////////////////////
///// 3.2 prepareToolIconTab ///////////////////////////////
////////////////////////////////////////////////////////////

var prepareToolIconTab = {

	/////////////////////////////////
	////// 2.4.1 main
	/////////////////////////////////

	main: function(cannedAnalysisData, datasetAccession) {

		// Define variables
		var toolIconTabHTML = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact">';//'</div>',

		// Try
		try {

			// Get Tool IDs
			var toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession]);

			// Loop Through Tools
			for (var i = 0; i < toolIds.length; i++) {

				// Get Tool ID
				toolId = toolIds[i];

				// Add Icons
				toolIconTabHTML += '<div class="datasets2tools-tooltip-hover datasets2tools-toolicon-tooltip-hover"><button class="datasets2tools-tool-icon-button datasets2tools-button" id="' + toolId + '" type="button" style="background:url(' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + ') no-repeat;background-size:95%;background-position:center;"></button><div class="datasets2tools-tooltip-text datasets2tools-toolicon-tooltip-text"><b>' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</b><p><i>' + Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession][toolId]).length + ' canned analyses</i></p><p>' + cannedAnalysisData['tools'][toolId]['tool_description'] + '</p></div></div>'
			}
		}
		catch (err) {
			// No Canned Analyses
			toolIconTabHTML += '<div id="datasets2tools-no-cannedanalyses-tab"></div>'
		}

		// Close DIV
		toolIconTabHTML += '</div>';

		// Return Result
		return toolIconTabHTML;
	}
};

////////////////////////////////////////////////////////////
///// 3.3 prepareBrowseTable ///////////////////////////////
////////////////////////////////////////////////////////////

var browseTable = {

	/////////////////////////////////
	////// 2.5.0 firstN
	/////////////////////////////////

	firstN: function (obj, pageNr, pageSize) {
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
	////// 2.5.1 linkHTML
	/////////////////////////////////

	getLinkHTML: function(cannedAnalysisObj, toolIconUrl) {
		return '<td><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img class="datasets2tools-cannedanalysis-link-img" src="' + toolIconUrl + '"></a></td>';
	},

	/////////////////////////////////
	////// 2.5.2 descriptionHTML
	/////////////////////////////////

	getDescriptionHTML: function(cannedAnalysisObj, maxLength=75) {
		// Get description
		var cannedAnalysisDescription = cannedAnalysisObj['description'],
			displayedDescription;

		// Prepare Displayed Description
		if (cannedAnalysisDescription.length > maxLength) {
			displayedDescription = cannedAnalysisDescription.substring(0, maxLength);// + '...';
		} else {
			displayedDescription = cannedAnalysisDescription;
		}

		// Return
		return '<td class="datasets2tools-canned-analysis-description">' + displayedDescription + '<span class="datasets2tools-tooltip-hover datasets2tools-description-tooltip-hover">...<div class="datasets2tools-tooltip-text datasets2tools-description-tooltip-text">' + cannedAnalysisDescription + '</div></span></td>';// + 'hoverDescription' +
	},

	/////////////////////////////////
	////// 2.5.3 metadataHTML
	/////////////////////////////////

	getMetadataHTML: function(cannedAnalysisObj) {

		// Keys
		var self = this;

		// Return
		return '<td>' + self.getViewMetadataHTML(cannedAnalysisObj) + self.getdownloadMetadataHTML(cannedAnalysisObj) + '</td>';
	},

	/////////////////////////////////
	////// 2.5.4 viewMetadataHTML
	/////////////////////////////////

	getViewMetadataHTML: function(cannedAnalysisObj) {

		// Define variables
		var metadataKeys = Object.keys(cannedAnalysisObj),
			metadataTooltipString = '', //<b>Metadata</b><br>
			viewMetadataHTML,
			metadataKey;

		// Loop through tags
		for (var j = 0; j < metadataKeys.length; j++) {

			// Get Metadata Key
			metadataKey = metadataKeys[j];

			// Get Metadata Value
			if (!(['canned_analysis_url', 'description'].indexOf(metadataKey) >= 0)) {
				metadataTooltipString += '<b>' + metadataKey + '</b>: ' + cannedAnalysisObj[metadataKey] + '<br>';
			}
		};

		// Close DIV
		viewMetadataHTML = '<div class="datasets2tools-tooltip-hover datasets2tools-metadata-tooltip-hover"><img class="datasets2tools-view-metadata-img datasets2tools-metadata-img" src="' + chrome.extension.getURL("icons/info.png") + '"><div class="datasets2tools-tooltip-text datasets2tools-metadata-tooltip-text">'+metadataTooltipString+'</div></div>';

		// Return
		return viewMetadataHTML;
	},

	/////////////////////////////////
	////// 2.5.5 downloadMetadataHTML
	/////////////////////////////////

	getdownloadMetadataHTML: function(cannedAnalysisObj) {

		// Define variables
		var downloadMetadataHTML = '<div class="datasets2tools-dropdown-hover datasets2tools-metadata-dropdown-hover">';

		// Add Stuff
		downloadMetadataHTML += '<button class="datasets2tools-button datasets2tools-dropdown-button datasets2tools-download-metadata-button"></button>';
		
		// Add Stuff
		downloadMetadataHTML += '<div class="datasets2tools-dropdown-text datasets2tools-metadata-dropdown-text">';

		// Add functionality
		downloadMetadataHTML += '<b>Download Metadata:</b><br>';

		// Add TXT Button
		downloadMetadataHTML += '<button class="datasets2tools-metadata-download-button" id="getTXT">TXT</button>';

		// Add JSON Button
		downloadMetadataHTML += '<button class="datasets2tools-metadata-download-button" id="getJSON">JSON</button>';
		
		// Close DIV
		downloadMetadataHTML += '</div></div>';

		// Return
		return downloadMetadataHTML;
	},

	/////////////////////////////////
	////// 2.5.6 shareHTML
	/////////////////////////////////

	getShareHTML: function(cannedAnalysisObj) {

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

		// Copy Image
		var copyImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/copy.png") + '">';

		// Get Copy Button HTML
		var buttonHTML = '<button class="datasets2tools-copy-button"><img class="datasets2tools-dropdown-icons-img" src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/editor_copy_duplicate_files-512.png">Copy</button>';

		// Text Area HTML
		var textAreaHTML = function(content, nRows) {return '<textarea class="datasets2tools-textarea" rows="' + nRows + '">'+content+'</textarea>'};

		// Canned Analysis URL
		var cannedAnalysisUrl = cannedAnalysisObj['canned_analysis_url'];

		// Embed Code
		var embedCode = '<a href="' + cannedAnalysisUrl + '"><img src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png" style="height:50px;width:50px"></a>'

		shareHTML += interactiveDivHTML + shareImageHTML + dropdownDivHTML + linkImageHTML + textAreaHTML(cannedAnalysisUrl, 3) + buttonHTML + '<br><br>' + embedImageHTML + textAreaHTML(embedCode, 3) + buttonHTML + '</div></div></td>';

		return shareHTML; 
	},

	/////////////////////////////////
	////// 2.5.7 rowHTML
	/////////////////////////////////

	getRowHTML: function(cannedAnalysisId, linkHTML, descriptionHTML, metadataHTML, shareHTML) {
		return '<tr class="datasets2tools-canned-analysis-row" id="' + cannedAnalysisId + '">' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('') + '</tr>';
	},

	/////////////////////////////////
	////// 2.5.8 prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisDataElement, toolIconUrl, pageNr, pageSize=5) {

		// Define variables
		var self = this,
			browseTableHTML = '<table class="datasets2tools-browse-table"><tr><th class="datasets2tools-link-col">Link</th><th class="datasets2tools-description-col">Description</th><th class="datasets2tools-metadata-col">Metadata</th><th class="datasets2tools-share-col">Share</th></tr>',
			numberOfCannedAnalyses = Object.keys(cannedAnalysisDataElement).length,
			cannedAnalysisObj,
			cannedAnalysisId;

		// Get Subset
		cannedAnalysisDataElementSubset = self.firstN(cannedAnalysisDataElement, pageNr, pageSize);

		// Get Canned Analysis IDs
		var cannedAnalysisIds = Object.keys(cannedAnalysisDataElementSubset);

		// Check If More Than A Row
		if (cannedAnalysisIds.length === 0) {

			// Add No Results
			browseTableHTML += '<tr><td class="datasets2tools-no-results-tab" colspan="4">No Results Found.</td></tr>';

		} else {

			// Loop Through Canned Analyses
			for (var i = 0; i < cannedAnalysisIds.length; i++) {

				// Get Canned Analysis Id
				cannedAnalysisId = cannedAnalysisIds[i];

				// Get Canned Analysis Object
				cannedAnalysisObj = cannedAnalysisDataElementSubset[cannedAnalysisId];

				// Add Row HTML
				browseTableHTML += self.getRowHTML(cannedAnalysisId, self.getLinkHTML(cannedAnalysisObj, toolIconUrl), self.getDescriptionHTML(cannedAnalysisObj), self.getMetadataHTML(cannedAnalysisObj), self.getShareHTML(cannedAnalysisObj));
			}
		}

		// Close table
		browseTableHTML += '</table>';

		// Get Left Arrow Activity Class
		function leftArrowClass(pageNr) {
			if (pageNr > 1) {
				return '" id="' + (pageNr-1) + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
		};

		// Get Right Arrow Activity Class
		function rightArrowClass(pageNr, pageSize, cannedAnalysisDataElement) {
			// Get Number of Canned Analyses
			var followingPageNr = parseInt(pageNr) + 1;
			if (numberOfCannedAnalyses > pageNr*(pageSize)) {
				return '" id="' + followingPageNr + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
		};

		// Add Browse Arrows, If Necessary
		browseTableHTML += '<div class="datasets2tools-browse-table-arrow-tab">'
		browseTableHTML += 'Showing results ' + Math.min(((pageNr-1)*pageSize+1), numberOfCannedAnalyses) + '-' + Math.min((pageNr*(pageSize)), numberOfCannedAnalyses) + ' of ' + numberOfCannedAnalyses + '.&nbsp&nbsp&nbsp'
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-left' + leftArrowClass(pageNr) + '"></button>';
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-right' + rightArrowClass(pageNr, pageSize, cannedAnalysisDataElement) + '"></button>';
		browseTableHTML += '</div>';

		// Return Table HTML
		return browseTableHTML;
	}
};

////////////////////////////////////////////////////////////
///// 3.4 Interactive //////////////////////////////////////
////////////////////////////////////////////////////////////

var Interactive = {

	/////////////////////////////////
	////// 3.3. triggerCompactMode
	/////////////////////////////////

	triggerCompactMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').show();
		$datasets2toolsToolbar.find('.datasets2tools-expand').hide();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'inline-block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-img').css('filter', 'grayscale(0%)');
	},

	/////////////////////////////////
	////// 3.3. triggerExpandMode
	/////////////////////////////////

	triggerExpandMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-img').css('filter', 'grayscale(100%)');
	},

	/////////////////////////////////
	////// 3.3. prepareSelectedToolTab
	/////////////////////////////////

	prepareSelectedToolTab: function($datasets2toolsToolbar, toolId, cannedAnalysisData) {

		// Get Selected Tool Tab Element
		var $selectedToolTab = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-tab');

		// Get Result HTML
		var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img" id="' + toolId + '"><div class="datasets2tools-selected-tool-label">' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</div><button type="button" class="datasets2tools-tool-info-button datasets2tools-button"></button>';
		// var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img" id="' + toolId + '"><div class="datasets2tools-selected-tool-label">' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</div>';

		// Add HTML
		$selectedToolTab.html(selectedToolTabHTML);
	},

	/////////////////////////////////
	////// 3.3. prepareBrowseTable
	/////////////////////////////////

	prepareBrowseTable: function($datasets2toolsToolbar, toolId, cannedAnalysisData, pageNr=1) {

		// Define Self
		var self = this;

		// Get Dataset Accession
		var datasetAccession = $datasets2toolsToolbar.attr('id');

		// Get Tool Icon URL
		var toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'];

		// Get Canned Analyses
		var cannedAnalysisDataElement = jQuery.extend({}, cannedAnalysisData['canned_analyses'][datasetAccession][toolId]);

		// Get Search Filter
		var searchFilter = $datasets2toolsToolbar.find('.datasets2tools-search-text-input').val();

		// Get Canned Analysis Ids
		var cannedAnalysisIds = Object.keys(cannedAnalysisDataElement),
			cannedAnalysisId;

		// Filter, If Specified
		if (searchFilter.length > 0) {

			// Loop
			for (var i = 0; i < cannedAnalysisIds.length; i++) {

				// Get ID
				cannedAnalysisId = cannedAnalysisIds[i];

				// Get description
				cannedAnalysisDescription = cannedAnalysisDataElement[cannedAnalysisId]['description'];

				// Remove, If Specified
				if (!(cannedAnalysisDescription.toLowerCase().includes(searchFilter.toLowerCase()))) {
					delete cannedAnalysisDataElement[cannedAnalysisId];
				};

			};
		};
				
		// Prepare Table HTML
		var browseTableHTML = browseTable.prepare(cannedAnalysisDataElement, toolIconUrl, pageNr);

		// Add To Webpage
		$datasets2toolsToolbar.find('.datasets2tools-browse-bar').html(browseTableHTML);
	},

	/////////////////////////////////
	////// 3.3. downloadMetadata
	/////////////////////////////////

	downloadMetadata: function($evtTarget, cannedAnalysisData) {
		
		// Get file format
		var fileFormat = $evtTarget.text();

		// Get Toolbar
		var $datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar');

		// Get Dataset Accession
		var datasetAccession = $datasets2toolsToolbar.attr('id');

		// Get Tool ID
		var toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');

		// Get Canned Analysis ID
		var cannedAnalysisId = $evtTarget.parents('tr').attr('id');

		// Get Canned Analysis Object
		var cannedAnalysisObj = jQuery.extend({}, cannedAnalysisData['canned_analyses'][datasetAccession][toolId][cannedAnalysisId]);

		// Add Dataset
		cannedAnalysisObj['dataset_accession'] = datasetAccession;

		// Add Tool
		cannedAnalysisObj['tool_name'] = cannedAnalysisData['tools'][toolId]['tool_name'];

		// Add Tool URL
		// cannedAnalysisObj['tool_url'] = cannedAnalysisData['tools'][toolId]['tool_url'];

		// Get file
		downloadMetadata.main(cannedAnalysisObj, fileFormat);
	},
	
	/////////////////////////////////
	////// 3.3. displayToolInfo
	/////////////////////////////////

	displayToolInfo: function($datasets2toolsToolbar, toolId, cannedAnalysisData) {

		// Define Variables
		var toolInfoHTML = '<div class="datasets2tools-tool-info-tab">';

		// Get Tool Description
		var toolDescriptionHTML = cannedAnalysisData['tools'][toolId]['tool_description'];

		// Get Tool Links
		var toolLinkHTML = '<a href="' + cannedAnalysisData['tools'][toolId]['tool_homepage_url'] + '">Homepage</a>';

		// Get Publication Links
		var publicationLinkHTML = '<a href="' + cannedAnalysisData['tools'][toolId]['publication_url'] + '">Reference</a>';

		// Get HTML String
		toolInfoHTML += '<b><u>Tool Description</b></u><br>' + toolDescriptionHTML + '<br><br><b><u>Links</b></u><br>' + toolLinkHTML + '&nbsp' + publicationLinkHTML + '<button class="datasets2tools-close-tool-info-button">X</button></div>';

		// Set HTML
		$datasets2toolsToolbar.find('.datasets2tools-browse-bar').html(toolInfoHTML);

		// Set HTML
		$datasets2toolsToolbar.find('.datasets2tools-search-form').hide();
		$datasets2toolsToolbar.find('.datasets2tools-tool-info-label').show();
	}
};

////////////////////////////////////////////////////////////
///// 3.5 downloadMetadata /////////////////////////////////
////////////////////////////////////////////////////////////

var downloadMetadata = {

	/////////////////////////////////
	////// 2.5.1 getTXT
	/////////////////////////////////

	getTXT: function(cannedAnalysisObj) {

		// Define variable
		var txtString = 'Tag\tValue\n',
			metadataKey;

		// Get Keys
		var metadataKeys = Object.keys(cannedAnalysisObj);

		// Loop through keys
		for (var k = 0; k < metadataKeys.length; k++) {

			// Get metadata key
			metadataKey = metadataKeys[k];

			// Add metadata values
			txtString += metadataKey + '\t' + cannedAnalysisObj[metadataKey] + '\n';
		}

		// Return string
		return txtString;
	},

	/////////////////////////////////
	////// 2.5.2 getJSON
	/////////////////////////////////

	getJSON: function(cannedAnalysisObj) {

		// Return string
		return JSON.stringify(cannedAnalysisObj, null, 2);
	},

	/////////////////////////////////
	////// 2.5.3 main
	/////////////////////////////////

	main: function(cannedAnalysisObj, fileFormat) {

		// Define Self
		var self = this,
			metadataString;

		// Switch
		switch(fileFormat) {

			// Download TXT
			case 'TXT':
				metadataString = self.getTXT(cannedAnalysisObj);
				download(metadataString, 'metadata.txt', 'text/plain')
				break;

			// Download JSON
			case 'JSON':
				metadataString = self.getJSON(cannedAnalysisObj);
				download(metadataString, 'metadata.json', 'text/plain')
				break;
		}
	}
};

//////////////////////////////////////////////////////////////////////
///////// 4. Run Main Function ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////

main();