/**
 * Discord Logger — envia eventos para o servidor (que repassa ao Discord).
 * O webhook fica protegido no servidor; o frontend nunca o vê.
 */

const LOG_ENDPOINT = "/api/log";

interface LocationData {
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
}

async function getLocationData(): Promise<LocationData> {
  const apis = [
    {
      url: "https://ipapi.co/json/",
      parse: (d: any): LocationData => ({
        country: d.country_name,
        countryCode: d.country_code,
        city: d.city,
        region: d.region,
      }),
    },
    {
      url: "https://ip-api.com/json/",
      parse: (d: any): LocationData => ({
        country: d.country,
        countryCode: d.countryCode,
        city: d.city,
        region: d.regionName,
      }),
    },
    {
      url: "https://ipwho.is/",
      parse: (d: any): LocationData => ({
        country: d.country,
        countryCode: d.country_code,
        city: d.city,
        region: d.region,
      }),
    },
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api.url, { headers: { Accept: "application/json" } });
      if (!res.ok) continue;
      const data = await res.json();
      const parsed = api.parse(data);
      if (parsed.country) return parsed;
    } catch {
      // try next
    }
  }

  return {};
}

export async function sendDiscordLog(
  eventType: "visit" | "group_click"
): Promise<void> {
  try {
    const location = await getLocationData();
    const deviceInfo = navigator.userAgent;

    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        deviceInfo,
        ...location,
      }),
    });
  } catch (err) {
    console.warn("Logger: falha ao enviar evento", err);
  }
}
