import os

from flask import Flask, jsonify, make_response, render_template, request

from app = Flask(__name__)
app.debug = False
app._static_folder = os.path.abspath("templates/static/")

@app.route("/", methods=["GET"])
def index():
  title = "Complementary color Application"
  return render_template("layouts/palette_extractor.html", title=title)

@app.route("/palette_extractor/")
def paletteExtractor():
  title = "Complementary color Application,
  return render_template("layouts/palette_extractor.html", title=title)
  
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000
