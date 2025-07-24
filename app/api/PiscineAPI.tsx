import i18n from '../../i18n';
export async function checkCapacite(
  date: Date,
  nb_adult: number,
  nb_children: number,
  nb_babie: number
): Promise<CheckCapaciteResult> {
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;

  try {
    const response = await fetch('https://pass.eureka-digital.ma/api/pass/check-capacity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        date_res: formattedDate,
        nb_adult,
        nb_children,
        nb_babie,
      }),
    });
    const text = await response.text(); // ✅ Lire une seule fois
    //console.log('📦 Réponse brute:', text);

    const json = JSON.parse(text);
    const resData = json?.data;
    const status = json?.status;

    if ( status && resData) {
      return { ok: true, data: resData };
    }

    if (resData) {
      const { capacity = 0, total_reserved = 0, total_with_request = 0 } = resData;
      const placesRestantes = capacity - total_reserved;

      const message =
        total_with_request > capacity
          ? `❌ ${i18n.t('Capacite1', { place: placesRestantes })}`
          : `❌ ${i18n.t('Capacite2')} `;

      return { ok: false, message };
    }

    return { ok: false, message: `⚠️ ${i18n.t('ErrorInconnue')}` };
  } catch (err) {
    console.error('Erreur API:', err);
    return { ok: false, message: `⚠️ ${i18n.t('ErrorConnexion')}` };
  }
}
export async function checkPrice(
  date: Date,
  type: "journee" | "demi-journee"
): Promise<CheckPriceResult> {
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
  const typeReserver = type === "journee" ? "jour" : "demi-jour";
  try {
    const response = await fetch('https://pass.eureka-digital.ma/api/pass/get-prix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_res: formattedDate,
        type : typeReserver,
      }),
    });

    const text = await response.text();
    //console.log('Réponse brute:', text);
    const json = JSON.parse(text);
    const resData = json?.data;
    const status = json?.status;

    if (response.status === 200 && status && resData) {
      return { ok: true, data: resData };
    }
    return { ok: false, message: `⚠️ ${i18n.t('ErrorInconnue')}` };
  } catch (err) {
    console.error('Erreur API:', err);
    return { ok: false, message: `⚠️ ${i18n.t('ErrorConnexion')}` };
  }
}

export async function checkCodePromo(
  date: Date,
  code: string,
): Promise<CheckCodeResult> {
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;

  try {
    const response = await fetch('https://pass.eureka-digital.ma/api/pass/check-promp-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_res: formattedDate,
        code ,
      }),
    });

    const text = await response.text();
    //console.log('Réponse brute:', text);
    const json = JSON.parse(text);
    const resData = json?.data;
    const status = json?.status;

    if (response.status === 200 && status && resData) {
      return { ok: true, data: resData };
    }
    else if (response.status === 404) {
        return { ok: false, message: `⚠️ ${i18n.t('PromoCodeField')}` };
    }
    return { ok: false, message: `⚠️ ${i18n.t('ErrorInconnue')}` };
  } catch (err) {
    console.error('Erreur API:', err);
    return { ok: false, message: `⚠️ ${i18n.t('ErrorConnexion')}` };
  }
}
export type ReservationPayload = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateReservation: Date;
  type: 'journee' | 'demi-journee';
  nbrPersones: number;
  nbrEnfants: number;
  nbrBebe: number;
  code_promo_input?: string;
};

export async function CreateReservation(payload: ReservationPayload): Promise<CreateReservationResult> {
  const formattedDate = `${payload.dateReservation.getDate().toString().padStart(2, '0')}/${(payload.dateReservation.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${payload.dateReservation.getFullYear()}`;

  const typeReserver = payload.type === "journee" ? "jour" : "demi-jour";

  const finalPayload = {
    ...payload,
    type: typeReserver,
    dateReservation: formattedDate,
  };

  try {
    const response = await fetch('https://pass.eureka-digital.ma/api/pass/create-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'ZOdtuZGMzr8Nht02Eureka24',
      },
      body: JSON.stringify(finalPayload),
    });


    const json = await response.json();
    //console.log('Réponse JSON brute:', json);

    const status = json?.status;
    const reference = json?.reservation_ref;
    const payment_status = json?.payment_status;
    const url = json?.payment_payload?.paywallUrl?.url;
    const payload = json?.payment_payload?.paywallUrl?.payload;
    const signature = json?.payment_payload?.paywallUrl?.signature;

    if (response.status === 200 && status && reference && payment_status === 'PENDING' && url && payload && signature) {
      return { ok: true, data: { reference, payment_status, url, payload, signature } };
    } else if (response.status === 200 && status && reference && payment_status === 'COMPLETED') {
      return { ok: true, data: { reference, payment_status } };
    }

    return { ok: false, message: json?.message || `⚠️ ${i18n.t('ErrorInconnue')}` };
  } catch (err) {
    console.error('Erreur API:', err);
    return { ok: false, message: `⚠️ ${i18n.t('ErrorConnexion')}` };
  }
}
