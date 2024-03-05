import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score

from sklearn.metrics import mean_squared_error, r2_score
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import joblib

data = pd.read_csv("/content/honey_purity_dataset.csv")
data.head()
data.isna().sum()
feature_categorical = [cname for cname in data.columns if data[cname].dtype == "object"]
data[feature_categorical] = data[feature_categorical].astype("str")

feature_numeric = [cname for cname in data.columns if data[cname].dtype == "float" or data[cname].dtype=="int"]
print(feature_numeric)
print(feature_categorical)
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()

for columna in feature_categorical:
    data[columna] = le.fit_transform(data[columna])
def Engineer(data):
    return data
datas = Engineer(data)
y = datas["Purity"]
X = datas.drop("Purity", axis=1)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split (X, y, test_size = 0.2, random_state = 42, shuffle=True)
model_1 = RandomForestRegressor()

# Realizar validación cruzada
model_1.fit(X_train, y_train)

# ทำการพยากรณ์ด้วยโมเดลที่ฝึกแล้ว ด้วยชุด test ที่ถูกทำ Normalization แล้ว
y_pred = model_1.predict(X_test)

# คำนวณ Mean Squared Error
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)
print("ค่าความคลาดเคลื่อนเฉลี่ยประมาณ : ", mse*100 , "%")

print("--------------------------------------------------------------")

with open('Predict Purity and Price of Honey.pkl', 'wb') as f:
    joblib.dump(model_1, "model.joblib")