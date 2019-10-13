import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
import fileIcon from '../../theme/icons/browse-files.svg';
import { isImageType, isNonImageType } from './utils';

export default class FileUploadUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'fileUpload', locale => {
			const view = new FileDialogButtonView( locale );
			const imageCommand = editor.commands.get( 'imageUpload' );
			// const nonImageCommand = editor.commands.get( 'nonImageUpload' );

			view.set( {
				allowMultipleFiles: true
			} );

			view.buttonView.set( {
				label: t( 'Insert file' ),
				icon: fileIcon,
				tooltip: true
			} );

			view.buttonView.bind( 'isEnabled' ).to( imageCommand );

			view.on( 'done', ( evt, files ) => {
				const filesToUpload = Array.from( files );
				const imagesToUpload = filesToUpload.filter( isImageType );
				const nonImagesToUpload = filesToUpload.filter( isNonImageType );

				if ( imagesToUpload.length ) {
					editor.execute( 'imageUpload', { file: imagesToUpload } );
				}
				if ( nonImagesToUpload.length ) {
					editor.execute( 'nonImageUpload', { file: nonImagesToUpload } );
				}
			} );

			return view;
		} );
	}
}
