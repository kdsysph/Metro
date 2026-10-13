import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';
import { queries } from '@/lib/groq-queries';

export async function GET() {
  try {
    const projects = await sanityClient.fetch(queries.allProjects);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
