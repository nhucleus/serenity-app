from flask import Blueprint
import requests


quotes = Blueprint("quotes", __name__)


@quotes.route("/")
def zen_quote():
    res = requests.get("https://zenquotes.io/api/random")
    data = res.json()
    print(data)
    quote = data[0]["q"]
    author = data[0]["a"]
    return { "quote": quote, "author": author }