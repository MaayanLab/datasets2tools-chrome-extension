//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {
	// Load on DataMed and GEO
	// if (Page.isDataMed() || Page.isGEO()) {
	// 	datasets2toolsMain();
	// } else if (Page.isLDP()) {
	// 	datasets2toolsLincsMain();
	// }


	if (Page.isDatasetSearchResults()) { 
		// Get parents
		var $parents = Interface2.locateParents();

		// Get canned analyses
		var cannedAnalysisData = API.main($parents);

		// Add toolbars
		Interface2.addCannedAnalyses($parents, cannedAnalysisData);

		// Add event listeners
		eventListener.main(cannedAnalysisData);

		console.log(cannedAnalysisData);
		
	} else if (Page.isDatasetLanding()) {
		// Get parent
		var $parent = Interface2.locateParent();
		
		// Get canned analyses
		var cannedAnalysisData = API.main($parent);

		// Add toolbar
		Interface2.addCannedAnalyses($parent, cannedAnalysisData);

		// Add event listeners
		eventListener.main(cannedAnalysisData);
		
		console.log(cannedAnalysisData);
	}

}


//////////////////////////////////////////////////////////////////////
///////// 2. Run Main Function ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////
main();
