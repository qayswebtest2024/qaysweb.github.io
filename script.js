// Enable Enter key to move between fields
document.querySelectorAll('input, select').forEach((input, index, inputs) => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextInput = inputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// Toggle the visibility of the datetime input based on delivery time selection
document.getElementById('deliveryTime').addEventListener('change', function() {
    const specificTimeInput = document.getElementById('specificTime');
    if (this.value === 'scheduled') {
        specificTimeInput.style.display = 'block';
    } else {
        specificTimeInput.style.display = 'none';
    }
});

function copyInfo() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    let copyText = '';
    formData.forEach((value, key) => {
        copyText += `${key}: ${value}\n`;
    });
    navigator.clipboard.writeText(copyText).then(() => {
        alert('تم نسخ المعلومات');
    });
}

function printOrder() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const locationURL = document.getElementById('customerLocation').value;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(locationURL)}`;
    const orderDate = new Date().toLocaleString('ar-JO', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Order</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; direction: rtl; }
                .order-info { text-align: right; }
                .qr-code { text-align: center; margin-top: 20px; }
                .order-date { text-align: center; margin-top: 40px; font-size: 12px; }
                @media print { 
                    body { width: 80mm; height: 297mm; } 
                }
            </style>
        </head>
        <body>
            <div class="order-info">
                <p>اسم العميل: ${formData.get('customerName')}</p>
                <p>رقم هاتف العميل: ${formData.get('customerPhone')}</p>
                <p>منطقة التوصيل: ${formData.get('deliveryArea')}</p>
                <p>وقت التوصيل: ${formData.get('deliveryTime') === 'direct' ? 'مباشر' : formData.get('specificTime')}</p>
            </div>
            <div class="qr-code">
                <img src="${qrCodeURL}" alt="QR Code">
                <p>الموقع الجغرافي للعميل</p>
            </div>
            <div class="order-date">
                <p>تاريخ اخذ الطلب: ${orderDate}</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function sendToWhatsApp() {
    const form = document.getElementById('orderForm');
    const formData = new FormData(form);
    const phoneNumber = '0797766055'; // رقم الواتساب الذي تريد إرسال الرسالة إليه
    let message = '';
    formData.forEach((value, key) => {
        message += `${key}: ${value}\n`;
    });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/962${phoneNumber}?text=${encodedMessage}`, '_blank');
}
