
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
};

function main() {

	// 1.1 Load Static Interface
	Interface.loadStatic();

	// 1.2 Get Canned Analysis Data
	var cannedAnalysisData = API.main();

	// 1.3 Load Dynamic Interface
	Interface.loadDynamic(cannedAnalysisData);
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

	main: function() {
		
		// Define object
		var cannedAnalysisData = {'canned_analyses': {}, 'tools': {}}

		// Get Parents
		$parents = Interface.locateParents();

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

	loadStatic: function() {

		// Define variables
		var self = this,
			$elem,
			staticInterfaceHTML;

		// Get parents
		var $parents = self.locateParents();

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
	////// 2.2.4 loadDynamic
	/////////////////////////////////	

	loadDynamic: function(cannedAnalysisData) {

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
			toolIconTabHTML = dynamicInterface.toolIconTab(cannedAnalysisData, datasetAccession);

			// Append
			$datasets2toolsToolbar.find('.datasets2tools-tool-icon-tab').html(toolIconTabHTML);
		});

		// When Clicked Watcher
		whenClicked.main(cannedAnalysisData);
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
		return '<div class="datasets2tools-logo-tab"><img class="datasets2tools-logo-img" src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png"> Datasets2Tools </div>';
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
///// 2.4 dynamicInterface /////////////////////////////////
////////////////////////////////////////////////////////////

var dynamicInterface = {

	/////////////////////////////////
	////// 2.4.1 toolIconTab
	/////////////////////////////////

	toolIconTab: function(cannedAnalysisData, datasetAccession) {

		// Define variables
		var toolIconTabHTML = '';

		// Get Tool IDs
		var toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession]);

		// Loop Through Tools
		for (i = 0; i < toolIds.length; i++) {

			// Get Tool ID
			toolId = toolIds[i];

			// Add Icons
			toolIconTabHTML += '<div class="datasets2tools-tool-icon" id="' + toolId + '"><img class="datasets2tools-tool-icon-img" src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '"></div>'
		}

		// Return Result
		return toolIconTabHTML;
	},
	
	/////////////////////////////////
	////// 2.4.2 browseBar
	/////////////////////////////////

	browseBar: function(cannedAnalysisDataElement, toolIconUrl) {
		return browseTable.prepare(cannedAnalysisDataElement, toolIconUrl);
	},

	/////////////////////////////////
	////// 2.4.3 selectedToolTab
	/////////////////////////////////

	selectedToolTab: function() {
		return '';
	},
	
	/////////////////////////////////
	////// 2.4.4 toolInfoTab
	/////////////////////////////////

	toolInfoTab: function() {
		return '';
	}
};

////////////////////////////////////////////////////////////
///// 2.5 whenClicked //////////////////////////////////////
////////////////////////////////////////////////////////////

var whenClicked = {

	/////////////////////////////////
	////// 2.5.1 compactMode
	/////////////////////////////////

	compactMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').show();
		$datasets2toolsToolbar.find('.datasets2tools-expand').hide();
	},

	/////////////////////////////////
	////// 2.5.2 expandMode
	/////////////////////////////////

	expandMode: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
	},

	/////////////////////////////////
	////// 2.5.3 browseBar
	/////////////////////////////////

	browseBar: function($evtTarget, cannedAnalysisData, searchFilter = false) {

		// Define self
		var self = this;

		// Get Tool ID
		var toolId = $evtTarget.parent().attr('id');

		// Get Tool Icon URL
		var toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'];

		// Get Dataset Accession
		var datasetAccession = $evtTarget.parent().parent().parent().parent().attr('id');

		// Get Canned Analyses
		var cannedAnalysisDataElement = cannedAnalysisData['canned_analyses'][datasetAccession][toolId];

		// Check Filter
		var cannedAnalysisDataElementFiltered = self.filterCannedAnalyses($evtTarget, cannedAnalysisDataElement, searchFilter);

		// Prepare HTML Table
		var browseBarHTML = dynamicInterface.browseBar(cannedAnalysisDataElement, toolIconUrl);

		// Get Datasets2Tools Toolbar
		var $datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent();

		// Toggle Expanded Mode
		self.expandMode($datasets2toolsToolbar);

		// Add To Webpage
		$datasets2toolsToolbar.find('.datasets2tools-browse-bar').html(browseBarHTML);
	},

	/////////////////////////////////
	////// 2.5.4 toolIconTab
	/////////////////////////////////

	toolIconTab: function($evtTarget, cannedAnalysisData) {
		return '';
	},

	/////////////////////////////////
	////// 2.5.5 toolInfoTab
	/////////////////////////////////

	toolInfoTab: function($evtTarget, cannedAnalysisData) {

		// Get Tool ID
		var toolId = $evtTarget.parent().attr('id');

		// Define Result HTML
		var toolInfoTabHTML = cannedAnalysisData['tools'][toolId]['tool_name'] + ' Info';

		// Add To Webpage
		$evtTarget.parent().parent().parent().find('.datasets2tools-tool-info-bar').html(selectedToolTabHTML);
	},

	/////////////////////////////////
	////// 2.5.6 selectedToolTab
	/////////////////////////////////

	selectedToolTab: function($evtTarget, cannedAnalysisData) {

		// Get Tool ID
		var toolId = $evtTarget.parent().attr('id');

		// Define Result HTML
		var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img"> &nbsp' + cannedAnalysisData['tools'][toolId]['tool_name'] + '';

		// Add To Webpage
		$evtTarget.parent().parent().parent().parent().find('.datasets2tools-selected-tool-tab').html(selectedToolTabHTML);
	},

	/////////////////////////////////
	////// 2.5.7 logoTab
	/////////////////////////////////

	logoTab: function($evtTarget) {

		// Get Datasets2Tools Toolbar
		var $datasets2toolsToolbar = $evtTarget.parent().parent().parent(),
			self = this;

		// Add To Webpage
		self.compactMode($datasets2toolsToolbar);
	},

	/////////////////////////////////
	////// 2.5.8 filterCannedAnalyses
	/////////////////////////////////

	filterCannedAnalyses: function($evtTarget, cannedAnalysisDataElement) {

		// Get Search Object

		// Return Filtered Object
		return cannedAnalysisDataElement;
	},

	/////////////////////////////////
	////// 2.5.9 shareCannedAnalysis
	/////////////////////////////////

	shareCannedAnalysis: function($evtTarget) {

		// Get Search Object
		$evtTarget.parent().find('.datasets2tools-share-dropdown').toggle();

		window.alert('hello');

	},

	/////////////////////////////////
	////// 2.5.10 main
	/////////////////////////////////

	main: function(cannedAnalysisData) {

		// Define Self
		var self = this;

		// Tool Icon Watcher
		$('.datasets2tools-tool-icon').click(function(evt) {

			// Toggle Select Tool Tab
			self.selectedToolTab($(evt.target), cannedAnalysisData);

			// Toggle Browse Bar
			self.browseBar($(evt.target), cannedAnalysisData);

		});
		
		// Tool Info Watcher
		$('.datasets2tools-tool-info-icon').click(function(evt) {

			// Toggle Tool Info
			self.toolInfoTab($(evt.target), cannedAnalysisData);

		});

		// Canned Analysis Search Watcher
		$('.datasets2tools-search-text-input').change(function(evt) {//on('change keyup paste', function(evt) {

			// Toggle Browse Bar
			// self.filterCannedAnalyses($(evt.target), cannedAnalysisData, searchFilter);
			window.alert($(evt.target).val());

		});

		// Share Watcher
		$('.datasets2tools-browse-bar').find('img').on('click', function(evt) {

			// Toggle Browse Bar
			// self.shareCannedAnalysis($(evt.target));
			window.alert('hello');

		});

		// Datasets2Tools Logo Watcher
		$('.datasets2tools-logo-tab').click(function(evt) {

			// Toggle Browse Bar
			self.logoTab($(evt.target));

		});
	},


	hello: function() {
		window.alert('hello');
	}


};

