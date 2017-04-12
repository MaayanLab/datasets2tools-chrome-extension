
var Page = {

	isDataMedSearchResults: function() {
		return /https:\/\/datamed\.org\/search\.php\?.*/.test(window.location.href);
	},

	isDataMedLanding: function() {
		return /https:\/\/datamed\.org\/display\-item\.php\?.*/.test(window.location.href);
	},

	isGEOSearchResults: function() {
		return /https:\/\/www\.ncbi\.nlm\.nih\.gov\/gds\/\?term=.*/.test(window.location.href);
		return "https://www.ncbi.nlm.nih.gov/gds/?term=.*".test(window.location.href);
	},
	
	isGDSLanding: function() {
		return /https:\/\/www\.ncbi\.nlm\.nih\.gov\/sites\/GDSbrowser\?.*/.test(window.location.href);
	},

	isLDPLanding: function(){
		return /http:\/\/lincsportal\.ccs\.miami\.edu\/datasets\/#\/view\/.*/.test(window.location.href);
	},

	isDatasetSearchResults: function() {
		var self = this;
		return self.isDataMedSearchResults() || self.isGEOSearchResults();
	},

	isDatasetLanding: function() {
		var self = this;
		return self.isDataMedLanding() || self.isGDSLanding() || self.isLDPLanding();
	},

	getLabel: function() {
		var self = this;
		if (self.isGEOSearchResults()) {
			return 'geo geo-search';
		} else if (self.isGDSLanding()) {
			return 'geo geo-landing';
		} else if (self.isDataMedSearchResults()) {
			return 'datamed datamed-search';
		} else if (self.isDataMedLanding()) {
			return 'datamed datamed-landing';
		} else if (self.isLDPLanding()) {
			return 'lincs';
		}
	}
};

var Interface2 = {

	locateParents: function() {
		var $parents;
		if (Page.isDataMedSearchResults()) {
			$parents = $('.search-result li');
		} else if (Page.isGEOSearchResults()) {
			$parents = $('.rsltcont');
		}
		return $parents;
	},

	locateParent: function() {
		var $parent;
		if (Page.isDataMedLanding()) {
			$parent = $('a:contains("Dataset")').parents('.panel-group');
		} else if (Page.isGDSLanding()) {
			var jq = document.createElement('script');
			jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
			document.getElementsByTagName('head')[0].appendChild(jq);
			$parent = $('#gds_details');
		} else if (Page.isLDPLanding()) {
			$parent = $(".tab-pane.active.row.ng-scope").parent();
			// $parent = $("a:contains('Analysis Tools')").parent();
		}
		return $parent;
	},

	getDatasetAccession: function($parent) {
		var datasetAccession;
		if (Page.isDataMedSearchResults()) {
			datasetAccession = $parent.find(".result-field em:contains('ID:'), em:contains('Accession:')").next().text().replace(/\s+/g, '');
		} else if (Page.isGEOSearchResults()) {
			datasetAccession = $parent.find(".rprtid dt:contains('Accession: ')").next().text();
		} else if (Page.isDataMedLanding()) {
			datasetAccession = $parent.find('td:contains("ID:")').next().children().eq(0).text().replace(/\s+/g, '');
		} else if (Page.isGDSLanding()) {
			datasetAccession = window.location.search.split('=')[1];
		} else if (Page.isLDPLanding()) {
			datasetAccession = $parent.parents('.ng-scope').find(".col-sm-2:contains('LINCS ID')").next().text().replace(/\s+/g, '');
		}
		return datasetAccession;
	},

	getDatasetAccessions: function($parents) {
		var self=this, datasetAccession, datasetAccessionArray = [];
		$($parents).each(function(i, elem) {
			datasetAccession = self.getDatasetAccession($(elem));
			datasetAccessionArray.push(datasetAccession);
		})
		return datasetAccessionArray;
	},

	addCannedAnalyses: function($parentData, cannedAnalysisData) {
		var self = this;
		if (Page.isDataMedSearchResults() || Page.isGEOSearchResults()) {
			$($parentData).each(function(i, elem){
				datasetAccession = self.getDatasetAccession($(elem));
				if ($.inArray(datasetAccession, Object.keys(cannedAnalysisData['canned_analyses'])) > -1) {
					var toolbarHTML = toolbar.getHTML(datasetAccession, cannedAnalysisData);
					toolbar.add($parentData.eq(i), toolbarHTML);
				}
			})
		} else if (Page.isDataMedLanding() || Page.isGDSLanding() || Page.isLDPLanding()) {
			var self = this, datasetAccessionString = self.getDatasetAccession($parentData), toolbarHTML = tooltable.getHTML(datasetAccessionString, cannedAnalysisData);
			tooltable.add($parentData, toolbarHTML);
		}
	}
};

