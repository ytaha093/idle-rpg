from flask import Flask, request, jsonify
from detoxify import Detoxify

app = Flask(__name__)
model = Detoxify('multilingual')  # loads once

@app.route('/moderate', methods=['POST'])
def moderate():
    data = request.json
    text = data.get('text', '')

    scores = model.predict(text)

    # Detoxify returns numpy float32 values, which Flask's JSON encoder cannot serialize.
    serializable_scores = {label: float(score) for label, score in scores.items()}

    return jsonify(serializable_scores)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)