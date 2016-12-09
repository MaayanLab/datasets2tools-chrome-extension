
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {

	// 1.1 Locate Parents
	$parents = Interface.locateParents();

	// 1.2 Get Canned Analysis Data
	var cannedAnalysisData = API.main($parents);

	// 1.3 Load Interface
	Interface.load($parents, cannedAnalysisData);

};

//////////////////////////////////////////////////////////////////////
///////// 2. Define Variables ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1 API //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var API = {

	/////////////////////////////////
	////// 2.1.1 getDatasetId
	/////////////////////////////////

	getDatasetId: function(datasetAccession) {
		return datasetAccession + ' > ID';
	},

	/////////////////////////////////
	////// 2.1.2 getCannedAnalysisIds
	/////////////////////////////////

	getCannedAnalysisIds: function(datasetId) {
		return datasetId + ' > Canned Analysis IDs';
	},

	/////////////////////////////////
	////// 2.1.3 getCannedAnalysisMetadata
	/////////////////////////////////

	getCannedAnalysisMetadata: function(cannedAnalysisIds) {
		var obj = {"1":{"10":{"canned_analysis_url":"https://www.google.com/","description":"enrichr analysis 1","tag1":"value1","tag2":"value2"},"11":{"canned_analysis_url":"https://www.google.com/","description":"enrichr analysis 2","tag1":"value1","tag2":"value2"}},"2":{"12":{"canned_analysis_url":"https://www.google.com/","description":"geo2enrichr analysis 1","tag1":"value1","tag2":"value2"},"13":{"canned_analysis_url":"https://www.google.com/","description":"geo2enrichr analysis 2","tag1":"value1","tag2":"value2"}},"3":{"14":{"canned_analysis_url":"https://www.google.com/","description":"l1000cds2 analysis 1","tag1":"value1","tag2":"value2"},"15":{"canned_analysis_url":"https://www.google.com/","description":"l1000cds2 analysis 2","tag1":"value1","tag2":"value2"}}};
		return obj;
	},

	/////////////////////////////////
	////// 2.1.4 getCannedAnalyses
	/////////////////////////////////

	getCannedAnalyses: function($parents) {

		// Define Canned Analyses empty object
		var self = this,
			cannedAnalyses = {};

		// Loop through parents
		$($parents).each(function(i, elem) {

			// Define element
			var $elem = $(elem),
				datasetAccession;

			// Get dataset accession
			datasetAccession = Interface.getDatasetAccession($elem);

			// Get dataset ID
			datasetId = self.getDatasetId(datasetAccession);

			// Get Canned Analysis IDs
			cannedAnalysisIds = self.getCannedAnalysisIds(datasetId);

			// Get Canned Analysis Metadata
			cannedAnalysisMetadata = self.getCannedAnalysisMetadata(cannedAnalysisIds);

			// Add to object
			cannedAnalyses[datasetAccession] = cannedAnalysisMetadata;
		})

		// Return object
		return cannedAnalyses;
	},

	/////////////////////////////////
	////// 2.1.5 getToolMetadata
	/////////////////////////////////

	getToolMetadata: function(cannedAnalyses) {
		var obj = {"1":{"tool_name":"Enrichr","tool_icon_url":"https://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png"},"2":{"tool_name":"GEO2Enrichr","tool_icon_url":"https://amp.pharm.mssm.edu/g2e/static/image/logo-50x50.png"},"3":{"tool_name":"L1000CDS2","tool_icon_url":"https://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png"}};
		return obj;
	},

	/////////////////////////////////
	////// 2.1.6 main
	/////////////////////////////////

	main: function($parents) {
		
		// Define object
		var cannedAnalysisData = {'canned_analyses': {}, 'tools': {}}

		// Get Canned Analyses
		cannedAnalysisData['canned_analyses'] = API.getCannedAnalyses($parents);

		// Get Tool Metadata
		cannedAnalysisData['tools'] = API.getToolMetadata(cannedAnalysisData['canned_analyses']);

		// Return data
		return cannedAnalysisData;
	}
};

