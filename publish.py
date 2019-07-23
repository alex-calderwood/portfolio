import os
from main import db
from models import Post
from datetime import datetime


def publish(dir, category, type=None, date=None):
    for file in os.listdir(dir):

        post = Post(os.path.join(dir, file), category=category, content_type=type, date=date)

        if db.session.query(Post.id).filter(Post.name == post.name).count() > 0:
            print('Post skipped, a post with this name already exists', post)
        else:
            print('Created', post)
            db.session.add(post)

    db.session.commit()
    print("Created and published all posts in " + dir)


def publish_all():
    db.create_all()
    publish('./static/posts', 'blog')
    publish('./static/poetry', 'poetry')
    publish('./static/projects/html', 'project', 'html', datetime.now())


def delete(category):
    deleted = db.session.query(Post.id).filter(Post.category == category).delete()
    db.session.commit()
    print("Deleted {} rows from {}".format(deleted, category))