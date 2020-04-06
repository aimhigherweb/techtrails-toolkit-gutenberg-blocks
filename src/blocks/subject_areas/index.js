import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Button, PanelBody, IconButton, TextControl } from '@wordpress/components';


const subjectAreas = () => {
	registerBlockType('techtrails/subject-areas', {
		title: 'Subject Areas',
		icon: 'welcome-learn-more',
		category: 'common',
		attributes: {
			subjects: {
				type: 'array',
				default: []
			}
		},
		edit(props) {
			let subjectFields

			const addSubject = () => {
				const subjects = [...props.attributes.subjects]

				subjects.push({
					name: '',
					avatar: undefined
				})

				props.setAttributes({subjects})
			},
			removeSubject = (index) => {
				const subjects = [...props.attributes.subjects]

				subjects.splice(index, 1)
				
				props.setAttributes({subjects})
			},
			subjectNameChange = (name, index) => {
				const subjects = [...props.attributes.subjects]

				subjects[index].name = name

				props.setAttributes({subjects})
			},
			subjectAvatarChange = (avatar, index) => {
				const subjects = [...props.attributes.subjects]

				subjects[index].avatar = avatar.url

				props.setAttributes({subjects})
			}

			if(props.attributes.subjects.length) {
				subjectFields = props.attributes.subjects.map((subject, index) => {
					let avatar = props.attributes.subjects[index].avatar
					return (
						<div className="subject" key={index}>
							<label>Subject Name:</label>
							<TextControl
								className="name"
								value={props.attributes.subjects[index].name}
								onChange={(name) => {subjectNameChange(name, index)}}
							/>
							<label>Subject Avatar</label>
							<MediaUpload
								onSelect={(newAvatar) => {subjectAvatarChange(newAvatar, index)}}
								allowedTypes="image"
								value={ avatar == undefined ? 'Select Image' : avatar }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ avatar == undefined ? 'Upload Avatar' : <img src={ avatar } /> }
									</Button>
								) }
							/>
							<IconButton
								className="remove"
								icon="no-alt"
								label="Delete Subject"
								onClick={() => {removeSubject(index)}}
							/>
						</div>
					)
				})
			}
			
			return (
				<div className="subject-areas" id="block-editable-box">
					{subjectFields}
					<Button isDefault onClick={addSubject.bind(this)}>
						Add Subject
					</Button>
				</div>
			);
		},
	
		save(props) {
			return (
					<>
						<div className="subject-areas">
							{props.attributes.subjects.map((subject, index) => (
								<div className="subject" key={index}>
									<a href={subject.name} target="_blank" rel="nofollow noopener noreferrer">
										<img src={subject.avatar} />
									</a>
								</div>
							))}
						</div>
					 </>
			);

		},
	});
}

export default subjectAreas