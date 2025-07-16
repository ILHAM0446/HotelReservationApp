export const fetchHoursByType = async (type) => {
  try {
    const response = await fetch(`https://transport.eureka-digital.ma/api/get_heure_by_type?type=${type}`);
    const json = await response.json();


    if (json.status) {

      return json.data.map((item) => ({
        label: `${item.hour} (${item.prix_adult} DH)`,
        value: item.hour,
      }));
    } else {
      throw new Error(json.message || 'Erreur inconnue');
    }
  } catch (error) {
    console.error('Erreur dans fetchHoursByType:', error);
    throw error;
  }
};

export const checkCapacity = async ({ date, heure, adults, children }) => {
  try {
    const body = {
      date_aller: date,
      heur: heure,
      nbrPersones: adults,
      nbrEnfants: children,
    };

    const response = await fetch('https://transport.eureka-digital.ma/api/capacitys/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erreur dans checkCapacity:', error);
    throw error;
  }
};

