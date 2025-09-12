<?php
/**
 * Shortcodes Class
 *
 * @package Codesnip
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Codesnip_Shortcodes
 * 
 * Handles shortcode functionality for the plugin.
 */
class Codesnip_Shortcodes {

    /**
     * Constructor
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        add_shortcode('codesnip', array($this, 'codesnip_shortcode'));
    }

    /**
     * Codesnip shortcode callback
     *
     * @param array $atts Shortcode attributes
     * @return string Shortcode output
     */
    public function codesnip_shortcode($atts) {
        global $wpdb;
        
        $atts = shortcode_atts(array('id' => 0), $atts);
        
        // Get snippet with status check
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Custom table operation
        $snippet_data = $wpdb->get_row($wpdb->prepare(
            "SELECT snippet, status FROM " . esc_sql(Codesnip_Config::get_db_table_name()) . " WHERE id = %d", 
            $atts['id']
        ), ARRAY_A);
        
        if (!$snippet_data) {
            return 'Snippet not found.';
        }
        
        // Check if snippet is active
        if ($snippet_data['status'] != 1) {
            return ''; // Show nothing if not active
        }
        
        $snippet = $snippet_data['snippet'];
        
        // Return HTML snippet directly without wrapper
        return $snippet;
    }
}
