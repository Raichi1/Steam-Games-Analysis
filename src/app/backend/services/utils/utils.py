import numpy as np
import pandas as pd

from sklearn.utils.validation import check_array
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import make_pipeline, make_union
from sklearn.compose import make_column_transformer


__all__ = ['PipelineTransform']

# Constants
categories = [
    'Free to Play',          'Strategy',              'Software Training',   'RPG', 'Utilities',
    'Animation & Modeling',  '360 Video',             'Sports', 'Adventure', 'Racing',
    'Early Access',          'Indie',                 'Web Publishing',      'Audio Production', 
    'Documentary',           'Design & Illustration', 'Video Production',    'Episodic',
    'Game Development',      'Education',             'Accounting',          'Sexual Content', 
    'Tutorial',              'Gore',                  'Violent',             'Short',    
    'Massively Multiplayer', 'Casual',                'Nudity',              'Photo Editing',
    'Movie',                 'Simulation',            'Action'
]

robust_columns = [
    'Peak CCU',                  'DLC count',                  'Metacritic score',        'User score',                
    'Positive',                  'Negative',                   'Achievements',            'Recommendations',
    'Average playtime forever',  'Average playtime two weeks', 'Median playtime forever', 'Median playtime two weeks', 
    'Achievements_per_hour',     'Genre_count',                'Recent_playtime_ratio',   'Languages_count',
    'Antiquity',                 'Recommendation_per_genre'
]

minmax_columns = [ 'Price', 'OS_ratio', 'Platform_count']

final_columns = [
    'Peak CCU', 'DLC count', 'Metacritic score', 'Positive', 'Negative',
    'Achievements', 'Recommendations', 'Average playtime forever',
    'Average playtime two weeks', 'Median playtime forever',
    'Median playtime two weeks', 'Achievements_per_hour', 'Genre_count',
    'Recent_playtime_ratio', 'Languages_count', 'Antiquity',
    'Recommendation_per_genre', 'Price', 'OS_ratio', 'Platform_count',
    'Windows', 'Mac', 'Linux', 'Casual', 'Adventure', 'RPG', 'Free to Play',
    'Indie', 'Violent'
]

# Functions
def count_languages(word : str):
  word.replace("'", '')
  word.replace("[", '').replace("]", '')
  return len(word.split(','))


# Transformers
class _PlatformCountTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Platform_count'] = X[['Windows', 'Mac', 'Linux']].sum(axis = 1)
        return X
    
class _AchievementsPerHourTransformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Achievements_per_hour'] = X.apply(
            lambda x : 
                x['Achievements'] 
                if x['Average playtime forever'] == 0 
                else x['Achievements'] / x['Average playtime forever'],
            axis = 1
        )
        return X

class _GenreCountTranformer(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Genre_count'] = X[categories].sum(axis = 1)
        return X
    
class _RecentPlaytimeRatio(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Recent_playtime_ratio'] = X.apply(
            lambda x : 
                x['Average playtime two weeks'] 
                if x['Average playtime forever'] == 0 
                else x['Average playtime two weeks'] / x['Average playtime forever'],
            axis = 1
        )
        return X

class _LanguageCount(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Languages_count'] = X['Supported languages'].apply(count_languages)
        return X
    
class _OSRatio(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['OS_ratio'] = (X[['Windows', 'Mac', 'Linux']].sum(axis = 1) / 3).astype(float)
        return X
    
class _Antiquity(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Antiquity'] = (pd.to_datetime('today') - pd.to_datetime(X['Release date'])).dt.days
        return X
    
class _RecommendationPerGenre(BaseEstimator, TransformerMixin):
    def fit(self, X, y = None):
        return self
    
    def transform(self, X):
        X = X.copy()
        X['Recommendation_per_genre'] = X['Recommendations'] / X['Genre_count']
        return X

# Pipeline
class PipelineTransform():
    def __init__(self):
        self.pipeline = make_pipeline(
                _PlatformCountTransformer(),
                _AchievementsPerHourTransformer(),
                _GenreCountTranformer(),
                _RecentPlaytimeRatio(),
                _LanguageCount(),
                _OSRatio(),
                _Antiquity(),
                _RecommendationPerGenre()
        )
    
    def fit_transform(self, X):
        return self.pipeline.fit_transform(X)
    

class ScalerData():
    def __init__(self):
        self

    def transform(self, X, robusScaler, minmaxScaler):
        X = X.copy()
        X[minmax_columns] = minmaxScaler.transform(X[minmax_columns])
        X[robust_columns] = robusScaler.transform(X[robust_columns])
        return X[final_columns]

