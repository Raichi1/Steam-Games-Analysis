import pandas as pd
import numpy as np
import re

class Dataframe_:
    def __init__(self, data):
        self.data = data
        # self.dataframe = pd.DataFrame()
        self.lista = list()
        # self._build_dataframe()

    def build_dataframe(self):
        # Capture Release date
        # self.dataframe['Release date'] = pd.to_datetime(self.data['release_date']['date'], format= '%b %d, %Y')
        self.lista.append(pd.to_datetime(self.data['release_date']['date'], format= '%b %d, %Y'))

        # Capture CCU
        self.lista.append(0 if 'ccu' not in self.data else self.data['ccu'])
        # self.dataframe['Peak ccu'] = 0 if 'ccu' not in self.data else self.data['ccu']

        # Price
        self.lista.append(0.0 if "price_overview" not in self.data else self.data['price_overview']['final'] / 100)
        # self.dataframe['Price'] = 0 if "price_overview" not in self.data else self.data['price_overview']['final'] / 100

        # Quantity of dlc
        self.lista.append(0 if "dlc" not in self.data else len(self.data["dlc"]))
        # self.dataframe['DLC count'] = 0 if "dlc" not in self.data else len(self.data["dlc"])
        
        # Identify supported languages
        pattern = re.compile(r"[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s\-\s[A-z][a-z]+)?")
        self.lista.append(str(pattern.findall(self.data['supported_languages'])))
        # self.dataframe['Supported languages'] = pattern.findall(self.data['supported_languages'])

        # Identify operating systems
        boolean_windows = self.data['platforms']['windows']
        self.lista.append(np.int64(boolean_windows))
        # self.dataframe['Windows'] = np.int64(boolean_windows)

        boolean_mac = self.data['platforms']['mac']
        self.lista.append(np.int64(boolean_mac))
        # self.dataframe['Mac'] = np.int64(boolean_mac)

        boolean_linux = self.data['platforms']['linux']
        self.lista.append(np.int64(boolean_linux))
        # self.dataframe['Linux'] = np.int64(boolean_linux)

        # Metacritic score
        self.lista.append(0.0 if "metacritic" not in self.data else self.data['metacritic']['score'])
        # self.dataframe['Metacritic score'] = 0 if "metacritic" not in self.data else self.data['metacritic']['score']

        # Capture User score
        self.lista.append(self.data['userscore'])
        # self.dataframe['User score'] = self.data['userscore']

        # Positive score
        self.lista.append(self.data['positive'])
        # self.dataframe['Positive'] = self.data['positive']

        # Negative score
        self.lista.append(self.data['negative'])
        # self.dataframe['Negative'] = self.data['negative']

        # Achievements
        self.lista.append(self.data['achievements']['total'])
        # self.dataframe['Achievements'] = self.data['achievements']['total']

        # Recommendations
        self.lista.append(self.data['recommendations']['total'])
        # self.dataframe['Recommendations'] = self.data['recommendations']['

        # Capture Average playtime forever
        self.lista.append(np.float64(self.data['average_forever']))
        # self.dataframe['Average playtime forever'] = self.data['average_forever']

        # Capture Average playtime two weeks
        self.lista.append(np.float64(self.data['average_2weeks']))
        # self.dataframe['Average playtime two weeks'] = self.data['average_2weeks']

        # Capture Median playtime forever
        self.lista.append(np.float64(self.data['median_forever']))
        # self.dataframe['Median playtime forever'] = self.data['median_forever']

        # Capture Median playtime two weeks
        self.lista.append(np.float64(self.data['median_2weeks']))
        # self.dataframe['Median playtime two weeks'] = self.data['median_2weeks']

        # Genres
        self.lista.append(str([genre['description'] for genre in self.data['genres']]))
        # self.dataframe['Genres'] = str([genre['description'] for genre in self.data['genres']])

        # Minimum age requirement
        self.lista.append(np.int64(int(self.data['required_age']) >= 15))
        # boolean = int(self.data['required_age']) >= 15
        # self.dataframe['+15'] = np.int64(boolean)

        dataframe = pd.DataFrame(
            columns = [ 'Release date', 'Peak CCU', 'Price', 'DLC count', 'Supported languages',
                      'Windows', 'Mac', 'Linux', 'Metacritic score', 'User score', 'Positive', 
                      'Negative', 'Achievements', 'Recommendations', 'Average playtime forever',
                      'Average playtime two weeks', 'Median playtime forever',
                      'Median playtime two weeks', 'Genres', '+15'],
            data = [self.lista]
        )

        return dataframe

