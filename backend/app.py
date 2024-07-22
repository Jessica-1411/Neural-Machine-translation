from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)
CORS(app)  

model_name = "Helsinki-NLP/opus-mt-en-ml"
model = MarianMTModel.from_pretrained(model_name)
tokenizer = MarianTokenizer.from_pretrained(model_name)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text', '')
    if text:
        inputs = tokenizer(text, return_tensors="pt")
        translation_ids = model.generate(**inputs)
        translation = tokenizer.batch_decode(translation_ids, skip_special_tokens=True)[0]
        return jsonify({'translation': translation})
    return jsonify({'error': 'No text provided'}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
