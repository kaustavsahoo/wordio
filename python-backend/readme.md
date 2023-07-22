# Wordio Python Backend

This folder contains the Python, Flask, and Gensim code for the word vectors API. The API is responsible for loading and serving word vectors from a pre-trained word2vec model. The API provides one routes: /similarity.

## How to run

- Install the dependencies using `pip install -r requirements.txt`.
- Download the word vectors file from https://github.com/eyaler/word2vec-slim, extract it, and place it in this folder.
- Start the server using `python app.py`.
- The server will listen on port 5000 or the port specified by the environment variable PORT.
