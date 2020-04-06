import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';


const avatarSpeech = () => {
	registerBlockType('techtrails/avatar-speech', {
		title: 'Speaking Avatar',
		icon: 'admin-users',
		category: 'common',
		attributes: {
			avatar: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src'
			},
			speech: {
				type: 'string',
				selector: 'blockquote',
				source: 'html',
				multiline: 'p'
			}
		},
		edit(props) {
			let avatar = props.attributes.avatar,
			speech = props.attributes.speech
			
			return (
				<div className="avatar-speech" id="block-editable-box">
					<label>Avatar</label>
					<MediaUpload
						onSelect={ ( e ) => {
							props.setAttributes( {
								avatar: e.url,
							} );
						} }
						allowedTypes="image"
						value={ avatar == undefined ? 'Select Image' : avatar }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ avatar == undefined ? 'Upload Avatar Image' : <img src={ avatar } /> }
							</Button>
						) }
					/>
					<label>Text:</label>
					<RichText
						tagName="blockquote"
						onChange={ (e) => {
							props.setAttributes({speech: e})
						} }
						value={ speech }
						multiline="p"
					/>
				</div>
			);
		},
	
		save(props) {
			return (
				<div className="avatar-speech">
					{props.attributes.avatar && <img src={props.attributes.avatar} />}
					<RichText.Content tagName="blockquote" className="speech" value={props.attributes.speech}/>
				</div>
			);

		},
	});
}

export default avatarSpeech