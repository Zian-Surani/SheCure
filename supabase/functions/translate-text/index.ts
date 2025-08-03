import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = await req.json()

    // Get translation API key from Supabase secrets
    const translationApiKey = Deno.env.get('TRANSLATION_API_KEY')
    
    if (!translationApiKey) {
      throw new Error('Translation API key not configured')
    }

    // Use Google Translate API
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${translationApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`)
    }

    const data = await response.json()
    const translatedText = data.data.translations[0].translatedText

    return new Response(
      JSON.stringify({ 
        translatedText,
        originalText: text,
        sourceLanguage,
        targetLanguage 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})