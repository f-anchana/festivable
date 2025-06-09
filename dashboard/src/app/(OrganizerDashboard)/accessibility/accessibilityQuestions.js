export const pmrQuestions = [
    {
        name: "pmrParking",
        question: "Le festival propose-t-il un stationnement proche et sécurisé pour les PMR ?",
    },
    {
        name: "accessibleShuttle",
        question: "Le festival propose-t-il des navettes accessibles proches de l’entrée du site ?",
    },
    {
        name: "wheelchairRamp",
        question: "Des rampes d'accès pour fauteuils roulants sont-elles installées ?",
    },
    {
        name: "flooringAndAccess",
        question: "Le sol est-il antidérapant et stabilisé dans les zones principales (scènes, sanitaires, restauration) ?",
    },
    {
        name: "wheelchairLoan",
        question: "Des prêts de fauteuils roulants sont-ils proposés ?",
    },
];

export const pmrPictograms = [
    {
        title: "Accès PMR",
        pictogram: "/pictograms/inactive/Wheelchair.png",
        conditions: ["pmrParking", "wheelchairRamp", "flooringAndAccess", "wheelchairLoan"],
    },
    {
        title: "Navettes accessibles",
        pictogram: "/pictograms/inactive/Navette.png",
        conditions: ["accessibleShuttle"],
    },
    {
        title: "Poussettes",
        pictogram: "/pictograms/inactive/Poussettes.png",
        conditions: ["wheelchairRamp", "flooringAndAccess"],
    },
];

export const sensorialQuestions = [
    {
        name: "audioGuides",
        question: "Des audioguides sont-ils mis à disposition pour les personnes malvoyantes ?",
    },
    {
        name: "tactileMarkers",
        question: "Des balises tactiles ou bandes podotactiles sont-elles prévues pour guider les personnes déficientes visuelles ?",
    },
    {
        name: "signLanguageInterpreters",
        question: "Des interprètes en langue des signes sont-ils prévus pour les conférences ou temps de médiation ?",
    },
    {
        name: "safetyBarriers",
        question: "Des barrières de sécurité sont-elles installées pour guider les personnes malvoyantes ?",
    },
    {
        name: "guideDogsAllowed",
        question: "L’accès aux chiens guides est-il autorisé ?",
    },
];

export const sensorialPictograms = [
    {
        title: "Malvoyants / Aveugles",
        pictogram: "/pictograms/inactive/Blind.png",
        conditions: ["audioGuides", "tactileMarkers"],
    },
    {
        title: "Balises sonores / Audio",
        pictogram: "/pictograms/inactive/Audio.png",
        conditions: ["audioGuides"],
    },
    {
        title: "Handicap auditif / LSR",
        pictogram: "/pictograms/inactive/LSR.png",
        conditions: ["signLanguageInterpreters", "safetyBarriers"],
    },
    {
        title: "Malentendants",
        pictogram: "/pictograms/inactive/Deaf.png",
        conditions: ["signLanguageInterpreters"],
    },
    {
        title: "Chien guide",
        pictogram: "/pictograms/inactive/Dog.png",
        conditions: ["guideDogsAllowed"],
    },
];

export const mentalQuestions = [
    {
        name: "supportDevices",
        question: "Des dispositifs d’accompagnement (ex: texte simplifié) sont-ils proposés pour les personnes en situation de handicap psychique ?",
    },
    {
        name: "calmSpaces",
        question: "Des relais ou espaces de calme facilement accessibles sont-ils proposés ?",
    },
    {
        name: "sensitiveAreasSigns",
        question: "Les espaces potentiellement bruyants ou sensibles sont-ils signalés pour les personnes en situation de stress ou d’hypersensibilité ?",
    },
];

export const mentalPictograms = [
    {
        title: "Accompagnement",
        pictogram: "/pictograms/inactive/acompgnament.png",
        conditions: ["supportDevices"],
    },
    {
        title: "Accompagnateur",
        pictogram: "/pictograms/inactive/acomp.png",
        conditions: ["supportDevices"],
    },
    {
        title: "Texte simplifié - FALC",
        pictogram: "/pictograms/inactive/LSR.png",
        conditions: ["supportDevices"],
    },
    {
        title: "Zone de repos",
        pictogram: "/pictograms/inactive/zone.png",
        conditions: ["calmSpaces"],
    },
    {
        title: "Enftant en bas âge",
        pictogram: "/pictograms/inactive/kid.png",
        conditions: ["calmSpaces"],
    },
    {
        title: "Zones assises",
        pictogram: "/pictograms/inactive/sit.png",
        conditions: ["calmSpaces"],
    },
    {
        title: "Zone bruyante",
        pictogram: "/pictograms/inactive/noise.png",
        conditions: ["sensitiveAreasSigns"],
    },
];