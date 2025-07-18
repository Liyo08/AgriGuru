import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

 #Load dataset
data = pd.read_csv("cropdata.csv")

#Encode text labels to numbers
le_soil = LabelEncoder()
le_season = LabelEncoder()
le_location = LabelEncoder()
le_crop = LabelEncoder()

data["Soil_n"] = le_soil.fit_transform(data["Soil"])
data["Season_n"] = le_season.fit_transform(data["Season"])
data["Location_n"] = le_location.fit_transform(data["Location"])
data["Crop_n"] = le_crop.fit_transform(data["Crop"])

#Features and target
X = data[["Soil_n", "Season_n", "Location_n"]]
y = data["Crop_n"]

#Train the model
model = DecisionTreeClassifier()
model.fit(X, y)

#Save the trained model and encoders
with open("crop_model.pkl", "wb") as f:
    encoders = {
        "soil": le_soil,
        "season": le_season,
        "location": le_location,
        "crop": le_crop
    }
    pickle.dump((model, encoders), f)


print("✅ Model trained and saved as crop_model.pkl")