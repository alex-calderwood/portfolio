# Built in libraries
import os, random, math
import utils

# Installed libraries
from flask import render_template, redirect, url_for
import pronouncing
from flask_sqlalchemy import SQLAlchemy
from flask_heroku import Heroku

# Create app
from flask import Flask
app = Flask(__name__)

# Libraries requiring Flask app
# From https://pythonhosted.org/Flask-Markdown/
from flaskext.markdown import Markdown
Markdown(app)

# This speeds things up. Not sure what it does
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Set the database, depending if on server or local
if 'ON_LOCAL_MACHINE' not in os.environ:
    heroku = Heroku(app)  # Based on: http://blog.sahildiwan.com/posts/flask-and-postgresql-app-deployed-on-heroku/
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:entering@localhost:5432/blog'
db = SQLAlchemy(app)


# Provide a way for models.py (and any other files that needs it) to get access to the database
def get_db():
    return db


# Imports requiring database initialization
from models import Post

# Register Project Blueprints
# from projects.all_is_all_poetry.in_two_dimensions.main import two_dimensions
# app.register_blueprint(two_dimensions)

# End flask setup


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

        post_content = utils.add_link_to_title(post.content, url_for('blog_post', post_name=post.name))
        post_content = utils.replace_image_path(post_content, '.')
        blog_text.append(post_content)

    # content = '\n'.join(blog_text)
    content = blog_text

    return render_template('blog.html', **locals())


@app.route('/poetry')
def poetry():
    title = 'Poetry'
    name = get_name()

    blog_text = []

    for post in sorted(Post.query.filter_by(category=Post.Category.poetry),
                       key=lambda p: p.posted_at, reverse=True):

        post_content = utils.add_link_to_title(post.content, url_for('poem', post_name=post.name))
        blog_text.append(post_content)

    content = blog_text

    return render_template('poetry.html', **locals())

@app.route('/shownotes')
def quotes():
    title = 'Shownotes'
    name = get_name()

    rand = random.randrange(0, Post.query.filter_by(category=Post.Category.quote).count())
    post = Post.query.filter_by(category=Post.Category.quote)[rand]
    content = utils.replace_image_path(post.content, '.')

    return render_template('quotes.html', **locals())


@app.route('/projects')
def projects():
    title = 'Projects'
    name = get_name()

    text = []

    for post in sorted(Post.query.filter_by(category=Post.Category.project),
                       key=lambda p: p.posted_at, reverse=True):

        # Create the title in markdown
        title = "{}".format(post.name)

        post_content = utils.add_link_to_title(title, url_for('project', post_name=post.name))

        text.append(post_content)

        text.append(post.content)

    b = math.ceil(len(text) / 2)
    content1 = '\n'.join(text[:b])
    content2 = '\n'.join(text[b:])

    return render_template('projects.html', **locals())


@app.route('/blog/<post_name>')
def blog_post(post_name=None):
    name = get_name()

    post = Post.query.filter_by(name=post_name).first()

    if post:
        content = utils.replace_image_path(post.content, '..')

        return render_template('post.html', **locals())

    return redirect(url_for('blog'))


@app.route('/poetry/<post_name>')
def poem(post_name=None):
    name = get_name()

    post = Post.query.filter_by(name=post_name).first()

    if post:
        content = post.content
        return render_template('poem.html', **locals())

    return redirect(url_for('poetry'))


@app.route('/projects/<post_name>')
def project(post_name=None):
    name = get_name()

    post = Post.query.filter_by(category=Post.Category.project, name=post_name).first()

    if post:
        script_path = url_for('static', filename=os.path.join("projects/js/", post.name + '.js'))
        project_html = post.content
        return render_template('posts/project.html', **locals())

    return redirect(url_for('projects'))


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

@app.route('/semantic_compasses')
@app.route('/two_dimensions')
def two_dimensions():
    # Redirect to the Google Cloud Run endpoint for the in_two_dimensions project
    url = "https://intwo-4bdu7fnfka-uc.a.run.app/"
    return redirect(url, code=302)


# app.run(debug=True)

"""
TODO

* Make sure my old posts are indexed the same
https://www.alexcalderwood.blog/single-post/2018/07/27/Reflections-of-a-Dual-Degree-Dropout
"""
