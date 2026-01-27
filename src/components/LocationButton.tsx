import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/establishment';

interface LocationButtonProps {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  onRequestLocation: () => void;
}

export const LocationButton = ({
  location,
  isLoading,
  error,
  onRequestLocation,
}: LocationButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        onClick={onRequestLocation}
        disabled={isLoading}
        size="lg"
        className="gap-2 px-6 py-6 text-base font-medium shadow-card hover:shadow-elevated transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Localizando...</span>
          </>
        ) : location ? (
          <>
            <MapPin className="h-5 w-5" />
            <span>Localização detectada</span>
          </>
        ) : (
          <>
            <MapPin className="h-5 w-5" />
            <span>Usar minha localização</span>
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}

      {location && !error && (
        <p className="text-sm text-muted-foreground animate-fade-in">
          Coordenadas: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
        </p>
      )}
    </div>
  );
};
