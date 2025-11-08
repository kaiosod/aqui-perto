# https://docs.foursquare.com/developer/reference/place-search

import requests
import os
import json
from dotenv import load_dotenv
import requests

load_dotenv()

api_key = os.getenv('FOURSQUARE_API_KEY')

url = "https://places-api.foursquare.com/places/search"

headers = {
    "accept": "application/json",
    "X-Places-Api-Version": "2025-06-17",
    "authorization": "Bearer RLNFLV020YSBCQRLSJJIQ5L4HLD2AQRHIAJMXQBW0SMZKNXH"
}

response = requests.get(url, headers=headers)

data = response.json()
with open("resultado.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(response.text)