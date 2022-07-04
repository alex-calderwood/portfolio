import os
from main import db
from models import Post
from datetime import datetime


def publish(dir, category, type=None, date=None):
    skipped = 0
    for file in os.listdir(dir):
        if "DS_Store" in file:
            continue
        
        post = Post(os.path.join(dir, file), category=category, content_type=type, date=date)

        if db.session.query(Post.id).filter(Post.name == post.name).count() > 0:
            # print('SKIPPING {} (already exists)'.format(post), end='\r')
            skipped += 1
        else:
            print('Created', post, '\t\t\t\t\t\t')
            db.session.add(post)

    if skipped > 0:
        print('Skipped {} posts that already exist'.format(skipped))

    db.session.commit()
    print("Done with " + dir)


def publish_all():
    db.create_all()
    publish('./static/posts', 'blog')
    publish('./static/poetry', 'poetry')
    publish('./static/projects/html', 'project', 'html')
    publish('./static/quotes', 'quote', 'md', datetime.now())


def delete(category):
    print('deleting')
    deleted = db.session.query(Post.id).filter(Post.category == category).delete()
    print('commiting')
    db.session.commit()
    print("Deleted {} rows from {}".format(deleted, category))


def delete_all():
    print('going to delete')
    for obj in ["poetry", "blog", "project", "quote"]:
        print(obj)
        delete(obj)