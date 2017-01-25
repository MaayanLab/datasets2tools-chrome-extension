
	/////////////////////////////////
	////// 2.3. clickCopyButton
	/////////////////////////////////

	clickDropdownButton: function() {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-dropdown-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target);

			// Add Interactivity
			$evtTarget.parent().find('.datasets2tools-dropdown-text').toggle();

		});
	},

	/////////////////////////////////
	////// 2.3. clickCopyButton
	/////////////////////////////////

	clickCopyButton: function() {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-share-dropdown-hover .datasets2tools-copy-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Get Event Target
			var $evtTarget = $(evt.target);

			// Get Element
			var copyTextArea = $evtTarget.prev()[0];

			// Select Element
			copyTextArea.select();

			// Copy Text
			try {
				var successful = document.execCommand('copy');
			} catch (err) {
				console.log('Oops, unable to copy');
			}
		});
	},

	/////////////////////////////////
	////// 2.3. downloadMetadataButton
	/////////////////////////////////

	downloadMetadataButton: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-browse-bar').on('click', 'table tr .datasets2tools-metadata-dropdown-hover .datasets2tools-metadata-download-button', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Stuff
			Interactive.downloadMetadata($(evt.target), cannedAnalysisData);

		});
	},

	/////////////////////////////////
	////// 2.3. clickTableArrow
	/////////////////////////////////

	clickTableArrow: function(cannedAnalysisData) {

		// Listener
		$('.datasets2tools-browse-bar').on('click', '.datasets2tools-browse-arrow', function(evt) {

			// Prevent default behaviour
			evt.preventDefault();

			// Define Variables
			var $evtTarget = $(evt.target),
				$datasets2toolsToolbar = $evtTarget.parents('.datasets2tools-toolbar'),
				toolId = $datasets2toolsToolbar.find('.datasets2tools-selected-tool-img').attr('id'),
				pageNr = $evtTarget.attr('id');

			// Add Interactivity
			Interactive.prepareBrowseTable($datasets2toolsToolbar, toolId, cannedAnalysisData, pageNr);

		});
	},
