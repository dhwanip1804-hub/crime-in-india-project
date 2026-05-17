import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt


# PAGE TITLE
st.title("Crime in India")


# FILE UPLOAD
uploaded_file = st.file_uploader(
    "Upload Crime Dataset (CSV format only)",
    type=["csv"]
)


# CLEAN DATA FUNCTION
def clean_dataset(df):

    df = df.drop_duplicates()

    df.columns = df.columns.str.strip()
    df.columns = df.columns.str.lower()
    df.columns = df.columns.str.replace(" ", "_")

    numeric_cols = df.select_dtypes(include=['number']).columns
    df[numeric_cols] = df[numeric_cols].fillna(0)

    categorical_cols = df.select_dtypes(
        include=['object', 'string']
    ).columns

    df[categorical_cols] = df[categorical_cols].fillna("Unknown")

    return df


# COLUMN DETECTION FUNCTION
def detect_columns(df):

    columns = df.columns

    year_col = None
    state_col = None
    district_col = None

    for col in columns:

        col_lower = col.lower()

        if col_lower == "year":
            year_col = col

        elif col_lower in ["state", "state/ut", "state_ut"]:
            state_col = col

        elif col_lower == "district":
            district_col = col

    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()

    return year_col, state_col, district_col, numeric_cols


# MAIN ANALYSIS
if uploaded_file is not None:

    df = pd.read_csv(uploaded_file)

    df = clean_dataset(df)

    year_col, state_col, district_col, crime_cols = detect_columns(df)

    st.write("Dataset Preview")
    st.dataframe(df.head())


    # CRIME TREND GRAPH
    if year_col:

        st.subheader("Crime Trend Over Years")

        crime_cols = [
            col for col in crime_cols
            if col != year_col
        ]

        yearly_data = df.groupby(year_col)[crime_cols].sum()

        fig, ax = plt.subplots()

        yearly_data.iloc[:, :5].plot(ax=ax)

        st.pyplot(fig)


    # TOP STATES GRAPH
    if state_col:

        st.subheader("Top 10 States by Crime")

        state_data = df.groupby(state_col)[crime_cols].sum()

        state_data["TOTAL"] = state_data.sum(axis=1)

        top_states = state_data.sort_values(
            "TOTAL",
            ascending=False
        ).head(10)

        fig2, ax2 = plt.subplots()

        top_states["TOTAL"].plot(
            kind="bar",
            ax=ax2
        )

        st.pyplot(fig2)


    # TOP CRIME TYPES GRAPH
    st.subheader("Top Crime Categories")

    crime_totals = df[crime_cols].sum()

    top_crimes = crime_totals.sort_values(
        ascending=False
    ).head(10)

    fig3, ax3 = plt.subplots()

    top_crimes.plot(
        kind="bar",
        ax=ax3
    )

    st.pyplot(fig3)


    # YEARLY GROWTH GRAPH
    if year_col:

        st.subheader("Crime Growth Over Years")

        yearly_total = df.groupby(year_col)[crime_cols].sum().sum(axis=1)

        fig4, ax4 = plt.subplots()

        yearly_total.plot(
            marker="o",
            ax=ax4
        )

        st.pyplot(fig4)



