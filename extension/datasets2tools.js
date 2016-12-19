
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

	console.log(cannedAnalysisData);

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

		// Get data
		cannedAnalysisData = {'tools': {'1': {'tool_icon_url': 'http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png', 'tool_name': 'enrichr'}, '2': {'tool_icon_url': 'http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png', 'tool_name': 'l1000cds2'}, '3': {'tool_icon_url': 'http://lincsproject.org/LINCS/files/tools_logos/paea.png', 'tool_name': 'paea'}, '5': {'tool_icon_url': 'http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png', 'tool_name': 'clustergrammer'}}, 'canned_analyses': {'GDS4061': {'1': {'16905': {'cutoff': '1000', 'direction': '1', 'description': 'Enrichment analysis of top 1000 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iu', 'diff_exp_method': 'chdir'}, '16906': {'cutoff': '1000', 'direction': '-1', 'description': 'Enrichment analysis of top 1000 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iv', 'diff_exp_method': 'chdir'}, '16907': {'cutoff': '1000', 'direction': '0', 'description': 'Enrichment analysis of top 1000 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iw', 'diff_exp_method': 'chdir'}, '32911': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioi', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32912': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioj', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32913': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iok', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15381': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134f', 'diff_exp_method': 'chdir'}, '15382': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134g', 'diff_exp_method': 'chdir'}, '15383': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134h', 'diff_exp_method': 'chdir'}, '15412': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135f', 'diff_exp_method': 'chdir'}, '15413': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135g', 'diff_exp_method': 'chdir'}, '15414': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135h', 'diff_exp_method': 'chdir'}, '15416': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135i', 'diff_exp_method': 'chdir'}, '15417': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135j', 'diff_exp_method': 'chdir'}, '15418': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135k', 'diff_exp_method': 'chdir'}, '13125': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m5', 'diff_exp_method': 'chdir'}, '13126': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m6', 'diff_exp_method': 'chdir'}, '13127': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m7', 'diff_exp_method': 'chdir'}, '27234': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6v', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '27235': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6w', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '27233': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6u', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '21602': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sq', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '21603': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sr', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '21604': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19ss', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}}, '2': {'27236': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e9668f12bbe2f800c6045e', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '21605': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e22375f5e6ecf600652c24', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '13128': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581dab769066bf90015869a', 'diff_exp_method': 'chdir'}, '16908': {'cutoff': '1000', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 1000 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559ff74f580a92f300b6c8de', 'diff_exp_method': 'chdir'}, '32914': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdcc4fe3c758f60067a8fe', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15415': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5594163779a213f20072deab', 'diff_exp_method': 'chdir'}, '15384': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559402c979a213f20072de93', 'diff_exp_method': 'chdir'}, '15419': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559416bf79a213f20072dead', 'diff_exp_method': 'chdir'}}, '3': {'32915': {'cutoff': '500', 'direction': '0', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481501', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}}}, 'GDS4054': {'1': {'21606': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19st', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '21607': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19su', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '21608': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sv', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '21610': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sw', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '21611': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sx', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '21612': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sy', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '13133': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA221 knockdown', 'description': 'Enrichment analysis of top 500 overexpressed genes, miRNA221 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mb', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13134': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA221 knockdown', 'description': 'Enrichment analysis of top 500 underexpressed genes, miRNA221 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mc', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13135': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA221 knockdown', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, miRNA221 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11md', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13145': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 overexpressed genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mk', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13146': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 underexpressed genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11ml', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13147': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mm', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13149': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 overexpressed genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mn', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13150': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 underexpressed genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mo', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13151': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mp', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}}, '2': {'13136': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA221 knockdown', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, miRNA221 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581dbe769066bf90015869e', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13152': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581ddfe69066bf9001586a6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13148': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, miRNA222 knockdown perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581ddbe69066bf9001586a4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '21613': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e228acf5e6ecf600652c28', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '21609': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e227a9f5e6ecf600652c26', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}}}, 'GDS4065': {'1': {'45568': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q54', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '3755': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtc', 'diff_exp_method': 'chdir'}, '45572': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Retinoic acid receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q56', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19077': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15wy', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19078': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15wz', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19079': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x0', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20232': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yj', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '15788': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mu', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '19082': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x2', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19083': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x3', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20233': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yk', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '19085': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19086': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x5', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19087': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19089': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x7', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19090': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x8', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19091': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x9', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '32916': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iol', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32917': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iom', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32918': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ion', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32921': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioo', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32922': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iop', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15771': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 100 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mf', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15772': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 100 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mg', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15773': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 100 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mh', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15775': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 500 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mi', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15776': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 500 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mj', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15777': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 500 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mk', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15779': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13ml', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15780': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mm', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15781': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mn', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15783': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mq', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15784': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mr', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15785': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13ms', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '3754': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtb', 'diff_exp_method': 'chdir'}, '15787': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mt', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '3756': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtd', 'diff_exp_method': 'chdir'}, '15789': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mv', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15791': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mw', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15792': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mx', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15793': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13my', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15795': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mz', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15796': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n0', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15797': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n1', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15799': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n2', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15800': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 underexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n3', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15801': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n4', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '32923': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioq', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '20234': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yl', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '87539': {'cutoff': '500', 'direction': '-1', 'description': 'Enrichment analysis of top 500 underexpressed genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbt', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45574': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q58', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '27341': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f93', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '27342': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f94', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '27343': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f95', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '87540': {'cutoff': '500', 'direction': '0', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbu', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '87538': {'cutoff': '500', 'direction': '1', 'description': 'Enrichment analysis of top 500 overexpressed genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbs', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45573': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Retinoic acid receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q57', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '21598': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sn', 'description': 'Enrichment analysis of top 500 overexpressed genes, (chdir differential expression method).'}, '21599': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19so', 'description': 'Enrichment analysis of top 500 underexpressed genes, (chdir differential expression method).'}, '21600': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sp', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '45542': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen depletion (knockdown)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Estrogen depletion (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4l', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45543': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen depletion (knockdown)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Estrogen depletion (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4m', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19081': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Enrichment analysis of top 500 overexpressed genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x1', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '45548': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Retinoic acid receptor (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4o', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45549': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Retinoic acid receptor (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4p', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45550': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4q', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45544': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Estrogen depletion (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4n', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45554': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Estrogen receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4r', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45555': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Estrogen receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4s', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45556': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4t', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45560': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Estrogen receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4u', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45561': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Estrogen receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4v', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45562': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4w', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45566': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 overexpressed genes, Retinoic acid receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q51', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45567': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Enrichment analysis of top 500 underexpressed genes, Retinoic acid receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q53', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}}, '2': {'45569': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f58c13052aa0401ce4529', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45575': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f592d3052aa0401ce4561', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19080': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68a6e580a92f300b6cdb2', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20235': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e02a465dfa695500cb0534', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '19084': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68b17580a92f300b6cdb4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19088': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68c01580a92f300b6cdb6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19092': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68c9d580a92f300b6cdb8', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '32919': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdcd83e3c758f60067a900', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32924': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdce94e3c758f60067a902', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15774': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 100 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c23da79a213f20072e039', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15778': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism, Breast Cancer disease, MCF7 cell, 4-hydroxytamoxifen 500 nM gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c249f79a213f20072e03b', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15782': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c250879a213f20072e03d', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15786': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c25b279a213f20072e03f', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '3757': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5567112eab8740e37275c84a', 'diff_exp_method': 'chdir'}, '15790': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c26d679a213f20072e041', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15794': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, estrogen receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c27d579a213f20072e043', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15798': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 100 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c298879a213f20072e045', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15802': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, 4hydroxytamoxifen 500 nM perturbation, Homo sapiens organism, Breast Cancer disease, MCF7 cell, retinoic acid receptor alpha knockdown gene (chdir differential expression method).', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c2a1479a213f20072e047', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '87541': {'cutoff': '500', 'direction': '0', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/57041afa520166ee00bcbdda', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '27344': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e9864112bbe2f800c60496', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '21601': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e22272f5e6ecf600652c22', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, (chdir differential expression method).'}, '45545': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Estrogen depletion (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f55b73052aa0401ce43b5', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45551': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f563a3052aa0401ce43eb', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45557': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f57773052aa0401ce4479', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45563': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'description': 'Signature mimic and reversal analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f58213052aa0401ce44d5', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}}, '3': {'45570': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632847', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '87542': {'cutoff': '500', 'direction': '0', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=1104195', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45576': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632854', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45546': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Estrogen depletion (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632826', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45552': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Retinoic acid receptor (knockdown) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632830', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45558': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (100nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632834', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '32920': {'cutoff': '500', 'direction': '0', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481520', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '45564': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Estrogen receptor (knockdown) with Tamoxifen (500nM) perturbation, Breast Cancer disease, MCF7 Breast Cancer Cell cell (chdir differential expression method).', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632838', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '32925': {'cutoff': '500', 'direction': '0', 'description': 'PAEA analysis of top 500 combined upregulated and downregulated genes, Homo sapiens organism (chdir differential expression method).', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481530', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}}, '5': {'94703': {'cutoff': '500', 'direction': '0', 'description': 'Heatmap visualization of top 500 combined upregulated and downregulated genes, Human organism (chdir differential expression method).', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/clustergrammer/viz/577497fab5d36956a027875c/vector_post?preview=true', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}}}}};
		// cannedAnalysisData = {'tools': {'1': {'tool_icon_url': 'http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png', 'tool_name': 'enrichr'}, '2': {'tool_icon_url': 'http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png', 'tool_name': 'l1000cds2'}, '3': {'tool_icon_url': 'http://lincsproject.org/LINCS/files/tools_logos/paea.png', 'tool_name': 'paea'}, '5': {'tool_icon_url': 'http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png', 'tool_name': 'clustergrammer'}}, 'canned_analyses': {'GDS4061': {'1': {'16905': {'cutoff': '1000', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iu'}, '16906': {'cutoff': '1000', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iv'}, '16907': {'cutoff': '1000', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=14iw'}, '32911': {'cutoff': '500', 'direction': '1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioi', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32912': {'cutoff': '500', 'direction': '-1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioj', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32913': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iok', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15381': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134f'}, '15382': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134g'}, '15383': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=134h'}, '15412': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135f'}, '15413': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135g'}, '15414': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135h'}, '15416': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135i'}, '15417': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135j'}, '15418': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=135k'}, '13125': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m5'}, '13126': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m6'}, '13127': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11m7'}, '27234': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6v'}, '27235': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6w'}, '27233': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f6u'}, '21602': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sq'}, '21603': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sr'}, '21604': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19ss'}}, '2': {'27236': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e9668f12bbe2f800c6045e'}, '21605': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e22375f5e6ecf600652c24'}, '13128': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581dab769066bf90015869a'}, '16908': {'cutoff': '1000', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559ff74f580a92f300b6c8de'}, '32914': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdcc4fe3c758f60067a8fe', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15415': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5594163779a213f20072deab'}, '15384': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559402c979a213f20072de93'}, '15419': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559416bf79a213f20072dead'}}, '3': {'32915': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481501', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}}}, 'GDS4054': {'1': {'21606': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19st'}, '21607': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19su'}, '21608': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sv'}, '21610': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sw'}, '21611': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sx'}, '21612': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sy'}, '13133': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA221 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mb', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13134': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA221 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mc', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13135': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA221 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11md', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13145': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mk', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13146': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11ml', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13147': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mm', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13149': {'cutoff': '500', 'direction': '1', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mn', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13150': {'cutoff': '500', 'direction': '-1', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mo', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13151': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=11mp', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}}, '2': {'13136': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA221 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581dbe769066bf90015869e', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13152': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581ddfe69066bf9001586a6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '13148': {'cutoff': '500', 'direction': '0', 'perturbation': 'miRNA222 knockdown', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5581ddbe69066bf9001586a4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '21613': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e228acf5e6ecf600652c28'}, '21609': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e227a9f5e6ecf600652c26'}}}, 'GDS4065': {'1': {'45568': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q54', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '3755': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtc'}, '45572': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q56', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19077': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15wy', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19078': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15wz', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19079': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x0', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20232': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yj'}, '15788': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mu', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '19082': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x2', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19083': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x3', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20233': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yk'}, '19085': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19086': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x5', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19087': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19089': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x7', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19090': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x8', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19091': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x9', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '32916': {'cutoff': '500', 'direction': '1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iol', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32917': {'cutoff': '500', 'direction': '-1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iom', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32918': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ion', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32921': {'cutoff': '500', 'direction': '1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioo', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32922': {'cutoff': '500', 'direction': '-1', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1iop', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15771': {'cutoff': '500', 'direction': '1', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mf', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15772': {'cutoff': '500', 'direction': '-1', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mg', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15773': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mh', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15775': {'cutoff': '500', 'direction': '1', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mi', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15776': {'cutoff': '500', 'direction': '-1', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mj', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15777': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mk', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15779': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13ml', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15780': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mm', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15781': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mn', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15783': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mq', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15784': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mr', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15785': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13ms', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '3754': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtb'}, '15787': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mt', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '3756': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=vtd'}, '15789': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mv', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15791': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mw', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15792': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mx', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15793': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13my', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15795': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13mz', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15796': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n0', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15797': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n1', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15799': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n2', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15800': {'cutoff': '500', 'direction': '-1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n3', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15801': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=13n4', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '32923': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1ioq', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '20234': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=18yl'}, '87539': {'cutoff': '500', 'direction': '-1', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbt', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45574': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q58', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '27341': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f93'}, '27342': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f94'}, '27343': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1f95'}, '87540': {'cutoff': '500', 'direction': '0', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbu', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '87538': {'cutoff': '500', 'direction': '1', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=5cbs', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45573': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q57', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '21598': {'cutoff': '500', 'direction': '1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sn'}, '21599': {'cutoff': '500', 'direction': '-1', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19so'}, '21600': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=19sp'}, '45542': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen depletion (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4l', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45543': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen depletion (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4m', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19081': {'cutoff': '500', 'direction': '1', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=15x1', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '45548': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4o', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45549': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4p', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45550': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4q', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45544': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4n', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45554': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4r', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45555': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4s', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45556': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4t', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45560': {'cutoff': '500', 'direction': '1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4u', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45561': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4v', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45562': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q4w', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45566': {'cutoff': '500', 'direction': '1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q51', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45567': {'cutoff': '500', 'direction': '-1', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/Enrichr/enrich?dataset=1q53', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}}, '2': {'45569': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f58c13052aa0401ce4529', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45575': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f592d3052aa0401ce4561', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '19080': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68a6e580a92f300b6cdb2', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '20235': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e02a465dfa695500cb0534'}, '19084': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68b17580a92f300b6cdb4', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19088': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68c01580a92f300b6cdb6', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '19092': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55a68c9d580a92f300b6cdb8', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '32919': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdcd83e3c758f60067a900', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '32924': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55fdce94e3c758f60067a902', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '15774': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c23da79a213f20072e039', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 100 nM', 'diff_exp_method': 'chdir'}, '15778': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c249f79a213f20072e03b', 'cell': 'MCF7', 'gene': '4-hydroxytamoxifen 500 nM', 'diff_exp_method': 'chdir'}, '15782': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c250879a213f20072e03d', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '15786': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c25b279a213f20072e03f', 'cell': 'MCF7', 'diff_exp_method': 'chdir'}, '3757': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/5567112eab8740e37275c84a'}, '15790': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c26d679a213f20072e041', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15794': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c27d579a213f20072e043', 'cell': 'MCF7', 'gene': 'estrogen receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15798': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 100 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c298879a213f20072e045', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '15802': {'cutoff': '500', 'direction': '0', 'perturbation': '4hydroxytamoxifen 500 nM', 'organism': 'Homo sapiens', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/559c2a1479a213f20072e047', 'cell': 'MCF7', 'gene': 'retinoic acid receptor alpha knockdown', 'diff_exp_method': 'chdir'}, '87541': {'cutoff': '500', 'direction': '0', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/57041afa520166ee00bcbdda', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '27344': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e9864112bbe2f800c60496'}, '21601': {'cutoff': '500', 'direction': '0', 'diff_exp_method': 'chdir', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/55e22272f5e6ecf600652c22'}, '45545': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f55b73052aa0401ce43b5', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45551': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f563a3052aa0401ce43eb', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45557': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f57773052aa0401ce4479', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45563': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/L1000CDS2/#/result/564f58213052aa0401ce44d5', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}}, '3': {'45570': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632847', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '87542': {'cutoff': '500', 'direction': '0', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=1104195', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}, '45576': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632854', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45546': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen depletion (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632826', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45552': {'cutoff': '500', 'direction': '0', 'perturbation': 'Retinoic acid receptor (knockdown)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632830', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '45558': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (100nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632834', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '32920': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481520', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}, '45564': {'cutoff': '500', 'direction': '0', 'perturbation': 'Estrogen receptor (knockdown) with Tamoxifen (500nM)', 'user_key': 'null', 'disease': 'Breast Cancer', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=632838', 'cell': 'MCF7 Breast Cancer Cell', 'diff_exp_method': 'chdir'}, '32925': {'cutoff': '500', 'direction': '0', 'organism': 'Homo sapiens', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/PAEA?id=481530', 'user_key': '92ff1e7931d19595b4d9821d5da468b4', 'diff_exp_method': 'chdir'}}, '5': {'94703': {'cutoff': '500', 'direction': '0', 'user_key': 'efb16f202290e941ec34786d410bb3b2', 'cell_type': 'MCF7', 'canned_analysis_url': 'http://amp.pharm.mssm.edu/clustergrammer/viz/577497fab5d36956a027875c/vector_post?preview=true', 'drug_name': '4-Hydroxytamoxifen - 500nM', 'organism': 'Human', 'diff_exp_method': 'chdir', 'drug_id': 'CID 449459'}}}}};

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

		// Try
		try {

			// Get Tool IDs
			var toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession]);

			// Loop Through Tools
			for (var i = 0; i < toolIds.length; i++) {

				// Get Tool ID
				toolId = toolIds[i];

				// Add Icons
				toolIconTabHTML += '<div class="datasets2tools-tool-icon datasets2tools-tooltip-hover datasets2tools-toolicon-tooltip-hover" id="' + toolId + '"><img class="datasets2tools-tool-icon-img" src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '"><div class="datasets2tools-tooltip-text datasets2tools-toolicon-tooltip-text"><b>' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</b><p><i>' + Object.keys(cannedAnalysisData['canned_analyses'][datasetAccession][toolId]).length + ' canned analyses</i></p><p>' + "cannedAnalysisData['tools'][toolId]['tool_description']" + '</p></div></div>'
			}
		}
		catch (err) {
			// No Canned Analyses
			toolIconTabHTML += '<div id="datasets2tools-no-cannedanalyses-tab">No Canned Analyses.</div>'
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
	////// 2.5.0 firstN
	/////////////////////////////////

	firstN: function (obj, pageNr, pageSize) {
		if (Object.keys(obj).length > pageSize) {
		  return Object.keys(obj) //get the keys out
			    .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
			    // .slice(0, 4) //get the first N
			    .slice((pageNr-1)*pageSize+1, pageNr*pageSize+1) //get the first N
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
		viewMetadataHTML = '<div class="datasets2tools-tooltip-hover datasets2tools-metadata-tooltip-hover"><img class="datasets2tools-view-metadata-img datasets2tools-metadata-img" src="https://openclipart.org/image/800px/svg_to_png/213219/Information-icon.png"><div class="datasets2tools-tooltip-text datasets2tools-metadata-tooltip-text">'+metadataTooltipString+'</div></div>';

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
		downloadMetadataHTML += '<img class="datasets2tools-download-metadata-img datasets2tools-metadata-img" src="http://www.drodd.com/images12/icon-download7.png">';
		
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
		var shareImageHTML = '<img class="datasets2tools-share-button-img" src="https://api.icons8.com/download/a5d38503865a8990ff38b46357345debdb740e3d/Android_L/PNG/256/Very_Basic/share-256.png">';

		// Link Image
		var linkImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="http://simpleicon.com/wp-content/uploads/link-2.png"><b>Canned Analysis URL:</b>';

		// Embed Image
		var embedImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="https://cdn1.iconfinder.com/data/icons/free-98-icons/32/code-128.png"><b>Embed Icon:</b>';

		// Copy Image
		var copyImageHTML = '<img class="datasets2tools-dropdown-button-img" src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/editor_copy_duplicate_files-512.png">';

		// Get Copy Button HTML
		var buttonHTML = '<button class="datasets2tools-share-button"><img class="datasets2tools-dropdown-button-img" src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/editor_copy_duplicate_files-512.png">Copy</button>';

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
				return 'datasets2tools-arrow-active" id="' + (pageNr-1) + '"';
			} else {
				return 'datasets2tools-arrow-inactive"';
			}
		};

		// Get Right Arrow Activity Class
		function rightArrowClass(pageNr, pageSize, cannedAnalysisDataElement) {
			// Get Number of Canned Analyses
			var followingPageNr = parseInt(pageNr) + 1;
			if (numberOfCannedAnalyses > pageNr*(pageSize)) {
				return 'datasets2tools-arrow-active" id="' + followingPageNr + '"';
			} else {
				return 'datasets2tools-arrow-inactive"';
			}
		};

		// Add Browse Arrows, If Necessary
		browseTableHTML += '<div class="datasets2tools-browse-table-arrow-tab">'
		browseTableHTML += 'Showing results ' + Math.min(((pageNr-1)*pageSize+1), numberOfCannedAnalyses) + '-' + Math.min((pageNr*(pageSize)), numberOfCannedAnalyses) + ' of ' + numberOfCannedAnalyses + '.&nbsp&nbsp&nbsp'
		browseTableHTML += '<img class="datasets2tools-browse-table-arrow-img datasets2tools-arrow-left ' + leftArrowClass(pageNr) + ' src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-128.png">';
		browseTableHTML += '<img class="datasets2tools-browse-table-arrow-img datasets2tools-arrow-right ' + rightArrowClass(pageNr, pageSize, cannedAnalysisDataElement) + ' src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-128.png">';
		browseTableHTML += '</div>';

		// Return Table HTML
		return browseTableHTML;
	}
};

