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

    public static ReclamationMotif=[
        {name:'Montant de ma facture', code:'MONTANT_FACTURE'},
        {name:'Mon contrat', code:'CONTRAT'},
        {name:'Mon compteur', code:'COMPTEUR'},
        {name:'Mon espace client', code:'ESPACE_CLIENT'},
        {name:'Paiement et Remboursement', code:'PAIEMENT_REMBOURSEMENT'},
        {name:'Qualité de services', code:'QUALITE_SERVICES'},
        {name:'Autres demandes', code:'AUTRE_DEMANDES'},
    ];
}