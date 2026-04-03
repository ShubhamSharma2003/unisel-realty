import { createClient } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fname, lname, email, phone, code, type, budget } = body;

    // Validate required fields
    if (!fname || !email || !phone) {
      return Response.json(
        { error: 'First name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Insert into oberoi table
    const { data, error } = await supabase
      .from('oberoi')
      .insert([
        {
          first_name: fname,
          last_name: lname || null,
          email,
          phone,
          country_code: code,
          buyer_type: type || null,
          budget_range: budget || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Failed to save form data' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Form submitted successfully',
      data,
    });
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
