from main import get_db
import datetime
from datetime import timedelta

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
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)
    posted_at = db.Column(db.String(200), nullable=False)  # String representation of datetime
    content = db.Column(db.String(200), nullable=False)
    content_type = db.Column(db.String(200), default="md", nullable=False)  # md / html
    category = db.Column(db.String(200), nullable=False)  # poetry / blog

