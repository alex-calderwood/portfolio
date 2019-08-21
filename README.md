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


# Ubuntu Local Postgres Help

https://thoughtbot.com/blog/psql-basics
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
    sudo -u postgres psql
