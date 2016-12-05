
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {
	// 1.1 Locate Parents
	var $parents = Interface.locateParents();

	// 1.2 Prepare Dynamic Interface
	var preparedInterface = Interface.prepareInteractive($parents);

	// 1.3 Load Static Interface
	Interface.load($parents);

	console.log(preparedInterface);
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
		var obj = {"1":{"10":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"},"11":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"}},"2":{"12":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"},"13":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"}},"3":{"14":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"},"15":{"canned_analysis_url":"www.google.com","description":"analysisdescription","tag1":"value1","tag2":"value2"}}};
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
		var obj = {"1":{"tool_name":"Enrichr","tool_icon_url":"http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png"},"2":{"tool_name":"Clustergrammer","tool_icon_url":"http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png"},"3":{"tool_name":"L1000CDS2","tool_icon_url":"http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png"}};
		return obj;
	}
};

////////////////////////////////////////////////////////////
///// 2.2 Interface ////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.2.1 locateParents OK
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
	////// 2.2.3 prepareInteractive
	/////////////////////////////////

	prepareInteractive: function($parents) {

		// Define object
		var preparedInterface = {'canned_analyses': {}, 'tools': {}},
			datasetAccession;

		// Get Canned Analyses
		var cannedAnalysisData = API.getCannedAnalyses($parents);

		// Get Tool Metadata
		var toolMetadata = API.getToolMetadata(cannedAnalysisData);

		// Get Canned Analysis Interface
		preparedInterface['canned_analyses'] = prepareInterface.cannedAnalyses(cannedAnalysisData, toolMetadata);

		// Get Tool metadata Interface
		preparedInterface['tools'] = prepareInterface.tools(toolMetadata);

		// Return prepared interface
		return preparedInterface;
	},

	/////////////////////////////////
	////// 2.2.4 prepareStatic
	/////////////////////////////////

	prepareStatic: function($elem) {

		// Define self
		var self = this;

		// Get dataset accession
		var datasetAccession = self.getDatasetAccession($elem);

		// Prepare HTML
		var interfaceHTML, toolbar, searchBar, logoTab, selectedToolTab, toolIconTab, searchTab, browseTable;

		// Datasets2Tools Toolbar
		toolbar = '<div class="datasets2tools-toolbar" id="' + datasetAccession + '"">';

		// Datasets2Tools search bar
		searchBar = '<div class="datasets2tools-search-bar datasets2tools-compact">';

		// Datasets2Tools logo
		logoTab = '<div class="datasets2tools-logo-tab"><img src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png" style="height:20px;width:20px;""> Datasets2Tools </div>';

		// Selected Tool Tab
		selectedToolTab = '<div class="datasets2tools-selected-tool-tab datasets2tools-expand"> Selected Tool Info: </div>';

		// Tool Icon Tab
		toolIconTab = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact"> Tool Icons: </div>';

		// Search Tab
		searchTab = '<div class="datasets2tools-search-tab datasets2tools-expand"> Search: </div>';

		// Browse table
		browseTable = '<div class="datasets2tools-browse-table datasets2tools-expand"> Browse table: </div>';

		// Prepare Interface HTML
		interfaceHTML = toolbar + searchBar + logoTab + selectedToolTab + toolIconTab + searchTab + '</div>' + browseTable + '</div>';

		return interfaceHTML;
	},

	/////////////////////////////////
	////// 2.2.5 load
	/////////////////////////////////

	load: function($parents) {

		// Define variables
		var self = this,
			staticInterface;

		// Loop through parents
		$($parents).each(function(i, elem) {

			// Define element
			var $elem = $(elem);

			// Prepare static interface
			staticInterface = self.prepareStatic($elem);

			// Append
			$elem.append(staticInterface);
		})
	}
};

////////////////////////////////////////////////////////////
///// 2.3 prepareInterface /////////////////////////////////
////////////////////////////////////////////////////////////

var prepareInterface = {

	/////////////////////////////////
	////// 2.3.1 cannedAnalyses
	/////////////////////////////////

	cannedAnalyses: function(cannedAnalysisData, toolMetadata) {

		// Define interfact object
		var cannedAnalysisInterface = {},
			self = this,
			datasetAccession,
			cannedAnalysisDataElement;

		// Get dataset number
		var numberOfDatasets = Object.keys(cannedAnalysisData).length;

		// Loop through datasets in canned analysis object
		for (i = 0; i < numberOfDatasets; i++) {

			// Get dataset accession
			datasetAccession = Object.keys(cannedAnalysisData)[i];

			// Get canned analysis object
			cannedAnalysisDataElement = cannedAnalysisData[datasetAccession];

			// Initialize object
			cannedAnalysisInterface[datasetAccession] = {};
			
			// Add tool-icon-tab interface
			cannedAnalysisInterface[datasetAccession]['tool_icon_tab'] = self.toolIconTab(cannedAnalysisDataElement, toolMetadata);

			// Add browse-table interface
			cannedAnalysisInterface[datasetAccession]['browse_table'] = self.browseTable(cannedAnalysisDataElement);
		}

		// Return prepared interface
		return cannedAnalysisInterface;
	},

	/////////////////////////////////
	////// 2.2.2 toolIconTab
	/////////////////////////////////

	toolIconTab: function(cannedAnalysisDataElement, toolMetadata) {

		// Define string
		var toolIconTab = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact">',
			toolId;

		// Get tool IDs
		var toolIds = Object.keys(cannedAnalysisDataElement);

		// Add to it
		for (i = 0; i < toolIds.length; i++) {

			// Get tool icon URL
			// toolIconURL = toolMetadata[toolIds[i]]['tool_icon_url'];

			// Prepare icon string
			toolIconTab += 'asd'//'<img src="' + 'asd' + '">';
		}

		// Close DIV
		toolIconTab += 'asd' + cannedAnalysisDataElement + '</div>' ;

		// Return HTML string
		return toolIconTab;
	},

	/////////////////////////////////
	////// 2.3.3 browseTable
	/////////////////////////////////

	browseTable: function(cannedAnalysisDataElement) {
		return '';
	},

	/////////////////////////////////
	////// 2.3.3 selectedToolTab
	/////////////////////////////////

	selectedToolTab: function(toolMetadataElement) {
		return '';
	},

	/////////////////////////////////
	////// 2.3.4 tools
	/////////////////////////////////

	tools: function(toolMetadata) {

		// Define interface object
		var toolInterface = {},
			self = this;

		// Get tool number
		var numberOfTools = Object.keys(toolMetadata);

		// Loop through tools in tool metadata object
		for (i = 0; i < numberOfTools; i++) {

			// Get tool ID
			toolId = Object.keys(numberOfTools)[i];

			// Add interface
			toolInterface[toolId] = self.toolIconTab(toolMetadata[toolId]);
		}

		// Return object
		return toolInterface;
	},

};

////////////////////////////////////////////////////////////
///// 2.4 whenClicked //////////////////////////////////////
////////////////////////////////////////////////////////////

// var whenClicked = {

// 	/////////////////////////////////
// 	////// 2.3.1 
// 	/////////////////////////////////

// 	locateParents: function() {
// 		window.alert('hello');
// 	}



// 	// }
// };

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
main();