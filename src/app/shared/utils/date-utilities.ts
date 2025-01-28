export function convertSAPDate(sapDate: string | null): string | null {
  if (!sapDate || typeof sapDate !== 'string') {
    console.warn('Date invalide:', sapDate);
    return null;
  }

  const match = /\/Date\((\d+)\)\//.exec(sapDate);
  if (!match || match.length < 2) {
    console.warn('Format de date non reconnu:', sapDate);
    return null;
  }

  const timestamp = parseInt(match[1], 10);
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function getDateSAPDate(sapDate: string): Date | null {
  if (!sapDate || typeof sapDate !== 'string') {
    console.warn('Date invalide:', sapDate);
    return null;
  }

  const match = /\/Date\((\d+)\)\//.exec(sapDate);
  if (!match || match.length < 2) {
    console.warn('Format de date non reconnu:', sapDate);
    return null;
  }

  const timestamp = parseInt(match[1], 10);
  return new Date(timestamp);
}

export function convertSAPDateToTsDate(sapDate: string): Date | null {
  const regex = /\/Date\((\d+)\)\//;
  const matches = sapDate.match(regex);
  if (matches && matches[1]) {
    const timestamp = parseInt(matches[1], 10); // Extraire le timestamp
    return new Date(timestamp); // Convertir en objet Date
  }
  return null; // Si la date n'est pas valide
}

export function getMonthFromDate(date: Date): number {
  return date.getMonth() + 1; // Ajouter 1 pour que janvier soit 1, février soit 2, etc.
}

export const frenchMonth: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// Fonction pour obtenir le mois en français à partir d'un numéro
export function getMonthNameByMonthNumber(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Numéro de mois invalide");
  }

  // Retourner le mois correspondant (l'index est monthNumber - 1)
  return frenchMonth[monthNumber - 1];
}