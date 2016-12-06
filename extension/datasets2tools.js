
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {

	// 1.1 Locate Parents
	var $parents = staticInterface.locateParents();

	// 1.2 Load Static Interface
	staticInterface.load($parents);

	// 1.3 Get Canned Analysis Data
	var cannedAnalysisData = API.main($parents);

	// 1.4 Prepare Dynamic Interface
	var preparedInterface = dynamicInterface.prepare(cannedAnalysisData);

	// 1.5 Watcher
	whenClicked.main(preparedInterface);
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
			datasetAccession = staticInterface.getDatasetAccession($elem);

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
///// 2.2 staticInterface //////////////////////////////////
////////////////////////////////////////////////////////////

var staticInterface = {

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
	////// 2.2.3 prepare
	/////////////////////////////////

	prepare: function($elem) {

		// Define self
		var self = this;

		// Get dataset accession
		var datasetAccession = self.getDatasetAccession($elem);

		// Prepare HTML
		var interfaceHTML, toolbar, searchBar, logoTab, selectedToolTab, toolIconTab, searchTab, browseTable;

		// Datasets2Tools Toolbar
		toolbar = '<div class="datasets2tools-toolbar" id="' + datasetAccession + '"">';

		// Datasets2Tools search bar
		searchBar = '<div class="datasets2tools-search-bar">';

		// Datasets2Tools logo
		logoTab = '<div class="datasets2tools-logo-tab"><img src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png" style="height:20px;width:20px;""> Datasets2Tools </div>';

		// Selected Tool Tab
		selectedToolTab = '<div class="datasets2tools-selected-tool-tab datasets2tools-expand"> Selected Tool Info: </div>';

		// Tool Icon Tab
		toolIconTab = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact"> Tool Icons: </div>';

		// Search Tab
		searchTab = '<div class="datasets2tools-search-tab datasets2tools-expand"> Search: </div>';

		// Browse table
		browseTable = '<div class="datasets2tools-browse-bar datasets2tools-expand"> Browse table: </div>';

		// Prepare Interface HTML
		interfaceHTML = toolbar + searchBar + logoTab + selectedToolTab + toolIconTab + searchTab + '</div>' + browseTable + '</div>';

		return interfaceHTML;
	},

	/////////////////////////////////
	////// 2.2.4 loadStatic
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
			staticInterface = self.prepare($elem);

			// Append
			$elem.append(staticInterface);
		})
	}
};

////////////////////////////////////////////////////////////
///// 2.3 dynamicInterface /////////////////////////////////
////////////////////////////////////////////////////////////

