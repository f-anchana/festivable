'use client';

import dynamic from 'next/dynamic';

const MapCanvas = dynamic(() => import('../MapCanvas/MapCanvas'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

export default MapCanvas;
