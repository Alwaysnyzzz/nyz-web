async function buatDonasi() {
    const amount = document.getElementById('amount').value;
    const btn = document.getElementById('btn-donasi');
    const resultDiv = document.getElementById('result');

    if (amount < 1000) {
        alert("Minimal donasi Rp 1.000");
        return;
    }

    btn.innerText = "Processing...";
    btn.disabled = true;

    // Data yang dikirim ke Atlantik
    const data = {
        api_key: "ISI_API_KEY_ANDA", // Tempel API Key Atlantik di sini
        nominal: amount,
        metode: "qris", // Anda bisa ganti sesuai dokumentasi Atlantik
        keterangan: "Donasi nyz-web"
    };

    try {
        // Ganti URL ini dengan URL API endpoint resmi dari Atlantik
        const response = await fetch('https://atlantikpay.com/api/v1/create-transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const resData = await response.json();

        if (resData.status === true) {
            // Jika berhasil, biasanya diarahkan ke link pembayaran atau muncul QRIS
            window.location.href = resData.checkout_url; 
        } else {
            resultDiv.innerHTML = `<p style="color:red">Gagal: ${resData.message}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red">Error Koneksi!</p>`;
    } finally {
        btn.innerText = "Bayar Sekarang";
        btn.disabled = false;
    }
}
