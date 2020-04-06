<?php
/**
 * Sponsor Block
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
function sponsor_register_block() {
    // Enqueue block editor JS
    wp_register_script(
        'sponsor/editor-scripts',
        plugins_url( '/../../../build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components']
    );

    register_block_type('yow/team-profile', array(
        'editor_script' => 'sponsor/editor-scripts',  
    ));
}

// Hook the enqueue functions into the editor
add_action( 'init', 'sponsor_register_block' );