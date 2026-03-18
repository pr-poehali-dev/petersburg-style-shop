import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/184af24a-d056-40e9-8e5f-da59f6e07f91/files/9c1996bb-eabc-4f30-a1f8-864bc1b9040c.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/184af24a-d056-40e9-8e5f-da59f6e07f91/files/4d801943-4964-475a-a207-6deec171e8ca.jpg";
const PRODUCT_IMG = "https://cdn.poehali.dev/projects/184af24a-d056-40e9-8e5f-da59f6e07f91/files/492782fd-33c8-4fbb-8ae4-9596a3c62657.jpg";

type Page = "home" | "catalog" | "about" | "contacts" | "profile" | "cart";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  img: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  isNew?: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Пальто шерстяное «Нева»", price: 18900, category: "Верхняя одежда", img: PRODUCT_IMG, isNew: true },
  { id: 2, name: "Блуза шёлковая «Белые ночи»", price: 6400, category: "Блузы", img: PRODUCT_IMG },
  { id: 3, name: "Брюки классические «Мойка»", price: 8200, category: "Брюки", img: PRODUCT_IMG, isNew: true },
  { id: 4, name: "Платье «Летний сад»", price: 12500, category: "Платья", img: PRODUCT_IMG },
  { id: 5, name: "Жакет твидовый «Эрмитаж»", price: 14300, category: "Жакеты", img: PRODUCT_IMG },
  { id: 6, name: "Юбка миди «Фонтанка»", price: 7100, category: "Юбки", img: PRODUCT_IMG },
  { id: 7, name: "Кардиган «Балтийский»", price: 9600, category: "Трикотаж", img: PRODUCT_IMG },
  { id: 8, name: "Платье «Дворцовая»", price: 15800, category: "Платья", img: PRODUCT_IMG, isNew: true },
];

