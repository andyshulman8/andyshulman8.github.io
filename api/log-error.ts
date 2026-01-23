import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, stack, route, timestamp } = req.body;

    // Log the error for monitoring (in production, this would go to a logging service)
    console.log('Error logged:', { message, stack, route, timestamp });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in log-error handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}