# Built in libraries
import os, random
import utils

# Add libraries installed in the 'lib' folder
# from google.appengine.ext import vendor
# vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib'))

# Import installed libraries
from flask import  Flask, render_template, redirect, url_for
import pronouncing
from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

# https://gcpexp.com/posts/appengine-standard-and-sqlalchemy/

# App engine tutorial
# https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env

# Create Flask app
app = Flask(__name__)

# Libraries requiring Flask app
from flaskext.markdown import Markdown  # https://pythonhosted.org/Flask-Markdown/
Markdown(app)

# This speeds things up. NOt sure what it does
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Set the database, depending if on server or local
if 'ON_LOCAL_MACHINE' not in os.environ:
    heroku = Heroku(app)  # Based on: http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku/
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/blog'
db = SQLAlchemy(app)

# Provide a way for models.py (and any other files that needs it) to get access to the database
def get_db():
    return db

# End flask setup


from models import Post


def get_name():
    return utils.sometimes_pronounce('Alex Calderwood')


@app.route('/')
def index():
    title = "Alex Calderwood's Site"
    name = get_name()

    return render_template('index.html', **locals())


@app.route('/blog')
def blog():
    title = 'Blog'
    name = get_name()

    blog_text = []

    for post in sorted(Post.query.filter_by(category=Post.Category.blog),
                       key=lambda p: p.posted_at, reverse=True):
        content = post.content

        blog_text.append(content)

    content = '\n'.join(blog_text)

    return render_template('blog.html', **locals())


@app.route('/poetry')
def poetry():
    title = 'Poetry'
    name = get_name()

    blog_text = []

    for post in sorted(Post.query.filter_by(category=Post.Category.poetry),
                       key=lambda p: p.posted_at, reverse=True):
        content = post.content

        blog_text.append(content)

    content = '\n'.join(blog_text)

    return render_template('poetry.html', **locals())


@app.route('/blog/<post_name>')
def blog_post(post_name=None):
    name = get_name()

    post_name = os.path.basename(post_name).split('.')[0]
    print(post_name)

    all_posts = os.listdir('./posts/')
    post_names = [os.path.basename(post).split('.')[0] for post in all_posts]

    if post_name in post_names:
        content = utils.read_md('./posts/', post_name + '.md')
        return render_template('blog.html', **locals())

    return redirect(url_for('index'))


@app.route('/contact')
def contact():
    title = 'Contact'
    name = get_name()


    number_words = "four oh six three eight one nine six three six".split(' ')
    phones = [pronouncing.phones_for_word(word) for word in number_words]
    # flatten
    phones = [phone for word in phones for phone in word]
    # clean
    phones = [phone.replace('1', '').replace('0', '').replace(' ', '-') for phone in phones]
    numbers = [4, 0, 6, 3, 8, 1, 9, 6, 3, 6]

    number_text = []
    for (letter, phone, number) in zip(number_words, phones, numbers):
        number_text.append(random.choice((letter, phone, str(number))))

    number_text = ' '.join(number_text)

    return render_template('contact.html', **locals())


@app.route('/bio')
def bio():
    title = 'Bio'
    name = get_name()

    text = open('./bio.md', 'r').read()

    try:
        text = text.decode('UTF-8')
    except AttributeError:
        pass

    return render_template('bio.html', **locals())


@app.route('/projects')
def projects():
    title = 'Projects'
    name = get_name()

    tools = 'tools'
    tools = pronouncing.rhymes(tools)
    tools = random.choice(tools)
    text = '{} are the art'.format(tools)
    text = text.replace('\'', '')

    return render_template('projects.html', **locals())

# app.run(debug=True)

"""
TODO

* Get pages set up
* Make sure my old posts are indexed the same
https://www.alexcalderwood.blog/single-post/2018/07/27/Reflections-of-a-Dual-Degree-Dropout
"""
