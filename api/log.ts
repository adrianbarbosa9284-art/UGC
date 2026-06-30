import type { VercelRequest, VercelResponse } from '@vercel/node';

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '';
  try {
    return String.fromCodePoint(
      ...code.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0))
    );
  } catch {
    return '';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return res.status(200).json({ ok: true });

  const { eventType, deviceInfo, country, countryCode, city, region } =
    req.body as {
      eventType?: string;
      deviceInfo?: string;
      country?: string;
      countryCode?: string;
      city?: string;
      region?: string;
    };

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    'Desconhecido';

  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  const flag = countryCodeToFlag(countryCode ?? '');
  const countryDisplay = country ? `${country} ${flag}`.trim() : 'Desconhecido';
  const isVisit = eventType === 'visit';

  const payload = {
    embeds: [
      {
        title: isVisit ? '👀 Nova Visita' : '🖱️ Clique no Grupo',
        color: isVisit ? 0x5865f2 : 0xdc143c,
        fields: [
          { name: '🌐 IP', value: ip, inline: true },
          { name: '🏳️ País', value: countryDisplay, inline: true },
          {
            name: '📱 Dispositivo',
            value: deviceInfo
              ? deviceInfo.length > 256
                ? deviceInfo.slice(0, 253) + '...'
                : deviceInfo
              : 'Desconhecido',
            inline: false,
          },
          { name: '🕐 Horário (BRT)', value: timestamp, inline: true },
          {
            name: '📍 Localização',
            value: city && region ? `${city}, ${region}` : 'Não disponível',
            inline: true,
          },
        ],
        footer: { text: 'BestUGCs Logger • Sistema de Monitoramento' },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // silently fail — don't block the user
  }

  return res.status(200).json({ ok: true });
}
