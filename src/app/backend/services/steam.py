from services.cache_games import CacheGames
from services.model import Model
import requests


class SteamAPI:
    def __init__(self):
        # ---------------- Variables ---------------------
        # Read cache
        self.cache = CacheGames()
        # URLS
        self.URL_ALL_GAMES = "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
        self.URL_GAME_DETAILS = "https://store.steampowered.com/api/appdetails?appids="
        self.URL_GAME_BY_GENRE = "https://steamspy.com/api.php?request=genre&genre="
        self.URL_GAMES_TOP = "https://steamspy.com/api.php?request=top100in2weeks"
        self.URL_GAMES_INFO = "https://steamspy.com/api.php?request=appdetails&appid="

        # Load Model
        self.model = Model()

    def get_all_games(self):
        # Fetch
        response = requests.get(self.URL_ALL_GAMES)
        # Parse
        games = response.json()["applist"]["apps"]
        # Return
        return games

    def get_game_details(self, game_id):
        # Verify cache
        game = self.cache.get_game(game_id)
        if game:
            print("Getting from Cache:", game_id)
            return game
        # Fetch
        print("Fetching for :", game_id)
        response = requests.get(
            self.URL_GAME_DETAILS + str(game_id) + "&l=english" + "&cc=US"
        )
        if response.status_code != 200:
            return {}
        # Parse
        id = str(game_id)
        game = response.json()[id]["data"]
        # add to cache
        self.cache.add_game(game_id, game)
        # Return
        return game

    def get_game_spy(self, game_id):
        # Verify cache
        game_spy = self.cache.get_game_spy(game_id)
        if game_spy:
            print("Getting from Cache:", game_id)
            return game_spy
        # Fetch
        response = requests.get(
            self.URL_GAMES_INFO + str(game_id)
        )
        if response.status_code != 200:
            return {}
        # Parse
        game = response.json()
        # add to cache
        self.cache.add_game_spy(game_id, game)
        # Return
        return game

    def get_games_by_genre(self, genre, n: int):
        # Fetch
        response = requests.get(self.URL_GAME_BY_GENRE + genre)
        # Parse
        games = response.json()
        # Filter
        games = [game for game in games.values()][:n]
        # Return
        return games

    def get_top_games(self, n=10):
        # Fetch
        response = requests.get(self.URL_GAMES_TOP)
        # Parse
        games = response.json()
        # Map the first n games
        games = [game for game in games.values()][:n]
        # Return
        return games

    def get_games_predict(self, data):
        print("prediciendo...")
        games = self.model.predict(data)
        print("prediccion:", games)
        return games
