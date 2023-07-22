from flask import Flask, request, jsonify
from gensim.models import KeyedVectors
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

model = KeyedVectors.load_word2vec_format("./GoogleNews-vectors-negative300-SLIM.bin", binary=True)

@app.route("/similarity", methods=["GET"])
def similarity():
    word1 = request.args.get("word1").lower()
    word2 = request.args.get("word2").lower()

    # Check if the words are valid
    if not word1 or not word2:
        return jsonify({"error": "Missing words"}), 400

    # Check if the words are in the model vocabulary
    if word1 not in model or word2 not in model:
        return jsonify({"error": "Unknown words"}), 404

    similarity = model.similarity(word1, word2)
    return jsonify({"similarity": f"{similarity}"}), 200

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Welcome to the similarity api!"}), 200

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Page not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
