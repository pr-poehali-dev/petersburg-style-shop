type Page = "home" | "catalog" | "about" | "contacts" | "profile" | "cart";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  isNew?: boolean;
}

const CATEGORIES = ["Все", "Верхняя одежда", "Платья", "Блузы", "Брюки", "Жакеты", "Юбки", "Трикотаж"];

interface CatalogPageProps {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  addedId: number | null;
  addToCart: (product: Product) => void;
  navigate: (p: Page) => void;
}

export default function CatalogPage({ products, activeCategory, setActiveCategory, addedId, addToCart }: CatalogPageProps) {
  const filteredProducts = activeCategory === "Все"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Коллекция 2026</p>
        <h1 className="font-serif text-5xl font-light">Каталог</h1>
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
              activeCategory === cat
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-[hsl(var(--border))] hover:border-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card group cursor-pointer">
            <div className="relative overflow-hidden bg-[hsl(var(--muted))] aspect-[3/4] mb-3">
              <img src={product.img} alt={product.name} className="product-card-img w-full h-full object-cover" />
              {product.isNew && (
                <div className="absolute top-3 left-3">
                  <span className="bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1">Новинка</span>
                </div>
              )}
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-3 left-3 right-3 bg-white/95 text-foreground text-xs uppercase tracking-widest py-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                {addedId === product.id ? "Добавлено ✓" : "В корзину"}
              </button>
            </div>
            <p className="text-xs text-foreground/40 uppercase tracking-widest mb-1">{product.category}</p>
            <p className="font-serif text-base font-light">{product.name}</p>
            <p className="text-sm mt-1">{product.price.toLocaleString("ru-RU")} ₽</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="font-serif text-2xl font-light text-foreground/40">В этой категории пока нет товаров</p>
        </div>
      )}
    </div>
  );
}
