import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileUploadUI from './fileupload/fileuploadui';
import NonImageUploadProgress from './fileupload/nonimageuploadprogress';
import NonImageUploadEditing from './fileupload/nonimageuploadediting';
import ImageUploadProgress from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadprogress';
import ImageUploadEditing from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadediting';

export default class FileUpload extends Plugin {
	static get pluginName() {
		return 'FileUpload';
	}

	static get requires() {
		return [
			ImageUploadEditing,
			NonImageUploadEditing,
			FileUploadUI,
			ImageUploadProgress,
			// NonImageUploadProgress
		];
	}
}
