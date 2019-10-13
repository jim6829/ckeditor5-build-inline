export function isImageType( file ) {
	const types = /^image\/(jpeg|png|gif|bmp)$/;

	return types.test( file.type );
}

export function isNonImageType( file ) {
	return !isImageType( file );
}