var toolbar = {

	getToolTabHTML: function(datasetAccessionString, cannedAnalysisData) {
		var toolbarHTML = '<div class="datasets2tools-tool-icon-tab datasets2tools-compact">', toolIds, toolId, nrCannedAnalyses;
		toolIds = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccessionString]);
		for (var i = 0; i < toolIds.length; i++) {
			toolId = toolIds[i];
			nrCannedAnalyses = Object.keys(cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId]).length;
			toolbarHTML += '<div class="datasets2tools-tooltip-hover datasets2tools-toolicon-tooltip-hover"><button class="datasets2tools-tool-icon-button datasets2tools-button" id="' + toolId + '" type="button" style="background:url(' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + ') no-repeat;background-size:95%;background-position:center;"></button><div class="datasets2tools-tooltip-text datasets2tools-toolicon-tooltip-text"><b>' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</b><p><i>' + nrCannedAnalyses + ' canned analyses</i></p><p>' + cannedAnalysisData['tools'][toolId]['tool_description'] + '</p></div></div>'
		}
		toolbarHTML += '</div>'
		return toolbarHTML;
	},

	getHTML: function(datasetAccessionString, cannedAnalysisData) {
		var self = this,
			interfaceHTML,
			toolbarHTML = '<div class="datasets2tools-toolbar datasets2tools-main ' + Page.getLabel() + '" id="' + datasetAccessionString + '">', //datasets2tools-
			searchBarHTML = '<div class="datasets2tools-search-bar">',
			logoTabHTML = '<div class="datasets2tools-logo-tab"><button class="datasets2tools-logo-button datasets2tools-button"></button><span style="font-size:xx-small">&nbsp</span><div class="datasets2tools-title-label datasets2tools-compact">Datasets2Tools</div></div>',
			toolTabHTML = self.getToolTabHTML(datasetAccessionString, cannedAnalysisData),
			selectedToolTabHTML = '<div class="datasets2tools-selected-tool-tab datasets2tools-expand"></div>',
			searchTabHTML = '<div class="datasets2tools-search-tab datasets2tools-expand"><div class="datasets2tools-tool-info-label"> <i>Tool Information</i> </div> <form class="datasets2tools-search-form"> <div class="datasets2tools-search-label">Search:</div><div class="datasets2tools-search-input"><input class="datasets2tools-search-text-input" type="text" name="datasets2tools-search-query"></div></form></div>',
			browseBarHTML = '<div class="datasets2tools-browse-bar datasets2tools-expand"><div id="' + datasetAccessionString + '" class="datasets2tools-table-wrapper"></div><div class="datasets2tools-tool-info-tab"></div></div>';
		interfaceHTML = toolbarHTML + searchBarHTML + logoTabHTML + toolTabHTML + selectedToolTabHTML + searchTabHTML + '</div>' + browseBarHTML + '</div>';
		return interfaceHTML;
	},

	add: function($parent, elementHTML) {
		if (Page.isDataMedSearchResults() || Page.isGEOSearchResults()) {
			$('.seven_col').css('overflow', 'visible');
			$('.rprt').css('overflow', 'visible');
			$parent.append(elementHTML);
		}
	},

	compact: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').show();
		$datasets2toolsToolbar.find('.datasets2tools-expand').hide();
		$datasets2toolsToolbar.find('.datasets2tools-tool-info-label').hide();
		$datasets2toolsToolbar.find('.datasets2tools-search-form').show();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'inline-block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-button').css({'filter': 'grayscale(0%)', 'opacity': '1'});
	},

	expand: function($datasets2toolsToolbar) {
		$datasets2toolsToolbar.find('.datasets2tools-compact').hide();
		$datasets2toolsToolbar.find('.datasets2tools-expand').show();
		$datasets2toolsToolbar.find('.datasets2tools-search-bar').css('display', 'block');
		$datasets2toolsToolbar.find('.datasets2tools-logo-button').css({'filter': 'grayscale(100%)', 'opacity': '0.5'});
	},

	addSelectedToolTab: function($datasets2toolsToolbar, toolId, cannedAnalysisData) {
		var $selectedToolTab = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-tab');
		var selectedToolTabHTML = '<img src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '" class="datasets2tools-selected-tool-img" id="' + toolId + '"><div class="datasets2tools-selected-tool-label">' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</div><button type="button" class="datasets2tools-tool-info-button datasets2tools-button"></button>';
		$selectedToolTab.html(selectedToolTabHTML);
	},

	addToolInfoTab: function($datasets2toolsToolbar, toolId, cannedAnalysisData) {
		var toolDescriptionHTML = cannedAnalysisData['tools'][toolId]['tool_description'];
		var toolLinkHTML = '<a href="' + cannedAnalysisData['tools'][toolId]['tool_homepage_url'] + '">Homepage</a>';
		var publicationLinkHTML = '<a href="' + cannedAnalysisData['tools'][toolId]['publication_url'] + '">Reference</a>';
		toolInfoHTML = '<b><u>Tool Description</b></u><br>' + toolDescriptionHTML + '<br><br><b><u>Links</b></u><br>' + toolLinkHTML + '&nbsp' + publicationLinkHTML + '<button class="datasets2tools-close-tool-info-button">✖</button>';
		$datasets2toolsToolbar.find('.datasets2tools-tool-info-tab').html(toolInfoHTML);
		$datasets2toolsToolbar.find('.datasets2tools-search-form').hide();
		$datasets2toolsToolbar.find('.datasets2tools-tool-info-label').show();
		$datasets2toolsToolbar.find('.datasets2tools-tool-info-tab').show();
		$datasets2toolsToolbar.find('.datasets2tools-table-wrapper').hide();
	}
};

