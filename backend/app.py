from utils.predict import (
    predict_murder,
    predict_theft,
    predict_rape,
    predict_cluster
)


from flask import Flask, jsonify, request
from flask_cors import CORS

import pandas as pd
import numpy as np
import os
import joblib



from flask import request, jsonify
from flask_cors import CORS

from utils.preprocess import preprocess_dataset
from utils.train_models import train_models

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# GLOBALS

current_df = None
model = None
scaler = None
cluster_labels = {}

numeric_columns = [

    "MURDER",
    "RAPE",
    "KIDNAPPING",
    "THEFT"

]

DATASET_FOLDER = "clean_datasets"

# HOME

@app.route("/")
def home():

    return "Crime ML Backend Running"

# DATASETS

@app.route("/datasets", methods=["GET"])
def get_datasets():

    files = [

        "ipc_standardized.csv",
        "women_standardized.csv",
        "children_standardized.csv",
        "sc_standardized.csv",
        "st_standardized.csv"

    ]

    return jsonify(files)

# DISTRICTS

@app.route("/districts/<state_name>", methods=["GET"])
def get_districts(state_name):

    global current_df

    if current_df is None:

        return jsonify([])

    df = current_df.copy()

    df["STATE/UT"] = (
        df["STATE/UT"]
        .astype(str)
        .str.strip()
        .str.upper()
    )

    df["DISTRICT"] = (
        df["DISTRICT"]
        .astype(str)
        .str.strip()
    )

    state_name = state_name.strip().upper()

    filtered_df = df[
        df["STATE/UT"] == state_name
    ]

    districts = (
        filtered_df["DISTRICT"]
        .dropna()
        .unique()
        .tolist()
    )

    districts.sort()

    return jsonify(districts)

# LOAD DATASET

@app.route("/load-dataset", methods=["POST"])
def load_dataset():

    global current_df

    data = request.json

    filename = data["filename"]

    filepath = os.path.join(
        DATASET_FOLDER,
        filename
    )

    df = pd.read_csv(filepath)

    current_df = df

    states = sorted(

        df["STATE/UT"]
        .dropna()
        .astype(str)
        .unique()
        .tolist()

    )

    return jsonify({

        "columns":
            df.columns.tolist(),

        "top_rows":
            df.head(20).to_dict(
                orient="records"
            ),

        "bottom_rows":
            df.tail(10).to_dict(
                orient="records"
            ),

        "total_rows":
            len(df),

        "states":
            states

    })

# TRAIN KMEANS

@app.route("/train-kmeans", methods=["POST"])
def train_kmeans():

    global model
    global scaler
    global current_df
    global cluster_labels

    if current_df is None:

        return jsonify({
            "error": "No dataset loaded"
        }), 400

    df = current_df.copy()

    df = df.dropna()

    X = df[numeric_columns]

    scaler = StandardScaler()

    scaled_data = scaler.fit_transform(X)

    model = KMeans(

        n_clusters=3,
        random_state=42,
        n_init=10

    )

    clusters = model.fit_predict(
        scaled_data
    )

    centroids = model.cluster_centers_

    centroid_scores = []

    for i, centroid in enumerate(centroids):

        score = np.mean(centroid)

        centroid_scores.append(
            (i, score)
        )

    centroid_scores.sort(
        key=lambda x: x[1]
    )

    cluster_labels = {}

    cluster_labels[
        centroid_scores[0][0]
    ] = "Low Rate Crime Area"

    cluster_labels[
        centroid_scores[1][0]
    ] = "Medium Rate Crime Area"

    cluster_labels[
        centroid_scores[2][0]
    ] = "High Rate Crime Area"

    joblib.dump(
        model,
        "kmeans_model.pkl"
    )

    joblib.dump(
        scaler,
        "scaler.pkl"
    )

    return jsonify({

        "message":
            "KMeans model trained successfully",

        "states":
            sorted(
                df["STATE/UT"]
                .dropna()
                .astype(str)
                .unique()
                .tolist()
            )

    })

# PREDICT

@app.route("/predict", methods=["POST"])
def predict():

    global model
    global scaler
    global cluster_labels

    if model is None or scaler is None:

        return jsonify({
            "error": "Model not trained"
        }), 400

    data = request.json

    values = [[

        float(data["MURDER"]),
        float(data["RAPE"]),
        float(data["KIDNAPPING"]),
        float(data["THEFT"])

    ]]

    scaled_input = scaler.transform(
        values
    )

    cluster = model.predict(
        scaled_input
    )[0]

    prediction = cluster_labels[
        cluster
    ]

    return jsonify({

        "prediction":
            prediction

    })





@app.route("/upload-csv", methods=["POST"])
def upload_csv():

    try:

        if "file" not in request.files:
            return jsonify({
                "error": "No file uploaded"
            }), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({
                "error": "Empty filename"
            }), 400

        upload_folder = "uploads"

        os.makedirs(upload_folder, exist_ok=True)

        save_path = os.path.join(
            upload_folder,
            file.filename
        )

        file.save(save_path)

        df, state_encoder, district_encoder = preprocess_dataset(
            save_path
        )

        train_models(df)

        return jsonify({
            "message": "CSV uploaded and models trained successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


@app.route("/predict/murder", methods=["POST"])
def murder_prediction():

    try:

        data = request.json

        prediction = predict_murder(

            int(data["year"]),
            int(data["state"]),
            int(data["district"])

        )

        return jsonify({

            "prediction": prediction

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500



@app.route("/predict/theft", methods=["POST"])
def theft_prediction():

    try:

        data = request.json

        prediction = predict_theft(

            int(data["year"]),
            int(data["state"]),
            int(data["district"])

        )

        return jsonify({

            "prediction": prediction

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500


@app.route("/predict/rape", methods=["POST"])
def rape_prediction():

    try:

        data = request.json

        prediction = predict_rape(

            int(data["year"]),
            int(data["state"]),
            int(data["district"])

        )

        return jsonify({

            "prediction": prediction

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500

if __name__ == "__main__":

    app.run(debug=True)


