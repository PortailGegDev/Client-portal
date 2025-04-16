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
        { name: 'Montant de ma facture', code: 'MONTANT_FACTURE' },
        { name: 'Mon contrat', code: 'CONTRAT' },
        { name: 'Mon compteur', code: 'COMPTEUR' },
        { name: 'Mon espace client', code: 'ESPACE_CLIENT' },
        { name: 'Paiement et Remboursement', code: 'PAIEMENT_REMBOURSEMENT' },
        { name: 'Qualité de services', code: 'QUALITE_SERVICES' },
        { name: 'Autres demandes', code: 'AUTRE_DEMANDES' },
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
}