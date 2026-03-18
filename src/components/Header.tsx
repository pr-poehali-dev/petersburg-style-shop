import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "about" | "contacts" | "profile" | "cart";

interface HeaderProps {
  page: Page;
  cartCount: number;
  menuOpen: boolean;
  navigate: (p: Page) => void;
  setMenuOpen: (open: boolean) => void;
}

const NAV_PAGES: Page[] = ["home", "catalog", "about", "contacts"];
const PAGE_LABELS: Record<string, string> = {
  home: "Главная",
  catalog: "Каталог",
  about: "О нас",
  contacts: "Контакты",
};

export default function Header({ page, cartCount, menuOpen, navigate, setMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <nav className="hidden md:flex items-center gap-8">
          {NAV_PAGES.map((p) => (
            <button
              key={p}
              onClick={() => navigate(p)}
              className={`nav-link text-xs uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity ${page === p ? "active" : ""}`}
            >
              {PAGE_LABELS[p]}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("home")}
          className="brand-title absolute left-1/2 -translate-x-1/2 font-serif text-3xl md:text-5xl font-bold leading-none whitespace-nowrap"
        >
          Петербургский стиль
        </button>

        <div className="flex items-center gap-4 ml-auto">
          <button onClick={() => navigate("profile")} className="relative hover:opacity-60 transition-opacity">
            <Icon name="User" size={20} />
          </button>
          <button onClick={() => navigate("cart")} className="relative hover:opacity-60 transition-opacity">
            <Icon name="ShoppingBag" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden hover:opacity-60 transition-opacity" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[hsl(var(--border))] px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {NAV_PAGES.map((p) => (
            <button key={p} onClick={() => navigate(p)} className="text-left text-sm uppercase tracking-widest text-foreground py-1">
              {PAGE_LABELS[p]}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}