var tooltable = {
	getHTML: function(datasetAccessionString, cannedAnalysisData) {
		var toolTableHTML = '<div class="datasets2tools-table-intro">The following table displays a list of computational tools which have been used to generate canned analyses of the dataset.  To explore the analyses, click on the expand button on the right of the desired tool.</div><div id="' + datasetAccessionString + '" class="datasets2tools-table-wrapper"><table class="datasets2tools-tool-table"><tr><th class="datasets2tools-tooltable-tool-header">Tool</th><th class="datasets2tools-tooltable-description-header">Description</th><th class="datasets2tools-tooltable-cannedanalysis-header">Canned Analyses</th></tr>',
			toolIds = Object.keys(cannedAnalysisData['tools']),
			cannedAnalyses = cannedAnalysisData['canned_analyses'][Object.keys(cannedAnalysisData['canned_analyses'])[0]],
			toolData = cannedAnalysisData['tools'],
			nrOfCannedAnalyses = {},
			toolId;
		for (i = 0; i < toolIds.length; i++) {
			toolId = toolIds[i];
			nrOfCannedAnalyses[toolId] = Object.keys(cannedAnalyses[toolId]).length;
		}
		toolsSorted = Object.keys(nrOfCannedAnalyses).sort(function(a,b){return nrOfCannedAnalyses[b]-nrOfCannedAnalyses[a]});
		for (i = 0; i < toolsSorted.length; i++) {
			toolId = toolsSorted[i];
			toolTableHTML += '<tr class="datasets2tools-tooltable-row"><td class="datasets2tools-tooltable-tool-col"><a href="' + toolData[toolId]['tool_homepage_url'] + '"><img class="datasets2tools-tooltable-tool-img" src="' + toolData[toolId]['tool_icon_url'] + '" id="' + toolId + '"></a><a class="datasets2tools-tooltable-tool-label" href="' + toolData[toolId]['tool_homepage_url'] + '">' + toolData[toolId]['tool_name'] + '</a></td>';
			toolTableHTML += '<td class="datasets2tools-tooltable-description-col">' + toolData[toolId]['tool_description'] + '</td>';
			toolTableHTML += '<td class="datasets2tools-tooltable-cannedanalysis-col">' + Object.keys(cannedAnalyses[toolId]).length + '<button class="datasets2tools-tooltable-plus-button datasets2tools-button" type="button" id="' + toolId + '"></button></td></tr>';
		}
		toolTableHTML += '</table></div>';
		return toolTableHTML;
	},

	addToolDescription: function($evtTarget, toolId, cannedAnalysisData) {
		var toolDescriptionHTML = '<a class="datasets2tools-back"> <<< Back To Tools </a><br><div class="datasets2tools-tooltable-toolintro"><img class="datasets2tools-selected-tool-img" id="' + toolId + '" style="height:50px;width:50px;" src="' + cannedAnalysisData['tools'][toolId]['tool_icon_url'] + '"></img><div class="datasets2tools-tooltable-toolname">' + cannedAnalysisData['tools'][toolId]['tool_name'] + '</div></div><br>' + cannedAnalysisData['tools'][toolId]['tool_description'] + '.';
		$('.datasets2tools-main').find('.datasets2tools-table-intro').html(toolDescriptionHTML);
	},

	add: function($parent, elementHTML) {
		var self = this;
		if (Page.isDataMedLanding()) {
			$parent.after('<div class="panel-group" id="accordion-cannedAnalyses" role="tablist" aria-multiselectable="true"><div class="panel panel-info"><div class="panel-heading" role="tab" id="heading-dataset-cannedAnalyses"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion-cannedAnalyses" data-target="#collapse-dataset-cannedAnalyses" href="#collapse-dataset-cannedAnalyses" aria-expanded="true" aria-controls="collapse-dataset-cannedAnalyses"><i class="fa fa-chevron-up"></i>&nbspCanned Analyses</a></h4></div><div id="collapse-dataset-cannedAnalyses" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-dataset-cannedAnalyses"><div class="panel-body"><div id="' + Interface2.getDatasetAccession($parent) + '" class="datasets2tools-main ' + Page.getLabel() + '">'+elementHTML+'</div></div></div></div></div>');
		} else if (Page.isGDSLanding()) {
			$parent.after('<div id="cannedAnalysisDiv" style="padding-top:10px;"><table id="cannedanalysistable" class="gds_panel" width="100%"><tr class="caption"><th style="text-align: center;">Canned Analyses</th></tr><tr><td><div id="' + Interface2.getDatasetAccession($parent) + '" class="datasets2tools-main ' + Page.getLabel() +'">'+elementHTML+'</div></td></tr></table></div>');
		} else if (Page.isLDPLanding()) {
			// $parent.html('<a data-toggle="tab" class="tab-link datasets2tools-tab-link" aria-expanded="false"> Analysis Tools </a>');
			// $('head-title').append(elementHTML);
			$parent.html(elementHTML);
		}
	}
};

