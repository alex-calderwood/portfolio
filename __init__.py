from flask import Flask
from flask import render_template
from flask import Markup
import os
import pronouncing, random
# https://cloud.google.com/appengine/docs/standard/python/getting-started/python-standard-env

app = Flask(__name__)

from flaskext.markdown import Markdown  # https://pythonhosted.org/Flask-Markdown/
Markdown(app)


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
        blog_text.append(content)

    content = '\n'.join(blog_text)

    return render_template('blog.html', **locals())


@app.route('/contact')
def contact():
    title = 'Contact'

    number = "four oh six three eight one nine six three six".split(' ')
    phones = [pronouncing.phones_for_word(word) for word in number]

    flattened = [phone for word in phones for phone in word]
    number = ' '.join(flattened)
    number = number.replace('1', '').replace('0', '')

    return render_template('contact.html', **locals())


@app.route('/bio')
def bio():
    title = 'Bio'
    text = open('./bio.md', 'r').read()

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


app.run(debug=True)

