# Languages Directory

This directory contains translation files for the Codesnip plugin.

## Translation Files

Translation files should be named using the following format:
- `codesnip-{locale}.po` - Portable Object files (source translations)
- `codesnip-{locale}.mo` - Machine Object files (compiled translations)

Where `{locale}` is the language code (e.g., `es_ES` for Spanish, `fr_FR` for French).

## Example Files

- `codesnip-es_ES.po` - Spanish translation source
- `codesnip-es_ES.mo` - Spanish translation compiled
- `codesnip-fr_FR.po` - French translation source  
- `codesnip-fr_FR.mo` - French translation compiled

## Creating Translations

1. Use tools like Poedit or WP-CLI to extract translatable strings
2. Create `.po` files for each target language
3. Compile `.po` files to `.mo` files for WordPress to use

## WordPress.org Integration

For plugins hosted on WordPress.org, translations are automatically managed through translate.wordpress.org and the Domain Path header can be omitted. However, this folder is maintained for local development and custom translations.
