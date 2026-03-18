import { useState } from "react";
import Header from "@/components/Header";
import HomePage from "@/components/pages/HomePage";
import CatalogPage from "@/components/pages/CatalogPage";
import { AboutPage, ContactsPage, CartPage, ProfilePage } from "@/components/pages/OtherPages";

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

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header
        page={page}
        cartCount={cart.length}
        menuOpen={menuOpen}
        navigate={navigate}
        setMenuOpen={setMenuOpen}
      />

      <main className="pt-20">
        {page === "home" && (
          <HomePage
            products={PRODUCTS}
            addedId={addedId}
            navigate={navigate}
            addToCart={addToCart}
            heroImg={HERO_IMG}
            aboutImg={ABOUT_IMG}
          />
        )}

        {page === "catalog" && (
          <CatalogPage
            products={PRODUCTS}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            addedId={addedId}
            addToCart={addToCart}
            navigate={navigate}
          />
        )}

        {page === "about" && <AboutPage aboutImg={ABOUT_IMG} />}

        {page === "contacts" && <ContactsPage />}

        {page === "cart" && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            navigate={navigate}
          />
        )}

        {page === "profile" && <ProfilePage />}
      </main>
    </div>
  );
}