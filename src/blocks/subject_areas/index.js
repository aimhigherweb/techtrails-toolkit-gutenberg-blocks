import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Button, PanelBody, IconButton, TextControl, SelectControl } from '@wordpress/components';


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
			const colours = [
				{
					label: 'Yellow',
					value: '#F9ED31'
				},
				{
					label: 'Blue',
					value: '#00A9A3'
				},
				{
					label: 'Purple',
					value: '#6F2B8D'
				},
				{
					label: 'Green',
					value: '#BED73B'
				},
				{
					label: 'Orange',
					value: '#F15A29'
				},
				{
					label: 'Maroon',
					value: '#BE1E2D'
				},
			]
			let subjectFields

			const addSubject = () => {
				const subjects = [...props.attributes.subjects]
				

				subjects.push({
					name: '',
					avatar: undefined,
					colour: '',
					url: ''
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
			},
			subjectColourChange = (colour, index) => {
				const subjects = [...props.attributes.subjects]

				subjects[index].colour = colour

				props.setAttributes({subjects})
			},
			subjectLinkChange = (url, index) => {
				const subjects = [...props.attributes.subjects]

				subjects[index].url = url

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
							<label>Subject Slug:</label>
							<TextControl
								className="name"
								value={props.attributes.subjects[index].url}
								onChange={(url) => {subjectLinkChange(url, index)}}
							/>
							<label>Subject Colour</label>
							<SelectControl
								value={ props.attributes.subjects[index].colour }
								options={colours}
								onChange={(colour) => {subjectColourChange(colour, index)}}
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
								<a key={index} href={`/filter/subject/${subject.url}`}>
									<figure className="subject" style={{'--subjectBackground': subject.colour }}>
										<img src={subject.avatar} />
										<figcaption>{subject.name}</figcaption>
									</figure>
								</a>
							))}
						</div>
					 </>
			);

		},
	});
}

export default subjectAreas