import json
import threading
import time


class CacheGames:
    def __init__(self):
        print("CacheGames initialized")
        self.cache = self._read_cache()
        self.thread_started = False
        self._init_thread()

    def add_game(self, game_id, movie):
        print("Adding to Cache:", game_id)
        self.cache[game_id] = movie

    def get_game(self, game_id):
        return self.cache.get(game_id)

    def _read_cache(self):
        try:
            with open("./services/cache.json", "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return {}

    def _save_cache(self):
        with open("./services/cache.json", "w") as file:
            json.dump(self.cache, file)

    # Save the cache every interval of seconds (60 seconds by default)
    def save_cache_periodically(self, interval=60):
        while True:
            print("Guardando..")
            time.sleep(interval)
            self._save_cache()

    def _init_thread(self):
        if not self.thread_started:
            # Iniciar el hilo para guardar el caché periódicamente cada 5 minutos (300 segundos)
            cache_saving_thread = threading.Thread(target=self.save_cache_periodically)
            cache_saving_thread.daemon = True
            cache_saving_thread.start()
            self.thread_started = True
            print("CacheGames job started")