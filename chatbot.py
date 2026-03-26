from flask import Flask ,request,jsonify
from flask_cors import CORS
import requests
chat_history=""
app=Flask(__name__)
CORS(app)

url="http://localhost:11434/api/generate"

@app.route("/chat",methods=["POST"])
def chat():
    global chat_history
    user_msg = request.json.get("message")
    chat_history+=f"{user_msg}\n"
    response=requests.post(url,json={
        "model":"mistral",
        "prompt":user_msg,
        "stream":False
    }) 
    data=response.json().get("response","")
    chat_history+=f"{data}\n"
    return jsonify({"bot":data})
if __name__=="__main__":
    app.run(debug=True)
    
