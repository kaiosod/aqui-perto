import { categories } from '@/lib/categories';
import { CategoryType } from '@/types/establishment';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selectedCategory: CategoryType | null;
  onSelectCategory: (category: CategoryType) => void;
  disabled?: boolean;
}

export const CategorySelector = ({
  selectedCategory,
  onSelectCategory,
  disabled,
}: CategorySelectorProps) => {
  return (
    <div className="w-full max-w-md">
      <p className="text-sm text-muted-foreground mb-3 text-center">
        O que você procura?
      </p>
      <div className="flex gap-3 justify-center">
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
    </div>
  );
};
