//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function datasets2toolsMain() {

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
		} else if (Page.isLDP()) {
			datasetAccession = $elem.parents('.ng-scope').find(".col-sm-2:contains('LINCS ID')").next().text().replace(/\s+/g, '');
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
			toolbarHTML = '<div class="datasets2tools-toolbar datasets2tools-' + Page.getLabel() + '" id="' + datasetAccession + '">',
			searchBarHTML = '<div class="datasets2tools-search-bar">',
			logoTabHTML = '<div class="datasets2tools-logo-tab"><button class="datasets2tools-logo-button datasets2tools-button"></button><span style="font-size:xx-small">&nbsp</span><div class="datasets2tools-title-label datasets2tools-compact">Datasets2Tools</div></div>',
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
				if (Page.isDataMed()) {
					$elem.append(interfaceHTML);
				} else if (Page.isGEO()) {
					$elem.append(interfaceHTML);
					$('.seven_col').css('overflow', 'visible');
					$('.rprt').css('overflow', 'visible');
				} else {
					throw 'Could not determine repository location.'
				}

			}
		})
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
///// 3.1 prepareToolIconTab ///////////////////////////////
////////////////////////////////////////////////////////////

var prepareToolIconTab = {

	/////////////////////////////////
	////// 2.4.1 main
	/////////////////////////////////

	main: function(cannedAnalysisData, datasetAccession) {

		// Define variables
		var toolIconTabHTML = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact">',
			toolIds,
			nrCannedAnalyses;//'</div>',

		// Try
		try {

			// Get Tool IDs
			toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession]);

			// Loop Through Tools
			for (var i = 0; i < toolIds.length; i++) {

				// Get Tool ID
				toolId = toolIds[i];

				// Get number of canned analyses
				nrCannedAnalyses = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession][toolId]).length;

				// Add Icons
				toolIconTabHTML += '<div class="datasets2tools-tooltip-hover datasets2tools-toolicon-tooltip-hover"><button class="datasets2tools-tool-icon-button datasets2tools-button" id="' + toolId + '" type="button" style="background:url(' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + ') no-repeat;background-size:95%;background-position:center;"></button><div class="datasets2tools-tooltip-text datasets2tools-toolicon-tooltip-text"><b>' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</b><p><i>' + nrCannedAnalyses + ' canned analyses</i></p><p>' + cannedAnalysisData['tools'][toolId]['tool_description'] + '</p></div></div>'
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
///// 3.2 Interactive //////////////////////////////////////
////////////////////////////////////////////////////////////

var Interactive = {

	/////////////////////////////////
	////// 3.3. triggerCompactMode
	/////////////////////////////////

	triggerCompactMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').show();
		$datasets2toolsToolbar.find('.datasets2tools-expand').hide();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'inline-block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-button').css({'filter': 'grayscale(0%)', 'opacity': '1'});
	},

	/////////////////////////////////
	////// 3.3. triggerExpandMode
	/////////////////////////////////

	triggerExpandMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-button').css({'filter': 'grayscale(100%)', 'opacity': '0.5'});
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
		var pairCannedAnalyses = jQuery.extend({}, cannedAnalysisData['canned_analyses'][datasetAccession][toolId]);

		// Get Search Filter
		var searchFilter = $datasets2toolsToolbar.find('.datasets2tools-search-text-input').val();

		// Get Canned Analysis Ids
		var cannedAnalysisIds = Object.keys(pairCannedAnalyses),
			cannedAnalysisId;

		// Filter, If Specified
		if (searchFilter.length > 0) {

			// Loop
			for (var i = 0; i < cannedAnalysisIds.length; i++) {

				// Get ID
				cannedAnalysisId = cannedAnalysisIds[i];

				// Get description
				cannedAnalysisDescription = pairCannedAnalyses[cannedAnalysisId]['description'];

				// Remove, If Specified
				if (!(cannedAnalysisDescription.toLowerCase().includes(searchFilter.toLowerCase()))) {
					delete pairCannedAnalyses[cannedAnalysisId];
				};

			};
		};
				
		// Prepare Table HTML
		// var browseTableHTML = browseTable.prepare(pairCannedAnalyses, toolIconUrl, pageNr);
		var browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl, pageNr, 75);

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