////////////////////////////////////////////////////////////
///// 2.6 downloadMetadata ///////////////////////////////////
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
		return JSON.stringify(cannedAnalysisObj);
	},

	/////////////////////////////////
	////// 2.5.3 main
	/////////////////////////////////

	main: function(cannedAnalysisObj, fileFormat) {

		// Define Self
		var self = this;

		// Switch
		switch(fileFormat) {

			// Download TXT
			case 'TXT':
				alert(self.getTXT(cannedAnalysisObj));
				break;

			// Download JSON
			case 'JSON':
				alert(self.getJSON(cannedAnalysisObj));
				break;
		}
	}
};

////////////////////////////////////////////////////////////
///// 2.7 Interactive //////////////////////////////////////
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
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'inline-block');
	},

	/////////////////////////////////
	////// 2.6.2 triggerExpandMode
	/////////////////////////////////

	triggerExpandMode: function($evtTarget) {
		var self = this,
			$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent();
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'block');
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
		var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img" id="' + toolId + '"> &nbsp' + cannedAnalysisData['tools'][toolId]['tool_name'] + '&nbsp<img class="datasets2tools-tool-info-img" src="https://openclipart.org/image/800px/svg_to_png/213219/Information-icon.png">';

		// Add HTML
		$selectedToolTab.html(selectedToolTabHTML);
	},

	/////////////////////////////////
	////// 2.6.4 prepareBrowseTable
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
	////// 2.6.5 copyToClipboard
	/////////////////////////////////

	copyToClipboard: function($evtTarget) {
		var text = $evtTarget.prev().val();
		window.alert(text);
	},

	
	/////////////////////////////////
	////// 2.6.6 downloadMetadata
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
	////// 2.6.7 displayToolInfo
	/////////////////////////////////

	displayToolInfo: function($evtTarget, cannedAnalysisData) {

		// Define Variables
		var toolInfoHTML = '<div class="datasets2tools-tool-info-tab">';

		// Get Tool Description
		var toolDescriptionHTML = 'Tool Description...';

		// Get Tool Developers
		var toolDeveloperHTML = 'Tool Developer...';

		// Get Tool Links
		var toolLinkHTML = 'Links...<button class="datasets2tools-close-tool-info-button">X</button>';

		// Get HTML String
		toolInfoHTML += '<b>Tool Description</b><br>' + toolDescriptionHTML + '<br><br><b>Tool Developers</b><br>' + toolDeveloperHTML + '<br><br><b>Links</b><br>' + toolLinkHTML + '</div>';

		// Set HTML
		$('.datasets2tools-browse-bar').html(toolInfoHTML);
	}

};