var eventListener = {
	clickPlusButton: function(cannedAnalysisData) {
		$('.datasets2tools-main').on('click', '.datasets2tools-tooltable-plus-button', function(evt) {
			var $evtTarget = $(evt.target),
				datasetAccessionString = $evtTarget.parents('.datasets2tools-table-wrapper').attr('id'),
				toolId = $evtTarget.parent().parent().find('.datasets2tools-tooltable-tool-img').attr('id'),
				pairCannedAnalyses = cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId],
				toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'],
				browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl);
			browsetable.add($evtTarget, browseTableHTML);
			tooltable.addToolDescription($evtTarget, toolId, cannedAnalysisData);
		})
	},

	clickLogoButton: function() {
		$('.datasets2tools-logo-button').click(function(evt) {
			evt.preventDefault();
			toolbar.compact($(evt.target).parents('.datasets2tools-toolbar'));
		})
	},

	clickToolIcon: function(cannedAnalysisData) {
		$('.datasets2tools-tool-icon-button').click(function(evt) {
			evt.preventDefault();
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				datasetAccessionString = $datasets2toolsToolbar.attr('id'),
				toolId = $evtTarget.attr('id'),
				pairCannedAnalyses = cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId],
				toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'],
				browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl);
				browsetable.add($evtTarget, browseTableHTML);
				toolbar.addSelectedToolTab($datasets2toolsToolbar, toolId, cannedAnalysisData);
				toolbar.expand($(evt.target).parents('.datasets2tools-toolbar'));
		})
	},
	
	clickToolInfoIcon: function(cannedAnalysisData) {
		$('.datasets2tools-toolbar').on('click', '.datasets2tools-tool-info-button', function(evt) {
			evt.preventDefault();
			var $evtTarget =  $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
			toolbar.addToolInfoTab($datasets2toolsToolbar, toolId, cannedAnalysisData);
		})
	},

	clockToolInfoX: function() {
		$('.datasets2tools-toolbar').on('click', '.datasets2tools-close-tool-info-button', function(evt) {
			evt.preventDefault();
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $(evt.target).parents('.datasets2tools-toolbar'),
				datasetAccessionString = $datasets2toolsToolbar.attr('id'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id'),
				pairCannedAnalyses = cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId],
				toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'],
				browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl);
			browsetable.add($evtTarget, browseTableHTML);
			$datasets2toolsToolbar.find('.datasets2tools-search-form').show();
			$datasets2toolsToolbar.find('.datasets2tools-tool-info-label').hide();
			$datasets2toolsToolbar.find('.datasets2tools-table-wrapper').show();
			$datasets2toolsToolbar.find('.datasets2tools-tool-info-tab').hide();
		})
	},
	
	clickArrow: function(cannedAnalysisData) {
		$('.datasets2tools-main').on('click', '.datasets2tools-browse-arrow', function(evt) {
			evt.preventDefault();
			var $evtTarget = $(evt.target),
				$datasets2toolsMain = $evtTarget.parents('.datasets2tools-main'),
				datasetAccessionString = $datasets2toolsMain.attr('id'),
				toolId = $datasets2toolsMain.find('.datasets2tools-selected-tool-img').attr('id'),
				toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'],
				pairCannedAnalyses = cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId],
				pageNr = $evtTarget.attr('id'),
				browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl, pageNr=pageNr);
				browsetable.add($evtTarget, browseTableHTML);
		})
	},

	searchCannedAnalyses: function(cannedAnalysisData) {
		$('.datasets2tools-search-input').on('keyup', function(evt) {
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id');
			browsetable.prepare($datasets2toolsToolbar, toolId, cannedAnalysisData);
		})
	},

	clickDropdownButton: function() {
		$('.datasets2tools-main').on('click', '.datasets2tools-dropdown-button', function(evt) {
			evt.preventDefault();
			$(evt.target).next().toggle();			
		})
	},

	clickCopyButton: function() {
		$('.datasets2tools-main').on('click', '.datasets2tools-copy-button', function(evt) {
			evt.preventDefault();
			var $evtTarget = $(evt.target);
			var copyTextArea = $evtTarget.prev()[0];
			copyTextArea.select();
			try {
				var successful = document.execCommand('copy');
			} catch (err) {
				console.log('Oops, unable to copy');
			}
		});
	},

	clickDownloadButton: function(cannedAnalysisData) {
		$('.datasets2tools-main').on('click', '.datasets2tools-metadata-download-button', function(evt) {
			evt.preventDefault();
			var $evtTarget = $(evt.target),
				fileFormat = $evtTarget.text(),
				datasetAccessionString = $evtTarget.parents('.datasets2tools-table-wrapper').attr('id'),
				toolId = $('.datasets2tools-main').find('.datasets2tools-selected-tool-img').attr('id'),
				cannedAnalysisId = $evtTarget.parents('tr').attr('id');
			var cannedAnalysisObj = jQuery.extend({}, cannedAnalysisData['canned_analyses'][datasetAccessionString][toolId][cannedAnalysisId]);
			cannedAnalysisObj['dataset_accession'] = datasetAccessionString;
			cannedAnalysisObj['tool_name'] = cannedAnalysisData['tools'][toolId]['tool_name'];
			cannedAnalysisObj['tool_url'] = cannedAnalysisData['tools'][toolId]['tool_homepage_url'];
			browsetable.downloadMetadata(cannedAnalysisObj, fileFormat);
		});
	},

	clickGoBack: function(cannedAnalysisData) {
		$('.datasets2tools-main').on('click', '.datasets2tools-back', function(evt) {
			evt.preventDefault();
			var datasetAccessionString=$('.datasets2tools-table-wrapper').attr('id'),
				tooltableHTML =  tooltable.getHTML(datasetAccessionString, cannedAnalysisData);
			$('.datasets2tools-main').html(tooltableHTML);
		})
	},

	main: function(cannedAnalysisData) {
		var self = this;
		self.clickPlusButton(cannedAnalysisData);
		self.clickLogoButton();
		self.clickToolIcon(cannedAnalysisData);
		self.clickToolInfoIcon(cannedAnalysisData);
		self.clockToolInfoX(cannedAnalysisData);
		self.clickArrow(cannedAnalysisData);
		self.searchCannedAnalyses(cannedAnalysisData);
		self.clickDropdownButton();
		self.clickCopyButton();
		self.clickDownloadButton(cannedAnalysisData);
		self.clickGoBack(cannedAnalysisData);
	}
};

