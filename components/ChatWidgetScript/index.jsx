import Script from "next/script";

const ChatScript = () => {
  return (
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
    window.WhelpConfig = {
		app_id: '78b9de75570f6c27d81813acb7fd0500'
	};

	(function(w, d){
		function l(){
			var s = d.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = 'https://widget.getwhelp.com/widget.js';
			s.onload = function () {
				Whelp.Init();
			};
			var x = d.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(s, x);
		}
		if(w.attachEvent){w.attachEvent('onload', l);}
		else{w.addEventListener('load', l, false);}
	})(window, document);
  `,
      }}
    />
  );
};

export default ChatScript;
