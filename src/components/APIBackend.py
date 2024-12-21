import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Using a different frontend server compared to Flask


@app.route('/get_recipes', methods=['POST'])
def get_recipes():

    data = request.get_json()
    ingredientsList = data.get('ingredientsList', [])

    if not ingredientsList:
        return jsonify({"error": "Please add one or more ingredients."}), 400

    API_KEY = 'a288b5fc65964f5b9c060531239addfa'
    NUMBER_OF_RECIPES = 7
    try:
        # Makes input ingredients a list separated by commas
        ingredients_query = ",".join(ingredientsList)
        print(ingredients_query)
        response = requests.get(
            f"https://api.spoonacular.com/recipes/findByIngredients",
            params={
                "ingredients": ingredients_query,
                "apiKey": API_KEY,
                "number": NUMBER_OF_RECIPES
            }
        )
        response.raise_for_status()
        recipes = response.json()

        # Get only the ID and the Recipe Title from the API query
        recipe_details = [
            {"id": recipe["id"], "title": recipe["title"]}
            for recipe in recipes
        ]

        # Now, use the API "Get Recipe Information" feature to get the Source URL
        recipe_urls = []
        for recipe in recipe_details:
            recipe_id = recipe["id"]
            detailed_response = requests.get(
                f"https://api.spoonacular.com/recipes/{recipe_id}/information",
                params={"apiKey": API_KEY}
            )
            detailed_response.raise_for_status()
            detailed_data = detailed_response.json()
            recipe_urls.append({
                "title": recipe["title"],
                "url": detailed_data.get("sourceUrl")
            })

        # Send recipy back to frontend file
        return jsonify({"recipes": recipe_urls})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