var browsetable = {
	add: function($evtTarget, htmlString) {
		if (Page.isDataMedSearchResults() || Page.isGEOSearchResults()) {
			$($evtTarget).parents('.datasets2tools-toolbar').find('.datasets2tools-table-wrapper').html(htmlString);
		} else if (Page.isDataMedLanding()) {
			$($evtTarget).parents('.datasets2tools-table-wrapper').html(htmlString);
		} else if (Page.isGDSLanding()) {
			$($evtTarget).parents('.datasets2tools-table-wrapper').html(htmlString);
		} else if (Page.isLDPLanding()) {
			
		}
	},

	downloadMetadata: function(cannedAnalysisObj, fileFormat) {
		var self = this,
			metadataString;
		switch(fileFormat) {
			case 'TXT':
				var metadataString = 'Tag\tValue\n',
					metadataKey,
					metadataKeys = Object.keys(cannedAnalysisObj);
				for (var k = 0; k < metadataKeys.length; k++) {
					metadataKey = metadataKeys[k];
					metadataString += metadataKey + '\t' + cannedAnalysisObj[metadataKey] + '\n';
				}
				download(metadataString, 'metadata.txt', 'text/plain')
				break;

			case 'JSON':
				metadataString = JSON.stringify(cannedAnalysisObj, null, 2);
				download(metadataString, 'metadata.json', 'text/plain')
				break;
		}
	},

	prepare: function($datasets2toolsToolbar, toolId, cannedAnalysisData, pageNr=1) {
		var self = this;
		var datasetAccession = $datasets2toolsToolbar.attr('id');
		var toolIconUrl = cannedAnalysisData['tools'][toolId]['tool_icon_url'];
		var pairCannedAnalyses = jQuery.extend({}, cannedAnalysisData['canned_analyses'][datasetAccession][toolId]);
		var searchFilter = $datasets2toolsToolbar.find('.datasets2tools-search-text-input').val();
		var cannedAnalysisIds = Object.keys(pairCannedAnalyses), cannedAnalysisId;
		if (searchFilter.length > 0) {
			for (var i = 0; i < cannedAnalysisIds.length; i++) {
				cannedAnalysisId = cannedAnalysisIds[i];
				cannedAnalysisDescription = pairCannedAnalyses[cannedAnalysisId]['description'];
				if (!(cannedAnalysisDescription.toLowerCase().includes(searchFilter.toLowerCase()))) {
					delete pairCannedAnalyses[cannedAnalysisId];
				};
			};
		};
		var browseTableHTML = prepareBrowseTable(pairCannedAnalyses, toolIconUrl, pageNr, 75);
		$datasets2toolsToolbar.find('.datasets2tools-table-wrapper').html(browseTableHTML);
	}
};






















