# 🧠 Computer Vision-Based Automated Billing System

Real-time smart billing system using YOLOv8, OpenCV, and Flask that detects products and automatically generates billing without barcode scanning.

---

## 🏗️ Architecture

Camera (Webcam)
↓
Frontend (HTML + JavaScript)
↓
Flask Backend (Python)
↓
YOLOv8 Model
↓
Product Detection
↓
Price Mapping
↓
Billing Display

---

## 🚀 Project Overview

This system uses a custom-trained YOLOv8 model to detect retail products such as Coca-Cola, Pepsi, 7up, Sprite, and more from a live webcam feed.

Detected products are mapped to predefined prices and dynamically displayed in a web-based billing interface.

---

## 🎥 Demo

[Demo_video](https://youtu.be/U2QKT1qezMY)

---



## 🧠 Features

* Real-time object detection using YOLOv8
* Automated billing without barcode scanning
* Multi-product classification (20+ items)
* Live webcam integration
* Flask backend for inference
* Dynamic billing UI (HTML + JS)

---


## 📂 Project Structure

* `src/` → Backend + detection logic
* `model_graphs/` → Training metrics (F1, PR curves)
* `ui_image/` → UI screenshots
* `report/` → Project documentation
* `requirements.txt` → Dependencies

---

## 🧪 Model Details

* Model: YOLOv8 (custom trained)
* Epochs: 60
* Batch size: 16
* Platform: Google Colab
* Dataset: Roboflow (Retail products)

Detected classes include:
Coca-Cola, Pepsi, 7up, Sprite, Fanta, Limca, Maaza, Mirinda, ThumsUp (bottle & can variants)

---

## 📊 Model Performance

* mAP@0.5: 0.781
* Precision: 1.00
* Precision/Recall: 0.71

The model performs strongly but shows minor confusion between visually similar products like 7up and Sprite.

---

## 💻 System Requirements

* Python ≥ 3.8
* Webcam (for live detection)
* OS: Windows / Linux / macOS
* Internet connection

---

## 📦 Installation

```bash
pip install -r requirements.txt
```

---

## ▶️ Run the Project

```bash
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 🧠 How It Works

1. Webcam captures image
2. Image sent to Flask backend
3. YOLOv8 detects product
4. Product mapped to price
5. UI updates billing

---

## 🔥 Applications

* Smart retail checkout
* Automated billing systems
* Inventory monitoring
* AI-based cashier

---

## ⚠️ Limitations

* Confusion between similar products
* Requires good lighting
* Performance depends on hardware

---


## 🚀 Future Improvements

* Multi-item billing in single frame
* Edge deployment (Raspberry Pi)
* Database integration
* Mobile app version

---

## 👤 Author

Logesh-AJ

---

