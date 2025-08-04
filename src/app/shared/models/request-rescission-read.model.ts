export class RequestRecissionRead {
  createdDate!: string;
  typeDemande!: string;
  contractISU!: string | null;
  statut!: string;

  constructor(init?: Partial<RequestRecissionRead>) {
    Object.assign(this, init);
  }

  get statusClass(): string {
    const s = this.statut?.toLowerCase();
    if (s === 'traité') return 'status-warning';
    if (s === 'en cours' || s === 'a traiter') return 'status-success';
    return '';
  }

  get statusIcon(): string {
    const s = this.statut?.toLowerCase();
    if (s === 'traité') return 'pi pi-check';
    if (s === 'a traiter') return 'pi pi-clock';
    return '';
  }

  get statutAffiche(): string {
    const s = this.statut?.toLowerCase();
    if (s === 'a traiter') {
      return 'en cours de traitement';
    }
    return this.statut ?? '';
  }
}
