function calculatePictograms(answers = {}) {
  return {
    accesPMR:
      answers.pmrParking &&
      answers.wheelchairRamp &&
      answers.flooringAndAccess &&
      answers.wheelchairLoan,

    navettesAccessibles:
      answers.accessibleShuttle,

    poussettes:
      answers.wheelchairRamp &&
      answers.flooringAndAccess,

    malvoyantsAveugles:
      answers.audioGuides &&
      answers.tactileMarkers,

    balisesSonoresAudio:
      answers.audioGuides,

    handicapAuditifLSR:
      answers.signLanguageInterpreters &&
      answers.safetyBarriers,

    malentendants:
      answers.signLanguageInterpreters,

    chienGuide:
      answers.guideDogsAllowed,

    accompagnement:
      answers.supportDevices,

    accompagnateur:
      answers.supportDevices,

    texteSimplifieFALC:
      answers.supportDevices,

    zoneDeRepos:
      answers.calmSpaces,

    enfantEnBasAge:
      answers.calmSpaces,

    zonesAssises:
      answers.calmSpaces,

    zoneBruyante:
      answers.sensitiveAreasSigns,
  };
}

module.exports = calculatePictograms;