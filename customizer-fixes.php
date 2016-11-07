<?php

/**
 * Filter the page_for_posts option ($val) when it's a duplicate of the page_on_front option.
 *
 * @return int
 */
function customizer_fixes_fix_duplicate_values( $val ) {
	// If the static front page ID and posts page ID ($val) are the same, update the posts page ID.
	if ( $val === get_option( 'page_on_front' ) ) {
		$val = 0;
	}
	return $val;
}
add_filter( 'option_page_for_posts', 'customizer_fixes_fix_duplicate_values' );

/**
 * Customizer scripts and styles to prevent setting the same front page / posts page.
 *
 * @see https://codex.wordpress.org/Plugin_API/Action_Reference/customize_controls_enqueue_scripts
 */
function customizer_fixes_scripts() {

	//Localized error message for use in JS
	/* translators: &nbsp; is a non-breaking space. */
	$error_message = array(
		'error' => esc_html__( 'Front page & Posts page must be&nbsp;different.' ),
	);

	wp_register_script( 'customizer-fixes-script', plugin_dir_url( __FILE__ ) . 'customizer-fixes.js', array( 'jquery', 'customize-controls' ), '20160712' );
	wp_localize_script( 'customizer-fixes-script', "frontPageError", $error_message );
	wp_enqueue_script( 'customizer-fixes-script' );

	wp_enqueue_style( 'customizer-fixes-styles', plugin_dir_url( __FILE__ ) . 'customizer-fixes.css' );
}
add_action( 'customize_controls_enqueue_scripts', 'customizer_fixes_scripts' );
