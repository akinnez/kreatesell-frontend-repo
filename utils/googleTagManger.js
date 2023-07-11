export const dataLayerTrackingLink = (action) => {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `window.dataLayer = window.dataLayer || [];
                window dataLayer.push({${action}});
                `,
			}}
		/> 
	); 
};
