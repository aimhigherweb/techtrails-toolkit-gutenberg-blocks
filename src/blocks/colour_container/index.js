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
				default: '#F9ED31'
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
					name: 'Aqua',
					slug: 'aqua',
					color: '#00A9A3',
				},
				{
					name: 'Orange',
					slug: 'orange',
					color: '#F15A29',
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
			];

			let colour = props.attributes.colour

			return (
				<div className="colour-container" style={{'--background': colour }}>
					{
						<InspectorControls>
							<h2>Colour settings</h2>
							<ColorPalette
								colors={colours}
								value={colour}
								disableCustomColors='true'
								clearable="false"
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
		let colour = props.attributes.colour
		
		return (
			<div className="colour-container" style={{'--background': colour }}>
				<InnerBlocks.Content/>
			</div>
		);

		},
	});
}

export default colourContainer