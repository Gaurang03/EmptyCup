from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  


@app.route('/listings', methods=['GET'])
def get_listings():
    listings_data = [
    {"id": 1, "name": "Epic Designs","teamDescription": "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.", "projects": 57, "years": 8, "price": "$$", "phone1": "+91 - 984532853", "phone2": "+91 - 984532854","rating":3.5},
    {"id": 2, "name": "Studio-D3", "teamDescription": "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.", "projects": 43, "years": 6, "price": "$$$", "phone1": "+91 - 984532855", "phone2": "+91 - 984532856","rating":4.5},
    {"id": 3, "name": "House of designs","teamDescription": "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.", "projects": 57, "years": 8, "price": "$$", "phone1": "+91 - 984532853", "phone2": "+91 - 984532854","rating":1.5},
    ];


    return jsonify(listings_data)

if __name__ == '__main__':
    app.run(debug=False)