function prepareBrowseTable(pairCannedAnalyses, toolIconUrl, pageNr=1, maxDescriptionLength=100, pageSize=5) {

	// Define variables
	var browseTableHTML = '<table class="datasets2tools-browse-table"><tr><th class="datasets2tools-link-col">Link</th><th class="datasets2tools-description-col">Description</th><th class="datasets2tools-metadata-col">Metadata</th><th class="datasets2tools-share-col">Share</th></tr>',
		pairCannedAnalysesSubset = browseFunctions.firstN(pairCannedAnalyses, pageNr, pageSize);

	// Create table
	if (Object.keys(pairCannedAnalysesSubset).length === 0) {

		// Add no results
		browseTableHTML += '<tr><td class="datasets2tools-no-results-tab" colspan="4">No Results Found.</td></tr>';

	} else {

		// Add results
		browseTableHTML = getTableHTML.main(browseTableHTML, pairCannedAnalysesSubset, toolIconUrl, maxDescriptionLength);

	}

	// Add browse functions
	browseTableHTML = browseFunctions.add(browseTableHTML, pageNr, pageSize, pairCannedAnalyses);

	// Return HTML string
	return browseTableHTML;
};

var getLinkHTML = {

	main: function(cannedAnalysisObj, toolIconUrl) {
		return '<td><a href="' + cannedAnalysisObj['canned_analysis_url'] + '"><img class="datasets2tools-cannedanalysis-link-img" src="' + toolIconUrl + '"></a></td>';
	}
};

var getDescriptionHTML = {

	main: function(cannedAnalysisObj, maxDescriptionLength) {

		// Get description
		var cannedAnalysisDescription = cannedAnalysisObj['description'],
			displayedDescription;

		// Prepare Displayed Description
		if (cannedAnalysisDescription.length > maxDescriptionLength) {

			displayedDescription = cannedAnalysisDescription.substring(0, maxDescriptionLength) + '<span class="datasets2tools-tooltip-hover datasets2tools-description-tooltip-hover">...<div class="datasets2tools-tooltip-text datasets2tools-description-tooltip-text">' + cannedAnalysisDescription + '</div></span>';

		} else {

			displayedDescription = cannedAnalysisDescription;

		}

		// Return
		return '<td class="datasets2tools-canned-analysis-description">' + displayedDescription + '</td>';
	},
};

