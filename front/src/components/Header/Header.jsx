'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Header(){
  return (
    <nav className="font-[Poppins] w-full px-5 py-3 fixed top-0 left-0 z-50 ">
<div className="flex justify-between items-center mx-12 h-[100px]">
        {/* LOGO */}
        <Link href="/" >
          <Image 
            src="/logo/Logo_Festivable.svg" 
            alt="Accueil" 
            width={120} 
            height={60} 
            className="w-auto h-auto max-w-[150px] object-contain"
          />
        </Link>

        {/* MENU BURGER */}
        <button 
          className="md:hidden p-2 text-black" 
          onClick={() => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu?.classList.toggle('hidden');
          }} // Toggle visibility du menu mobile
        >
          <Image src="/icones/burger-menu.svg" alt="Menu" width={30} height={30} />
        </button>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center gap-10 ml-[70px]  text-sm">
          <li className="flex gap-2">
            <a href="#">Accessibilité</a>
            <img className="ml-2" src="/icones/menu-roll.svg" alt="" />
          </li>
          <li><Link href="#">Festivals</Link></li>
          <li className="flex  gap-2">
            <a href="#">À propos</a>
            <img className="ml-2" src="/icones/menu-roll.svg" alt="" />
          </li>
          <li><Link href="#">Forum</Link></li>
        </ul>

        {/* BOUTONS AUTH (Desktop) */}
        <div className="hidden md:flex gap-5 text-sm">
          <Link href="/form" className="bg-[var(--foreground)] text-white rounded-full px-6 py-3">
            Se connecter
          </Link>
          <Link href="/login" className="bg-[var(--background)] text-black rounded-full px-6 py-3">
            S'inscrire
          </Link>
        </div>
      </div>

      {/* MENU MOBILE (Affiché si isMenuOpen est true) */}
      <div 
        id="mobile-menu" 
        className="absolute bg-white w-full left-0 top-16 hidden md:hidden " 
      >
        <ul className="flex flex-col items-center gap-5 py-5">
          <li className="flex">
            <a href="#">Accessibilité</a>
            <img className="ml-2" src="/icones/menu-roll.svg" alt="" />
          </li>
          <li><Link href="#">Festivals</Link></li>
          <li className="flex">
            <a href="#">À propos</a>
            <img className="ml-2" src="/icones/menu-roll.svg" alt="" />
          </li>
          <li><Link href="#">Forum</Link></li>
        </ul>

        {/* BOUTONS AUTH (Mobile) */}
        <div className="flex flex-col items-center gap-3 pb-5">
          <Link 
            href="/form" 
            className="bg-[var(--foreground)] text-white rounded-full px-6 py-3 w-4/5 text-center"
          >
            Se connecter
          </Link>
          <Link 
            href="/login" 
            className="bg-[var(--background)] text-black rounded-full px-6 py-3 w-4/5 text-center"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
};
