# blog
My personal blog.

# Setup 

If on a local machine, first install postgresql (see below). Then:

    pip install -t lib -r requirements.txt --upgrade

# Run locally
export FLASK_APP=main.py
flask run

# To publish to heroku
git push heroku master; heroku run python -c "from publish import *; delete_all(); publish_all();"

# Reset the heroku database if it's already created:
heroku pg:reset DATABASE_URL

# Mac Local Postgres Help
First

    brew install postgresql
    brew services start postgresql
    psql postgres

Then inside the terminal (one by one)

    CREATE ROLE alex1 WITH LOGIN PASSWORD 'postgrepass';
    ALTER ROLE alex1 CREATEDB;
    \q
    psql postgres -U alex1
    CREATE DATABASE blog;
    python -i publish.py
    publish_all()
    exit()
    brew services stop postgresql

https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/

# Ubuntu Local Postgres Help
https://thoughtbot.com/blog/psql-basics
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
    sudo -u postgres psql
