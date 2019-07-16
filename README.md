# blog
My personal blog


# Setup
pip install -t lib -r requirements.txt --upgrade

# Run locally
export FLASK_APP=main.py
flask run

# To publish to heroku
git push heroku master

# Reset the heroku database if it's already created:
heroku pg:reset DATABASE_URL
