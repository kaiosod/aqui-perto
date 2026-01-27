import { useState, useCallback } from 'react';
import { LocationButton } from '@/components/LocationButton';
import { CategorySelector } from '@/components/CategorySelector';
import { EstablishmentList } from '@/components/EstablishmentList';
import { Location, Establishment, CategoryType } from '@/types/establishment';
import { getCurrentLocation, searchNearbyEstablishments } from '@/lib/geolocation';
import { MapPin } from 'lucide-react';

const Index = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleRequestLocation = useCallback(async () => {
    setLocationLoading(true);
    setLocationError(null);

    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
    } catch (error) {
      setLocationError(
        error instanceof Error ? error.message : 'Erro ao obter localização'
      );
    } finally {
      setLocationLoading(false);
    }
  }, []);

  const handleSelectCategory = useCallback(
    async (category: CategoryType) => {
      if (!location) return;

      setSelectedCategory(category);
      setSearchLoading(true);
      setEstablishments([]);

      try {
        const results = await searchNearbyEstablishments(location, category);
        setEstablishments(results);
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setSearchLoading(false);
      }
    },
    [location]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">
              Perto de Mim
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Location Section */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Encontre o que precisa
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Localize estabelecimentos próximos de você de forma rápida e simples.
            </p>
            <LocationButton
              location={location}
              isLoading={locationLoading}
              error={locationError}
              onRequestLocation={handleRequestLocation}
            />
          </section>

          {/* Category Selection */}
          {location && (
            <section className="w-full animate-fade-in">
              <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                disabled={searchLoading}
              />
            </section>
          )}

          {/* Results */}
          {selectedCategory && (
            <section className="w-full animate-fade-in">
              <EstablishmentList
                establishments={establishments}
                isLoading={searchLoading}
              />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container max-w-2xl mx-auto px-4 py-6 mt-auto">
        <p className="text-xs text-center text-muted-foreground">
          Dados fornecidos por OpenStreetMap
        </p>
      </footer>
    </div>
  );
};

export default Index;
