"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./SidebarAdmin.module.scss";

const navItems = [
  { label: "Tableau de bord", href: "/admin-dashboard" },
  { label: "Gestion des festivals", href: "/festival-management" },
  { label: "Gestion des organisateurs", href: "/admin/organisateurs" },
  { label: "Rôles et permissions", href: "/admin/roles" },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token JWT
    router.push("/"); // Redirige vers la page d'accueil ou de login
  };

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
        <h2>Espace Admin</h2>
      </div>

      <nav className={styles.sidebar__nav}>
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`${styles.sidebar__link} ${
                isActive ? styles.active : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

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
