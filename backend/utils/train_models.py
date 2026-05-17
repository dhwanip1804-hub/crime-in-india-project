import pandas as pd
import joblib

from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.naive_bayes import GaussianNB


def train_models(df):

    features = [
        "Year",
        "State_Encoded",
        "District_Encoded"
    ]

    X = df[features]

    # ==================================
    # MURDER MODEL
    # ==================================

    murder_y = df["Murder"]

    murder_model = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    murder_model.fit(X, murder_y)

    joblib.dump(
        murder_model,
        "ml_models/murder_model.pkl"
    )

    # ==================================
    # THEFT MODEL
    # ==================================

    theft_y = df["Theft"]

    theft_model = LinearRegression()

    theft_model.fit(X, theft_y)

    joblib.dump(
        theft_model,
        "ml_models/theft_model.pkl"
    )

    # ==================================
    # RAPE MODEL
    # ==================================

    df["Rape"] = pd.to_numeric(
    df["Rape"],
    errors="coerce"
    )
    
    df["Rape"] = df["Rape"].fillna(0)
    
    df["Rape_Level"] = pd.cut(
        
        df["Rape"],
        
        bins=[-1, 50, 150, 100000],
        
        labels=[0, 1, 2]
        
        )
    
    df = df.dropna(subset=["Rape_Level"])

    rape_y = df["Rape_Level"]

    rape_model = GaussianNB()

    rape_model.fit(X, rape_y)

    joblib.dump(
        rape_model,
        "ml_models/rape_model.pkl"
    )

    # ==================================
    # KMEANS MODEL
    # ==================================

    kmeans = KMeans(
        n_clusters=3,
        random_state=42
    )

    kmeans.fit(X)

    joblib.dump(
        kmeans,
        "ml_models/kmeans_model.pkl"
    )

    print("All models trained successfully")


