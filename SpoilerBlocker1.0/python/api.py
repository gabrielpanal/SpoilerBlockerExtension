from flask import Flask, request, jsonify
import joblib
import classifier as cl

app = Flask(__name__)

@app.route('/spoiler-blocker', methods=['POST'])
def spoiler_blocker():
    data = request.get_json()
    text = data['text']
    
    prediction = predictText(text)
    
    response = {
        'prediction': prediction
    }
    
    return jsonify(response)

def predictText(text):

    model = joblib.load('model.pkl')
    content = cl.vectorizer.transform([text])

    prob = model.predict_proba(content)
    prediction = model.predict(content)
    print(str(prediction[0]))
    
    return str(prediction[0])

if __name__ == '__main__':
    app.run()
