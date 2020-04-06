<?php
/**
 * Avatar Speech Bubble Block
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
function avatar_speech_register_block() {
    // Enqueue block editor JS
    wp_register_script(
        'avatar_speech/editor-scripts',
        plugins_url( '/../../../build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components']
    );

    register_block_type('techtrails/avatar-speech', array(
        'editor_script' => 'avatar_speech/editor-scripts', 
    ));
}

// Hook the enqueue functions into the editor
add_action( 'init', 'avatar_speech_register_block' );