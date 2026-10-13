import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phoneNumber, propertyInterest, howDidYouHear } = body;

    // Validate required fields
    if (!name || !email || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL,
      subject: 'New Property Interest Registration',
      html: `
        <h2>New Registration Interest</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Property Interest:</strong> ${propertyInterest || 'Not specified'}</p>
        <p><strong>How did they hear about Metro:</strong> ${howDidYouHear || 'Not specified'}</p>
        <hr/>
        <p><em>Submitted from Metro Real Estate website</em></p>
      `,
    });

    console.log('Resend response:', { data, error });
    console.log('Email sent to:', process.env.RESEND_TO_EMAIL);
    console.log('Email from:', process.env.RESEND_FROM_EMAIL);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
