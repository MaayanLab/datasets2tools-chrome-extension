//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function datasets2toolsLincsMain() {

	// 1.1 Locate Parents
	var $parent = lincsInterface.locateParent();

	// 1.2 Get Canned Analysis Data
	var cannedAnalysisData = {"tools":{"1":{"tool_icon_url":"http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png","tool_homepage_url":"http://amp.pharm.mssm.edu/Enrichr","doi":null,"tool_name":"Enrichr","tool_description":"An intuitive web-based gene list enrichment analysis tool with 90 libraries."},"2":{"tool_icon_url":"http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png","tool_homepage_url":"http://amp.pharm.mssm.edu/L1000CDS2","doi":null,"tool_name":"L1000CDS2","tool_description":"An ultra-fast LINCS L1000 Characteristic Direction signature search engine."},"3":{"tool_icon_url":"http://labs.icahn.mssm.edu/maayanlab/wp-content/uploads/sites/75/2014/10/paea.png","tool_homepage_url":"http://amp.pharm.mssm.edu/PAEA","doi":null,"tool_name":"PAEA","tool_description":"Enrichment analysis tool implementing the principal angle method."},"5":{"tool_icon_url":"http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png","tool_homepage_url":"http://amp.pharm.mssm.edu/clustergrammer/","doi":null,"tool_name":"Clustergrammer","tool_description":"Visualization tool that enables users to easily generate highly interactive and shareable clustergram/heatmap visualizations from a matrix."},"18":{"tool_icon_url":"http://lincsproject.org/LINCS/files/tools_logos/explore2.jpg","tool_homepage_url":"http://lincs.hms.harvard.edu/explore/pathway/","doi":"10.1073/pnas.1018854108","tool_name":"Drug-Pathway Browser","tool_description":"Interactive map of key signal transduction pathways and drug-target data"},"19":{"tool_icon_url":"http://lincsproject.org/LINCS/files/tools_logos/explore4.jpg","tool_homepage_url":"http://lincs.hms.harvard.edu/explore/10.1038-nchembio.1337/fallahi-sichani-2013/","doi":":10.1038/nchembio.1337","tool_name":"Drug Response Browser","tool_description":"Online tool for browsing breast cancer cell line drug dose-response data"}},"canned_analyses":{"LDG-1103":{"1":{"84417":{"smiles":"CC(=O)OC1(CCC2C1(CC(C3=C4CCC(=O)C=C4CCC23)C5=CC=C(C=C5)N(C)C)C)C(=O)COC","direction":"0","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","cutoff":"500","organism":"human","cell_type":"T47D breast cancer cells","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=53lm","pubchem_cid":"9806190","drug_name":"Telapristone Acetate","diff_exp_method":"chdir"},"84418":{"smiles":"CC(=O)OC1(CCC2C1(CC(C3=C4CCC(=O)C=C4CCC23)C5=CC=C(C=C5)N(C)C)C)C(=O)COC","direction":"0","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","cutoff":"500","organism":"human","cell_type":"T47D breast cancer cells","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=53lq","pubchem_cid":"9806190","drug_name":"Telapristone Acetate","diff_exp_method":"chdir"},"84419":{"smiles":"CC(=O)OC1(CCC2C1(CC(C3=C4CCC(=O)C=C4CCC23)C5=CC=C(C=C5)N(C)C)C)C(=O)COC","direction":"0","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","cutoff":"500","organism":"human","cell_type":"T47D breast cancer cells","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=53lr","pubchem_cid":"9806190","drug_name":"Telapristone Acetate","diff_exp_method":"chdir"},"84679":{"cutoff":"500","direction":"0","microbe_id":"Taxonomy ID: 11103","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","organism":"human","cell_type":"CD8+ T-lymphocytes","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=54a1","microbe_name":"Hepatitis C virus","diff_exp_method":"chdir"},"84680":{"cutoff":"500","direction":"0","microbe_id":"Taxonomy ID: 11103","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","organism":"human","cell_type":"CD8+ T-lymphocytes","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=54a3","microbe_name":"Hepatitis C virus","diff_exp_method":"chdir"},"84681":{"cutoff":"500","direction":"0","microbe_id":"Taxonomy ID: 11103","description":"Enrichment analysis of top 500 combined upregulated and downregulated genes, human organism (chdir differential expression method).","organism":"human","cell_type":"CD8+ T-lymphocytes","canned_analysis_url":"http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=54a4","microbe_name":"Hepatitis C virus","diff_exp_method":"chdir"}},"2":{"84420":{"description":"No description available.","canned_analysis_url":"http://amp.pharm.mssm.edu/L1000CDS2/#/result/56f9a0f6520166ee00bcb668"},"84682":{"description":"No description available.","canned_analysis_url":"http://amp.pharm.mssm.edu/L1000CDS2/#/result/56f9b18e520166ee00bcb75a"}},"3":{"84421":{"cutoff":"500","direction":"1","description":"PAEA analysis of top 500 overexpressed genes, Humans organism (chdir differential expression method).","user_key":"0e36854102c7fecf186b4a6d9ecf590a","cell_type":"Whole blood (Peripheral)","canned_analysis_url":"http://amp.pharm.mssm.edu/PAEA?id=1092890","disease_id":"DOID:2326","disease_name":"Rotavirus Gastroenteritis (acute)","organism":"Humans","diff_exp_method":"chdir"},"84683":{"cutoff":"500","direction":"1","microbe_id":"Taxonomy ID: 114727","description":"PAEA analysis of top 500 overexpressed genes, human organism (chdir differential expression method).","organism":"human","cell_type":"primary lung bronchial epithelial cells","canned_analysis_url":"http://amp.pharm.mssm.edu/PAEA?id=1093765","microbe_name":"H1N1 influenza virus (seasonal strain, BN/59)","diff_exp_method":"chdir"}},"5":{"84684":{"cutoff":"500","direction":"-1","microbe_id":"Taxonomy ID: 114727","description":"Heatmap visualization of top 500 underexpressed genes, human organism (chdir differential expression method).","organism":"human","cell_type":"primary lung bronchial epithelial cells","canned_analysis_url":"http://amp.pharm.mssm.edu/clustergrammer/viz/5767c22fb9123d39be9dcff3/vector_post?preview=true","microbe_name":"H1N1 influenza virus (seasonal strain, BN/59)","diff_exp_method":"chdir"}},"18":{"90273":{"description":"No description available.","canned_analysis_url":"http://lincs.hms.harvard.edu/explore/pathway/"},"90274":{"description":"No description available.","canned_analysis_url":"http://lincs.hms.harvard.edu/explore/pathway/"}},"19":{"90275":{"description":"No description available.","canned_analysis_url":"http://lincs.hms.harvard.edu/explore/10.1038-nchembio.1337/fallahi-sichani-2013/"},"90276":{"description":"No description available.","canned_analysis_url":"http://lincs.hms.harvard.edu/explore/10.1038-nchembio.1337/fallahi-sichani-2013/"}}}}};//JSON.stringify(API.main($parent));

	// 1.3 Load Interface
	lincsInterface.load($parent, cannedAnalysisData);

	// 1.4 Event Listener
	lincsEventListener.main(cannedAnalysisData);
};

