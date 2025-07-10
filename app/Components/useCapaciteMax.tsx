import { useEffect, useState } from 'react';



export default function useCapaciteMax(personnes: number, CAPACITE_MAX: number) {
  const [message, setMessage] = useState('');
  const [isCapaciteDepassee, setIsCapaciteDepassee] = useState(false);

  useEffect(() => {
    if (personnes > CAPACITE_MAX) {
      setMessage('Capacité dépassée !');
      setIsCapaciteDepassee(true);
    } else {
      setMessage('');
      setIsCapaciteDepassee(false);
    }
  }, [personnes]);

  return { isCapaciteDepassee, message };
}
