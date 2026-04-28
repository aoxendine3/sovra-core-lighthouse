import { NextResponse } from 'next/server';
import stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export async function GET() {
  try {
    const s = new stripe(STRIPE_SECRET_KEY);
    const balance = await s.balance.retrieve();
    
    return NextResponse.json({
      available: balance.available[0].amount / 100,
      pending: balance.pending[0].amount / 100,
      currency: balance.available[0].currency.toUpperCase(),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
