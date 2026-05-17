import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const roundToCents = (value: number) => Math.round(value * 100) / 100;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const accessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN');
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Mercado Pago credentials are not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const origin = typeof body?.origin === 'string' ? body.origin : 'https://juanignacioramos.com';

    let unitPrice: number;
    let metadata: Record<string, unknown> = {};
    let responseExtras: Record<string, unknown> = {};

    const customAmountRaw = body?.customAmountUyu;
    if (customAmountRaw !== undefined && customAmountRaw !== null) {
      const customAmount = Number(customAmountRaw);
      if (!Number.isFinite(customAmount) || customAmount < 1 || customAmount > 50000) {
        return new Response(JSON.stringify({ error: 'Custom amount must be between 1 and 50000 UYU.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      unitPrice = roundToCents(customAmount);
      metadata = { custom_amount_uyu: unitPrice };
      responseExtras = { customAmountUyu: unitPrice, totalUyu: unitPrice };
    } else {
      const kilometers = Number(body?.kilometers);
      const passengers = Number(body?.passengers);

      if (!Number.isFinite(kilometers) || kilometers < 0.1 || kilometers > 150) {
        return new Response(JSON.stringify({ error: 'Kilometers must be between 0.1 and 150.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!Number.isFinite(passengers) || passengers < 1) {
        return new Response(JSON.stringify({ error: 'Passengers must be at least 1.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const liters = kilometers / 12;
      const fuelCost = liters * 88.03;
      unitPrice = roundToCents(fuelCost / passengers + 5);
      metadata = {
        kilometers,
        passengers,
        liters: roundToCents(liters),
        total_uyu: unitPrice,
      };
      responseExtras = {
        kilometers,
        passengers,
        liters: roundToCents(liters),
        totalUyu: unitPrice,
      };
    }

    const preferenceResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Buy me gas',
            quantity: 1,
            currency_id: 'UYU',
            unit_price: unitPrice,
          },
        ],
        back_urls: {
          success: `${origin}/?gas_payment=success`,
          failure: `${origin}/?gas_payment=failure`,
          pending: `${origin}/?gas_payment=pending`,
        },
        auto_return: 'approved',
        metadata,
      }),
    });

    const preference = await preferenceResponse.json().catch(() => ({}));
    if (!preferenceResponse.ok) {
      console.error('Mercado Pago preference error:', preference);
      return new Response(JSON.stringify({ error: 'Could not create Mercado Pago checkout.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        checkoutUrl: preference.init_point,
        preferenceId: preference.id,
        ...responseExtras,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Mercado Pago checkout error:', error);
    return new Response(JSON.stringify({ error: 'Internal checkout error.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
