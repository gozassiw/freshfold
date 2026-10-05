// POST /api/book
// Receives booking form data and inserts it into D1 (database binding: DB)

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.formData();

    const name        = (data.get('name')        || '').toString().trim();
    const phone       = (data.get('phone')       || '').toString().trim();
    const address     = (data.get('address')     || '').toString().trim();
    const service     = (data.get('service')     || '').toString().trim();
    const pickup_date = (data.get('date')        || '').toString().trim();
    const time_slot   = (data.get('slot')        || '').toString().trim();
    const notes       = (data.get('notes')       || '').toString().trim();

    // Basic validation
    if (!name || !phone || !address || !service) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await env.DB
      .prepare(
        `INSERT INTO bookings
         (name, phone, address, service, pickup_date, time_slot, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(name, phone, address, service, pickup_date, time_slot, notes)
      .run();

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
