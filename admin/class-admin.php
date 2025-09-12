<?php
/**
 * Admin Class
 *
 * @package Codesnip
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Codesnip_Admin
 * 
 * Handles admin-specific functionality for the plugin.
 */
class Codesnip_Admin {

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
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_filter('script_loader_tag', array($this, 'script_loader_tag'), 0, 3);
    }

    /**
     * Enqueue admin scripts and styles
     *
     * @param string $hook Current admin page hook
     */
    public function enqueue_scripts($hook) {
        // Check if we're on our plugin page
        if (strpos($hook, 'codesnip') === false) {
            return;
        }

        $slug = Codesnip_Config::get_plugin_slug();
        $var_prefix = 'codesnip_';
        
        // Enqueue Google Fonts
        $this->addHeadScripts($hook);
        
        if (defined('WP_DEBUG') && WP_DEBUG) {
            // Development mode - load from Vite dev server
            wp_enqueue_script(
                $slug . '-vite-client-helper-MODULE', 
                'http://localhost:5173/src/lib/devHotModule.js', 
                array(), 
                time(), // Use timestamp for development to prevent caching
                true
            );
            
            wp_enqueue_script(
                $slug . '-vite-client-MODULE', 
                'http://localhost:5173/@vite/client', 
                array(), 
                time(), // Use timestamp for development to prevent caching
                true
            );
            
            wp_enqueue_script(
                $slug . '-index-MODULE', 
                'http://localhost:5173/src/main.jsx', 
                array(), 
                time(), // Use timestamp for development to prevent caching
                true
            );
        } else {
            wp_enqueue_style(
                $slug . '-styles',
                CODESNIP_PLUGIN_URL . 'build/index.css',
                array(),
                CODESNIP_VERSION
            );
            
            wp_enqueue_script(
                $slug . '-index-MODULE', 
                CODESNIP_PLUGIN_URL . 'build/index.js', 
                array(), 
                CODESNIP_VERSION,
                true
            );
        }

        wp_localize_script($slug . '-index-MODULE', $var_prefix, array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce(Codesnip_Config::get_nonce_action()),
        ));
    }

    /**
     * Add Google Fonts and other head scripts
     *
     * @param string $currentScreen Current admin screen
     */
    public function addHeadScripts($currentScreen) {
        if (strpos($currentScreen, 'codesnip') === false) {
            return;
        }

        $version = CODESNIP_VERSION;
        $slug = Codesnip_Config::get_plugin_slug();

        // Preconnect to Google Fonts for better performance
        wp_enqueue_style($slug . '-googleapis-PRECONNECT', 'https://fonts.googleapis.com', [], $version);
        wp_enqueue_style($slug . '-gstatic-PRECONNECT-CROSSORIGIN', 'https://fonts.gstatic.com', [], $version);
        
        // Enqueue Outfit font
        wp_enqueue_style($slug . '-font', 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap', [], $version);
    }

    /**
     * Filter script loader tag to add module type
     *
     * @param string $html   The link tag for the enqueued script
     * @param string $handle The script's registered handle
     * @param string $href   The script's source URL
     * @return string Modified script tag
     */
    public function script_loader_tag($html, $handle, $href) {
        $slug = Codesnip_Config::get_plugin_slug();
        $new_tag = $html;
        
        if (strpos($handle, 'MODULE') !== false && strpos($handle, $slug) !== false) {
            $new_tag = preg_replace('/<script /', '<script type="module" ', $new_tag);
        }

        return $new_tag;
    }
}
