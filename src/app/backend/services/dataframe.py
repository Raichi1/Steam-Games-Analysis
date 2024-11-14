import pandas as pd
import numpy as np
import re

class Dataframe:
    def __init__(self, data : dict):
        self.data = data
        self.dataframe = pd.DataFrame()

    def build_dataframe(self):
        # Capture Release date
        self.dataframe['Release date'] = pd.to_datetime(self.data['release_date']['date'], format= '%b %d, %Y')

        # Price
        self.dataframe['Price'] = 0 if "price_overview" not in self.data else self.data['price_overview']['final'] / 100

        # Quantity of dlc
        self.dataframe['DLC count'] = 0 if "dlc" not in self.data else len(self.data["dlc"])


        
        # Identify supported languages
        pattern = re.compile(r"[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s\-\s[A-z][a-z]+)?")
        self.dataframe['Supported languages'] = pattern.findall(self.data['supported_languages'])

        # Identify operating systems
        self.dataframe['Windows'] = np.int64(self.data['platforms']['windows'])
        self.dataframe['Mac'] = np.int64(self.data['platforms']['mac'])
        self.dataframe['Linux'] = np.int64(self.data['platforms']['linux'])

        # Metacritic score
        self.dataframe['Metacritic score'] = 0 if "metacritic" not in self.data else self.data['metacritic']['score']

        # Genres
        self.dataframe['Genres'] = [x['description'] for x in self.data['genres']]

        # Minimum age requirement
        self.data['+15'] = np.int64(self.data['required_age'] >= 15)

        return self

    