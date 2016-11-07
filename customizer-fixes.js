( function() {
	/**
	 * Prevent user from selecting the same posts page and static front page.
	 */
	wp.customize.bind( 'ready', function() {
		var staticPages, postsPages, pageOnFront, currentStaticPage, err, errContainer;

		// Closure variables.
		staticPages       = document.getElementById( '_customize-dropdown-pages-page_on_front' );
		postsPages        = document.getElementById( '_customize-dropdown-pages-page_for_posts' );

		// Bail if the option is not present in the customizer.
		if ( ! staticPages || ! postsPages ) {
			return;
		}

		// More closure variables.
		pageOnFront       = document.getElementById( 'customize-control-page_on_front' );
		currentStaticPage = getSelectedOption( staticPages ).value;
		err               = document.createElement( 'span' );

		// Setup error message node (reusable).
		err.className = 'error customizer-fixes-error';

		// Localized in customizer-fixes.php.
		err.innerHTML = frontPageError.error;

		// If the saved values match, unset the Posts Page dropdown.
		unsetPage( postsPages, currentStaticPage );

		// When changing static page dropdown, make sure the values can't match.
		staticPages.addEventListener( 'change', function( e ) {
			e.preventDefault();
			removeErrorMessage();

			var newID = getSelectedOption( this ).value;

			if ( '0' !== newID && newID == getSelectedOption( postsPages ).value ) {
				errorMessage();
				unsetPage( postsPages, newID );
			}
		}, true );

		// When changing posts page dropdown, make sure the values can't match.
		postsPages.addEventListener( 'change', function( e ) {
			e.preventDefault();
			removeErrorMessage();

			var newID = getSelectedOption( this ).value;

			if ( '0' !== newID && newID == getSelectedOption( staticPages ).value ) {
				errorMessage();
				unsetPage( staticPages, newID );
			}
		}, true );

		/**
		 * Get currently selected option from select input.
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
		 */
		function getSelectedOption( select ) {
			if ( ! select || ! select.children ) {
				return null;
			}
			for ( var option, i = 0, len = select.children.length; i < len; i++ ) {
				option = select.children[ i ];
				if ( option.selected ) {
					return option;
				}
			}
			if ( len > 0 ) {
				return select.children[ 0 ];
			} else {
				return null;
			}
		}

		/**
		 * Remove selected ID (pagesID) from the specified dropdown (menu).
		 */
		function unsetPage( menu, pagesID ) {
			menu.querySelector( 'option[value="' + pagesID + '"]' ).selected = false;
		}

		/**
		 * Display error when user tries to set duplicate values.
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
		 */
		function errorMessage() {
			pageOnFront.insertBefore( err, pageOnFront.firstChild || null );
		}

		/**
		 * Removes the error message on setting change.
		 */
		function removeErrorMessage() {
			if ( ! errContainer ) {
				errContainer = document.createElement( 'div' );
			}
			errContainer.appendChild( err );
		}
	} );
} ).call( this );