////////////////////////////////////////////////////////////
///// 2.8 eventListener ////////////////////////////////////
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
		$('.datasets2tools-tool-icon').click(function(evt) { // :not(.datasets2tools-tooltip-text)
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent(),
				toolId = $evtTarget.parent().attr('id');
			Interactive.triggerExpandMode($evtTarget);
			Interactive.prepareSelectedToolTab($evtTarget, cannedAnalysisData);
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.3 filterCannedAnalyses
	/////////////////////////////////

	filterCannedAnalyses: function(cannedAnalysisData) {
		$('.datasets2tools-search-input').on('keyup', function(evt) {//change(function(evt) {//
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parent().parent().parent().parent(),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.4 clickCopyButton
	/////////////////////////////////

	clickCopyButton: function() {
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-share-dropdown-hover .datasets2tools-share-button', function(evt) {
			Interactive.copyToClipboard($(evt.target));
		});
	},

	/////////////////////////////////
	////// 2.7.5 downloadMetadataButton
	/////////////////////////////////

	downloadMetadataButton: function(cannedAnalysisData) {
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-metadata-dropdown-hover .datasets2tools-metadata-download-button', function(evt) {
			Interactive.downloadMetadata($(evt.target), cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.5 clickTableArrow
	/////////////////////////////////

	clickTableArrow: function(cannedAnalysisData) {
		$('.datasets2tools-browse-bar').on('click', '.datasets2tools-arrow-active', function(evt) {
			// Interactive.downloadMetadata($(evt.target), cannedAnalysisData);
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parent().parent().parent(),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id'),
				pageNr = $evtTarget.attr('id');
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData, pageNr);
		});
	},

	/////////////////////////////////
	////// 2.7.6 clickToolInfoIcon
	/////////////////////////////////

	clickToolInfoIcon: function(cannedAnalysisData) {
		$('.datasets2tools-search-bar').on('click', '.datasets2tools-tool-info-img', function(evt) {
			Interactive.displayToolInfo($(evt.target), cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.6 closeToolInfoTab
	/////////////////////////////////

	closeToolInfoTab: function(cannedAnalysisData) {
		$('.datasets2tools-browse-bar').on('click', '.datasets2tools-close-tool-info-button', function(evt) {
			// Interactive.displayToolInfo($(evt.target), cannedAnalysisData);
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parent().parent().parent(),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
				Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData);
		});
	},

	/////////////////////////////////
	////// 2.7.8 main
	/////////////////////////////////

	main: function(cannedAnalysisData) {

		// Define Self
		var self = this;

		// Click Logo
		self.clickLogo();

		// Select Tool
		self.selectTool(cannedAnalysisData);

		// Filter Canned Analyses
		self.filterCannedAnalyses(cannedAnalysisData);

		// Download Metadata
		self.downloadMetadataButton(cannedAnalysisData);

		// Click Arrow
		self.clickTableArrow(cannedAnalysisData);

		// Click Tool Info
		self.clickToolInfoIcon(cannedAnalysisData);

		// Close Tool Info
		self.closeToolInfoTab(cannedAnalysisData);

		// Copy Button
		self.clickCopyButton();
	}
};

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

main();