
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {
	// 1.1 Locate Parents
	var $parents = Interface.locateParents();

	// 1.2 Load Interface
	Interface.load($parents);

	// window.alert(Datasets2ToolsAPI.getApiResults());
};


//////////////////////////////////////////////////////////////////////
///////// 2. Define Variables ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1 GEOPage //////////////////////////////////////////
////////////////////////////////////////////////////////////

var GEOPage = {
	// Return true if user is on datasets search results page, false otherwise.
	isGEOSearchResultsPage: function() {
		if (Boolean(window.location.pathname.match(/\/gds/) && window.location.search.match(/\?term=/))) {
			// If is on search results page
			return true;
		}
		else if (Boolean(window.location.pathname.match(/\/gds/) && document.getElementById('database')[0].textContent.match('GEO DataSets'))) {
			// Else if is on subsequent page of search results page
			return true;
		}
	},

	// Return true if user is on GDS browser page, false otherwise. [DATASET]
	isGDSBrowserPage: function() {
		return Boolean(window.location.pathname.match(/\/sites\/GDSbrowser/) && window.location.search.match(/\?acc=GDS/));
	},

	// Return true if user is on GSE page, false otherwise. [SERIES]
	isGSEPage: function() {
		return Boolean(window.location.pathname.match(/\/geo\/query\/acc.cgi/) && window.location.search.match(/\?acc=GSE/));
	},

	// Return true if user is on GSM page, false otherwise. [SAMPLE]
	isGSMPage: function() {
		return Boolean(window.location.pathname.match(/\/geo\/query\/acc.cgi/) && window.location.search.match(/\?acc=GSM/));
	}
};

////////////////////////////////////////////////////////////
///// 2.2 Interface ////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.3.1 locateParents
	/////////////////////////////////

	///// Locates elements upon which to append icons
	///// based on type of page.

	locateParents: function() {
		var $parents;
		if (GEOPage.isGEOSearchResultsPage()) {
			$parents = $('.rprt');
		}
		return $parents;
	},

	/////////////////////////////////
	////// 2.3.2 load
	/////////////////////////////////

	///// Creates citation label and calls
	///// addButtons method to add the buttons

	load: function($parents) {
		var self = this;
		$parents.each(function(i, elem) {
			var $elem = $(elem);
			var buttonHTMLdiv = self.prepareToolButton($elem);
			$elem.after(buttonHTMLdiv);
		});
	},

	/////////////////////////////////
	////// 2.3.2 prepareToolButton
	/////////////////////////////////

	///// Prepares button with according
	///// hover information

			// var seriesId = $elem.find("a:contains('GSE')").text();


	prepareToolButton: function($elem){
		var seriesId = $elem.find("a:contains('GSE')").text(),
		 	iconURL = chrome.extension.getURL("icon_720.png");

		 	buttonHTMLdiv = `
							<div class="dropdown" style="float:left;">
							  <button class="dropbtn">Left</button>
							  <div class="dropdown-content" style="left:0;">
							    <a href="#">Link 1</a>
							    <a href="#">Link 2</a>
							    <a href="#">Link 3</a>
							  </div>
							</div>

							<div class="dropdown" style="float:right;">
							  <button class="dropbtn">Right</button>
							  <div class="dropdown-content">
							    <a href="#">Link 1</a>
							    <a href="#">Link 2</a>
							    <a href="#">Link 3</a>
							  </div>
							</div>`;
		// buttonHTMLdiv = '<div class="cannedanalyses"><table class="cannedanalyses-table"><td class="cannedanalyses-text"><img alt="Datasets2Tools Icon" src="'+iconURL+'" width="20" height="20"><b>&nbsp Canned Analyses:&nbsp</b></td><td><a href="http://amp.pharm.mssm.edu/Enrichr/"><img class="toolicon" src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png"></a><a href="http://amp.pharm.mssm.edu/clustergrammer/"><img class="toolicon" src="http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png"></a><a href="http://amp.pharm.mssm.edu/L1000CDS2/"><img class="toolicon" src="http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png"></a></td></table></div>';
		return buttonHTMLdiv
	}
};

////////////////////////////////////////////////////////////
///// 2.3 Datasets2Tools API ///////////////////////////////
////////////////////////////////////////////////////////////

var Datasets2ToolsAPI = {

	getApiResults: function(){

		$.ajax({
				url: 'localhost:5000/canned_analyses?dataset_fk=1&tool_fk=2',
				type: 'GET',
				success: function(response){
					window.alert(response)
				}
		});

	}

};



		// xmlhttp = new XMLHttpRequest();
		// xmlhttp.open('GET', 'http://localhost:5000/canned_analyses?dataset_fk=1&tool_fk=2', false);
		// xmlhttp.send();
		// var data = xmlhttp.responseText;
		// return 'data';

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
main();