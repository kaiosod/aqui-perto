import { useState } from 'react';
import { categories } from '@/lib/categories';
import { CategoryType } from '@/types/establishment';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: CategoryType | null;
  onSelectCategory: (category: CategoryType) => void;
  onCustomSearch: (query: string) => void;
  disabled?: boolean;
}

export const CategorySelector = ({
  selectedCategory,
  onSelectCategory,
  onCustomSearch,
  disabled,
}: CategorySelectorProps) => {
  const [customQuery, setCustomQuery] = useState('');

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuery.trim()) {
      onCustomSearch(customQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-sm text-muted-foreground mb-3 text-center">
        O que você procura?
      </p>
      <div className="flex gap-3 justify-center mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            disabled={disabled}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200',
              'border-2 min-w-[100px]',
              'hover:scale-105 active:scale-95',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              selectedCategory === category.id
                ? 'border-primary bg-accent shadow-card'
                : 'border-transparent bg-secondary hover:bg-secondary/80'
            )}
          >
            <span className="text-2xl" role="img" aria-label={category.label}>
              {category.icon}
            </span>
            <span
              className={cn(
                'text-sm font-medium',
                selectedCategory === category.id
                  ? 'text-accent-foreground'
                  : 'text-secondary-foreground'
              )}
            >
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom search field */}
      <form onSubmit={handleCustomSearch} className="relative">
        <Input
          type="text"
          placeholder="Ou digite o que procura..."
          value={customQuery}
          onChange={(e) => setCustomQuery(e.target.value)}
          disabled={disabled}
          className="pr-10"
        />
        <button
          type="submit"
          disabled={disabled || !customQuery.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
