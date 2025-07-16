
export type CheckCapaciteResponse = {
  status: boolean;
  message: string;
  date: string;
  total_reserved: number;
  total_with_request: number;
  capacity: number;
};

export type CheckCapaciteResult =
  | { ok: true; data: CheckCapaciteResponse }
  | { ok: false; message: string };

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
      },
      body: JSON.stringify({
        date_res: formattedDate,
        nb_adult,
        nb_children,
        nb_babie,
      }),
    });

    if (response.status === 200) {
      const data: CheckCapaciteResponse = await response.json();
      return { ok: true, data };
    } else {
      const error = await response.json();
      return { ok: false, message: error.message || 'Erreur inconnue' };
    }
  } catch (err) {
    console.error('Erreur API:', err);
    return { ok: false, message: 'Erreur de connexion au serveur.' };
  }
}