//////////////////////////////////////////////////////////////////////
///////// 2. Define Main Variables ///////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var lincsInterface = {

	/////////////////////////////////
	////// 2.1.1 locateParents
	/////////////////////////////////

	locateParent: function() {

		// Define variable
		var $parent;

		$parent = $("a:contains('Analysis Tools')").parent();

		// Return result
		return $parent;
	},

	/////////////////////////////////
	////// 2.1.2 getDatasetAccession
	/////////////////////////////////

	getDatasetAccession: function($parent) {

		// Define variable
		var datasetAccession;

		// Get accession
		datasetAccession = $parent.parents('.ng-scope').find(".col-sm-2:contains('LINCS ID')").next().text().replace(/\s+/g, '');

		// Return Result
		return datasetAccession;
	},

	/////////////////////////////////
	////// 2.1.3 prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisData) {

		// Define Variables
		var toolTableHTML = toolTable.prepare(cannedAnalysisData),
			interfaceHTML;

		// Add text
		interfaceHTML = '<div ng-include="template" class="ng-scope"><div class="col-md-offset-1 ng-scope"><h2 class="datasets2tools-cannedanalyses-label">Canned Analyses</h2><p>The table below displays the canned analyses associates to the selected dataset, grouped by tool.</p><p>To browse the canned analyses, select a tool from the menu below.  The search bar can be used to restrict the menu to desired tools.  Mouse over the info icon to receive additional information regarding computational tools.</p>' + toolTableHTML + '</div></div>';

		// Return HTML String
		return interfaceHTML;
	},

	/////////////////////////////////
	////// 2.1.4 load
	/////////////////////////////////

	load: function($parent, cannedAnalysisData) {

		// Set HTML
		$parent.html('<a data-toggle="tab" class="tab-link datasets2tools-tab-link" aria-expanded="false"> Canned Analyses </a>');
	}
};