var getMetadataHTML = {

	view: function(cannedAnalysisObj) {

		// Define variables
		var metadataKeys = Object.keys(cannedAnalysisObj),
			metadataKeyNumber = metadataKeys.length,
			metadataTooltipString = '', //<b>Metadata</b><br>
			viewMetadataHTML,
			metadataKey;

		// Loop through tags
		if (metadataKeyNumber > 2) {

			for (var j = 0; j < metadataKeyNumber; j++) {

				// Get Metadata Key
				metadataKey = metadataKeys[j];

				// Get Metadata Value
				if (!(['canned_analysis_url', 'description'].indexOf(metadataKey) >= 0)) {
					metadataTooltipString += '<b>' + metadataKey + '</b>: ' + cannedAnalysisObj[metadataKey] + '<br>';
				}
			}

		} else {

			metadataTooltipString += 'No metadata available.';

		}

		// Close DIV
		viewMetadataHTML = '<div class="datasets2tools-tooltip-hover datasets2tools-metadata-tooltip-hover"><img class="datasets2tools-view-metadata-img datasets2tools-metadata-img" src="' + chrome.extension.getURL("icons/info.png") + '"><div class="datasets2tools-tooltip-text datasets2tools-metadata-tooltip-text">'+metadataTooltipString+'</div></div>';

		// Return
		return viewMetadataHTML;
	},

	download: function(cannedAnalysisObj) {

		// Define variables
		var downloadMetadataHTML = '<div class="datasets2tools-dropdown-hover datasets2tools-metadata-dropdown-hover">';

		// Add Stuff
		downloadMetadataHTML += '<button class="datasets2tools-button datasets2tools-dropdown-button datasets2tools-download-metadata-button"></button>';
		
		// Add Stuff
		downloadMetadataHTML += '<div class="datasets2tools-dropdown-text datasets2tools-metadata-dropdown-text">';

		// Add functionality
		downloadMetadataHTML += '<b>Download Metadata:</b><br>';

		// Add TXT Button
		downloadMetadataHTML += '<ul style="margin:0;padding-left:20px;"><li><button class="datasets2tools-button datasets2tools-metadata-download-button" id="getTXT">TXT</button></li>';

		// Add JSON Button
		downloadMetadataHTML += '<li><button class="datasets2tools-button datasets2tools-metadata-download-button" id="getJSON">JSON</button></li></ul>';
		
		// Close DIV
		downloadMetadataHTML += '</div></div>';

		// Return
		return downloadMetadataHTML;
	},

	main: function(cannedAnalysisObj) {

		// Keys
		var self = this;

		// Return
		return '<td class="datasets2tools-metadata-col">' + self.view(cannedAnalysisObj) + self.download(cannedAnalysisObj) + '</td>';
	}
};

var getShareHTML = {

	main: function(cannedAnalysisObj) {

	// Define HTML String
		var shareHTML = '<td>';

		// Interactive DIV HTML
		var interactiveDivHTML = '<div class="datasets2tools-dropdown-hover datasets2tools-share-dropdown-hover">';

		// Dropdown DIV HTML
		var dropdownDivHTML = '<div class="datasets2tools-dropdown-text datasets2tools-share-dropdown-text">';

		// Share Image
		var shareImageHTML = '<button class="datasets2tools-button datasets2tools-dropdown-button datasets2tools-share-button"></button>';

		// Link Image
		var linkImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/link.png") + '"><b>Canned Analysis URL:</b>';

		// Embed Image
		var embedImageHTML = '<img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/embed.png") + '"><b>Embed Icon:</b>';

		// Get Copy Button HTML
		var buttonHTML = '<button class="datasets2tools-button datasets2tools-copy-button"><img class="datasets2tools-dropdown-icons-img" src="' + chrome.extension.getURL("icons/copy.png") + '">Copy</button>';

		// Text Area HTML
		var textAreaHTML = function(content, nRows) {return '<textarea class="datasets2tools-textarea" rows="' + nRows + '">'+content+'</textarea>'};

		// Canned Analysis URL
		var cannedAnalysisUrl = cannedAnalysisObj['canned_analysis_url'];

		// Embed Code
		var embedCode = '<a href="' + cannedAnalysisUrl + '"><img src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png" style="height:50px;width:50px"></a>'

		shareHTML += interactiveDivHTML + shareImageHTML + dropdownDivHTML + linkImageHTML + textAreaHTML(cannedAnalysisUrl, 2) + buttonHTML + '<br><br>' + embedImageHTML + textAreaHTML(embedCode, 3) + buttonHTML + '</div></div></td>';

		return shareHTML;
	}
};


