import os


def read_md(path, filename):
    """Read a markdown file"""

    content = open(os.path.join(path, filename), 'r').read()

    try:
        content = content.decode('UTF-8')
    except AttributeError:
        pass

    return content