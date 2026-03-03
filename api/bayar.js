export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { amount } = req.body;
    
    // API Key diambil dari sistem Vercel (Environment Variable)
    const API_KEY_ATLANTIK = process.env.ATLANTIK_KEY; 

    try {
        const response = await fetch('https://atlantikpay.com/api/v1/create-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: API_KEY_ATLANTIK,
                nominal: amount,
                metode: "qris",
                keterangan: "Donasi Alwaysnyzzz"
            })
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Gagal memproses pembayaran' });
    }
}
