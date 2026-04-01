const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const startCameraButton = document.getElementById('start-camera');
const endBillingButton = document.getElementById('end-billing');
const capturedImage = document.getElementById('captured-image');
const cameraPlaceholder = document.getElementById('camera-placeholder');
const itemList = document.getElementById('item-list');
const totalPriceEl = document.getElementById('total-price');

let stream = null;

// Start Camera
startCameraButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        captureButton.disabled = false;
        endBillingButton.disabled = false;
        cameraPlaceholder.style.display = 'none';
        capturedImage.style.display = 'none';
        video.style.display = 'block';
        
        // Clear previous bill
        itemList.innerHTML = '';
        totalPriceEl.textContent = '₹0.00';  // Set initial total price with ₹ symbol
    } catch (err) {
        console.error('Error accessing camera:', err);
    }
});

// Capture Image and Send to Backend
captureButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/png');
    
    // Send image data to backend for prediction
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.label !== 'No item detected') {
            addItemToBill(data.label, data.price);  // Add item to bill with received label and price
        } else {
            console.log('No item detected');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Display captured image temporarily
    capturedImage.src = imageData;
    capturedImage.style.display = 'block';
    video.style.display = 'none';
    
    setTimeout(() => {
        video.style.display = 'block';
        capturedImage.style.display = 'none';
    }, 2000);
});

// End Billing
endBillingButton.addEventListener('click', () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        stream = null;
    }
    video.style.display = 'none';
    cameraPlaceholder.style.display = 'block';
    captureButton.disabled = true;
    endBillingButton.disabled = true;
});

// Add item to the bill and update total price
function addItemToBill(item, price) {
    const li = document.createElement('li');
    li.textContent = `${item}: ₹${price.toFixed(2)}`;  // Use ₹ symbol for item price
    itemList.appendChild(li);

    const currentTotal = parseFloat(totalPriceEl.textContent.replace('₹', ''));  // Remove ₹ symbol before parsing
    totalPriceEl.textContent = `₹${(currentTotal + price).toFixed(2)}`;  // Update total with ₹ symbol
}
