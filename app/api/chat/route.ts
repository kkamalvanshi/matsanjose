import { NextRequest, NextResponse } from 'next/server';

// Retell AI API configuration
const RETELL_API_URL = 'https://api.retellai.com/v2/chat';
const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { message, agentId, conversationId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!RETELL_API_KEY) {
      return NextResponse.json(
        { error: 'Retell API key not configured' },
        { status: 500 }
      );
    }

    // Call Retell AI API
    const response = await fetch(RETELL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        conversation_id: conversationId,
        message: message,
        // Add any additional parameters your Retell AI agent expects
      }),
    });

    if (!response.ok) {
      throw new Error(`Retell AI API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      response: data.message || data.response,
      conversationId: data.conversation_id,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response if Retell AI is unavailable
    const fallbackResponses = [
      "Thanks for your message! MAT San Jose specializes in creating stunning web experiences. How can I help you today?",
      "I'd love to help you learn more about our services. What specific project are you considering?",
      "Great question! Our team works with modern technologies to deliver exceptional results. What would you like to know?",
      "We're here to help bring your digital vision to life. Can you tell me more about what you're looking for?",
    ];

    return NextResponse.json({
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      conversationId: 'fallback',
    });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Chat API is running' },
    { status: 200 }
  );
} 