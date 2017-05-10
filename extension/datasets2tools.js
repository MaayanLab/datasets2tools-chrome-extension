//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////// Author: Denis Torre
////////// Affiliation: Ma'ayan Laboratory, Icahn School of Medicine at Mount Sinai
////////// Based on Cite-D-Lite (https://github.com/MaayanLab/Cite-D-Lite).

function main() {

	// Locate parents on HTML page
	var parents = Page.locateParents();

	// Get Canned Analyses of corresponding datasets
	var cannedAnalysisInterfaces = API.main(Object.keys(parents));

	// Add Canned Analyses to the webpage
	Page.addInterfaces(parents, cannedAnalysisInterfaces);

	// Add event listeners for interactivity
	eventListener.main(cannedAnalysisInterfaces);

}

//////////////////////////////////////////////////////////////////////
///////// 2. Define Variables ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
////////// 1. Page ///////////////////////////////
//////////////////////////////////////////////////

///// Functions related to the webpage.

var Page = {

	//////////////////////////////
	///// 1. isDataMedSearchResults
	//////////////////////////////

	///// Returns true if the user is on a DataMed search results page, otherwise false

	isDataMedSearchResults: function() {
		// return /https:\/\/datamed\.org\/search\.php\?.*/.test(window.location.href);
		return /.*search.php.*/.test(window.location.href);
	},

	//////////////////////////////
	///// 2. isDataMedLanding
	//////////////////////////////

	///// Returns true if the user is on a DataMed dataset landing page, otherwise false

	isDataMedLanding: function() {
		// return /https:\/\/datamed\.org\/display\-item\.php\?.*/.test(window.location.href);
		return /.*display-item.php.*/.test(window.location.href);
	},

	//////////////////////////////
	///// 3. isGeoSearchResults
	//////////////////////////////

	///// Returns true if the user is on a GEO search results page, otherwise false

	isGeoSearchResults: function() {
		// return /https:\/\/datamed\.org\/search\.php\?.*/.test(window.location.href);
		return /.*gds\/\?term=.*/.test(window.location.href);
	},

	//////////////////////////////
	///// 4. isGeoDatasetLanding
	//////////////////////////////

	///// Returns true if the user is on a GEO dataset landing page, otherwise false

	isGeoDatasetLanding: function() {
		// return /https:\/\/datamed\.org\/display\-item\.php\?.*/.test(window.location.href);
		return /.*sites\/GDSbrowser\?acc=.*/.test(window.location.href);
	},

	//////////////////////////////
	///// 5. isGeoSeriesLanding
	//////////////////////////////

	///// Returns true if the user is on a GEO series landing page, otherwise false

	isGeoSeriesLanding: function() {
		// return /https:\/\/datamed\.org\/display\-item\.php\?.*/.test(window.location.href);
		return /.*geo\/query\/acc.cgi\?acc=.*/.test(window.location.href);
	},

	//////////////////////////////
	///// 6. locateParents
	//////////////////////////////

	///// Locates HTML elements which will be used to extract dataset accessions and append the interfaces

	locateParents: function() {
		var parents = {};
		if (Page.isDataMedSearchResults()) {
			$('.search-result li').each(function(i, elem){ parents[$(elem).find('span[data-original-title]').first().text().trim()] = $(elem) });
		} else if (Page.isDataMedLanding()) {
			$('#accordion-dataset').each(function(i, elem) { parents[$(elem).find('strong:contains(ID:)').parent().next().children(0).text().trim()] = $(elem) });
		} else if (Page.isGeoSearchResults()) {
			$('.rslt').each(function(i, elem) { parents[$(elem).find('.details').find('.lng_ln').last().find('a').text().trim()] = $(elem) });
		} else if (Page.isGeoDatasetLanding()) {
			$('#gds_details').each(function(i, elem) { parents[$(elem).find('th').first().text().split(':')[0].split(' ').pop()] = $(elem) });
		} else if (Page.isGeoSeriesLanding()) {
			$('.acc').each(function(i, elem) { parents[$(elem).attr('id')] = $(elem).parents().eq(7) });
		}
		return parents;
	},

	//////////////////////////////
	///// 6. loadTooltips
	//////////////////////////////

	///// Loads tooltips

	loadTooltips: function() {

		$.widget("ui.tooltip", $.ui.tooltip, {
		    options: {
		        content: function () {
		            return $(this).prop('title');
		        }
		    }
		});

		$('.d2t-tooltip').each(function(i, elem) { $(elem).prev().attr('title', $(elem).remove().html());});

		$('.tool-icon').tooltip({
			classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-black tooltip-bottom tool-icon-tooltip'},
			position:{my: 'center top', at: 'center bottom+5'},
			show:{duration: 0},
			hide:{duration: 0}
		});

		$('.canned-analysis-title').tooltip({
			classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-black tooltip-bottom canned-analysis-title-tooltip'},
			position:{my: 'center top', at: 'center bottom+5'},
			show:{duration: 0},
			hide:{duration: 0}
		});

		$('.view-metadata').tooltip({
			classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-black tooltip-right view-metadata-tooltip'},
			position:{my: 'left center', at: 'left+25 center'},
			show:{duration: 0},
			hide:{duration: 0}
		});

		$('.download-metadata').tooltip({
			classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-white tooltip-right download-metadata-tooltip'},
			position:{my: 'left center', at: 'left+25 center'},
		    open:function(event, ui) { if (typeof(event.originalEvent) === 'undefined') { return false; }; var $id = $(ui.tooltip).attr('id'); $('div.ui-tooltip').not('#' + $id).remove(); },
		    close:function(event, ui) { ui.tooltip.hover(function() { $(this).stop(true).fadeTo(400, 1);; }, function() { $(this).remove(); }); },
			show:{duration: 0},
			hide:{duration: 500}
		});

		$('.share').tooltip({
			classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-white tooltip-right share-tooltip'},
			position:{my: 'left center', at: 'left+25 center'},
		    open:function(event, ui) { if (typeof(event.originalEvent) === 'undefined') { return false; }; var $id = $(ui.tooltip).attr('id'); $('div.ui-tooltip').not('#' + $id).remove(); },
		    close:function(event, ui) { ui.tooltip.hover(function() { $(this).stop(true).fadeTo(400, 1); }, function() { $(this).fadeOut('400', function() { $(this).remove(); }); }); },
			show:{duration: 0},
			hide:{duration: 5999999900}
		});

		// $('.share').tooltip({
		// 	classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-white tooltip-right share-tooltip'},
		// 	position:{my: 'left center', at: 'left+25 center'}
		// });

	},

	//////////////////////////////
	///// 8. addInterfaces
	//////////////////////////////

	///// Adds interfaces to parents

	addInterfaces: function(parents, cannedAnalysisInterfaces) {

		$.each(cannedAnalysisInterfaces, function(datasetAccession, datasetInterfaces) {
			if (Page.isDataMedSearchResults() || Page.isGeoSearchResults()) {
				parents[datasetAccession].append(datasetInterfaces['toolbar']);
			} else if (Page.isDataMedLanding()) {
				parents[datasetAccession].after('<div class="panel-group" id="accordion-cannedAnalyses" role="tablist" aria-multiselectable="true"><div class="panel panel-info"><div class="panel-heading" role="tab" id="heading-dataset-cannedAnalyses"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion-cannedAnalyses" data-target="#collapse-dataset-cannedAnalyses" href="#collapse-dataset-cannedAnalyses" aria-expanded="true" aria-controls="collapse-dataset-cannedAnalyses"><i class="fa fa-chevron-up"></i>&nbspCanned Analyses</a></h4></div><div id="collapse-dataset-cannedAnalyses" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-dataset-cannedAnalyses"><div class="panel-body">' + datasetInterfaces['tool_table'] + '</div></div></div></div>');
			}
		})

		this.loadTooltips();

	}
};

