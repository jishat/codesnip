<?php
/**
 * Plugin Configuration Class
 *
 * @package Codesnip
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Codesnip_Config
 * 
 * Centralized configuration for the plugin.
 */
class Codesnip_Config {

    /**
     * Plugin text domain
     */
    const TEXT_DOMAIN = 'codesnip';

    /**
     * Plugin slug
     */
    const PLUGIN_SLUG = 'codesnip';

    /**
     * Plugin name
     */
    const PLUGIN_NAME = 'Codesnip';

    /**
     * Plugin version
     */
    const PLUGIN_VERSION = '1.0.0';

    /**
     * Plugin file path
     */
    const PLUGIN_FILE = CODESNIP_PLUGIN_FILE;

    /**
     * Plugin directory path
     */
    const PLUGIN_DIR = CODESNIP_PLUGIN_DIR;

    /**
     * Plugin URL
     */
    const PLUGIN_URL = CODESNIP_PLUGIN_URL;

    /**
     * Database table prefix for plugin tables
     */
    const DB_TABLE_PREFIX = 'codesnip_snippets';

    /**
     * Nonce action name
     */
    const NONCE_ACTION = 'codesnip_nonce';

    /**
     * Get the text domain
     *
     * @return string
     */
    public static function get_text_domain(): string {
        return self::TEXT_DOMAIN;
    }

    /**
     * Get the plugin slug
     *
     * @return string
     */
    public static function get_plugin_slug(): string {
        return self::PLUGIN_SLUG;
    }

    /**
     * Get the plugin name
     *
     * @return string
     */
    public static function get_plugin_name(): string {
        return self::PLUGIN_NAME;
    }

    /**
     * Get the plugin version
     *
     * @return string
     */
    public static function get_plugin_version(): string {
        return self::PLUGIN_VERSION;
    }

    /**
     * Get the database table name with WordPress prefix
     *
     * @return string
     */
    public static function get_db_table_name(): string {
        global $wpdb;
        return $wpdb->prefix . self::DB_TABLE_PREFIX;
    }

    /**
     * Get the nonce action name
     *
     * @return string
     */
    public static function get_nonce_action(): string {
        return self::NONCE_ACTION;
    }
}
