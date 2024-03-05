import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
import joblib

dataFrame = pd.read_csv("honey_purity_dataset.csv")
dataFrame.head()

# ใช้เฉพาะข้อมูลที่ต้องการ
X = dataFrame[['CS', 'Density', 'WC', 'pH', 'EC', 'F', 'G', 'Pollen_analysis', 'Viscosity', 'Purity']]
y = dataFrame['Price']

# แปลงข้อมูลแบบ category ใน 'Pollen_analysis' โดยใช้ One-Hot Encoding
X_encoded = pd.get_dummies(X, columns=['Pollen_analysis'])

# แบ่งข้อมูลเป็นชุด train และ test
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# สร้างโมเดล RandomForestRegressor
model = RandomForestRegressor()

# ฝึกโมเดลด้วยชุด train
model.fit(X_train, y_train)

# ทำการพยากรณ์ด้วยโมเดลที่ฝึกแล้ว ด้วยชุด test
y_pred = model.predict(X_test)

# คำนวณ Mean Squared Error
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)
print("--------------------------------------------------------------")

with open('model.pkl', 'wb') as f:
    joblib.dump(model, "model.pkl")