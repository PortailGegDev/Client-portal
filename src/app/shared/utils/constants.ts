export class Constants {

    public static DemandeType = {
        RESCISSION: 'rescission',
        POWER_MODIFICATION: 'power-modification',
        RECLAMATION: 'reclamation',
        RELOCATION: 'relocation'
    }

    public static DemandeTitle = {
        RESCISSION: 'Demande de résiliation',
        POWER_MODIFICATION: 'Demande de modification de puissance',
        RECLAMATION: 'Demande de réclamation',
        RELOCATION: 'Demande de déménagement'
    }

public static ReclamationMotif = [
    { name: 'Qualité de service', code: 'QUALITE_DE_SERVICE' },
    { name: 'Facturation', code: 'FACTURATION' },
    { name: 'Réactivité', code: 'REACTIVITE' },
    { name: 'Accessibilité', code: 'ACCESSIBILITE' },
];

public static ReclamationNature = [
    // --- QUALITE DE SERVICE ---
    { name: 'Demande client refusée', code: 'DEMANDE_CLIENT_REFUSE', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Erreur traitement demandé', code: 'ERREUR_TRAITEMENT_DEMANDE', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Qualité technique intervention', code: 'QUALITE_TECHNIQUE_INTERVENTION', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Qualité fourniture réseau', code: 'QUALITE_FOURNITURE_RESEAU', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Réponse Client inadaptée/incomplète/erronée', code: 'REPONSE_CLIENT_INADAPTEE', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Contestation ventes services/contrat inadapté', code: 'CONTESTATION_VENTES_SERVICES', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Offres et services inexistants', code: 'OFFRES_SERVICES_INEXISTANTS', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Problème d\'installation technique/matériel', code: 'PROBLEME_INSTALLATION', parentCode: 'QUALITE_DE_SERVICE' },
    { name: 'Dysfonctionnement lié au déploiement compteur communiquant', code: 'DYSFONCTIONNEMENT_COMPTEUR', parentCode: 'QUALITE_DE_SERVICE' },

    // --- FACTURATION ---
    { name: 'Erreur de prix', code: 'ERREUR_PRIX', parentCode: 'FACTURATION' },
    { name: 'Contestation facturation : retard /absence/régularisation', code: 'CONTESTATION_FACTURATION_RETARD', parentCode: 'FACTURATION' },
    { name: 'Contestation frais, prestations, services, taxes, prix', code: 'CONTESTATION_FRAIS', parentCode: 'FACTURATION' },
    { name: 'Contestation relevé /Consommation', code: 'CONTESTATION_RELEVE', parentCode: 'FACTURATION' },
    { name: 'Contestations estimations/Absence relève', code: 'CONTESTATION_ESTIMATIONS', parentCode: 'FACTURATION' },
    { name: 'Contestation index/date souscription ou résiliation', code: 'CONTESTATION_INDEX_DATE', parentCode: 'FACTURATION' },
    { name: 'Contestation montant devis', code: 'CONTESTATION_MONTANT_DEVIS', parentCode: 'FACTURATION' },

    // --- REACTIVITE ---
    { name: 'Rdv (ou prise de RDV) non respecté par le GRD (ou FR)', code: 'RDV_NON_RESPECTE', parentCode: 'REACTIVITE' },
    { name: 'Délai RDV GRD', code: 'DELAI_RDV_GRD', parentCode: 'REACTIVITE' },
    { name: 'Délai réponse au client', code: 'DELAI_REPONSE_CLIENT', parentCode: 'REACTIVITE' },
    { name: 'Délai remboursement/encaissement', code: 'DELAI_REMBOURSEMENT', parentCode: 'REACTIVITE' },
    { name: 'Délai mise en œuvre technique ou contractuelle (souscription, cessation, modification) jusqu\'à validation', code: 'DELAI_MISE_EN_OEUVRE', parentCode: 'REACTIVITE' },

    // --- ACCESSIBILITE ---
    { name: 'Fermeture canal tél/physique "exceptionnelle"', code: 'FERMETURE_CANAL_EXCEPTIONNELLE', parentCode: 'ACCESSIBILITE' },
    { name: 'Mauvaise orientation du client', code: 'MAUVAISE_ORIENTATION', parentCode: 'ACCESSIBILITE' },
    { name: 'Dysfonctionnements techniques AEL/sites internet/call center', code: 'DYSFONCTIONNEMENTS_TECHNIQUES', parentCode: 'ACCESSIBILITE' },
    { name: 'Temps d\'attente excessif', code: 'TEMPS_ATTENTE_EXCESSIF', parentCode: 'ACCESSIBILITE' }
];


    public static readonly EnergyType: {
        ELECTRICITY: string;
        GAZ: string;
        ELECTRICITY_LABEL: string;
        GAZ_LABEL: string;
    } = {
            ELECTRICITY: '01',
            GAZ: '02',
            ELECTRICITY_LABEL: 'Electricité',
            GAZ_LABEL: 'Gaz'
        };

    public static InvoiceStatus = {
        PARTIELLEMENT_SOLDEE: 'Partiellement soldée',
        NON_SOLDEE: 'Non Soldée',
        SOLDEE: 'Totalement Soldée',
        A_VENIR: 'A venir',
        A_REGLER: 'A régler',
        REGLEE: 'Réglée'
    }

    public static PaymentMethod = {
        P: "P",
        S: "S",
    }

    public static PaymentProcedure = {
        BIM: "BIM",
        MEN: "MEN",
        ECH: "ECH",
    }

    public static ContractSupportingDoc = {
        DOMICILE: "DOMICILE",
        GRILLE_TARIFAIRE_TARIF_BASE: "GRILLE_TARIFAIRE_TARIF_BASE",
        GARANTIE_ORIGINE: "GARANTIE_ORIGINE",
        CGV: "CGV"
    }

    public static PartnerFunction = {
        CO_TITULAIRE: "Z0000001",
        GESTIONNAIRE_PORTEFEUILLE: "Z0000002",
        GROUPEMENT_ACHAT: "Z0000003",
        SYNDIC: "Z0000004",
        APPORTEUR_AFFAIRE: "Z0000005",
        TUTEUR_CURATEUR: "Z0000006",
        AUTRES: "Z0000007",
        MANDATAIRE_JUDICIAIRE: "Z0000008",
    };

    public static SocialStatus = {
        CLIENT_PRECAIRE: "Client précaire",
        CLIENT_AIDE: "Client aidé",
    };

    public static Carousel_Item_Code = {
        RELEVEZ_INDEX: "RELEVEZ_INDEX",
        CHEQUE_ENERGIE: "CHEQUE_ENERGIE",
        PROJET_ECONOMIES_ENERGIE: "PROJET_ECONOMIES_ENERGIE"
    };


      /* ----------------- Services Pack ----------------- */
  public static ServicesPack = {
    ELECTRICITE: 'OPT_SRN_E',
    ELECTRICITE_0: 'OPT_SRN_E0',
    ELECTRICITE_GAZ: 'OPT_SRN_EG',
    ELECTRICITE_GAZ_PLOMBERIE: 'PCKSRN_EGP',
    GREEN_OPTION: 'GREEN_OPTION',
    ARRONDI_SOL: 'SrvArrondiSol',
  };

  /* ----------------- Données d'affichage ----------------- */
 public static BoxData = [
  {
    id: Constants.ServicesPack.ELECTRICITE,
    title: 'Sérénité Electricité',
    price: '2,99€/mois',
    service: 'Assistance dépannage',
    icon: '/images/Icons (1).png',
    backgroundImage: '/images/service_contrat.jpg',
    status: 'souscrit',
    link: '/services/serenity-electricity'
  },
  {
    id: Constants.ServicesPack.ELECTRICITE_GAZ,
    title: 'Sérénité Electricité, Gaz',
    price: '2,99€/mois',
    service: 'Assistance dépannage',
    icon: '/images/Icons (1).png',
    backgroundImage: '/images/Service2.jpg',
    link: ''
  },
  {
    id: Constants.ServicesPack.ELECTRICITE_GAZ_PLOMBERIE,
    title: 'Sérénité Electricité, Gaz & Plomberie',
    price: '2,99€/mois',
    service: 'Assistance dépannage',
    icon: '/images/Icons (1).png',
    backgroundImage: '/images/service3.jpg',
    status: '',
    link: ''
  },
  { 
    id: Constants.ServicesPack.GREEN_OPTION,
    title: 'Option verte',
    price: '1€ - 2,99€/mois',
    service: 'Énergie renouvelable',
    icon: '/images/Icons (1).png',
    backgroundImage: '/images/service4.jpg',
    status: '',
    link: '/services/green-option'
  },
  // {
  //   title: 'E-Facture',
  //   price: 'Gratuit',
  //   service: 'Facturation numérique',
  //   icon: '/images/Icons (1).png',
  //   backgroundImage: '/images/service_facture.jpg',
  //   status: 'souscrit',
  //   link: ''  // pas de lien
  // },
  // {
  //   title: 'Facture papier',
  //   price: 'Gratuit',
  //   service: 'Facturation classique',
  //   icon: '/images/Icons (1).png',
  //   backgroundImage: '/images/service6.jpg',
  //   status: '',
  //   link: ''
  // },
  // {
  //   id: Constants.ServicesPack.ARRONDI_SOL,
  //   title: 'Arrondis solidaires',
  //   price: 'Gratuit',
  //   service: 'Don associatif',
  //   icon: '/images/Icons (1).png',
  //   backgroundImage: '/images/service7.jpg',
  //   status: '',
  //   link: ''
  // },
];

    public static ContractCreationLink = 'https://www.geg.fr/souscription/part/';

    public static readonly CO_TITULAIRE_INFO_TEXT = "Pour modifier les informations relatives au titulaire de votre contrat, nous vous invitons à nous appeler au 04 76 84 20 00, choix.\n  Nous sommes joignables du lundi au vendredi de 8h à 20h.";
}