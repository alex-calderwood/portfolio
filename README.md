# blog
My personal blog


# Setup
pip install -t lib -r requirements.txt --upgrade

# Run locally
export FLASK_APP=main.py
flask run

# Run on gcloud
gcloud deploy app.yaml
