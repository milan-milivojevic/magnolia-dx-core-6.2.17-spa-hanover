/**
 * External plugins added through the server-side FieldFactory are automatically registered.
 * Other external plugins (e.g. client-only) may still be registered here (and subsequently added via config.extraPlugins).
 *
 * e.g. if your plugin resides in src/main/resources/VAADIN/js:
 * CKEDITOR.plugins.addExternal("abbr", CKEDITOR.vaadinDirUrl + "js/abbr/");
 *
 * Mind the trailing slash in path or CKEDITOR won't be able to calculate the plugin path correctly.
 * See also https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_plugins.html#method-addExternal
 */
var VAADIN_DIR_URL = typeof CKEDITOR.vaadinDirUrl !== 'undefined'? CKEDITOR.vaadinDirUrl : "../../../";

// Loads magnoliaFileBrowser replacing CKEditor file browser. This is added to the custom config below at config.extraPlugins
CKEDITOR.plugins.addExternal('magnoliaFileBrowser', VAADIN_DIR_URL + 'js/filebrowser/');

CKEDITOR.editorConfig = function( config ) {

    // MIRROR info.magnolia.ui.field.RichTextFieldDefinition
    definition = {
        alignment: true,
        images: true,
        lists: true,
        source: true,
        tables: true
    }

    // MIRROR info.magnolia.ui.field.RichTextFieldDefinition
    removePlugins = [];

    // CONFIGURATION FROM DEFINITION
    if (!definition.alignment) {
        removePlugins.push("justify");
    }
    if (!definition.images) {
        removePlugins.push("image");
    }
    if (!definition.lists) {
        // In CKEditor 4.1.1 enterkey depends on indent which itself depends on list
        removePlugins.push("enterkey");
        removePlugins.push("indent");
        removePlugins.push("list");
    }
    if (!definition.source) {
        removePlugins.push("sourcearea");
    }
    if (!definition.tables) {
        removePlugins.push("table");
        removePlugins.push("tabletools");
    }

    if (definition.colors != null) {
        config.colorButton_colors = definition.colors;
        config.colorButton_enableMore = false;
        removePlugins.push("colordialog");
    } else {
        removePlugins.push("colorbutton");
        removePlugins.push("colordialog");
    }

    config.font_names = 'Georgia/Georgia, sans-serif;';
    config.fontSize_sizes = '16/16px;24/24px;48/48px';
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6';
    
    config.stylesSet = [
        { name: 'Univers Bold Cond', element: 'p', styles: { 'font-family': "Pro Bold Cond" } },
        { name: 'Univers Bold', element: 'p', styles: { 'font-family': "Pro Bold" } },
        { name: 'Univers Roman', element: 'p', styles: { 'font-family': "Pro Roman" } },
        { name: 'Univers Light', element: 'p', styles: { 'font-family': "Pro Light" } },
        { name: 'Univers Bold Cond inline', element: 'span', styles: { 'font-family': "Pro Bold Cond" } },
        { name: 'Univers Bold inline', element: 'span', styles: { 'font-family': "Pro Bold" } },
        { name: 'Univers Roman inline', element: 'span', styles: { 'font-family': "Pro Roman" } },
        { name: 'Univers Light inline', element: 'span', styles: { 'font-family': "Pro Light" } }
    ];
    

    // magnolialink AND REMOVAL OF elementspath FROM DEFAULT RICH TEXT FIELD FACTORY
    removePlugins.push("elementspath");
    removePlugins.push("filebrowser");
    config.removePlugins = removePlugins.join(",");
    config.extraPlugins = "magnolialink,magnoliaFileBrowser";

    config.baseFloatZIndex = 150;
    config.resize_enabled = false;
    config.toolbar = "Magnolia";
    config.toolbar_Magnolia = [
        { name: "basicstyles",   items: [ "Bold", "Italic", "Underline", "SpecialChar", "Superscript", "Subscript" ] },
        { name: "links",         items: [ "Link", "InternalLink", "DamLink", "Unlink", "Anchor" ] },
        { name: "paragraph",     items: [ "Format", "Styles", "NumberedList", "BulletedList", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "Table" ] },
        { name: "styles",        items: [ "Font", "FontSize", "TextColor"]},
        { name: "clipboard",     items: [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord" ] },
        { name: "undo",          items: [ "Undo", "Redo" ] },
        { name: "tools",         items: [ "Source" ] }
    ];
    config.allowedContent = true; // don't filter my data
};
