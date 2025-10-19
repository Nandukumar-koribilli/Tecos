from pymongo import MongoClient

MONGO_URI = "mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/farm?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client["farm"]

db["farmers"].delete_many({})
db["landowners"].delete_many({})

print("All login data removed from farmers and landowners collections.")
