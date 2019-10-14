import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileCaptionEditing from './filecaption/filecaptionediting';

import '@ckeditor/ckeditor5-image/theme/imagecaption.css';

export default class FileCaption extends Plugin {
	static get requires() {
		return [ FileCaptionEditing ];
	}

	static get pluginName() {
		return 'FileCaption';
	}
}
