# Codesnip - WordPress Plugin

## Description

CodeSnip is a safe and modern helper tool for WordPress users who want to create **HTML content blocks** quickly.

Unlike general “snippet manager” plugins that allow unsafe PHP or JavaScript, CodeSnip is **HTML-only and strictly sanitized**.

🚀 **Initial Release (v1.0.0)**  
- Initial release with HTML-only snippet support and optional AI Tailwindify  

### Key Features

- ✨ Paste your own HTML snippets (sanitized automatically).
- 🛡️ Dangerous tags like `<script>`, `<iframe>`, `<object>`, `<link>`, `<form>`, `<html>`, `<body>` and more are stripped for safety.
- 🤖 Optional AI assistant (via your own OpenAI or Claude API key) to "Tailwindify" your HTML by adding Tailwind CSS utility classes.
- 🔒 All AI output is sanitized before display or storage.
- 🧩 Works as a safe **content block generator**, not a code executor.

This plugin does not support PHP or JavaScript execution, making it safe for general WordPress use.

### AI Assistant (Optional)

For users who want design help, CodeSnip includes an optional AI feature. This can suggest Tailwind CSS classes to improve the appearance of your HTML blocks. The AI does not execute code — it only returns text suggestions that you can review before saving

## Installation

1. Upload the plugin files to the `/wp-content/plugins/codesnip` directory, or install via the WordPress Plugins screen.
2. Activate the plugin through the **Plugins** screen in WordPress.
3. Go to **Codesnip** in the admin menu to start saving snippets.
4. (Optional) If you want to enable AI assistant features:
   - Go to **Settings → Codesnip**.
   - Enter your own API key (OpenAI or Claude).
   - Save settings.  
   Without this, AI features remain disabled.

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- WordPress development environment

### Setup Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. The React app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Security Features

- **Nonce Verification**: All AJAX requests are protected with WordPress nonces
- **Capability Checks**: Settings management restricted to users with `manage_options` capability
- **Input Sanitization**: All user inputs are properly sanitized and validated
- **API Key Protection**: API keys are stored securely using WordPress options API
- **XSS Prevention**: Output is properly escaped to prevent cross-site scripting attacks

## Shortcode Usage

Display snippets anywhere on your site using the shortcode:

```
[codesnip id="1"]
```

Replace `1` with the actual snippet ID you want to display.

## Frequently Asked Questions

###  Does this plugin allow running PHP or JavaScript?
No. For safety reasons, CodeSnip only supports sanitized HTML. Unsafe code such as PHP and JavaScript is never stored or executed.

### Is the AI assistant required?
No. The plugin works without AI. AI integration is optional and requires you to provide your own API key.

### Does the plugin send my code to external services?
Only if you use the AI Assistant. In that case, your snippet and prompt are sent to your chosen AI provider (OpenAI or others which coming soon).  
The plugin itself does not log or share your data.

### How are snippets sanitized?
All snippets are passed through `wp_kses_post()` with a custom whitelist. Unsafe tags and attributes are stripped automatically.

### Why do I need to provide my own API key?
For security and transparency. The plugin does not include or share any API keys. If you choose to enable AI features, you must provide your own key from your AI provider.


## Privacy Policy

This plugin does not collect or share any personal data by default. All snippets are stored locally in your WordPress database.

If you choose to enable the optional AI Assistant feature and configure your own API key (OpenAI), then your snippet text and prompt will be sent to that external provider for processing. No data is sent anywhere else, and the plugin does not log or store any AI responses outside of your WordPress database.

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured" error**
   - Ensure you've entered your API key in the settings
   - Verify the API key format (should start with `sk-`)

2. **API connection test fails**
   - Check your internet connection
   - Verify your OpenAI API key is valid
   - Ensure you have sufficient API credits

3. **Settings not saving**
   - Check if you have `manage_options` capability
   - Verify WordPress permissions
   - Check for JavaScript errors in browser console

### Debug Mode

Enable WordPress debug mode to see detailed error messages:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## Development and Contribution

Codesnip free version code is Open Source and available on [GitHub](https://github.com/jishat/codesnip).

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Screenshots

1. Plugin dashboard with HTML snippet editor.
2. AI assistant interface for Tailwindify.
3. Example of sanitized output block.

## Changelog

### Version 1.0.0
* Initial release.
* HTML-only snippet support.
* AI assistant (optional) for Tailwindify.
* Added only Open AI.
* Strict sanitization with `wp_kses_post()`.

## Upgrade Notice

## License

This plugin is licensed under the GPL v2 or later.

## Support

For support, feature requests, or bug reports, please create an issue in the repository.

## Credits

- Built with React and modern web technologies
- Powered by OpenAI's GPT models
- Follows WordPress coding standards and best practices
- Author: Mohammad Azizur Rahman Jishat
- GitHub: [https://github.com/jishat](https://github.com/jishat)