////////////////////////////////////////////////////////////
///// 2.2  //////////////////////////////////////////////
////////////////////////////////////////////////////////////

var lincsEventListener = {

	/////////////////////////////////
	////// 2.2. toggleTab
	/////////////////////////////////

	toggleTab: function(cannedAnalysisData) {

		// $('.datasets2tools-tab-link').click(function(evt) {
			
			// Define Variables
			// var $displayTab = $(evt.target).parents('.ng-scope').children('.ng-scope').eq(0);
			var $displayTab = $('.datasets2tools-tab-link').parents('.ng-scope').children('.ng-scope').eq(0);

			// Get Interface
			var interfaceHTML = lincsInterface.prepare(cannedAnalysisData);

			// Add HTML
			$displayTab.html(interfaceHTML);

		// });
	},
	
	/////////////////////////////////
	////// 2.2. clickPlusButton
	/////////////////////////////////

	clickPlusButton: function(cannedAnalysisData) {

		$('.datasets2tools-tooltable-plus-button').click(function(evt) {
			
			// Define Variables
			var $evtTarget = $(evt.target),
				toolId = $evtTarget.attr('id');

			alert(toolId);

		});
	},
	
	/////////////////////////////////
	////// 2.2. 
	/////////////////////////////////

	main: function(cannedAnalysisData) {

		// Define self
		var self = this;

		// Toggle Tab Listener
		self.toggleTab(cannedAnalysisData);

		// Toggle Plus Button Listener
		self.clickPlusButton(cannedAnalysisData);
	}
};

//////////////////////////////////////////////////////////////////////
///////// 3. Define Additional Variables /////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 3.1 toolTable ////////////////////////////////////////
////////////////////////////////////////////////////////////

var toolTable = {

	/////////////////////////////////
	////// 2.2. prepare
	/////////////////////////////////

	prepare: function(cannedAnalysisData) {

		// Define Variables
		var toolTableHTML = '<table class="datasets2tools-tool-table"><tr><th>Tool</th><th>Description</th><th>Canned Analyses</th><tr>',
			toolIds = Object.keys(cannedAnalysisData['tools']),
			cannedAnalyses = cannedAnalysisData['canned_analyses'][Object.keys(cannedAnalysisData['canned_analyses'])[0]],
			toolData = cannedAnalysisData['tools'],
			nrOfCannedAnalyses = {},
			toolId;

		// Get number of Canned Analyses
		for (i = 0; i < toolIds.length; i++) {

			// Get tool ID
			toolId = toolIds[i];

			// Get stuff
			nrOfCannedAnalyses[toolId] = Object.keys(cannedAnalyses[toolId]).length;
		}

		// Sort
		toolsSorted = Object.keys(nrOfCannedAnalyses).sort(function(a,b){return nrOfCannedAnalyses[b]-nrOfCannedAnalyses[a]});

		// Loop through tools
		for (i = 0; i < toolsSorted.length; i++) {

			// Get tool ID
			toolId = toolsSorted[i];

			// Add HTML
			// Tool Column
			toolTableHTML += '<tr class="datasets2tools-tooltable-row"><td class="datasets2tools-tooltable-tool-col"><img class="datasets2tools-tooltable-tool-img" src="' + toolData[toolId]['tool_icon_url'] + '" id="' + toolId + '"><div class="datasets2tools-tooltable-tool-label">' + toolData[toolId]['tool_name'] + '</div></td>';

			// Tool Description Column
			toolTableHTML += '<td class="datasets2tools-tooltable-description-col">' + toolData[toolId]['tool_description'] + '</td>';

			// Canned Analyses Column
			toolTableHTML += '<td class="datasets2tools-tooltable-cannedanalyses-col">' + Object.keys(cannedAnalyses[toolId]).length + '<button class="datasets2tools-tooltable-plus-button datasets2tools-button" type="button" id="' + toolId + '"></button></td></tr>';
		}

		// Close Table
		toolTableHTML += '</table>';

		// Return HTML string
		return toolTableHTML;
	}
};

// main();