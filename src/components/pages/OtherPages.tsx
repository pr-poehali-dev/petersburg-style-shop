import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "about" | "contacts" | "profile" | "cart";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  img: string;
}

// ===== ABOUT =====
interface AboutPageProps {
  aboutImg: string;
}

export function AboutPage({ aboutImg }: AboutPageProps) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">История бренда</p>
        <h1 className="font-serif text-5xl font-light mb-16">О нас</h1>
      </div>

      <div className="relative h-[50vh] overflow-hidden">
        <img src={aboutImg} alt="О нас" className="w-full h-full object-cover" />
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
  );
}

// ===== CONTACTS =====
export function ContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-foreground/40 mb-2">Свяжитесь с нами</p>
      <h1 className="font-serif text-5xl font-light mb-16">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Адрес</p>
            <p className="font-serif text-xl font-light">Стерлитамак</p>
            <p className="text-sm text-foreground/60 mt-1">улица Артёма, 77</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/40 mb-3">Часы работы</p>
            <div className="space-y-1 text-sm text-foreground/70">
              <p>Ежедневно: 10:00 – 20:00</p>
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
  );
}

// ===== CART =====
interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (idx: number) => void;
  navigate: (p: Page) => void;
}

export function CartPage({ cart, removeFromCart, navigate }: CartPageProps) {
  const totalPrice = cart.reduce((s, i) => s + i.price, 0);

  return (
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
  );
}

// ===== PROFILE =====
export function ProfilePage() {
  const [profileTab, setProfileTab] = useState<"orders" | "settings">("orders");

  return (
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
  );
}