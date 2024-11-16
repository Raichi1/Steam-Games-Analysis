from services.utils.utils import PipelineTransform, ScalerData
import pandas as pd
import numpy as np
import re

Genres = [ 
    'Racing', 'RPG', 'Sexual Content', 'Episodic', 'Accounting', 'Simulation', 'Video Production',
    'Design & Illustration', 'Strategy', 'Game Development', 'Web Publishing','Short','Free To Play',
    'Animation & Modeling','Action','Education','Documentary','360 Video','Violent','Software Training',
    'Sports','Movie','Early Access','Audio Production','Photo Editing','Massively Multiplayer', 'Tutorial', 
    'Utilities', 'Indie', 'Nudity', 'Casual', 'Gore', 'Adventure'
    ]

class TransformData:
    def __init__(self, data):
        self.data = data
        self._build_dataframe()
        # self.dataframe = pd.DataFrame()
        # self._build_dataframe()

    def _build_dataframe(self):
        dataframe = pd.DataFrame(self.data, index = [0])

        # Change data type
        dataframe['Release date'] = pd.to_datetime(dataframe['Release date'], format = '%b %d, %Y')
        dataframe['Windows'] = dataframe['Windows'].astype(np.int64)
        dataframe['Mac'] = dataframe['Mac'].astype(np.int64)
        dataframe['Linux'] = dataframe['Linux'].astype(np.int64)

        # One hot encode genres
        one_hot_encode = pd.DataFrame(
            columns = Genres,
            data = np.zeros((1, len(Genres)), dtype = int)
        )

        genre_clean = [genre.strip().title() for genre in dataframe.loc[0, 'Genres'].split(', ')]

        for genre in genre_clean:
            one_hot_encode.loc[0, genre] = 1

        dataframe = pd.concat((dataframe, one_hot_encode), axis = 1)

        dataframe.rename(columns={'Free To Play': 'Free to Play'}, inplace=True)

        # Create features
        pipeline = PipelineTransform()

        self.dataframe = pipeline.fit_transform(dataframe)

        self.dataframe.drop(columns = ['Genres', 'Supported languages', 'Release date'], inplace = True)

        return self
    
    def scale_data(self, robustScaler, minmaxScaler):
        scaler_data = ScalerData()
        
        self.dataframe = scaler_data.transform(self.dataframe, robustScaler, minmaxScaler)

        return self
    
    def pca_transform(self, PCA):
        principal_components = PCA.transform(self.dataframe)
        
        # print(principal_components)
        pca_df = pd.DataFrame(principal_components, columns = [f'PCA{i}' for i in range(1, principal_components.shape[1] + 1)])
        
        self.dataframe = pd.concat((self.dataframe, pca_df), axis = 1)

        return self   
