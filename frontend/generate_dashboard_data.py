import pandas as pd
import json

# LOAD DATASET

df = pd.read_csv("C:/Users/SHREYA/Downloads/India_Crime - Copy_2/India_Crime - Copy/01_District_wise_crimes_committed_IPC_2001_2012.csv"
)

# CLEAN DATA

df = df.fillna(0)

# YEARLY TOTALS

yearly_crime = (
    df.groupby("YEAR")["TOTAL IPC CRIMES"]
    .sum()
    .reset_index()
)

# STATE TOTALS

state_crime = (
    df.groupby("STATE/UT")["TOTAL IPC CRIMES"]
    .sum()
    .reset_index()
    .sort_values(by="TOTAL IPC CRIMES", ascending=False)
)

# SCATTER DATA

scatter_data = []

for _, row in df.head(300).iterrows():

    scatter_data.append({
        "MURDER": int(row["MURDER"]),
        "THEFT": int(row["THEFT"]),
    })

# CRIME CATEGORY TOTALS

crime_totals = [
    {
        "crime": "Murder",
        "value": int(df["MURDER"].sum())
    },
    {
        "crime": "Rape",
        "value": int(df["RAPE"].sum())
    },
    {
        "crime": "Theft",
        "value": int(df["THEFT"].sum())
    },
    {
        "crime": "Riots",
        "value": int(df["RIOTS"].sum())
    },
]

# SAFETY DATA

safety_data = [
    {
        "name": "Low",
        "value": 32,
        "fill": "#14532d"
    },
    {
        "name": "Medium",
        "value": 46,
        "fill": "#78350f"
    },
    {
        "name": "High",
        "value": 22,
        "fill": "#7f1d1d"
    },
]

# DOWNLOAD DATA

downloads = []

base = 120

for year in yearly_crime["YEAR"]:

    base += 180

    downloads.append({
        "year": int(year),
        "downloads": base
    })

# FINAL JSON

dashboard_data = {
    "yearly_crime": yearly_crime.to_dict(orient="records"),
    "state_crime": state_crime.head(12).to_dict(orient="records"),
    "scatter_data": scatter_data,
    "crime_totals": crime_totals,
    "safety_data": safety_data,
    "downloads": downloads,
}

# SAVE

with open("src/data/dashboard_visuals.json", "w") as f:
    json.dump(dashboard_data, f, indent=2)

print("dashboard_visuals.json generated successfully")