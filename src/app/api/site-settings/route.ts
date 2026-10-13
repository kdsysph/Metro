import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';
import { queries } from '@/lib/groq-queries';

export async function GET() {
  try {
    const settings = await sanityClient.fetch(queries.siteSettings);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}
