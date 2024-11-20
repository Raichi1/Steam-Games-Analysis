import re
import json
import numpy as np
import pandas as pd
from joblib import load
from sklearn.ensemble import HistGradientBoostingClassifier
from skopt import BayesSearchCV
from dataclasses import dataclass
from services.transform import TransformData



@dataclass
class ResponseModel:
    success: bool
    message: str
    data: str 

    def to_dict(self):
        return {"success": self.success, "message": self.message, "data": self.data}


class Model:
    def __init__(self) -> None:
        # Cargar Modelo
        self.MODEL = load("../../models/models/bayes_search_hist_gradient_boosting.joblib")
        # Label Encoder
        self.LABEL_ENCODER = load("../../models/models/label_encoder.joblib")
        # Cargar PCA
        self.PCA = load("../../models/models/pca_model.joblib")
        # Cargar el MinMaxScaler
        self.S_MIN_MAX = load("../../models/scalers/minmax_scaler.joblib")
        # Cargar el RobustScaler
        self.S_ROBUST = load("../../models/scalers/robust_scaler.joblib")

    def predict(self, data):
        # Build DataFrame
        transform_data = TransformData(data)

        # scaled_dataframe =
        transform_data.scale_data(self.S_ROBUST, self.S_MIN_MAX)

        print(transform_data.dataframe.info())
        # Get components
        transform_data.pca_transform(self.PCA)

        # # Predict
        prediction = self.LABEL_ENCODER.inverse_transform(self.MODEL.predict(transform_data.dataframe))[0]  # type: ignore

        # ResponseModel
        prediction = ResponseModel(
            success=True, message="Prediction", data = prediction
        ).to_dict()
        return prediction
