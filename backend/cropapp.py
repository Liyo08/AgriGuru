from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Allows frontend to call this API from a browser

# Load model and encoders (from tuple: (model, encoders))
with open("crop_model.pkl", "rb") as f:
    content = pickle.load(f)
    model = content[0]
    encoders = content[1]


@app.route("/", methods=["GET"])
def home():
    return "🌾 AgriGuru Crop Recommendation API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from frontend
        data = request.json
        soil = data.get("soil")
        season = data.get("season")
        location = data.get("location")

        if not soil or not season or not location:
            return jsonify({"error": "Missing input values"}), 400

        # Encode inputs
        soil_encoded = encoders["soil"].transform([soil])[0]
        season_encoded = encoders["season"].transform([season])[0]
        location_encoded = encoders["location"].transform([location])[0]

        features = np.array([[soil_encoded, season_encoded, location_encoded]])
        prediction_encoded = model.predict(features)[0]
        prediction = encoders["crop"].inverse_transform([prediction_encoded])[0]

        return jsonify({"predicted_crop": prediction})

    except Exception as e:
        import traceback
        traceback.print_exc()  # This will print the full traceback in the terminal
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)