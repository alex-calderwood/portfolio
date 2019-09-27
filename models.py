from main import get_db
import datetime
from datetime import timedelta, datetime
import dateparser
from os import path

# Get an instance of the db from __init__
db = get_db()


# Time Utilities #
def now_string():
    """
    Returns a string that represents the current time.
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def string_to_datetime(string):
    datetime_object = datetime.strptime(string, "%Y-%m-%d %H:%M:%S")
    return datetime_object


def time_ago(earlier_datetime):
    """
    Turns a previous datetime to a "3 days ago", "14 seconds ago"-type string.
    """
    delta = datetime.now() - earlier_datetime

    if delta < timedelta(minutes=1):
        return 'just now'
    elif delta < timedelta(hours=1):
        return str(int(delta.seconds / 60)) + ' minutes ago'
    elif delta < timedelta(days=1):
        return str(int(delta.seconds / (60 * 60))) + ' hours ago'
    elif delta < timedelta(weeks=4):
        return str(delta.days) + ' days ago'
    elif delta < timedelta(days=365):
        return str(int(delta.days / 30.44)) + ' months ago'
    elif delta < timedelta(days=730):
        return '1 year ago'
    else:
        return '> 2 years ago'

# End Time Utilities #


class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    content = db.Column(db.String(120000), nullable=False)
    content_type = db.Column(db.String(200), default="md", nullable=False)
    category = db.Column(db.String(200), nullable=False, default="blog")

    class Type:
        md = "md"
        html = "html"

    class Category:
        poetry = "poetry"
        blog = "blog"
        project = "project"
        quote = "quote"

    def valid_type(self, type):
        return type in self.Type.__dict__.keys()

    def valid_category(self, cat):
        return cat in self.Category.__dict__.keys()

    def __init__(self, path_to_post, name=None, date=None, category=None, content_type=None):
        """Leave optional fields empty to let them be inferred."""
        super(Post, self).__init__()

        if not path.exists(path_to_post):
            raise RuntimeError(path_to_post + " does not exist")

        # Get and set content
        self.content = open(path_to_post, 'rb').read().decode('utf-8')
        content_lines = self.content.split('\n')

        basename = path.basename(path_to_post).split('.')

        if content_type is not None:
            self.content_type = content_type

        # Set type of post
        self.content_type = basename[1]
        if not self.valid_type(self.content_type):
            raise RuntimeError(self.content_type + "is not a valid type.")

        # Set name
        if name is None:
            if category == self.Category.quote:
                self.name = basename[0]
            elif self.content_type == self.Type.md:
                # Name is contained in first line
                self.name = content_lines[0].replace("#", '').strip()
            else:
                self.name = basename[0]
        else:
            self.name = name

        # Set date
        if date is None:
            if self.content_type == self.Type.md:
                # Date should be stored in text on the second line
                # Use a library to convert from natural text to datetime
                self.posted_at = dateparser.parse(content_lines[1].replace('#', '').strip())
        else:
            self.posted_at = date

        # Set category
        if category is None:
            self.category = self.Category.blog
        else:
            if not self.valid_category(category):
                raise RuntimeError(category + " is not a valid category.")
            self.category = category

    def __repr__(self):
        return '<({}) Post> {} {} {}'.format(self.category, self.name, self.content_type, self.posted_at)


class Project(Post):
    __tablename__ = 'project'

    id = db.Column(db.Integer, db.ForeignKey('post.id'), primary_key=True)
    thumbnail = db.Column(db.String(200))

    __mapper_args__ = {
        'polymorphic_identity': 'project',
    }

    def __init__(self, path_to_post, name=None, date=None):
        """Leave optional fields empty to let them be inferred."""


        super(Post, self).__init__(path_to_post, name, date, category=Post.Category.project)
