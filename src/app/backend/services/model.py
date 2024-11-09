from joblib import load
from dataclasses import dataclass


@dataclass
class ResponseModel:
    success: bool
    message: str
    data: float

    def to_dict(self):
        return {"success": self.success, "message": self.message, "data": self.data}


class Model:
    def __init__(self) -> None:
        # Cargar Modelo
        self.MODEL = load("../../models/pca_model.joblib")
        # Cargar PCA
        self.PCA = load("../../models/pca_model.joblib")
        # Cargar el MinMaxScaler
        self.S_MIN_MAX = load("../../models/minmax_scaler.joblib")
        # Cargar el RobustScaler
        self.S_ROBUST = load("../../models/robust_scaler.joblib")

    def predict(self, data):
        # Escalar los datos
        # data = self.S_MIN_MAX.transform(data)
        # data = self.S_ROBUST.transform(data)
        # # Get components
        # components = self.PCA.transform(data)
        # # Predict
        # prediction = self.MODEL.predict(components)  # type: ignore

        # ResponseModel
        prediction = ResponseModel(
            success=True, message="Prediction", data=0.0
        ).to_dict()
        return prediction