////////////////////////////////////////////////////////////
///// 2.6 browseTable //////////////////////////////////////
////////////////////////////////////////////////////////////

var browseTable = {

	/////////////////////////////////
	////// 2.6.1 linkHTML
	/////////////////////////////////

	getLinkHTML: function(cannedAnalysisObj, toolIconUrl) {
		return '<td><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img class="datasets2tools-cannedanalysis-link-img" src="' + toolIconUrl + '"></a></td>';
	},

	/////////////////////////////////
	////// 2.6.2 descriptionHTML
	/////////////////////////////////

	getDescriptionHTML: function(cannedAnalysisObj) {
		return '<td>' + cannedAnalysisObj['description'] + '</td>';
	},

	/////////////////////////////////
	////// 2.6.3 metadataHTML
	/////////////////////////////////

	getMetadataHTML: function(cannedAnalysisObj) {
		return '<td class="asd"><img class="datasets2tools-metadata-buttons-img" src="https://openclipart.org/image/800px/svg_to_png/213219/Information-icon.png">&nbsp&nbsp&nbsp<img class="datasets2tools-metadata-buttons-img" src="http://www.drodd.com/images12/icon-download7.png"></td>';
	},

	/////////////////////////////////
	////// 2.6.4 shareHTML
	/////////////////////////////////

	getShareHTML: function(cannedAnalysisObj) {

		// Define HTML String
		var shareHTML = '<td>';

		shareHTML += '<img class="datasets2tools-share-button-img" src="https://api.icons8.com/download/a5d38503865a8990ff38b46357345debdb740e3d/Android_L/PNG/256/Very_Basic/share-256.png">';

		shareHTML += '<div class="datasets2tools-share-dropdown">' + cannedAnalysisObj['canned_analysis_url'] + '</div>';

		shareHTML += '</td>';

		return shareHTML; 
	},

	/////////////////////////////////
	////// 2.6.5 rowHTML
	/////////////////////////////////

	getRowHTML: function(linkHTML, descriptionHTML, metadataHTML, shareHTML) {
		return '<tr>' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('') + '</tr>';
	},

	/////////////////////////////////
	////// 2.6.6 prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisDataElement, toolIconUrl) {

		// Define variables
		var self = this,
			browseTableHTML = '<table class="datasets2tools-browse-table"><tr><th class="datasets2tools-link-col">Link</th><th class="datasets2tools-description-col">Description</th><th class="datasets2tools-metadata-col">Metadata</th><th class="datasets2tools-share-col">Share</th></tr>',
			cannedAnalysisObj;

		// Get Canned Analysis IDs
		var cannedAnalysisIds = Object.keys(cannedAnalysisDataElement)

		// Loop Through Canned Analyses
		for (i = 0; i < cannedAnalysisIds.length; i++) {

			// Get Canned Analysis Object
			cannedAnalysisObj = cannedAnalysisDataElement[cannedAnalysisIds[i]]

			// Add Row HTML
			browseTableHTML += self.getRowHTML(self.getLinkHTML(cannedAnalysisObj, toolIconUrl), self.getDescriptionHTML(cannedAnalysisObj), self.getMetadataHTML(cannedAnalysisObj), self.getShareHTML(cannedAnalysisObj));
		}

		// Close table
		browseTableHTML += '</table>'

		// Return Table HTML
		return browseTableHTML;
	}
};

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

main();