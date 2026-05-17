const GAS_KM_PER_LITER = 12;
const GAS_PRICE_PER_LITER_UYU = 88.03;
const GAS_SERVICE_FEE_UYU = 5;
const MAX_KILOMETERS = 500;

const roundToCents = (value) => Math.round(value * 100) / 100;
const roundToTenth = (value) => Math.round(value * 10) / 10;
const normalizePassengers = (value) => Math.max(2, Math.round(value));

const calculateTotalUyu = (kilometers, passengers) => {
  const normalizedKilometers = roundToTenth(kilometers);
  const normalizedPassengers = normalizePassengers(passengers);
  const liters = normalizedKilometers / GAS_KM_PER_LITER;
  const gasTotal = liters * GAS_PRICE_PER_LITER_UYU + GAS_SERVICE_FEE_UYU;
  const gasTotalUyu = roundToCents(gasTotal);
  const totalUyu = roundToCents((gasTotal - GAS_SERVICE_FEE_UYU) / normalizedPassengers + GAS_SERVICE_FEE_UYU);

  return { normalizedKilometers, normalizedPassengers, liters, gasTotalUyu, totalUyu };
};

const getAccessToken = async () => {
  if (process.env.MERCADOPAGO_ACCESS_TOKEN) return process.env.MERCADOPAGO_ACCESS_TOKEN;

  const clientId = process.env.MERCADOPAGO_CLIENT_ID;
  const clientSecret = process.env.MERCADOPAGO_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const tokenResponse = await fetch("https://api.mercadopago.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const tokenData = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok || !tokenData.access_token) {
    console.error("Mercado Pago token error:", tokenData);
    throw new Error("Could not authenticate with Mercado Pago.");
  }

  return tokenData.access_token;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const kilometers = Number(req.body?.kilometers);
    if (!Number.isFinite(kilometers) || kilometers < 0.1 || kilometers > MAX_KILOMETERS) {
      return res.status(400).json({ error: "Kilometers must be between 0.1 and 500." });
    }

    const passengers = Number(req.body?.passengers);
    if (!Number.isFinite(passengers) || passengers < 2) {
      return res.status(400).json({ error: "Passengers must be at least 2." });
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return res.status(500).json({ error: "Mercado Pago credentials are not configured." });
    }

    const { normalizedKilometers, normalizedPassengers, liters, gasTotalUyu, totalUyu } = calculateTotalUyu(
      kilometers,
      passengers,
    );
    const origin = typeof req.body?.origin === "string" ? req.body.origin : "https://juanignacioramos.com";

    const preferenceResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: "buy-me-gas",
            title: `Buy me gas - ${normalizedKilometers.toFixed(1)} km split`,
            description: `${liters.toFixed(2)} liters split between ${normalizedPassengers} passengers`,
            quantity: 1,
            currency_id: "UYU",
            unit_price: totalUyu,
          },
        ],
        back_urls: {
          success: `${origin}/?gas_payment=success`,
          failure: `${origin}/?gas_payment=failure`,
          pending: `${origin}/?gas_payment=pending`,
        },
        auto_return: "approved",
        metadata: {
          kilometers: normalizedKilometers,
          passengers: normalizedPassengers,
          liters: roundToCents(liters),
          gas_total_uyu: gasTotalUyu,
          total_uyu: totalUyu,
        },
      }),
    });

    const preference = await preferenceResponse.json().catch(() => ({}));
    if (!preferenceResponse.ok) {
      console.error("Mercado Pago preference error:", preference);
      return res.status(502).json({ error: "Could not create Mercado Pago checkout." });
    }

    const checkoutUrl = preference.init_point ?? preference.sandbox_init_point;
    if (!checkoutUrl) {
      return res.status(502).json({ error: "Mercado Pago did not return a checkout URL." });
    }

    return res.status(200).json({
      checkoutUrl,
      preferenceId: preference.id,
      kilometers: normalizedKilometers,
      passengers: normalizedPassengers,
      liters: roundToCents(liters),
      gasTotalUyu,
      totalUyu,
    });
  } catch (error) {
    console.error("Mercado Pago checkout error:", error);
    return res.status(500).json({ error: "Internal checkout error." });
  }
}
