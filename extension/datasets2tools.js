
//////////////////////////////////////////////////////////////////////
///////// 1. Define Main Function ////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function main() {
	// 1.1 Locate Parents
	var $parents = Interface.locateParents();

	// 1.2 Load Interface
	Interface.load($parents);
};


//////////////////////////////////////////////////////////////////////
///////// 2. Define Variables ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
///// 2.1 DataMedPage //////////////////////////////////////
////////////////////////////////////////////////////////////

var DataMedPage = {
	isDataMed: function() {
		return Boolean(window.location.hostname.match(/datamed.org/));
	},

	isDataMedSearchResultsPage: function() {
		return Boolean(window.location.hostname.match(/datamed.org/) && window.location.pathname.match(/\/search.php/));
	},
	
	isDataMedItemPage: function() {
		return Boolean(window.location.hostname.match(/datamed.org/) && window.location.pathname.match(/\/display-item.php/));
	}
};

////////////////////////////////////////////////////////////
///// 2.2 DataMedPage //////////////////////////////////////
////////////////////////////////////////////////////////////

var DataMedType = {
	// Return true if repository is GEO, false otherwise.
	isGEO: function() {
		if ((DataMedPage.isDataMedSearchResultsPage()) && ($('.label-repo').find('a').eq(0).text().includes('GEO'))) {
			// If repository is GEO on search results page
			return true;
		}
		else if ((DataMedPage.isDataMedItemPage()) && ($('.table-striped').find('td').eq(1).text().includes('GEO'))) {
			// Else if repository is GEO on item page
			return true;
		}
	}
};

////////////////////////////////////////////////////////////
///// 2.3 Interface ////////////////////////////////////////
////////////////////////////////////////////////////////////

var Interface = {

	/////////////////////////////////
	////// 2.3.1 locateParents
	/////////////////////////////////

	///// Locates elements upon which to append icons
	///// based on type of page.

	locateParents: function() {
		var $parents;
		if (DataMedPage.isDataMedItemPage()) {
			$parents = $('.heading');
		}
		else if (DataMedPage.isDataMedSearchResultsPage()) {
			$parents = $('.search-result').find('li');
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
			var $elem = $(elem), citationlabel;
			if (DataMedType.isGEO()) {
				self.addButtons($elem, citationlabel);
			}
		});
	},

	/////////////////////////////////
	////// 2.3.2 addButtons
	/////////////////////////////////

	///// Adds buttons of class citationstuff
	///// With description and images
	addButtons: function($parents) {
		var self = this,
			iconURL = chrome.extension.getURL("icon_720.png"),
			buttonHTMLdiv = '<div class="cannedanalyses"><table class="cannedanalyses-table"><td class="cannedanalyses-text"><img alt="Datasets2Tools Icon" src="'+iconURL+'" width="20" height="20"><b>&nbsp Canned Analyses:&nbsp</b></td><td><a href="http://amp.pharm.mssm.edu/g2e/"><img class="toolicon" src="http://amp.pharm.mssm.edu/g2e/static/image/logo-50x50.png"></a><a href="http://amp.pharm.mssm.edu/Enrichr/"><img class="toolicon" src="http://amp.pharm.mssm.edu/Enrichr/images/enrichr-icon.png"></a><a href="http://amp.pharm.mssm.edu/L1000CDS2/"><img class="toolicon" src="http://amp.pharm.mssm.edu/L1000CDS2/CSS/images/sigine.png"></a></td></table></div>';
		$parents.each(function(i, elem) {
			var $elem = $(elem);
			if (DataMedType.isGEO()) {
				if ((DataMedPage.isDataMedSearchResultsPage()) && (DataMedType.isGEO())) {
					$elem.append(buttonHTMLdiv);	
				}
				else if ((DataMedPage.isDataMedItemPage()) && (DataMedType.isGEO())) {
					$elem.after(buttonHTMLdiv);
				}
			}
		})
	}
};

//////////////////////////////////////////////////////////////////////
///////// 3. Run Function ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
main();