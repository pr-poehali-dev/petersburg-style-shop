import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "about" | "contacts" | "profile" | "cart";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  isNew?: boolean;
}

interface HomePageProps {
  products: Product[];
  addedId: number | null;
  navigate: (p: Page) => void;
  addToCart: (product: Product) => void;
  heroImg: string;
  aboutImg: string;
}

export default function HomePage({ products, addedId, navigate, addToCart, heroImg, aboutImg }: HomePageProps) {
  const newProducts = products.filter(p => p.isNew);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[92vh] overflow-hidden">
        <img src={heroImg} alt="Петербургский стиль" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/60 mb-4 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            Новая коллекция · Весна 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
            Элегантность<br />петербургского<br /><em>духа</em>
          </h1>
          <p className="text-sm text-foreground/60 max-w-xs mb-8 font-light leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Одежда для женщин, которые ценят стиль, качество и петербургский характер
          </p>
          <button
            onClick={() => navigate("catalog")}
            className="animate-fade-in w-fit px-8 py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-foreground/80 transition-colors"
            style={{ animationDelay: "0.55s", opacity: 0 }}
          >
            Смотреть каталог
          </button>
        </div>
      </section>

      {/* New arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Коллекция</p>
            <h2 className="font-serif text-4xl font-light">Новинки</h2>
          </div>
          <button onClick={() => navigate("catalog")} className="nav-link text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors hidden md:flex items-center gap-2">
            Весь каталог <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <div key={product.id} className="product-card group cursor-pointer">
              <div className="relative overflow-hidden bg-[hsl(var(--muted))] aspect-[3/4] mb-3">
                <img src={product.img} alt={product.name} className="product-card-img w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="bg-foreground text-background text-[10px] uppercase tracking-widest px-2 py-1">Новинка</span>
                </div>
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
      </section>

      {/* About strip */}
      <section className="bg-[hsl(var(--muted))] py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={aboutImg} alt="О нас" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-4">О бренде</p>
            <h2 className="font-serif text-4xl font-light leading-snug mb-6">
              Создано в Петербурге,<br /><em>для петербурженок</em>
            </h2>
            <p className="text-sm text-foreground/60 leading-relaxed mb-4">
              Петербургский стиль — это бренд женской одежды, который создаёт вещи с характером: строгие линии, натуральные ткани, внимание к деталям.
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed mb-8">
              Каждая модель рождается из любви к городу — его архитектуре, сдержанной красоте и вечному диалогу прошлого и настоящего.
            </p>
            <button onClick={() => navigate("about")} className="nav-link text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
              Узнать больше <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-serif text-lg mb-1">Петербургский стиль</p>
            <p className="text-xs text-foreground/40">© 2026 Все права защищены</p>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-foreground/50">
            <button onClick={() => navigate("catalog")} className="hover:text-foreground transition-colors">Каталог</button>
            <button onClick={() => navigate("about")} className="hover:text-foreground transition-colors">О нас</button>
            <button onClick={() => navigate("contacts")} className="hover:text-foreground transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
