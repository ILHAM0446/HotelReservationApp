import { useEffect, useState } from 'react';

export default function CalculCodePromo(
  code: string,
  type: 'dh' | 'reduction' | 'gratuit',
  valeur: number ,
  prix: number
) {
  const [FinalPrice, setFinalPrice] = useState(prix);

  useEffect(() => {
    let newPrice = prix;
      if (type === 'dh') {
        newPrice = prix - valeur;

      } else if (type === 'reduction') {
        newPrice = prix - (prix * valeur) / 100;

      } else if (type === 'gratuit') {
        newPrice = 0;

      }


    setFinalPrice(Math.max(newPrice, 0));
  }, [code, type, valeur, prix]);

  return FinalPrice ;
}
