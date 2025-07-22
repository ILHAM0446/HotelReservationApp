import i18n from '../../i18n';
export const fetchHoursByType = async (type) => {
  try {
    const response = await fetch(`https://transport.eureka-digital.ma/api/get_heure_by_type?type=${type}`);
    const json = await response.json();
    //console.log(json);

    if (json.status && json.data) {
      const options = json.data.map((item) => ({
        label: `${item.hour} (${item.prix_adult} DH)`,
        value: item.hour,
        data: {
            prix_adult: item.prix_adult,
          }
      }));
      return [{ label: i18n.t('select'), value: '', data: {} }, ...options];
    } else {
      throw new Error(json.message || i18n.t('ErrorInconnue'));
    }
  } catch (error) {
    console.error('Erreur dans fetchHoursByType:', error);
    throw error;
  }
};

export const checkPromoCode = async (code) => {
  try {
    const response = await fetch(`https://transport.eureka-digital.ma/api/reservation/promos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ code: code,}),
        });
    const json = await response.json();
    //console.log(json);

    if (json.code === 200 && json.status) {
      return {
        success: true,
        data: json.data,
        message: i18n.t('applySuccess'),
      };
    } else if (json.code === 404) {
      return {
        success: false,
        data: null,
        message: `❌ ${i18n.t('PromoCodeField')}`,
      };
    } else {
      return {
        success: false,
        data: null,
        message: `⚠️ ${i18n.t('ErrorInconnue')}` ,
      };
    }
  } catch (error) {
      //console.log('Erreur API checkPromoCode:', error);
    return {
      success: false,
      data: null,
      message: `⚠️ ${i18n.t('ErrorConnexion')}`,
    };
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
    //console.log(json);
    return json;
  } catch (error) {
    console.error('Erreur dans checkCapacity:', error);
    throw error;
  }
};

export const checkReservation = async ({departureDate,departureTime,adults,children,reservationCode,lastName,firstName,email,departurePlace,total,promoCode}) => {
    try {
        const body ={
            date_aller: departureDate,
            time: departureTime,
            nbrPersones:adults,
            nbrEnfants: children,
            numReservation: reservationCode,
            nom:lastName,
            prenom: firstName,
            email: email,
            depar: departurePlace,
            prix: parseFloat(total),
            code_promo: promoCode,
            }

    const response = await fetch(`https://transport.eureka-digital.ma/api/transport/create`,{
        method: 'POST',
        headers:{'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY':'ZOdtuZGMzr8Nht02Eureka'
        },
        body: JSON.stringify(body),
        });
    //console.log(body);
    const json = await response.json();
        //console.log('checkReservation:', json);
        if (json.status === true) {
            if (json.payment_status==='PENDING'){
                return {
                            success: true,
                            message: json.message,
                            data: {
                              paymentStatus: json.payment_status,
                              paywallUrl: json.payment_payload.url,
                              payload: json.payment_payload.payload,
                              signature: json.payment_payload.signature,
                              reservationRef: json.reservation_ref ,
                            },
                          };
        } else {
            return {
                      success: true,
                      message: json.message,
                      data: {
                        paymentStatus: json.data.payment_status,
                        free: true,
                      },
                    };
        }
    }else {
          return {
            success: false,
            message: json.message ||`⚠️ ${i18n.t('ErrorInconnue')}`,
          };
        }
      } catch (error) {
        console.error('Erreur API checkReservation:', error);
        return {
          success: false,
          message: `⚠️ ${i18n.t('ErrorConnexion')}`,
        };
      }
    };