//////////////////////////////////////////////////
////////// 2. API ////////////////////////////////
//////////////////////////////////////////////////

///// Functions related to the API.

var API = {

	//////////////////////////////
	///// 1. main
	//////////////////////////////

	///// Gets interfaces relevant to identified datasets from the API

	main: function(datasetAccessions) {
		var pageType = (Page.isDataMedSearchResults() || Page.isGeoSearchResults()) ? 'search' : 'landing',
			cannedAnalysisInterfaces = JSON.parse($.ajax({
							async: false,
							url: 'https://amp.pharm.mssm.edu/datasets2tools/api/chrome_extension?',
							data: {
							  'page_type': pageType,
							  dataset_accessions: datasetAccessions.join(',')
							},
							success: function(data) {
								return data;
							}
						}).responseText);

		return cannedAnalysisInterfaces;
	}

};

//////////////////////////////////////////////////
////////// 3. eventListener //////////////////////
//////////////////////////////////////////////////

///// Event listeners.

var eventListener = {

	clickToolbarIcon: function(cannedAnalysisInterfaces) {
		$(document).on('click', '.tool-icon-wrapper .tool-icon', function(evt) {
			var $toolIcon = $(evt.target),
				$wrapper = $toolIcon.parents('.d2t-wrapper'),
				toolName = $toolIcon.attr('data-tool-name'),
				datasetAccession = $wrapper.attr('id');
			$wrapper.replaceWith(cannedAnalysisInterfaces[datasetAccession]['canned_analysis_tables'][toolName][0]);
			Page.loadTooltips();
		})
	},

	goBack: function(cannedAnalysisInterfaces) {
		$(document).on('click', '.go-back', function(evt) {
			var $wrapper = $(evt.target).parents('.d2t-wrapper'),
				datasetAccession = $wrapper.attr('id'),
				key = Object.keys(cannedAnalysisInterfaces[datasetAccession]).indexOf('toolbar') === -1 ? 'tool_table' : 'toolbar';
			$wrapper.replaceWith(cannedAnalysisInterfaces[datasetAccession][key]);
			Page.loadTooltips();
		})
	},

	clickArrow: function(cannedAnalysisInterfaces) {
		$(document).on('click', '.arrow-wrapper .fa', function(evt) {
			var $arrow = $(evt.target),
				$wrapper = $arrow.parents('.d2t-wrapper'),
				datasetAccession = $wrapper.attr('id'),
				toolName = $wrapper.find('.tool-annotation').find('.tool-icon').attr('data-tool-name'),
				targetPage = $arrow.attr('data-target-page');
			$wrapper.replaceWith(cannedAnalysisInterfaces[datasetAccession]['canned_analysis_tables'][toolName][targetPage])
		})
	},

	copy: function() {
		$(document).on('click', '.copy-wrapper button', function(evt) {
			var $button = $(evt.target).parents('.copy-wrapper').find('button');
				copyTextArea = $button.prev()[0];
			copyTextArea.select();
			var successful = document.execCommand('copy');

			$button.tooltip({
				content: 'Copied!',
			    disabled: true,
				classes:{'ui-tooltip':'tooltip-wrapper', 'ui-tooltip-content':'tooltip-black tooltip-right copied-tooltip'},
			    close: function( event, ui ) { $(this).tooltip('disable'); },
				position:{my: 'left center-5', at: 'left+35 center'},
				show:{duration: 0},
				hide:{duration: 0}
			});
			$button.tooltip('enable').tooltip('open');
		})
	},

	download: function() {
		$(document).on('click', '.download-metadata-tooltip button', function(evt) {
			var content = $(evt.target).attr('data-download'),
				filename = $(evt.target).attr('data-accession')+'.'+$(evt.target).text().toLowerCase(),
	        	a = document.createElement('a'),
	        	blob = new Blob([content], {'type':'application/octet-stream'});
	        a.href = window.URL.createObjectURL(blob);
	        a.download = filename;
	        a.click();
		})
	},

	clickPlus: function(cannedAnalysisInterfaces) {
		$(document).on('click', '.canned-analyses-cell .fa', function(evt) {
			var toolName = $(evt.target).parents('tr').find('.tool-name').text(),
				$wrapper = $(evt.target).parents('.d2t-wrapper')
				datasetAccession = $wrapper.attr('id');
			$wrapper.replaceWith(cannedAnalysisInterfaces[datasetAccession]['canned_analysis_tables'][toolName][0]);
			Page.loadTooltips();
		})
	},

	//////////////////////////////
	///// . main
	//////////////////////////////

	///// Main wrapper.

	main: function(cannedAnalysisInterfaces) {
		var self = this;
		this.clickToolbarIcon(cannedAnalysisInterfaces);
		this.goBack(cannedAnalysisInterfaces);
		this.clickArrow(cannedAnalysisInterfaces);
		this.copy();
		this.download();
		this.clickPlus(cannedAnalysisInterfaces);
	}

};

//////////////////////////////////////////////////////////////////////
///////// 3. Run Main Function ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////
main();
