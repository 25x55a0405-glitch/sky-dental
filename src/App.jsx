import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Dynamically load the SkyChat widget script
    const script = document.createElement('script');
    script.src = 'https://widget-two-pi.vercel.app/skychat.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up script on unmount
    return () => {
      script.remove();
      const widgetRoot = document.getElementById('skychat-root');
      if (widgetRoot) widgetRoot.remove();
    };
  }, []);

  return (
    <div>
      {/* Your App content goes here */}
    </div>
  );
}

export default App;
