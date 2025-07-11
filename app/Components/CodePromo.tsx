import { useEffect, useState } from 'react';

export default function CalculCodePromo(
  code: string,
  type: 'dh' | 'reduction' | 'gratuit' | undefined,
  valeur: number | undefined,
  prix: number
) {
  const [FinalPrice, setFinalPrice] = useState(prix);
  const [statutcode, setStatutcode] = useState(false);

  useEffect(() => {
    let newPrice = prix;
    let codeValid = false;

    if (code && type && valeur !== undefined) {
      if (type === 'dh') {
        newPrice = prix - valeur;
        codeValid = true;
      } else if (type === 'reduction') {
        newPrice = prix - (prix * valeur) / 100;
        codeValid = true;
      } else if (type === 'gratuit') {
        newPrice = 0;
        codeValid = true;
      }
    }

    setFinalPrice(Math.max(newPrice, 0));
    setStatutcode(codeValid);
  }, [code, type, valeur, prix]);

  return { FinalPrice, statutcode };
}
