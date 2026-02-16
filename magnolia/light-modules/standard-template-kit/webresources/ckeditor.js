CKEDITOR.editorConfig = function( config ) {

    config.removePlugins = 'resize';
    config.resize_enabled = false;
    config.removePlugins = 'elementspath';

    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';

    config.stylesSet = [
        { name: 'AFDiwa', element: 'p', styles: { 'font-family': 'AFDiwa, sans-serif' } },
        { name: 'AFDiwaLight', element: 'p', styles: { 'font-family': 'AFDiwaLight, sans-serif' } },
        { name: 'AFDiwaExtraLight', element: 'p', styles: { 'font-family': 'AFDiwaExtraLight, sans-serif' } },
        { name: 'AFDiwaBold', element: 'p', styles: { 'font-family': 'AFDiwaBold, sans-serif' } },
        { name: 'AFDiwaExtraBold', element: 'p', styles: { 'font-family': 'AFDiwaExtraBold, sans-serif' } },
		{ name: 'Tahoma', element: 'p', styles: { 'font-family': 'Tahoma, sans-serif' } },
        { name: 'TahomaBold', element: 'p', styles: { 'font-family': 'TahomaBold, sans-serif' } },
		{ name: 'Arial', element: 'p', styles: { 'font-family': 'Arial, sans-serif' } },
        { name: 'ArialBold', element: 'p', styles: { 'font-family': 'ArialBold, sans-serif' } },
        { name: 'AFDiwa inline', element: 'span', styles: { 'font-family': 'AFDiwa, sans-serif' } },
        { name: 'AFDiwaLight inline', element: 'span', styles: { 'font-family': 'AFDiwaLight, sans-serif' } },
		{ name: 'AFDiwaExtraLight inline', element: 'span', styles: { 'font-family': 'AFDiwaExtraLight, sans-serif' } },
        { name: 'AFDiwaLight inline', element: 'span', styles: { 'font-family': 'AFDiwaLight, sans-serif' } },
		{ name: 'AFDiwaBold inline', element: 'span', styles: { 'font-family': 'AFDiwaBold, sans-serif' } },
        { name: 'AFDiwaExtraBold inline', element: 'span', styles: { 'font-family': 'AFDiwaExtraBold, sans-serif' } },
		{ name: 'Tahoma inline', element: 'span', styles: { 'font-family': 'Tahoma, sans-serif' } },
        { name: 'TahomaBold inline', element: 'span', styles: { 'font-family': 'TahomaBold, sans-serif' } },
		{ name: 'Arial inline', element: 'span', styles: { 'font-family': 'Arial, sans-serif' } },
        { name: 'ArialBold inline', element: 'span', styles: { 'font-family': 'ArialBold, sans-serif' } }
    ];
    

	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		'/',
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] },
        { name: 'customfont' }
	];

	config.removeButtons = 'Save,ExportPdf,NewPage,Preview,Print,Templates,Find,Replace,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Image,Flash,PageBreak,Iframe,About,ShowBlocks,Maximize';
};