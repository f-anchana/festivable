'use client';

import DraggableIcon from '../DraggableIcon/DraggableIcon';

export default function IconPalette({ polygonStyle, setPolygonStyle, center }) {
  if (!center) return null;

  const icons = [
    { type: 'exit', icon: '/icones/map-builder/exit.svg' },
    { type: 'entry', icon: '/icones/map-builder/entry.svg' },
    { type: 'parking', icon: '/icones/map-builder/parking.svg' },
    { type: 'safer', icon: '/icones/map-builder/safer.svg' },
    { type: 'wc', icon: '/icones/map-builder/wc.svg' },
    { type: 'food', icon: '/icones/map-builder/food.svg' },
    { type: 'wifi', icon: '/icones/map-builder/wifi.svg' },
    { type: 'chill', icon: '/icones/map-builder/chill.svg' },
    { type: 'merch', icon: '/icones/map-builder/merch.svg' },
  ];

  return (
    <div style={{ width: 250, background: '#f4f4f4', padding: 10 }}>
      {icons.map((i) => (
        <div key={i.type} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <DraggableIcon {...i} />
        </div>
      ))}
    </div>
  );
}
