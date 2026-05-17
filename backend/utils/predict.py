import os
import joblib
import numpy as np


def load_model(model_path):

    if not os.path.exists(model_path):

        raise Exception(
            f"Missing model file: {model_path}"
        )

    return joblib.load(model_path)


def load_encoder(encoder_path):

    if not os.path.exists(encoder_path):

        raise Exception(
            f"Missing encoder file: {encoder_path}"
        )

    return joblib.load(encoder_path)


def encode_inputs(state, district):

    state_encoder = load_encoder(
        "ml_models/state_encoder.pkl"
    )

    district_encoder = load_encoder(
        "ml_models/district_encoder.pkl"
    )

    state_value = state_encoder.transform(
        [state]
    )[0]

    district_value = district_encoder.transform(
        [district]
    )[0]

    return state_value, district_value


def predict_murder(year, state, district):

    model = load_model(
        "ml_models/murder_model.pkl"
    )

    state_value, district_value = encode_inputs(
        state,
        district
    )

    data = np.array([
        [year, state_value, district_value]
    ])

    prediction = model.predict(data)

    return round(prediction[0])


def predict_theft(year, state, district):

    model = load_model(
        "ml_models/theft_model.pkl"
    )

    state_value, district_value = encode_inputs(
        state,
        district
    )

    data = np.array([
        [year, state_value, district_value]
    ])

    prediction = model.predict(data)

    return round(prediction[0])


def predict_rape(year, state, district):

    model = load_model(
        "ml_models/rape_model.pkl"
    )

    state_value, district_value = encode_inputs(
        state,
        district
    )

    data = np.array([
        [year, state_value, district_value]
    ])

    prediction = model.predict(data)

    labels = {

        0: "LOW",
        1: "MEDIUM",
        2: "HIGH"

    }

    return labels[int(prediction[0])]


def predict_cluster(year, state, district):

    model = load_model(
        "ml_models/kmeans_model.pkl"
    )

    state_value, district_value = encode_inputs(
        state,
        district
    )

    data = np.array([
        [year, state_value, district_value]
    ])

    prediction = model.predict(data)

    return int(prediction[0])