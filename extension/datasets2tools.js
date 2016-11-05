
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {
	// 1.1 Load Interface
	Interface.load();

	// 1.2 whenClicked Watcher
	whenClicked.showToolDiv();

	// 1.3 API Test
	// Datasets2ToolsAPI.getApiResults('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id=200069129');
	Datasets2ToolsAPI.getApiResults('http://localhost:5000/canned_analyses?dataset_fk=1&tool_fk=2');
};


//////////////////////////////////////////////////////////////////////
///////// 2. Define Variables ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1 Interface ////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.1.1 load
	/////////////////////////////////

	///// Creates citation label and calls
	///// addButtons method to add the buttons

	load: function() {

		// Define self
		var self = this;

		// Loop through GEO search results elements
		$('.aux').each(function(i, elem) {

			// Define element, find GSE accession, prepare icon bar
			var $elem = $(elem),
			    seriesAccession = $elem.find("a:contains('GSE')").text();
			    iconHTMLdiv = self.prepareIconBar($elem);

			// Append icon bar
			$elem.append(iconHTMLdiv);
		});

		// Loop through icon bars
		$('.cannedanalysis-icon-bar').each(function(i, elem){

			// Define element
			var $elem = $(elem),
			toolHTMLdiv = self.prepareToolDivs($elem);

			// Append
			$elem.find('tr').append(toolHTMLdiv);

		});
	},

	/////////////////////////////////
	////// 2.1.2 prepareIconBar
	/////////////////////////////////

	///// Prepares button with according
	///// hover information

	prepareIconBar: function($elem){
		// Get icon URL
	 	var iconURL = chrome.extension.getURL("icon_720.png");

	 	// Get series accession
		var seriesAccession = $elem.prev().find("a:contains('GSE')").text();

	 	// Get icon bar div HTML
		var iconHTMLdiv = `<div class="cannedanalysis-icon-bar" id="`+seriesAccession+`">
								<table class="cannedanalysis-table">
									<tr>
										<td class="cannedanalysis-text">
											<img src="`+iconURL+`"><b>&nbsp&nbsp Datasets2Tools:&nbsp&nbsp&nbsp</b>
										</td>
										<td>
											<img id="enrichr-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png">
											<img id="clustergrammer-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png">
											<img id="l1000cds2-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png">
										</td>
									</tr>
								</table>
							</div>`;

		return iconHTMLdiv;
	},

	/////////////////////////////////
	////// 2.1.3 prepareToolDivs
	/////////////////////////////////

	///// Prepares dropdown menu
	///// hover information

	prepareToolDivs: function($elem){

		// Define tool array, tool DIV HTML string
		var toolArray = ['enrichr', 'clustergrammer', 'l1000cds2'],
			seriesAccession = $elem.attr('id'),
			toolHTMLdiv = '<td>';

		// Loop through tools
		for (var i = 0; i < toolArray.length; i++){
			// Add tool DIV
			toolHTMLdiv += '<div class="tool-div" id="' + seriesAccession + '-' + toolArray[i] + '""> Canned analyses of ' + seriesAccession + ' and ' + toolArray[i] + '.</div>';
		};

		// Close Column
		toolHTMLdiv += '</td>'

		// Return DIV
		return toolHTMLdiv;
	}

};

////////////////////////////////////////////////////////////
///// 2.2 whenClicked //////////////////////////////////////
////////////////////////////////////////////////////////////

var whenClicked = {

	/////////////////////////////////
	////// 2.2.1 showToolDiv
	/////////////////////////////////

	///// Shows appropriate tool
	///// div when clicked

	showToolDiv: function() {

		// JQuery Watcher
		$('.tool-icon').click(function(event) {
			// Get Tool Name and Series Accession
			var $target = $(event.target),
				toolName = $target.attr('id').split('-')[0],
				seriesAccession = $target.parent().parent().parent().parent().parent().attr('id'),
				divToActivateId = '#' + seriesAccession + '-' + toolName,
				divToInactivateId = '#' + seriesAccession + ' .tool-div:not('+divToActivateId+')';

			// Hide All Others
			$(divToInactivateId).hide();

			// Toggle
			$(divToActivateId).toggle();
		});
	}

};

////////////////////////////////////////////////////////////
///// 2.3 Datasets2Tools API ///////////////////////////////
////////////////////////////////////////////////////////////

var Datasets2ToolsAPI = {

	getApiResults: function(url){

		$.ajax({
				url: url,//'localhost:5000/canned_analyses?dataset_fk=1&tool_fk=2',
				type: 'GET',
				crossDomain: true,
				success: function(response){
					window.alert(new XMLSerializer().serializeToString(response))
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