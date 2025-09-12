=== Codesnip ===
Contributors: jishat
Tags: html, ai, tailwind, block, content
Requires at least: 6.0
Tested up to: 6.8
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Create and optimize safe HTML content blocks with the help of AI. Paste sanitized HTML or "Tailwindify" it using an optional AI assistant.

== Description ==

CodeSnip is a safe and modern helper tool for WordPress users who want to create **HTML content blocks** quickly.

Unlike general “snippet manager” plugins that allow unsafe PHP or JavaScript, CodeSnip is **HTML-only and strictly sanitized**.

**Key Features:**
- ✨ Paste your own HTML snippets (sanitized automatically).
- 🛡️ Dangerous tags like `<script>`, `<iframe>`, `<object>`, `<link>`, `<form>`, `<html>`, `<body>` and more are stripped for safety.
- 🤖 Optional AI assistant (via your own OpenAI or Claude API key) to "Tailwindify" your HTML by adding Tailwind CSS utility classes.
- 🔒 All AI output is sanitized before display or storage.
- 🧩 Works as a safe **content block generator**, not a code executor.

This plugin does not support PHP or JavaScript execution, making it safe for general WordPress use.

**AI Assistant (Optional):**
For users who want design help, CodeSnip includes an optional AI feature. This can suggest Tailwind CSS classes to improve the appearance of your HTML blocks. The AI does not execute code — it only returns text suggestions that you can review before saving

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/codesnip` directory, or install via the WordPress Plugins screen.
2. Activate the plugin through the **Plugins** screen in WordPress.
3. Go to **Codesnip** in the admin menu to start saving snippets.
4. (Optional) If you want to enable AI assistant features:
   - Go to **Settings → Codesnip**.
   - Enter your own API key (OpenAI or Claude).
   - Save settings.  
   Without this, AI features remain disabled.

== Frequently Asked Questions ==

= Does this plugin allow running PHP or JavaScript? =  
No. For safety reasons, CodeSnip only supports sanitized HTML. Unsafe code such as PHP and JavaScript is never stored or executed.

= Is the AI assistant required? =  
No. The plugin works without AI. AI integration is optional and requires you to provide your own API key.

= Does the plugin send my code to external services? =
Only if you use the AI Assistant. In that case, your snippet and prompt are sent to your chosen AI provider (OpenAI or others which coming soon).  
The plugin itself does not log or share your data.

= How are snippets sanitized? =  
All snippets are passed through `wp_kses_post()` with a custom whitelist. Unsafe tags and attributes are stripped automatically.

= Why do I need to provide my own API key? =
For security and transparency. The plugin does not include or share any API keys. If you choose to enable AI features, you must provide your own key from your AI provider.

== Privacy Policy ==
This plugin does not collect or share any personal data by default.  
All snippets are stored locally in your WordPress database.

== Development and Contribution ==
Codesnip free versions codes are Open Source and available in [GitHub](https://github.com/jishat/codesnip).

== Screenshots ==
1. Plugin dashboard with HTML snippet editor.
2. AI assistant interface for Tailwindify.
3. Example of sanitized output block.

== Changelog ==

= 1.0.0 =
* Initial release.
* HTML-only snippet support.
* AI assistant (optional) for Tailwindify.
* Strict sanitization with `wp_kses_post()`.

== Upgrade Notice ==

= 1.0.0 =
Initial release with HTML-only snippet support and optional AI Tailwindify.