////////////////////////////////////////////////////////////
///// 2.2 Interface ////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.2.1 locateParents
	/////////////////////////////////

	locateParents: function() {

		// Define variable
		var $parents;

		// Add parents
		$parents = $('.search-result li');

		// Return result
		return $parents;
	},

	/////////////////////////////////
	////// 2.2.2 getDatasetAccession
	/////////////////////////////////

	getDatasetAccession: function($elem) {

		// Get accession
		datasetAccession = $elem.find(".result-field em:contains('ID:'), em:contains('Accession:')").next().text().replace(/\s+/g, '');

		// Return accession
		return datasetAccession;
	},

	/////////////////////////////////
	////// 2.2.3 loadStatic
	/////////////////////////////////

	loadStatic: function($parents) {

		// Define variables
		var $elem,
			staticInterfaceHTML;

		// Loop through parents
		$($parents).each(function(i, elem) {

			// Define element
			$elem = $(elem);

			// Get Static Interface HTML
			staticInterfaceHTML = staticInterface.prepare($elem);

			// Add Static Interface
			$elem.append(staticInterfaceHTML);
		})
	},

	/////////////////////////////////
	////// 2.2.4 loadToolIconTabs
	/////////////////////////////////	

	loadToolIconTabs: function(cannedAnalysisData) {

		// Define Variables
		var toolIconTabHTML,
			$datasets2toolsToolbar,
			datasetAccession;
		
		// Loop Through Toolbars
		$('.datasets2tools-toolbar').each(function(i, datasets2toolsToolbar) {

			// Define Toolbar Element
			$datasets2toolsToolbar = $(datasets2toolsToolbar);

			// Extract Dataset Accession
			datasetAccession = $datasets2toolsToolbar.attr('id');

			// Prepare Tool Icon Tab HTML
			toolIconTabHTML = toolIconTab.prepare(cannedAnalysisData, datasetAccession);

			// Append
			$datasets2toolsToolbar.find('.datasets2tools-tool-icon-tab').html(toolIconTabHTML);
		});
	},

	/////////////////////////////////
	////// 2.2.5 load
	/////////////////////////////////	

	load: function($parents, cannedAnalysisData) {

		// Define Self
		var self = this;

		// Load Static Interface
		this.loadStatic($parents);

		// Load Dynamic Interface
		this.loadToolIconTabs(cannedAnalysisData);

		// Event Listener
		eventListener.main(cannedAnalysisData);
	}
};

////////////////////////////////////////////////////////////
///// 2.3 staticInterface //////////////////////////////////
////////////////////////////////////////////////////////////
	
