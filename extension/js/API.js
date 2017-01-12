////////////////////////////////////////////////////////////
///// 1.1 API Function /////////////////////////////////////
////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

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