'use client';

import { useDrag, DragPreviewImage } from 'react-dnd';

export default function DraggableIcon({ type, icon }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'ICON',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <DragPreviewImage connect={preview} src={icon} />
      <img
        ref={drag}
        src={icon}
        alt={type}
        width={32}
        height={32}
        style={{ cursor: 'grab', display: 'block' }}
        role="button"
        aria-label={`Ajouter un point d’intérêt : ${type}`}
        tabIndex={0}
      />
      <span style={{ fontSize: 14 }}>{getLabel(type)}</span>
    </div>
  );
}

function getLabel(type) {
  switch (type) {
    case 'exit':
      return 'Sortie de secours';
    case 'entry':
      return 'Entrée';
    case 'parking':
      return 'Parking';
    case 'safer':
      return 'Espace sécurité';
    case 'wc':
      return 'Toilettes';
    case 'food':
      return 'Restauration';
    case 'wifi':
      return 'Wi-Fi';
    case 'chill':
      return 'Espace détente';
    case 'merch':
      return 'Merchandising';
    default:
      return type;
  }
}
