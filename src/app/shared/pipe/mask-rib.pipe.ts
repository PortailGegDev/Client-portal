import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskRIB'
})
export class MaskRIBPipe implements PipeTransform {

  transform(rib: string, visibleStart: number = 4, visibleEnd: number = 4): string {
    if (!rib || rib.length < visibleStart + visibleEnd) {
      return rib; // Retourne le RIB tel quel si sa longueur est trop courte
    }

    const maskedPart = '*'.repeat(rib.length - (visibleStart + visibleEnd));
    return rib.slice(0, visibleStart) + maskedPart + rib.slice(-visibleEnd);
  }
}
