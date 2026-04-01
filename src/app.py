import base64
import io
from flask import Flask, render_template, request, jsonify
from PIL import Image
from ultralytics import YOLO
import numpy as np

app = Flask(__name__)



# Load the YOLO model
model = YOLO(r'C:\Users\logesh A.J\Documents\projects\final_billing\yolov8\website\yolo_billing_model_last_try_2.pt     ')  # Use your trained YOLO model

# Price dictionary for each item
prices = {
    '7up-bottle': 40,
    '7up-can': 35,
    'cocacola-bottle': 45,
    'cocacola-can': 40,
    'dew-bottle': 35,
    'dew-can': 30,
    'fanta-bottle': 45,
    'fanta-can': 35,
    'frooti-bottle': 25,
    'limca-bottle': 35,
    'limca-can': 30,
    'maaza-bottle': 25,
    'mirinda-bottle': 45,
    'mirinda-can': 35,
    'pepsi-bottle': 40,
    'pepsi-can': 35,
    'sprite-bottle': 40,
    'sprite-can': 35,
    'thumbsup-can': 35,
    'thumsup-bottle': 40
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the base64 image from the frontend
        data = request.json.get('image')
        
        if not data:
            return jsonify({'error': 'No image data received'}), 400

        # Convert the base64 image to PIL Image
        image_data = base64.b64decode(data.split(',')[1])
        image = Image.open(io.BytesIO(image_data))

        # Convert the image to RGB (ignores alpha channel if present)
        image_rgb = image.convert('RGB')

        # Convert the image to a numpy array (YOLO format)
        image_np = np.array(image_rgb)

        # Run the image through YOLO model
        results = model(image_np)

        # Check if any boxes (detections) were found
        if len(results[0].boxes) > 0:
            # Get the predicted class (label index) from the first detection
            label_index = int(results[0].boxes[0].cls[0])
            
            # Get the label name from the model's class names
            label = results[0].names[label_index]

            # Print the detected label for debugging
            print(f"Detected label: {label}")

            # Get the price from the dictionary
            price = prices.get(label, 0.0)

            # Return the prediction and price as JSON
            return jsonify({'label': label, 'price': price})
        else:
            print("No item detected")
            return jsonify({'label': 'No item detected', 'price': 0.0})

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
