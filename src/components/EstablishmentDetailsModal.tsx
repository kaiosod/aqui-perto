import { Establishment, CategoryType } from '@/types/establishment';
import { formatDistance } from '@/lib/geolocation';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EstablishmentDetailsModalProps {
  establishment: Establishment | null;
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryColor = (category: CategoryType): string => {
  switch (category) {
    case 'restaurant':
      return 'bg-orange-100 text-orange-700';
    case 'pharmacy':
      return 'bg-emerald-100 text-emerald-700';
    case 'supermarket':
      return 'bg-sky-100 text-sky-700';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

const getCategoryLabel = (categoryId: CategoryType): string => {
  if (categoryId === 'custom') return 'Outros';
  return categories.find((c) => c.id === categoryId)?.label || categoryId;
};

export const EstablishmentDetailsModal = ({
  establishment,
  isOpen,
  onClose,
}: EstablishmentDetailsModalProps) => {
  if (!establishment) return null;

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${establishment.lat},${establishment.lon}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left pr-8">{establishment.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-xs font-medium px-2 py-1 rounded-full',
                getCategoryColor(establishment.category)
              )}
            >
              {getCategoryLabel(establishment.category)}
            </span>
            <span className="text-sm font-semibold text-primary">
              {formatDistance(establishment.distance)}
            </span>
          </div>

          {/* Address Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço
            </h4>
            {establishment.address ? (
              <p className="text-sm text-muted-foreground pl-6">
                {establishment.address}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground pl-6 italic">
                Endereço não disponível
              </p>
            )}
            <p className="text-xs text-muted-foreground pl-6">
              Coordenadas: {establishment.lat.toFixed(6)}, {establishment.lon.toFixed(6)}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenInMaps}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Navigation className="h-4 w-4" />
            Abrir no Google Maps
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
