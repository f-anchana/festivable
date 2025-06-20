import React from "react";
import Image from "next/image";



export default function politiqueConfidentialite() {
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
        POLITIQUE DE CONFIDENTIALITÉ
      </h1>

      <p><strong>Dernière mise à jour : 16/05/2025</strong></p>

      <p>
        Chez Festiv'able, la protection de vos données personnelles est une priorité.
        Cette politique vous informe de la manière dont nous collectons, utilisons, stockons et protégeons vos données
        personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
      </p>

      <br/>

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Qui sommes-nous?
</h2>      <p>
        Festiv'able est une plateforme qui recense des festivals accessibles aux personnes en situation de handicap,
        et facilite la mise en relation entre festivaliers, organisateurs et partenaires.
      </p>
      <ul>
        <li><strong>Responsable du traitement :</strong> Festiv'able – APF France handicap</li>
        <li><strong>Contact :</strong> contact@festivable.com</li>
      </ul>

 <br />
<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Quelles données collectons-nous?
</h2>      <p>Selon votre utilisation du site, nous pouvons collecter les données suivantes :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (organisateurs)</li>
        <li>Informations liées à l’accessibilité des festivals</li>
        <li>Données de navigation (cookies, pages visitées, etc.)</li>
      </ul>

      <br/>

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Comment utilisons-nous vos données?
</h2>      <p>Nous utilisons vos données uniquement dans les cas suivants :</p>
      <ul>
        <li>Gestion de vos inscriptions (festivaliers et organisateurs)</li>
        <li>Publication et modération des festivals sur la plateforme</li>
        <li>Envoi d’emails d’information ou de suivi</li>
      </ul>
      <p>Vos données ne sont jamais vendues ni cédées à des tiers sans votre consentement explicite.</p>

            <br/>


<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Cookies
</h2>      <p>
        Nous utilisons des cookies à des fins de statistiques et d’amélioration de l’expérience utilisateur.
        Vous pouvez à tout moment refuser ou gérer leur utilisation via les paramètres de votre navigateur.
      </p>
      <p>Durée de conservation des données :</p>
      <ul>
        <li>Données sont conservées pendant la durée strictement nécessaire aux finalités pour lesquelles elles sont traitées :</li>
        <li>Comptes inactifs : suppression après 2 ans sans connexion</li>
        <li>Cookies : 13 mois maximum</li>
      </ul>
            <br/>


<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
Vos droits
</h2>      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d’accès et de rectification</li>
        <li>Droit de suppression</li>
        <li>Droit à la portabilité</li>
        <li>Droit d’opposition et limitation</li>
        <li>Pour exercer ces droits : contact@festivable.com</li>
      </ul>
            <br/>


<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  sécurité
</h2>      <p>Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité de vos données personnelles.</p>
       <br/>

<h2
  style={{
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
  }}
>
  Modifications
</h2>      <p>Nous nous réservons le droit de modifier cette politique. Toute modification sera affichée sur cette page avec la date de mise à jour.</p>
    </main>


  );
}
