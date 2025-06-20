import React from "react";
import Image from "next/image";

export default function mentionLegale() {
  return (
    <main
      style={{
        position: "relative",
        padding: "2rem",
        maxWidth: "1500px",
        margin: "auto",
        lineHeight: "1.6",
        marginTop: "6rem",
      }}
    >
      {/* Image bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: -1,
        }}
      >
        <Image src="/decor/homepage-deco.png" alt="" width={80} height={80} />
      </div>

      {/* Image top-right */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: -1,
        }}
      >
        <Image src="/decor/homepage-deco1.png" alt="" width={200} height={200} />
      </div>

      {/* Titre principal */}
      <h1
        style={{
          backgroundColor: "#1D1D1D",
          fontSize: "2rem",
          fontWeight: 800,
          color: "white",
          padding: "6px 14px",
          borderRadius: "4px",
          display: "inline-block",
          marginBottom: "40px",
        }}
      >
        Mentions Légales
      </h1>
<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Éditeur du site
</h2>

      <ul>
        <li>Nom du site : Festiv'able</li>
        <li>Éditeur : [Nom de la personne ou de la société]</li>
        <li>Adresse : [Adresse complète]</li>
        <li>Téléphone : [Numéro de téléphone]</li>
        <li>Email : [Adresse email de contact]</li>
        <li>Numéro SIRET : [Numéro SIRET si applicable]</li>
        <li>Directeur de la publication : [Nom du directeur de la publication]</li>
      </ul>

      <br />

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>

Héberger </h2>      <ul>
        <li>Nom de l’hébergeur : O2Switch</li>
        <li>Adresse : Chem. des Pardiaux, 63000 Clermont-Ferrand</li>
        <li>Téléphone : 04 44 44 60 40</li>
      </ul>

      <br />

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
Propriété intelectuelle</h2>      <p>
        L’ensemble des contenus présents sur ce site (textes, images, logos, vidéos, sons, etc.)
        sont protégés par le droit d’auteur. Toute reproduction, représentation, modification,
        publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou
        le procédé utilisé, est interdite sans l’autorisation écrite préalable de [Nom de l’éditeur].
      </p>

      <br />

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Données personnelles
</h2>      <p>
        Vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition
        concernant vos données personnelles. Vous pouvez exercer ce droit en contactant :
        contact@festivable.com.
      </p>
    </main>
  );
}
