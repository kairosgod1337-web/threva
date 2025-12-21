import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d1b28cd2/health", (c) => {
  return c.json({ status: "ok" });
});

// Get signup count endpoint
app.get("/make-server-d1b28cd2/signup-count", async (c) => {
  try {
    const signups = await kv.getByPrefix("user_signup:");
    const count = signups.length;
    return c.json({ count });
  } catch (error) {
    console.error('Error getting signup count:', error);
    return c.json({ count: 0 }, 500);
  }
});

// User signup endpoint
app.post("/make-server-d1b28cd2/signup", async (c) => {
  try {
    const body = await c.req.json();
    
    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `user_signup:${timestamp}:${body.email}`;
    await kv.set(key, { ...body, timestamp, type: 'user_signup' });
    
    // Send email notification
    const emailContent = `
New User Signup on Trehva Landing Page
========================================

Email: ${body.email}
Children Ages: ${body.childrenAges || 'Not provided'}
Phone: ${body.phone || 'Not provided'}
How Heard: ${body.howHeard || 'Not provided'}
Benefits Interested: ${body.benefits?.join(', ') || 'Not provided'}
Comments: ${body.comments || 'Not provided'}
Privacy Agreement: ${body.privacyAgreement ? 'Yes' : 'No'}

Timestamp: ${timestamp}
    `.trim();
    
    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Trehva Landing <onboarding@resend.dev>',
          to: ['trehva.app@gmail.com'],
          subject: 'New User Signup - Trehva',
          text: emailContent,
        }),
      });
      
      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text());
      }
    } else {
      console.warn('RESEND_API_KEY not set - email not sent');
    }
    
    return c.json({ success: true, message: 'Signup received' });
  } catch (error) {
    console.error('Error processing signup:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Partner inquiry endpoint
app.post("/make-server-d1b28cd2/partner", async (c) => {
  try {
    const body = await c.req.json();
    
    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `partner_inquiry:${timestamp}:${body.email}`;
    await kv.set(key, { ...body, timestamp, type: 'partner_inquiry' });
    
    // Send email notification
    const emailContent = `
New Partner Inquiry on Trehva Landing Page
==========================================

Business Name: ${body.businessName}
Contact Person: ${body.contactPerson}
Business Type: ${body.businessType}
Email: ${body.email}
Message: ${body.message || 'Not provided'}

Timestamp: ${timestamp}
    `.trim();
    
    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Trehva Landing <onboarding@resend.dev>',
          to: ['trehva.app@gmail.com'],
          subject: 'New Partner Inquiry - Trehva',
          text: emailContent,
        }),
      });
      
      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text());
      }
    } else {
      console.warn('RESEND_API_KEY not set - email not sent');
    }
    
    return c.json({ success: true, message: 'Partner inquiry received' });
  } catch (error) {
    console.error('Error processing partner inquiry:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Contact form endpoint
app.post("/make-server-d1b28cd2/contact", async (c) => {
  try {
    const body = await c.req.json();
    
    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `contact_message:${timestamp}:${body.email}`;
    await kv.set(key, { ...body, timestamp, type: 'contact_message' });
    
    // Send email notification
    const emailContent = `
New Contact Message on Trehva Landing Page
==========================================

From: ${body.email}
Message: ${body.message}

Timestamp: ${timestamp}
    `.trim();
    
    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Trehva Landing <onboarding@resend.dev>',
          to: ['trehva.app@gmail.com'],
          subject: 'New Contact Message - Trehva',
          text: emailContent,
        }),
      });
      
      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text());
      }
    } else {
      console.warn('RESEND_API_KEY not set - email not sent');
    }
    
    return c.json({ success: true, message: 'Contact message received' });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);