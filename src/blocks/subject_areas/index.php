<?php
/**
 * Subject Areas Block
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
function subject_areas_register_block() {
    // Enqueue block editor JS
    wp_register_script(
        'subject_areas/editor-scripts',
        plugins_url( '/../../../build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components']
    );

    register_block_type('techtrails/subject-areas', array(
        'editor_script' => 'subject_areas/editor-scripts', 
    ));
}

// Hook the enqueue functions into the editor
add_action( 'init', 'subject_areas_register_block' );