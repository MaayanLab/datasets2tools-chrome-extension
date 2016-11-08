
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {
	// 1.1 Load Interface
	Interface.load();

	// 1.2 whenClicked Watcher
	whenClicked.showCannedAnalyses();
	// whenClicked.showToolDiv();

	// 1.3 API Test
	// Datasets2ToolsAPI.getApiResults('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gds&id=200069129');
	// Datasets2ToolsAPI.getApiResults('http://localhost:5000/canned_analyses?dataset_fk=1&tool_fk=2');
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
		$('.cannedanalysis-bar').each(function(i, elem){

			// Define element
			var $elem = $(elem),
				toolHTMLdiv = self.prepareCannedanalysisDivs($elem);

			// Append
			$elem.find('.cannedanalysis-browse-div').html(toolHTMLdiv);
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
		var iconHTMLdiv = `<div class="cannedanalysis-bar" id="`+seriesAccession+`">
								<table class="cannedanalysis-table">
									<tr style="max-height:50px">

										<td class="datasets2tools-icon">
											<img src="`+iconURL+`"><b class="cannedanalysis-display">&nbsp&nbsp Datasets2Tools:&nbsp&nbsp&nbsp</b>
										</td>

										<td class="datasets2tools-goback cannedanalysis-browse">
											<div class="datasets2tools-goback-div"> v v v </div>
										</td>

										<td class="cannedanalysis-tool-icons cannedanalysis-display">
											<img id="Enrichr-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png">
											<img id="Clustergrammer-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/clustergrammer/static/icons/graham_cracker_70.png">
											<img id="L1000CDS2-icon" class="tool-icon" src="http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png">
										</td>

										<td class="datasets2tools-selected-tool-col cannedanalysis-browse">
											
										</td>

									</tr>
								</table>

								<div class="cannedanalysis-browse-div cannedanalysis-browse">
									hello!
								</div>

							</div>`;

		return iconHTMLdiv;
	},

	/////////////////////////////////
	////// 2.1.3 prepareCannedanalysisDivs
	/////////////////////////////////

	///// Prepares dropdown menu
	///// hover information

	prepareCannedanalysisDivs: function($elem){

		// Define tool array, tool DIV HTML string
		var toolArray = ['Enrichr', 'Clustergrammer', 'L1000CDS2'],
			seriesAccession = $elem.attr('id'),
			toolHTMLdiv = '';

		// Loop through tools
		for (var i = 0; i < toolArray.length; i++){
			// Add tool DIV
			toolHTMLdiv += '<div class="'+toolArray[i]+' cannedanalysis-results"> Canned analyses of ' + seriesAccession + ' and ' + toolArray[i] + '.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div>';
		};

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

	// showToolDiv: function() {

	// 	// JQuery Watcher
	// 	$('.tool-icon').click(function(event) {
	// 		// Get Tool Name and Series Accession
	// 		var $target = $(event.target),
	// 			toolName = $target.attr('id').split('-')[0],
	// 			seriesAccession = $target.parent().parent().parent().parent().parent().attr('id'),
	// 			divToActivateId = '#' + seriesAccession + '-' + toolName,
	// 			divToInactivateId = '#' + seriesAccession + ' .cannedanalyses-div:not('+divToActivateId+')';

	// 		// Hide All Others
	// 		$(divToInactivateId).hide();

	// 		// Toggle
	// 		$(divToActivateId).toggle();
	// 	});
	// },

	showCannedAnalyses: function() {
		// Browse
		$('.tool-icon').click(function(event) {
			// Get Variables
			var $target = $(event.target),
				$parentDiv = $target.parent().parent().parent().parent().parent(),
				toolName = $target.attr('id').split('-')[0];

			// Selected Tool Icon
			$parentDiv.find('.datasets2tools-selected-tool-col').html($target.prop('outerHTML') + toolName);

			// Toggle Display/Browse
			$parentDiv.find('.cannedanalysis-display').hide();
			$parentDiv.find('.cannedanalysis-browse').show();

			// Canned Analyses
			$parentDiv.find('.'+toolName).show();
		});

		// Go Back
		$('.datasets2tools-goback-div').click(function(event) {
			// Get Variables
			var $target = $(event.target),
				$parentDiv = $target.parent().parent().parent().parent().parent();

			// Toggle Display/Browse
			$parentDiv.find('.cannedanalysis-display').show();
			$parentDiv.find('.cannedanalysis-browse').hide();
			$parentDiv.find('.cannedanalysis-results').hide();
		})
	}
};

////////////////////////////////////////////////////////////////////
/////// 3. Run Function ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
main();