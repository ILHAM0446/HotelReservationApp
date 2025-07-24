import { useState, useEffect } from 'react';
import { checkCapacity } from '../api/transportAPI';
import i18n from '../../i18n';

export default function useCheckCapacity({
  adults,
  children,
  date,
  hour,
}) {
  const [serverMessage, setServerMessage] = useState('');
  const [isCapacityOk, setIsCapacityOk] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchCapacity = async () => {
        if (!date || !hour) {
          setServerMessage('');
          setIsCapacityOk(true);
          return;
        }
        if ((adults + children) === 0) {
          setServerMessage('');
          setIsCapacityOk(true);
          return;
        }
        try {
          const formattedDate = formatDateForAPI(date);
          const res = await checkCapacity({
            date: formattedDate,
            heure: hour,
            adults,
            children,
          });
          //console.log('Réponse API checkCapacity:', res);
          if (res.code === 200 && res.status) {
            setServerMessage('');
            setIsCapacityOk(true);
          } else if (res.code === 400) {
            setServerMessage(
              res.data.available === 0
                ? `⚠️ ${i18n.t('Capacite2')}`
                : `⚠️ ${i18n.t('Capacite1', { place: res.data.available })}`
            );
            setIsCapacityOk(false);
          } else {
            setServerMessage(`⚠️ ${i18n.t('ErrorInconnue')}`);
            setIsCapacityOk(false);
          }
        } catch (err) {
          setServerMessage(`⚠️ ${i18n.t('ErrorConnexion')}`);
          setIsCapacityOk(false);
        }
      };
      fetchCapacity();
    }, 400);
    return () => clearTimeout(timer);
  }, [adults, children, date, hour]);
  const formatDateForAPI = (d) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return { serverMessage, isCapacityOk };
}
