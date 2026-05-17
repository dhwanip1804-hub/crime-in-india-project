import pandas as pd
import joblib

from sklearn.preprocessing import LabelEncoder


def preprocess_dataset(csv_path):

    df = pd.read_csv(csv_path)

    df.columns = (
        df.columns
        .str.strip()
        .str.upper()
    )

    column_mapping = {

        "YEAR": "Year",
        "STATE/UT": "State",
        "DISTRICT": "District",
        "MURDER": "Murder",
        "THEFT": "Theft",
        "RAPE": "Rape"

    }

    df.rename(
        columns=column_mapping,
        inplace=True
    )

    required_columns = [

        "Year",
        "State",
        "District",
        "Murder",
        "Theft",
        "Rape"

    ]

    for col in required_columns:

        if col not in df.columns:

            raise Exception(
                f"Missing column: {col}"
            )

    df.fillna(0, inplace=True)

    state_encoder = LabelEncoder()

    district_encoder = LabelEncoder()

    df["State_Encoded"] = state_encoder.fit_transform(
        df["State"]
    )

    df["District_Encoded"] = district_encoder.fit_transform(
        df["District"]
    )

    joblib.dump(
        state_encoder,
        "ml_models/state_encoder.pkl"
    )

    joblib.dump(
        district_encoder,
        "ml_models/district_encoder.pkl"
    )

    return df, state_encoder, district_encoder