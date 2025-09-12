<?php
/**
 * SideBar Menu Class
 *
 * @package Codesnip
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Codesnip_SideBar_Menu
 * 
 * Handles the creation and management of the WordPress admin menu.
 */
class Codesnip_SideBar_Menu {

    /**
     * Create the menu structure
     *
     * @return array Menu configuration array
     */
    public function create_menu(): array {
        $icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.69 161.41" fill="none" width="36" height="36">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M122.33,46.73c0-10.41-0.04-20.81,0.04-31.22c0.01-1.75-0.7-3.99,1.06-5.13c2.17-1.42,3.86,0.74,5.43,1.71
                c10.03,6.22,19.33,13.59,30.5,18.01c9.26,3.66,18.79,5.41,28.61,6.12c5.7,0.42,7.74,2.71,6.27,8.19
                c-3.11,11.56-11.73,18.32-21.74,23.49c-3.01,1.55-4.31,3.06-3.98,6.49c3.37,35.64-19.5,68.52-53.41,81.39
                c-37.85,14.36-81.06,0.52-102.48-32.8C-12.84,83.39,1.53,31.12,43.95,9.78C63.39,0.01,83.89-2.4,105.22,2.37
                c4.02,0.9,6.03,2.66,5.99,6.96c-0.13,12.45-0.11,24.9-0.02,37.35c0.04,5.08-1.52,6.21-6.53,4.25
                c-26.21-10.29-48.96,4.94-57.28,22.68c-7.28,15.51,1.21,33.82,17.64,38.83c22.1,6.74,48-5.75,56.52-27.26
                c1.48-3.73,0.91-7.66,0.95-11.51c0.07-8.98,0.02-17.96,0.02-26.94C122.45,46.73,122.39,46.73,122.33,46.73z" fill="#808285"/>
        </svg>';

        $slug = Codesnip_Config::get_plugin_slug();

        return array(
            'Home' => array(
                'type'       => 'menu',
                'title'      => __('Codesnip - Admin Panel', 'codesnip'),
                'name'       => __('Codesnip', 'codesnip'),
                'capability' => 'edit_posts',
                'slug'       => $slug,
                'callback'   => array($this, 'render_app'),
                'icon'       => 'data:image/svg+xml;base64,' . base64_encode($icon),
                'position'   => 25,
            ),
            'All Snippets' => array(
                'type'       => 'submenu',
                'parent'     => $slug,
                'name'       => __('All Snippets', 'codesnip'),
                'capability' => 'edit_posts',
                'slug'       => $slug . '#/',
            ),
            'Add New' => array(
                'type'       => 'submenu',
                'parent'     => $slug,
                'name'       => __('Add New', 'codesnip'),
                'capability' => 'edit_posts',
                'slug'       => $slug . '#/add-new',
            ),
            'Settings' => array(
                'type'       => 'submenu',
                'parent'     => $slug,
                'name'       => __('Settings', 'codesnip'),
                'capability' => 'manage_options',
                'slug'       => $slug . '#/settings',
            ),
        );
    }

    /**
     * Render the main app container
     */
    public function render_app() {
        echo '<div id="codesnip-root"></div>';
    }

    /**
     * Add the menu to WordPress admin
     */
    public function add_menu() {
        $menus = $this->create_menu();
        global $submenu;
        
        foreach ($menus as $menu) {
            if (current_user_can($menu['capability'])) {
                if ($menu['type'] === 'menu') {
                    add_menu_page(
                        $menu['title'],
                        $menu['name'],
                        $menu['capability'],
                        $menu['slug'],
                        $menu['callback'],
                        $menu['icon'],
                        $menu['position']
                    );
                } else {
                    $submenu[$menu['parent']][] = array(
                        $menu['name'],
                        $menu['capability'],
                        'admin.php?page=' . $menu['slug']
                    );
                }
            }
        }
    }
}
