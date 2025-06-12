"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.scss";

const navItems = [
  {
    label: "Informations",
    href: "/myfestival",
    icon: "/icones/dashboard/1.svg",
    iconHover: "/icones/dashboard/1_blue.svg",
  },
  {
    label: "Galerie",
    href: "/gallery",
    icon: "/icones/dashboard/2.svg",
    iconHover: "/icones/dashboard/2_blue.svg",
  },
  {
    label: "Accessibilités",
    href: "/accessibility",
    icon: "/icones/dashboard/3.svg",
    iconHover: "/icones/dashboard/3_blue.svg",
  },
  {
    label: "Carte",
    href: "/map-builder",
    icon: "/icones/dashboard/4.svg",
    iconHover: "/icones/dashboard/4_blue.svg",
  },
  {
    label: "Pictoaccess",
    href: "/pictoAccess",
    icon: "/icones/dashboard/5.svg",
    iconHover: "/icones/dashboard/5_blue.svg",
  },
  {
    label: "Recrutement",
    href: "/recrutement",
    icon: "/icones/dashboard/6.svg",
    iconHover: "/icones/dashboard/6_blue.svg",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [festivalId, setFestivalId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const fetchFestival = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-festival`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data?._id) {
          setFestivalId(data._id);
        }
      } catch (err) {
        console.error("Erreur chargement festival :", err);
      }
    };

    fetchFestival();
  }, []);

  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Menu principal">
      <div className={styles.sidebar__top}>
        <div className={styles.sidebar__logo}>
          <Link href="/" aria-label="Retour à l'accueil">
            <Image
              src="/logo/Logo_Festivable_white.svg"
              alt="Logo Festivable"
              width={40}
              height={20}
              priority
            />
          </Link>
          <h2>Mon festival</h2>
        </div>
      </div>

      <nav className={styles.sidebar__nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.sidebar__link} ${
              pathname === item.href ? styles.active : ""
            }`}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <div className={styles.sidebar__iconWrapper}>
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className={styles.sidebar__iconDefault}
                aria-hidden="true"
              />
              <Image
                src={item.iconHover}
                alt=""
                width={20}
                height={20}
                className={styles.sidebar__iconHover}
                aria-hidden="true"
              />
            </div>
            <span className={styles.sidebar__label}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {festivalId && (
        <div className={styles.sidebar__preview}>
          <Link
            href={`/preview/${festivalId}`}
            className={`${styles.sidebar__link} ${
              pathname === `/preview/${festivalId}` ? styles.active : ""
            }`}
            aria-current={pathname === `/preview/${festivalId}` ? "page" : undefined}
          >
            <div className={styles.sidebar__iconWrapper}>
              <Image
                src="/icones/dashboard/eye.svg"
                alt=""
                width={20}
                height={20}
                className={styles.sidebar__iconDefault}
                aria-hidden="true"
              />
            </div>
            <span className={styles.sidebar__label}>Prévisualiser ma page</span>
          </Link>
        </div>
      )}

      <div className={styles.sidebar__bottom}>
        <button
          onClick={handleLogout}
          className={styles.sidebar__footerLink}
          aria-label="Se déconnecter"
        >
          <span className={styles.sidebar__iconWrapper}>
            <Image
              src="/icones/dashboard/logout.svg"
              alt=""
              width={20}
              height={20}
              className={styles.sidebar__iconDefault}
              aria-hidden="true"
            />
          </span>
          <span className={styles.sidebar__label}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
