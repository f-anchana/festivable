"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

const navItems = [
  {
    label: "Mon festival",
    href: "/myfestival",
    icon: "/icones/dashboard/myfestival.svg",
    iconHover: "/icones/dashboard/myfestival_blue.svg",
  },
  {
    label: "Galerie",
    href: "/gallery",
    icon: "/icones/dashboard/gallery.svg",
    iconHover: "/icones/dashboard/gallery_blue.svg",
  },
  {
    label: "Questions d’accessibilités",
    href: "/accessibility",
    icon: "/icones/dashboard/accessibility.svg",
    iconHover: "/icones/dashboard/accessibility_blue.svg",
  },
  {
    label: "Carte",
    href: "/map-builder",
    icon: "/icones/dashboard/pindashboard.svg",
    iconHover: "/icones/dashboard/pindashboard_blue.svg",
  },
  {
    label: "Pictoaccess",
    href: "/pictoAccess",
    icon: "/icones/dashboard/meteor.svg",
    iconHover: "/icones/dashboard/meteor_blue.svg",
  },
  {
    label: "Recrutement",
    href: "/recrutement",
    icon: "/icones/dashboard/work.svg",
    iconHover: "/icones/dashboard/work_blue.svg",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={styles.sidebar}
      role="navigation"
      aria-label="Menu principal"
    >
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
      </div>

      <div className={styles.sidebar__bottom}>
        <button
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
