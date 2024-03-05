from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the model from a file
model = joblib.load('D:\\Huney_Prediction\\backend\\model\\model.pkl')

# Define the expected feature names in the order they were used during training
expected_features = ['CS', 'Density', 'WC', 'pH', 'EC', 'F', 'G', 'Pollen_analysis', 'Viscosity', 'Purity']

# Define the possible values for 'Pollen_analysis'
possible_pollen_values = [
    'Clover', 'Wildflower', 'Orange Blossom', 'Alfalfa', 'Acacia', 'Lavender', 
    'Eucalyptus', 'Buckwheat', 'Manuka', 'Sage', 'Sunflower', 'Borage', 
    'Rosemary', 'Thyme', 'Heather', 'Tupelo', 'Blueberry', 'Chestnut', 'Avocado'
]

@app.route('/')
def index():
    return 'Connected to the server'


@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON input
    data = request.get_json()

    # Check if data is a dictionary
    if not isinstance(data, dict):
        return jsonify({'error': 'Invalid JSON data'}), 400

    # Convert dictionary to DataFrame
    df = pd.DataFrame([data])

    # Remove 'Price' column if exists
    if 'Price' in df.columns:
        df.drop(columns=['Price'], inplace=True)

    # Apply One-Hot Encoding
    df_encoded = pd.get_dummies(df, columns=['Pollen_analysis'])

    # Ensure the DataFrame has the same features as the training data
    df_subset = df_encoded.reindex(columns=model.feature_names_in_, fill_value=0)

    # Predict
    prediction = model.predict(df_subset)

    # Return prediction
    return str(prediction[0])

# get data from csv file
@app.route('/get_data')
def get_data():
    dataFrame = pd.read_csv("D:\\Huney_Prediction\\backend\\model\\honey_purity_dataset.csv")
    json_data = dataFrame.to_json(orient='records')

    with open('D:\\Huney_Prediction\\backend\\model\\honey_purity_dataset.json', 'w') as f:
        f.write(json_data)
        
    return json_data

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
