import React, { useEffect } from 'react';

export default function MapPage(props) {
  //   useEffect(() => {
  //     const script = document.createElement('script');

  //     // script.src = 'showMap.js';
  //     script.async = true;
  //     script.innerHTML = `
  //     Mapwize.apiKey('1f04d780dc30b774c0c10f53e3c7d4ea');

  // Mapwize.map({
  //   container: 'mapwize',
  // })
  //   .then((mapInstance) => {
  //     console.log('Maps is now ready to be used');
  //   })
  //   .catch((err) => {
  //     // Something bad happened during Mapwize loading
  //     console.error(err);
  //   });
  // `;

  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  return <div id="mapwize">
    
  </div>;
}
