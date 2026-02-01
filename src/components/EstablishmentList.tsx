import { useState } from 'react';
import { Establishment, CategoryType } from '@/types/establishment';
import { formatDistance } from '@/lib/geolocation';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { MapPin, ChevronRight } from 'lucide-react';
import { EstablishmentDetailsModal } from './EstablishmentDetailsModal';

interface EstablishmentListProps {
  establishments: Establishment[];
  isLoading: boolean;
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

export const EstablishmentList = ({
  establishments,
  isLoading,
}: EstablishmentListProps) => {
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEstablishmentClick = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEstablishment(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-4 shadow-card animate-pulse"
          >
            <div className="h-5 bg-secondary rounded w-3/4 mb-2" />
            <div className="h-4 bg-secondary rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (establishments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MapPin className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p>Nenhum estabelecimento encontrado nas proximidades.</p>
        <p className="text-sm mt-1">Tente aumentar a área de busca.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-3">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {establishments.length} resultados encontrados
        </p>
        {establishments.map((establishment, index) => (
          <button
            key={establishment.id}
            onClick={() => handleEstablishmentClick(establishment)}
            className="w-full text-left bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-all duration-200 animate-slide-up cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {establishment.name}
                </h3>
                {establishment.address && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {establishment.address}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-1 rounded-full',
                      getCategoryColor(establishment.category)
                    )}
                  >
                    {getCategoryLabel(establishment.category)}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 flex items-center gap-2">
                <p className="text-sm font-semibold text-primary">
                  {formatDistance(establishment.distance)}
                </p>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <EstablishmentDetailsModal
        establishment={selectedEstablishment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
