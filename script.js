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
const form = document.querySelector('form'); // تأكد من تحديد النموذج المناسب
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        name: document.querySelector('#customer-name').value,
        phone: document.querySelector('#customer-phone').value,
        area: document.querySelector('#delivery-area').value,
        delivery_time: document.querySelector('input[name="delivery-time"]:checked').value,
        location_url: document.querySelector('#customer-location').value,
    };

    fetch('https://script.google.com/macros/s/AKfycbz0TcYqEtHQIbhw17kaj7RCywjLLsIWALu8-uCr9Z-iYNgTyMre6KfMizoxlTubjyyYsQ/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(result => alert('Data saved successfully'))
    .catch(error => console.error('Error:', error));
});
// اجلب زر تخزين البيانات
const storeDataButton = document.querySelector('#store-data-button');

storeDataButton.addEventListener('click', function(e) {
    e.preventDefault();

    const data = {
        name: document.querySelector('#customer-name').value,
        phone: document.querySelector('#customer-phone').value,
        area: document.querySelector('#delivery-area').value,
        delivery_time: document.querySelector('input[name="delivery-time"]:checked').value,
        location_url: document.querySelector('#customer-location').value,
    };

    fetch('https://script.google.com/macros/s/AKfycbz0TcYqEtHQIbhw17kaj7RCywjLLsIWALu8-uCr9Z-iYNgTyMre6KfMizoxlTubjyyYsQ/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.text())
.then(result => alert('تم تخزين البيانات بنجاح'))
.catch(error => console.error('خطأ:', error));

});
document.addEventListener('DOMContentLoaded', function() {
    const storeDataButton = document.querySelector('#store-data-button');
storeDataButton.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Store Data button clicked');
});

        e.preventDefault();

        const data = {
            name: document.querySelector('#customer-name').value,
            phone: document.querySelector('#customer-phone').value,
            area: document.querySelector('#delivery-area').value,
            delivery_time: document.querySelector('input[name="delivery-time"]:checked').value,
            location_url: document.querySelector('#customer-location').value,
        };

        fetch('https://script.google.com/macros/s/AKfycbz0TcYqEtHQIbhw17kaj7RCywjLLsIWALu8-uCr9Z-iYNgTyMre6KfMizoxlTubjyyYsQ/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => alert('تم تخزين البيانات بنجاح'))
        .catch(error => console.error('خطأ:', error));
    });
    document.addEventListener('DOMContentLoaded', function() {
        const nameField = document.querySelector('#customer-name');
        const phoneField = document.querySelector('#customer-phone');
        const areaField = document.querySelector('#delivery-area');
        const deliveryTimeField = document.querySelector('input[name="delivery-time"]:checked');
        const locationField = document.querySelector('#customer-location');
    
        console.log('Name Field:', nameField);
        console.log('Phone Field:', phoneField);
        console.log('Area Field:', areaField);
        console.log('Delivery Time Field:', deliveryTimeField);
        console.log('Location Field:', locationField);
    
        if (!nameField || !phoneField || !areaField || !deliveryTimeField || !locationField) {
            alert('One or more elements are missing');
            return;
        }
    
        const storeDataButton = document.querySelector('#store-data-button');
        storeDataButton.addEventListener('click', function(e) {
            e.preventDefault();
    
            const data = {
                name: nameField.value,
                phone: phoneField.value,
                area: areaField.value,
                delivery_time: deliveryTimeField.value,
                location_url: locationField.value,
            };
    
            fetch('https://script.google.com/macros/s/AKfycbz0TcYqEtHQIbhw17kaj7RCywjLLsIWALu8-uCr9Z-iYNgTyMre6KfMizoxlTubjyyYsQ/exec', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => alert('تم تخزين البيانات بنجاح'))
            .catch(error => console.error('خطأ:', error));
        });
    });
    