var getTableHTML = {

	getRowHTML: function(cannedAnalysisId, linkHTML, descriptionHTML, metadataHTML, shareHTML) {
		return '<tr class="datasets2tools-canned-analysis-row" id="' + cannedAnalysisId + '">' + [linkHTML, descriptionHTML, metadataHTML, shareHTML].join('') + '</tr>';
	},

	main: function(browseTableHTML, pairCannedAnalysesSubset, toolIconUrl, maxDescriptionLength) {

		// Get canned analysis IDs
		var cannedAnalysisIds = Object.keys(pairCannedAnalysesSubset),
			self = this;

		// Loop Through Canned Analyses
		for (var i = 0; i < cannedAnalysisIds.length; i++) {

			// Get Canned Analysis Id
			cannedAnalysisId = cannedAnalysisIds[i];

			// Get Canned Analysis Object
			cannedAnalysisObj = pairCannedAnalysesSubset[cannedAnalysisId];

			// Add Row HTML
			browseTableHTML += self.getRowHTML(cannedAnalysisId, getLinkHTML.main(cannedAnalysisObj, toolIconUrl), getDescriptionHTML.main(cannedAnalysisObj, maxDescriptionLength), getMetadataHTML.main(cannedAnalysisObj), getShareHTML.main(cannedAnalysisObj));
		}

		// Close table
		browseTableHTML += '</table>';

		// Return HTML string
		return browseTableHTML;
	}
};


var browseFunctions = {

	firstN: function(obj, pageNr, pageSize) {
		if (Object.keys(obj).length > pageSize) {
		  return Object.keys(obj) //get the keys out
			    .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
			    // .slice(0, 4) //get the first N
			    .slice((pageNr-1)*pageSize, pageNr*pageSize) //get the first N
			    .reduce(function(memo, current) { //generate a new object out of them
			      memo[current] = obj[current]
			      return memo;
			    }, {});
		} else {
			return obj;
		}
	},

	leftArrowClass: function(pageNr) {
			if (pageNr > 1) {
				return '" id="' + (pageNr-1) + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
	},

	rightArrowClass: function(pageNr, pageSize, numberOfCannedAnalyses) {
			// Get Number of Canned Analyses
			var followingPageNr = parseInt(pageNr) + 1;
			if (numberOfCannedAnalyses > pageNr*(pageSize)) {
				return '" id="' + followingPageNr + '"';
			} else {
				return ' datasets2tools-disabled-arrow';
			}
	},

	add: function(browseTableHTML, pageNr, pageSize, pairCannedAnalyses) {

		// Define variables
		var numberOfCannedAnalyses = Object.keys(pairCannedAnalyses).length,
			self = this;

		// Add description
		browseTableHTML += '<div class="datasets2tools-browse-table-arrow-tab"> Showing results ' + Math.min(((pageNr-1)*pageSize+1), numberOfCannedAnalyses) + '-' + Math.min((pageNr*(pageSize)), numberOfCannedAnalyses) + ' of ' + numberOfCannedAnalyses + '.&nbsp&nbsp&nbsp'
		
		// Add left arrow
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-left' + self.leftArrowClass(pageNr) + '"></button>';

		// Add right arrow
		browseTableHTML += '<button class="datasets2tools-button datasets2tools-browse-arrow datasets2tools-browse-arrow-right' + self.rightArrowClass(pageNr, pageSize, numberOfCannedAnalyses) + '"></button></div>';

		// Return HTML string
		return browseTableHTML;
	}
};

var API = {
	main: function($parentData) {
		var apiURL = 'https://amp.pharm.mssm.edu/datasets2tools/data?';
		if (Object.keys($parentData).length > 1) {
			apiURL += Interface2.getDatasetAccessions($parentData).join('+');
		} else {
			apiURL += Interface2.getDatasetAccession($parentData);
		}
		$.ajax({
			type: "GET",
			url: apiURL,
			async: false,
			success: function(text) {
				cannedAnalysisData = JSON.parse(text);
			}
		});
		return cannedAnalysisData;
	}
};
