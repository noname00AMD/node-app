.\mongoexport --uri="mongodb://localhost:27017/news"  --collection=users  --out=users.json

.\mongoimport --uri="mongodb+srv://admin:admin@cluster0.gmmv9.mongodb.net/news"  --collection=trending --type=json  --file=trending.json
