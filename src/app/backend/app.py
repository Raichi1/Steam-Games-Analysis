from flask import Flask, request, jsonify, Blueprint
from services.steam import SteamAPI

app = Flask(__name__)

#Cors
from flask_cors import CORS
CORS(app)


# Initialize services
steam_api = SteamAPI()

# Create a Blueprint
api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/")
def index():
    return "API is running"


# Add a new route to get all the games
# set return json
@api.route("/game/top", methods=["GET"])
def get_games_top():
    n = int(request.args.get("n", 10))
    return jsonify(steam_api.get_top_games(n))


# Add a new route to get all the games
@api.route("/game/<int:game_id>", methods=["GET"])
def get_game_by_id(game_id):
    return jsonify(steam_api.get_game_details(game_id))


# Add a new route to get by genre
@api.route("/game/genre", methods=["GET"])
def get_games_by_genre():
    genre = request.args.get("genre")
    n = request.args.get("n", 10)
    # from "early access" to "early+access"
    genre = genre.replace(" ", "+")  # type: ignore
    return jsonify(steam_api.get_games_by_genre(genre, int(n)))

# Add a new Route for make the Predictions
@api.route("/game/predict", methods=["POST"])
def get_games_predict():
    data = request.json
    return jsonify(steam_api.get_games_predict(data))


# Register the Blueprint
app.register_blueprint(api)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
