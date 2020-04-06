import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Button, PanelBody, IconButton, TextControl } from '@wordpress/components';

const sponsors = () => {
	registerBlockType('yow/sponsor', {
		title: 'Sponsor',
		icon: 'awards',
		category: 'common',
		attributes: {
			sponsors: {
				type: 'array',
				default: []
			},
		},
		edit(props) {
			let sponsorFields

			const addSponsor = () => {
				const sponsors = [...props.attributes.sponsors]

				sponsors.push({
					url: '',
					logo: undefined
				})

				props.setAttributes({sponsors})
			},
			removeSponsor = (index) => {
				const sponsors = [...props.attributes.sponsors]

				sponsors.splice(index, 1)
				
				props.setAttributes({sponsors})
			},
			sponsorUrlChange = (url, index) => {
				const sponsors = [...props.attributes.sponsors]

				sponsors[index].url = url

				props.setAttributes({sponsors})
			},
			sponsorLogoChange = (logo, index) => {
				const sponsors = [...props.attributes.sponsors]

				sponsors[index].logo = logo.url

				props.setAttributes({sponsors})
			}

			if(props.attributes.sponsors.length) {
				sponsorFields = props.attributes.sponsors.map((sponsor, index) => {
					let logo = props.attributes.sponsors[index].logo
					return (
						<div className="sponsor" key={index}>
							<label>Sponsor Link:</label>
							<TextControl
								className="url"
								value={props.attributes.sponsors[index].url}
								onChange={(url) => {sponsorUrlChange(url, index)}}
							/>
							<label>Sponsor Logo</label>
							<MediaUpload
								onSelect={(newLogo) => {sponsorLogoChange(newLogo, index)}}
								allowedTypes="image"
								value={ logo == undefined ? 'Select Image' : logo }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ logo == undefined ? 'Upload Logo' : <img src={ logo } /> }
									</Button>
								) }
							/>
							<IconButton
								className="remove"
								icon="no-alt"
								label="Delete Sponsor"
								onClick={() => {removeSponsor(index)}}
							/>
						</div>
					)
				})
			}
			
			return (
				<div className="sponsor yow-block" id="block-editable-box">
					{sponsorFields}
					<Button isDefault onClick={addSponsor.bind(this)}>
						Add Sponsor
					</Button>
				</div>
			);
		},
	
		save(props) {
			return (
				<>
					<h2>Partners</h2>
					<div className="sponsors page">
						{props.attributes.sponsors.map((sponsor, index) => (
							<div className="sponsor" key={index}>
							<a href={sponsor.url} target="_blank" rel="nofollow noopener noreferrer">
								<img src={sponsor.logo} />
							</a>
						</div>
						))}
					</div>
				 </>
			);

		},
	});
}

export default sponsors