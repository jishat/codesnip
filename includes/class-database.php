<?php
/**
 * Database Class
 *
 * @package Codesnip
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Codesnip_Database
 * 
 * Handles database operations for the plugin.
 */
class Codesnip_Database {

    /**
     * Table name
     *
     * @var string
     */
    private $table_name;

    /**
     * Constructor
     */
    public function __construct() {
        $this->table_name = Codesnip_Config::get_db_table_name();
    }

    /**
     * Create the snippets table
     */
    public function create_table() {
        global $wpdb;
        
        // Check if table already exists
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Custom table operation
        $table_exists = $wpdb->get_var($wpdb->prepare("SHOW TABLES LIKE %s", $this->table_name)) == $this->table_name;
        
        if (!$table_exists) {
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE {$this->table_name} (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                snippet LONGTEXT NOT NULL,
                status TINYINT(1) DEFAULT 1 NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            ) $charset_collate;";

            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.SchemaChange -- Plugin activation table creation
            dbDelta($sql);
        }
    }

    /**
     * Set default options
     */
    public function set_default_options() {
        // Set default OpenAI settings if they don't exist
        if (!get_option('codesnip_openai_model')) {
            add_option('codesnip_openai_model', 'gpt-4.1-nano');
        }
        if (!get_option('codesnip_openai_max_tokens')) {
            add_option('codesnip_openai_max_tokens', 1500);
        }
    }

    /**
     * Get table name
     *
     * @return string
     */
    public function get_table_name() {
        return $this->table_name;
    }
}