var staticInterface = {

	/////////////////////////////////
	////// 2.3.1 toolbar
	/////////////////////////////////

	toolbar: function(datasetAccession) {
		return '<div class="datasets2tools-toolbar" id="' + datasetAccession + '">';
	},

	/////////////////////////////////
	////// 2.3.2 searchBar
	/////////////////////////////////

	searchBar: function() {
		return '<div class="datasets2tools-search-bar">';
	},

	/////////////////////////////////
	////// 2.3.3 logoTab
	/////////////////////////////////

	logoTab: function() {
		return '<div class="datasets2tools-logo-tab"><img class="datasets2tools-logo-img" src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png"><span style="font-size:xx-small">&nbsp</span><span class="datasets2tools-compact">Datasets2Tools</span> </div>';
	},

	/////////////////////////////////
	////// 2.3.4 selectedToolTab
	/////////////////////////////////

	selectedToolTab: function() {
		return '<div class="datasets2tools-selected-tool-tab datasets2tools-expand"> Selected Tool Info: </div>';
	},

	/////////////////////////////////
	////// 2.3.5 toolIconTab
	/////////////////////////////////

	toolIconTab: function() {
		return '<div class="datasets2tools-tool-icon-tab datasets2tools-compact"> Tool Icons: </div>';
	},

	/////////////////////////////////
	////// 2.3.6 searchTab
	/////////////////////////////////

	searchTab: function() {
		return '<div class="datasets2tools-search-tab datasets2tools-expand"> <div class="datasets2tools-search-label">Search:</div><div class="datasets2tools-search-input"><input class="datasets2tools-search-text-input" type="text" name="datasets2tools-search-query"></div></div>';
	},

	/////////////////////////////////
	////// 2.3.7 browseTable
	/////////////////////////////////

	browseTable: function() {
		return '<div class="datasets2tools-browse-bar datasets2tools-expand"> Browse table: </div>';
	},

	/////////////////////////////////
	////// 2.3.8 prepare
	/////////////////////////////////

	prepare: function($elem) {

		// Define self
		var self = this;

		// Get Dataset Accession
		var datasetAccession = Interface.getDatasetAccession($elem);

		// Define Interface HTML
		var interfaceHTML = self.toolbar(datasetAccession) + self.searchBar() + self.logoTab() + self.selectedToolTab() + self.toolIconTab() + self.searchTab() + '</div>' + self.browseTable() + '</div>';

		// Return HTML
		return interfaceHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.4 toolIconTab //////////////////////////////////////
////////////////////////////////////////////////////////////

var toolIconTab = {

	/////////////////////////////////
	////// 2.4.1 toolIconTab
	/////////////////////////////////

	prepare: function(cannedAnalysisData, datasetAccession) {

		// Define variables
		var toolIconTabHTML = '';

		// Get Tool IDs
		var toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession]);

		// Loop Through Tools
		for (var i = 0; i < toolIds.length; i++) {

			// Get Tool ID
			toolId = toolIds[i];

			// Add Icons
			toolIconTabHTML += '<div class="datasets2tools-tool-icon" id="' + toolId + '"><img class="datasets2tools-tool-icon-img" src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '"></div>'
		}

		// Return Result
		return toolIconTabHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.5 browseTable //////////////////////////////////////
////////////////////////////////////////////////////////////

var browseTable = {

	/////////////////////////////////
	////// 2.5.1 linkHTML
	/////////////////////////////////

	getLinkHTML: function(cannedAnalysisObj, toolIconUrl) {
		return '<td><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img class="datasets2tools-cannedanalysis-link-img" src="' + toolIconUrl + '"></a></td>';
	},

	/////////////////////////////////
	////// 2.5.2 descriptionHTML
	/////////////////////////////////

	getDescriptionHTML: function(cannedAnalysisObj) {
		return '<td>' + cannedAnalysisObj['description'] + '</td>';
	},

	/////////////////////////////////
	////// 2.5.3 metadataHTML
	/////////////////////////////////

	getMetadataHTML: function(cannedAnalysisObj) {

		// Metadata String
		var metadataString = '<b>Metadata</b><br>';

		// Keys
		var metadataKeys = Object.keys(cannedAnalysisObj),
			metadataKey;

		// Loop through tags
		for (var j = 0; j < metadataKeys.length; j++) {
			metadataKey = metadataKeys[j];

			if (!(['canned_analysis_url', 'description'].indexOf(metadataKey) >= 0)) {
				metadataString += '<b>' + metadataKey + '</b>: ' + cannedAnalysisObj[metadataKey] + '<br>';
			}

		};

		// Define HTML String
		var metadataHTML = '<td>';

		metadataHTML += '<img class="datasets2tools-view-metadata-img datasets2tools-metadata-img" src="https://openclipart.org/image/800px/svg_to_png/213219/Information-icon.png">';
		
		metadataHTML += '<div class="datasets2tools-metadata-view-dropdown datasets2tools-dropdown">' + metadataString + '</div>';
		
		metadataHTML += '&nbsp&nbsp&nbsp';
		
		metadataHTML += '<img class="datasets2tools-download-metadata-img datasets2tools-metadata-img" src="http://www.drodd.com/images12/icon-download7.png">';

		metadataHTML += '<div class="datasets2tools-metadata-download-dropdown datasets2tools-dropdown">' + 'Download Metadata:<br><button>TXT</button><br><button>JSON</button><br><button>XML</button>' + '</div>';
		
		metadataHTML += '</td>';

		return metadataHTML;
	},

	/////////////////////////////////
	////// 2.5.4 shareHTML
	/////////////////////////////////

	getShareHTML: function(cannedAnalysisObj) {

		// Define HTML String
		var shareHTML = '<td>';

		shareHTML += '<img class="datasets2tools-share-button-img" src="https://api.icons8.com/download/a5d38503865a8990ff38b46357345debdb740e3d/Android_L/PNG/256/Very_Basic/share-256.png">';

		shareHTML += '<div class="datasets2tools-share-dropdown datasets2tools-dropdown"> Canned Analysis URL: <textarea>' + cannedAnalysisObj['canned_analysis_url'] + '</textarea><br><button>Copy To Clipboard</button><br><br>Embed Icon:<br><textarea rows="3"><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png" style="height:50px;width:50px"></a></textarea><button>Copy To Clipboard</button></div>';

		shareHTML += '</td>';

		return shareHTML; 
	},

	/////////////////////////////////
	////// 2.5.5 rowHTML
	/////////////////////////////////

	getRowHTML: function(linkHTML, descriptionHTML, metadataHTML, shareHTML) {
		return '<tr>' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('') + '</tr>';
	},

	/////////////////////////////////
	////// 2.5.6 prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisDataElement, toolIconUrl) {

		// Define variables
		var self = this,
			browseTableHTML = '<table class="datasets2tools-browse-table"><tr><th class="datasets2tools-link-col">Link</th><th class="datasets2tools-description-col">Description</th><th class="datasets2tools-metadata-col">Metadata</th><th class="datasets2tools-share-col">Share</th></tr>',
			cannedAnalysisObj;

		// Get Canned Analysis IDs
		var cannedAnalysisIds = Object.keys(cannedAnalysisDataElement)

		// Check If More Than A Row
		if (cannedAnalysisIds.length === 0) {

			// Add No Results
			browseTableHTML += '<tr><td colspan="4">No Results Found.</td></tr>'

		} else {

			// Loop Through Canned Analyses
			for (var i = 0; i < cannedAnalysisIds.length; i++) {

				// Get Canned Analysis Object
				cannedAnalysisObj = cannedAnalysisDataElement[cannedAnalysisIds[i]]

				// Add Row HTML
				browseTableHTML += self.getRowHTML(self.getLinkHTML(cannedAnalysisObj, toolIconUrl), self.getDescriptionHTML(cannedAnalysisObj), self.getMetadataHTML(cannedAnalysisObj), self.getShareHTML(cannedAnalysisObj));
			}

		}

		// Close table
		browseTableHTML += '</table>'

		// Return Table HTML
		return browseTableHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.6 Interactive //////////////////////////////////////
////////////////////////////////////////////////////////////

var Interactive = {

	/////////////////////////////////
	////// 2.6.1 triggerCompactMode
	/////////////////////////////////

	triggerCompactMode: function($evtTarget) {
		var self = this,
			$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent();
		$datasets2toolsToolbar.find('.datasets2tools-compact').show();
		$datasets2toolsToolbar.find('.datasets2tools-expand').hide();
	},

	/////////////////////////////////
	////// 2.6.2 triggerExpandMode
	/////////////////////////////////

	triggerExpandMode: function($evtTarget) {
		var self = this,
			$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent();
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
	},

	/////////////////////////////////
	////// 2.6.3 prepareSelectedToolTab
	/////////////////////////////////

	prepareSelectedToolTab: function($evtTarget, cannedAnalysisData) {
		// Get Tool ID
		var toolId = $evtTarget.parent().attr('id');

		// Get Selected Tool Tab Element
		var $selectedToolTab = $evtTarget.parent().parent().parent().parent().find('.datasets2tools-selected-tool-tab');

		// Get Result HTML
		var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img" id="' + toolId + '"> &nbsp' + cannedAnalysisData['tools'][toolId]['tool_name'] + '';

		// Add HTML
		$selectedToolTab.html(selectedToolTabHTML);
	},

	/////////////////////////////////
	////// 2.6.4 prepareBrowseTable
	/////////////////////////////////

	prepareBrowseTable: function($evtTarget, cannedAnalysisData) {

		// Get Toolbar
		var $datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent();

		// Get Dataset Accession
		var datasetAccession = $datasets2toolsToolbar.attr('id');

		// Get Tool ID
		var toolId = $evtTarget.parent().attr('id');

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
				if (!(cannedAnalysisDescription.includes(searchFilter))) {
					delete cannedAnalysisDataElement[cannedAnalysisId];
				};

			};
		};
				
		// Prepare Table HTML
		var browseTableHTML = browseTable.prepare(cannedAnalysisDataElement, toolIconUrl);

		// Add To Webpage
		$datasets2toolsToolbar.find('.datasets2tools-browse-bar').html(browseTableHTML);
	}
};

////////////////////////////////////////////////////////////
///// 2.7 eventListener ////////////////////////////////////
////////////////////////////////////////////////////////////

var eventListener = {

	/////////////////////////////////
	////// 2.7.1 clickLogo
	/////////////////////////////////

	clickLogo: function() {
		$('.datasets2tools-logo-img').click(function(evt) {
			Interactive.triggerCompactMode($(evt.target));
		});
	},

	/////////////////////////////////
	////// 2.7.2 selectTool
	/////////////////////////////////

	selectTool: function(cannedAnalysisData) {
		$('.datasets2tools-tool-icon').click(function(evt) {
			var $evtTarget = $(evt.target);
			Interactive.triggerExpandMode($evtTarget);
			Interactive.prepareSelectedToolTab($evtTarget, cannedAnalysisData);
			Interactive.prepareBrowseTable($evtTarget, cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.3 displayMetadata
	/////////////////////////////////

	displayMetadata: function() {
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-metadata-img', function(evt) {
			$(evt.target).next().toggle();
		});
	},

	/////////////////////////////////
	////// 2.7.4 shareCannedAnalysis
	/////////////////////////////////

	shareCannedAnalysis: function() {
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-share-button-img', function(evt) {
			$(evt.target).parent().find('.datasets2tools-share-dropdown').toggle();
		});
	},

	/////////////////////////////////
	////// 2.7.5 filterCannedAnalyses
	/////////////////////////////////

	filterCannedAnalyses: function(cannedAnalysisData) {
		$('.datasets2tools-search-input').on('keyup', function(evt) {//change(function(evt) {//
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent(),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id'),
				$selectedToolIconImg = $datasets2toolsToolbar.find('#'+toolId+'.datasets2tools-tool-icon').find('img');
			Interactive.prepareBrowseTable($selectedToolIconImg, cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.6 main
	/////////////////////////////////

	main: function(cannedAnalysisData) {

		// Define Self
		var self = this;

		// Click Logo
		self.clickLogo();

		// Select Tool
		self.selectTool(cannedAnalysisData);

		// Display Metadata
		self.displayMetadata();

		// Share Canned Analysis
		self.shareCannedAnalysis();

		// Filter Canned Analyses
		self.filterCannedAnalyses(cannedAnalysisData);
	}
};

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

main();