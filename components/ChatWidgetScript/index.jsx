import Script from 'next/script';

const ChatScript = () => {
	return (
		<Script
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
				var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
				(function(){
				var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
				s1.async=true;
				s1.src='https://embed.tawk.to/635fd218daff0e1306d4ea11/1ggn4pcnt';
				s1.charset='UTF-8';
				s1.setAttribute('crossorigin','*');
				s0.parentNode.insertBefore(s1,s0);
				})(); 
  `,
			}}
		/>
	);
};

export default ChatScript;
