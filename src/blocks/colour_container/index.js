import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, BlockControls, withColors, PanelColourSettings } from '@wordpress/block-editor';
import { ColorPalette } from '@wordpress/components';

const colourContainer = () => {
	registerBlockType('techtrails/colour-container', {
		title: 'Coloured Container',
		icon: 'align-center',
		category: 'layout',
		attributes: {
			colour: {
				type: 'string',
				default: false
			},
		},
		edit(props) {
			const colours = [
				{
					name: 'Yellow',
					slug: 'yellow',
					color: '#F9ED31',
				},
				{
					name: 'Blue',
					slug: 'blue',
					color: '#70CFCB',
				},
				{
					name: 'Orange',
					slug: 'orange',
					color: '#F79C7F',
				},
				{
					name: 'Green',
					slug: 'green',
					color: '#BED73B',
				},
				{
					name: 'Maroon',
					slug: 'maroon',
					color: '#BE1E2D',
                },
                {
					name: 'Purple',
					slug: 'purple',
					color: '#6F2B8D',
				},
				{
					name: 'White',
					slug: 'white',
					color: '#ffffff'
				},
			];

			let colour = props.attributes.colour,
			styles = {}
			
			if(colour) {
				styles = {'--background': colour }
			}

			return (
				<div className="colour-container" style={styles}>
					{
						<InspectorControls>
							<h2>Colour settings</h2>
							<ColorPalette
								colors={colours}
								value={colour}
								disableCustomColors='true'
								onChange={ (e) => {
									props.setAttributes({colour: e})
								} }
							/>
						</InspectorControls>
					}
					<InnerBlocks/>
				</div>
			);
		},
	
	save(props) {
		let colour = props.attributes.colour,
			styles = {}
			
			if(colour) {
				styles = {'--background': colour }
			}
		
		return (
			<div className="colour-container" style={styles}>
				<div className="container"><InnerBlocks.Content/></div>
			</div>
		);

		},
	});
}

export default colourContainer