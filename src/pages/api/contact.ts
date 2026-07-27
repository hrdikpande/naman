export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString() || '';
    const email = data.get('email')?.toString() || '';
    const phone = data.get('phone')?.toString() || '';
    const service = data.get('service')?.toString() || '';
    const message = data.get('message')?.toString() || '';

    // Validate inputs
    if (!name || !email || !phone || !service) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (!import.meta.env.GMAIL_USER || !import.meta.env.GMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured. Found GMAIL_USER:', import.meta.env.GMAIL_USER ? 'Set' : 'Unset', 'Found PASSWORD:', import.meta.env.GMAIL_APP_PASSWORD ? 'Set' : 'Unset');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.GMAIL_USER,
        pass: import.meta.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: import.meta.env.GMAIL_USER,
      to: import.meta.env.GMAIL_USER, // Send the enquiry to the business owner
      replyTo: email,
      subject: `New Enquiry from ${name} - ${service}`,
      html: `
        <h2>New Enquiry Received via Website</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${service}</td></tr>
        </table>
        <h3 style="margin-top: 20px;">Message:</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>') || '<em>No message provided</em>'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
