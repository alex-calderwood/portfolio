# Built in libraries
import os, random

# Add libraries installed in the 'lib' folger
from google.appengine.ext import vendor
vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib'))

# Import installed librarirs
from flask import  Flask, render_template
import pronouncing

# App engine tutorial
# https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env

# Create Flask app
app = Flask(__name__)

# Libraries requiring Flask app
from flaskext.markdown import Markdown  # https://pythonhosted.org/Flask-Markdown/
Markdown(app)

# End libraries


@app.route('/')
def index():
    return render_template('index.html', **locals())


@app.route('/blog')
def blog():
    title = 'Blog'

    blog_text = []

    posts_dir = './posts/'
    for post_name in os.listdir(posts_dir):
        content = open(os.path.join(posts_dir, post_name), 'r').read()
        content = content.decode('UTF-8')
        blog_text.append(content)

    content = '\n'.join(blog_text)

    return render_template('blog.html', **locals())


@app.route('/contact')
def contact():
    title = 'Contact'

    letters = "four oh six three eight one nine six three six".split(' ')
    phones = [pronouncing.phones_for_word(word) for word in letters]
    # flatten
    phones = [phone for word in phones for phone in word]
    # clean
    phones = [phone.replace('1', '').replace('0', '').replace(' ', '-') for phone in phones]
    numbers = [4, 0, 6, 3, 8, 1, 9, 6, 3, 6]

    number_text = []
    for (letter, phone, number) in zip(letters, phones, numbers):
        number_text.append(random.choice((letter, phone, str(number))))

    number_text = ' '.join(number_text)

    return render_template('contact.html', **locals())


@app.route('/bio')
def bio():
    title = 'Bio'
    text = open('./bio.md', 'r').read()

    text = text.decode('UTF-8')

    return render_template('bio.html', **locals())


@app.route('/projects')
def projects():
    title = 'Projects'

    tools = 'tools'
    tools = pronouncing.rhymes(tools)
    tools = random.choice(tools)
    text = 'the {} are the art'.format(tools)
    text = text.replace('\'', '')

    return render_template('projects.html', **locals())


# app.run(debug=True)