var dynamicInterface = {

	/////////////////////////////////
	////// 2.3.1 prepareCannedAnalysisTables
	/////////////////////////////////

	prepareCannedAnalysisTables: function(cannedAnalysisData) {

		// Define object
		var cannedAnalysisTables = {},
			self = this;

		// Get dataset IDs
		datasetIds = Object.keys(cannedAnalysisData['canned_analyses']);

		// Loop through datasets
		for (i = 0; i < datasetIds.length; i++) {

			// Get dataset ID
			datasetId = datasetIds[i];

			// Add key
			cannedAnalysisTables[datasetId] = {};

			// Get tool IDs
			toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetId]);

			// Loop through tools
			for (j = 0; j < toolIds.length; j++) {

				// Get tool ID
				toolId = toolIds[j];

				// Make HTML table
				cannedAnalysisTables[datasetId][toolId] = self.makeCannedAnalysisTableHTML(cannedAnalysisData['canned_analyses'][datasetId][toolId], cannedAnalysisData['tools'][toolId]['tool_icon_url']);
			}
		}

		// Return object
		return cannedAnalysisTables;
	},

	/////////////////////////////////
	////// 2.3.2 makeCannedAnalysisTableHTML
	/////////////////////////////////

	makeCannedAnalysisTableHTML: function(cannedAnalysesObj, toolIconUrl) {

		// Define table
		var tableHTML = '<table class="datasets2tools-browse-table"><tr><th>Link</th><th>Description</th><th>Metadata</th><th>Share</th></tr>',
			rowHTML,
			linkHTML,
			descriptionHTML,
			metadataHTML,
			shareHTML,
			cannedAnalysisId;

		// Get canned analysis IDs
		cannedAnalysisIds = Object.keys(cannedAnalysesObj);

		// Loop through canned analyses
		for (k = 0; k < cannedAnalysisIds.length; k++) {

			// Get Canned Analysis ID
			cannedAnalysisId = cannedAnalysisIds[k];

			// Prepare link HTML
			linkHTML = '<a href="' + cannedAnalysesObj[cannedAnalysisId]['canned_analysis_url'] + '"><img src="' + toolIconUrl + '" style="height:15px;"></a>';

			// Prepare description HTML
			descriptionHTML = cannedAnalysesObj[cannedAnalysisId]['description'];

			// Prepare metadata HTML
			metadataHTML = 'Analysis Metadata';

			// Prepare share HTML
			shareHTML = 'Share Analysis';

			// Prepare row HTML
			rowHTML = '<tr><td>' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('</td><td>') + '</td></tr>';

			// Add to table
			tableHTML += rowHTML;
		}

		// Finish table
		tableHTML += '</table>'

		// Return table HTML
		return tableHTML;
	},

	/////////////////////////////////
	////// 2.3.3 prepareToolIconTabs
	/////////////////////////////////

	prepareToolIconTabs: function(cannedAnalysisData) {

		// Define object
		var toolIconTabs = {},
			toolIconTabHTML;

		// Get dataset IDs
		datasetIds = Object.keys(cannedAnalysisData['canned_analyses']);

		// Loop through datasets
		for (i = 0; i < datasetIds.length; i++) {

			// Get dataset ID
			datasetId = datasetIds[i];

			// Get tool IDs
			toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetId]);

			// Initialize HTML
			toolIconTabHTML = '';

			// Loop through tools
			for (j = 0; j < toolIds.length; j++) {

				// Get tool ID
				toolId = toolIds[j];

				// Add icons
				toolIconTabHTML += '<div class="datasets2tools-tool-icon" id="' + toolId + '"><img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" style="height:20px; width=20px"></div>'
			}

			// Add to list
			toolIconTabs[datasetId] = toolIconTabHTML;
		}

		// Return object
		return toolIconTabs;
	},

	/////////////////////////////////
	////// 2.3.4 loadToolIcontabs
	/////////////////////////////////

	loadToolIcontabs: function(toolIconTabs) {

		// Identify toolbars
		var $toolIconTabs = $('.datasets2tools-tool-icon-tab');

		// Loop through tool icon tabs
		$($toolIconTabs).each(function(i, elem) {

			// Define element
			var $elem = $(elem);

			// Get dataset ID
			datasetAccession = $elem.parent().parent().attr('id');

			// Append
			$elem.append(toolIconTabs[datasetAccession]);
		})
	},

	/////////////////////////////////
	////// 2.3.5 prepareToolInfoTabs
	/////////////////////////////////

	prepareToolInfoTabs: function(cannedAnalysisData) {

		// Define object
		var toolInfoTabs = {},
			toolInfoTabHTML;

		// Get tool IDs
		toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetId]);

		// Loop through tools
		for (i = 0; i < toolIds.length; i++) {

			// Get tool ID
			toolId = toolIds[i];

			// Add icons
			toolInfoTabHTML = '<h5>Description</h5><p>Tool Description...</p>';

			// Add to object
			toolInfoTabs[toolId] = toolInfoTabHTML;
		}

		// Return object
		return toolInfoTabs;
	},

	/////////////////////////////////
	////// 2.3.6 prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisData) {
		
		// Define object
		var preparedInterface = {'canned_analysis_tables': {}, 'tool_icon_tabs': {}, 'tool_info_tabs': {}},
			self = this;

		// Prepare Canned Analysis tables
		preparedInterface['canned_analysis_tables'] = self.prepareCannedAnalysisTables(cannedAnalysisData);

		// Prepare Tool Icon tabs
		preparedInterface['tool_icon_tabs'] = self.prepareToolIconTabs(cannedAnalysisData);

		// Load Tool Icon tabs
		self.loadToolIcontabs(preparedInterface['tool_icon_tabs']);

		// Prepare Tool Info tabs
		preparedInterface['tool_info_tabs'] = self.prepareToolInfoTabs(cannedAnalysisData);

		// Return result
		return preparedInterface;
	},

	/////////////////////////////////
	////// 2.3.7 watcher
	/////////////////////////////////

	watcher: function(cannedAnalysisData) {
		
		// Define object
		var preparedInterface = {'canned_analysis_tables': {}, 'tool_icon_tabs': {}, 'tool_info_tabs': {}},
			self = this;

		// Prepare Canned Analysis tables
		preparedInterface['canned_analysis_tables'] = self.prepareCannedAnalysisTables(cannedAnalysisData);

		// Prepare Tool Icon tabs
		preparedInterface['tool_icon_tabs'] = self.prepareToolIconTabs(cannedAnalysisData);

		// Prepare Tool Info tabs
		preparedInterface['tool_info_tabs'] = self.prepareToolInfoTabs(cannedAnalysisData);

		// Return result
		return preparedInterface;
	}
};

////////////////////////////////////////////////////////////
///// 2.4 whenClicked //////////////////////////////////////
////////////////////////////////////////////////////////////

var whenClicked = {

	/////////////////////////////////
	////// 2.4.1 main
	/////////////////////////////////

	main: function(preparedInterface) {
		// Click watcher
		$('.datasets2tools-tool-icon').click(function(evt) {

			// Get event target
			var $evtTarget = $(evt.target);

			// Get Dataset Accession
			var $datasetAccession = $evtTarget.parent().parent().parent().parent().attr('id');

			// Get Tool ID
			var $toolId = $evtTarget.parent().attr('id');

			// Find table element
			$evtTarget.parent().parent().parent().parent().find('.datasets2tools-browse-bar').append(preparedInterface['canned_analysis_tables'][$datasetAccession][$toolId]);

			// console.log($tableElement);
			window.alert($datasetAccession);
			window.alert($toolId);
		})
	}
};

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
main();