import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import Notification from '@ckeditor/ckeditor5-ui/src/notification/notification';
import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter';
import env from '@ckeditor/ckeditor5-utils/src/env';

import NonImageUploadCommand from './nonimageuploadcommand';
import { isNonImageType } from './utils';
import { isHtmlIncluded } from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadediting';

export default class NonImageUploadEditing extends Plugin {
	static get requires() {
		return [ FileRepository, Notification ];
	}

	init() {
		const editor = this.editor;
		const doc = editor.model.document;
		const schema = editor.model.schema;
		const conversion = editor.conversion;
		const fileRepository = editor.plugins.get( FileRepository );

		schema.register( 'nonImage', {
			isObject: true,
			isBlock: true,
			allowWhere: '$block',
			allowAttributes: [ 'alt', 'src', 'srcset', 'uploadId', 'uploadStatus' ]
		} );

		editor.commands.add( 'nonImageUpload', new NonImageUploadCommand( editor ) );

		conversion.for( 'upcast' )
			.attributeToAttribute( {
				view: {
					name: 'img',
					key: 'uploadId'
				},
				model: 'uploadId'
			} );

		this.listenTo( editor.editing.view.document, 'clipboardInput', ( evt, data ) => {
			if ( isHtmlIncluded( data.dataTransfer ) ) {
				return;
			}

			const nonImages = Array.from( data.dataTransfer.files ).filter( file => {
				if ( !file ) {
					return false;
				}

				return isNonImageType( file );
			} );

			const ranges = data.targetRanges.map( viewRange => editor.editing.mapper.toModelRange( viewRange ) );

			editor.model.change( writer => {
				writer.setSelection( ranges );

				if ( nonImages.length ) {
					evt.stop();

					editor.model.enqueueChange( 'default', () => {
						editor.execute( 'nonImageUpload', { file: nonImages } );
					} );
				}
			} );
		} );

		editor.editing.view.document.on( 'dragover', ( evt, data ) => {
			data.preventDefault();
		} );
	}
}