const CATEGORIES = ["Все", "Верхняя одежда", "Платья", "Блузы", "Брюки", "Жакеты", "Юбки", "Трикотаж"];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [profileTab, setProfileTab] = useState<"orders" | "settings">("orders");

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, { id: product.id, name: product.name, price: product.price, size: "M", img: product.img }]);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const removeFromCart = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const totalPrice = cart.reduce((s, i) => s + i.price, 0);

  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground hover:opacity-70 transition-opacity leading-none">
            Петербургский стиль
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {(["home", "catalog", "about", "contacts"] as Page[]).map((p) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`nav-link text-xs uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity ${page === p ? "active" : ""}`}
              >
                {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : p === "about" ? "О нас" : "Контакты"}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("profile")} className="relative hover:opacity-60 transition-opacity">
              <Icon name="User" size={20} />
            </button>
            <button onClick={() => navigate("cart")} className="relative hover:opacity-60 transition-opacity">
              <Icon name="ShoppingBag" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                  {cart.length}
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
            {(["home", "catalog", "about", "contacts"] as Page[]).map((p) => (
              <button key={p} onClick={() => navigate(p)} className="text-left text-sm uppercase tracking-widest text-foreground py-1">
                {p === "home" ? "Главная" : p === "catalog" ? "Каталог" : p === "about" ? "О нас" : "Контакты"}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ===== HOME ===== */}
        {page === "home" && (
          <div>
            <section className="relative h-[92vh] overflow-hidden">
              <img src={HERO_IMG} alt="Петербургский стиль" className="w-full h-full object-cover object-center" />
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
                {PRODUCTS.filter(p => p.isNew).map((product) => (
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

            <section className="bg-[hsl(var(--muted))] py-20">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={ABOUT_IMG} alt="О нас" className="w-full h-full object-cover" />
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
        )}

        {/* ===== CATALOG ===== */}
        {page === "catalog" && (
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
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && (
          <div>
            <div className="max-w-7xl mx-auto px-6 py-12">
              <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">История бренда</p>
              <h1 className="font-serif text-5xl font-light mb-16">О нас</h1>
            </div>

            <div className="relative h-[50vh] overflow-hidden">
              <img src={ABOUT_IMG} alt="О нас" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-serif text-3xl font-light mb-6">Наша история</h2>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  Бренд «Петербургский стиль» был основан в 2015 году в Санкт-Петербурге. С самого начала мы создаём одежду, которая отражает характер нашего города — строгость и изящество, сдержанность и глубину.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  Каждая коллекция — это диалог с городом: его набережными, парадными, музейными залами. Мы черпаем вдохновение в петербургской архитектуре и северном свете.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Сегодня у нас небольшая, но слаженная команда дизайнеров и технологов, которые создают каждую вещь с любовью к деталям.
                </p>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-light mb-6">Наши ценности</h2>
                <div className="space-y-6">
                  {[
                    { title: "Качество материалов", text: "Работаем только с сертифицированными российскими и европейскими производителями тканей." },
                    { title: "Осознанное производство", text: "Небольшие тиражи, минимальный остаток — мы против перепроизводства в индустрии моды." },
                    { title: "Вечные силуэты", text: "Создаём вещи вне трендов — те, что останутся актуальными через 10 лет." },
                  ].map(item => (
                    <div key={item.title} className="border-l-2 border-[hsl(var(--border))] pl-4">
                      <p className="font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-sm text-foreground/60 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--muted))] py-16 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-serif text-4xl font-light italic mb-6">«Одежда — это язык, на котором вы говорите с миром»</h2>
                <p className="text-sm text-foreground/50 uppercase tracking-widest">Основатель бренда</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {page === "contacts" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Свяжитесь с нами</p>
            <h1 className="font-serif text-5xl font-light mb-16">Контакты</h1>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Адрес</p>
                  <p className="font-serif text-xl font-light">Санкт-Петербург</p>
                  <p className="text-sm text-foreground/60 mt-1">Невский проспект, 28<br />вход со стороны двора</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Часы работы</p>
                  <div className="space-y-1 text-sm text-foreground/70">
                    <p>Понедельник — Пятница: 10:00 – 20:00</p>
                    <p>Суббота: 11:00 – 19:00</p>
                    <p>Воскресенье: 12:00 – 18:00</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Телефон и почта</p>
                  <p className="text-sm text-foreground/70">+7 (812) 000-00-00</p>
                  <p className="text-sm text-foreground/70">info@peterstyle.ru</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Социальные сети</p>
                  <div className="flex gap-4">
                    {["ВКонтакте", "Телеграм", "Pinterest"].map(s => (
                      <button key={s} className="text-xs uppercase tracking-widest border border-[hsl(var(--border))] px-3 py-2 hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/40 mb-6">Написать нам</p>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Ваше имя</label>
                    <input type="text" placeholder="Имя и фамилия" className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Email</label>
                    <input type="email" placeholder="your@email.com" className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Сообщение</label>
                    <textarea rows={5} placeholder="Ваш вопрос или пожелание..." className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-foreground/80 transition-colors">
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ===== CART ===== */}
        {page === "cart" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Ваш выбор</p>
            <h1 className="font-serif text-5xl font-light mb-12">Корзина</h1>

            {cart.length === 0 ? (
              <div className="text-center py-24">
                <Icon name="ShoppingBag" size={40} className="mx-auto mb-4 text-foreground/20" />
                <p className="font-serif text-2xl font-light text-foreground/40 mb-6">Корзина пуста</p>
                <button onClick={() => navigate("catalog")} className="text-xs uppercase tracking-widest border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 py-4 border-b border-[hsl(var(--border))]">
                      <div className="w-20 h-24 bg-[hsl(var(--muted))] overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-base font-light">{item.name}</p>
                        <p className="text-xs text-foreground/40 uppercase tracking-widest mt-1">Размер: {item.size}</p>
                        <p className="text-sm mt-2">{item.price.toLocaleString("ru-RU")} ₽</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-foreground/30 hover:text-foreground transition-colors">
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-[hsl(var(--muted))] p-6 h-fit">
                  <p className="text-xs uppercase tracking-widest text-foreground/40 mb-4">Итого</p>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Товаров: {cart.length}</span>
                    <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between mb-6 text-sm">
                    <span>Доставка</span>
                    <span className="text-foreground/40">Бесплатно</span>
                  </div>
                  <div className="border-t border-[hsl(var(--border))] pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span className="font-serif text-lg">К оплате</span>
                      <span className="font-serif text-lg">{totalPrice.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                  <button className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-foreground/80 transition-colors">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PROFILE ===== */}
        {page === "profile" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Личный кабинет</p>
            <h1 className="font-serif text-5xl font-light mb-12">Профиль</h1>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-foreground/30" />
                </div>
                <div>
                  <p className="font-serif text-xl font-light">Гость</p>
                  <p className="text-xs text-foreground/40 uppercase tracking-widest mt-1">Не авторизован</p>
                </div>
                <button className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-foreground/80 transition-colors">
                  Войти в аккаунт
                </button>
                <button className="w-full border border-[hsl(var(--border))] text-foreground py-3 text-xs uppercase tracking-widest hover:border-foreground transition-colors">
                  Зарегистрироваться
                </button>
              </div>

              <div className="md:col-span-2">
                <div className="flex gap-6 border-b border-[hsl(var(--border))] mb-8">
                  {(["orders", "settings"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setProfileTab(tab)}
                      className={`pb-3 text-xs uppercase tracking-widest transition-colors border-b-2 -mb-px ${profileTab === tab ? "border-foreground text-foreground" : "border-transparent text-foreground/40"}`}
                    >
                      {tab === "orders" ? "Мои заказы" : "Настройки"}
                    </button>
                  ))}
                </div>

                {profileTab === "orders" && (
                  <div className="text-center py-16">
                    <Icon name="Package" size={40} className="mx-auto mb-4 text-foreground/20" />
                    <p className="font-serif text-xl font-light text-foreground/40">Здесь будут ваши заказы</p>
                    <p className="text-xs text-foreground/30 mt-2 uppercase tracking-widest">Войдите, чтобы увидеть историю заказов</p>
                  </div>
                )}

                {profileTab === "settings" && (
                  <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Имя</label>
                      <input type="text" placeholder="Ваше имя" className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Email</label>
                      <input type="email" placeholder="your@email.com" className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Телефон</label>
                      <input type="tel" placeholder="+7 (000) 000-00-00" className="w-full border border-[hsl(var(--border))] bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground transition-colors" />
                    </div>
                    <button type="submit" className="bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-foreground/80 transition-colors">
                      Сохранить
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}