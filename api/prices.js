// Credenciales de Blizzard desde las Variables de Entorno de Vercel
const CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

async function getBlizzardToken() {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const response = await fetch('https://oauth.battle.net/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Error al obtener token de Blizzard: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export default async function handler(req, res) {
    // Permitir CORS por si tu frontend lo llama desde otro dominio
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { realm = 'quelthalas', region = 'us' } = req.query;

    try {
        if (!CLIENT_ID || !CLIENT_SECRET) {
            throw new Error('Faltan las credenciales BLIZZARD_CLIENT_ID o BLIZZARD_CLIENT_SECRET en Vercel.');
        }

        const token = await getBlizzardToken();
        
        // Consulta a la API oficial de Blizzard
        const response = await fetch(`https://${region}.api.blizzard.com/data/wow/connected-realm/index?namespace=dynamic-${region}&locale=es_ES`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Error en la API de Blizzard: ${response.statusText}`);
        }
        
        // Devolvemos los datos (puedes ajustar esta estructura con los precios reales de tu app)
        return res.status(200).json({
            success: true,
            realm: realm,
            region: region,
            prices: {
                210815: 45.50, 
                211100: 32.10, 
                213744: 110.00,
                218001: 22.50,
                219001: 18.00,
                224001: 15.00
            }
        });

    } catch (error) {
        console.error('Error detallado en el servidor:', error.message);
        return res.status(500).json({ 
            error: 'No se pudo conectar con la API de Blizzard', 
            details: error.message 
        });
    }
}
