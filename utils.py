import os, random


# from google.appengine.ext import vendor
# vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib'))

import pronouncing


def read_md(path, filename):
    """Read a markdown file"""

    content = open(os.path.join(path, filename), 'r').read()

    try:
        content = content.decode('UTF-8')
    except AttributeError:
        pass

    return content


def sometimes_pronounce(text, odds=(15, 1)):
    """
    Return the words in the text or their pronunciation with the specified odds.
    """
    words = text.split(' ')
    phones = [pronouncing.phones_for_word(word) for word in words]

    # Flatten
    phones = [phone for word in phones for phone in word]

    text_out = []

    for (word, phone) in zip(words, phones):
        text_out.append(random.choices((word, phone), odds)[0])

    return ' '.join(text_out)


def add_link_to_title(md_content, link):
    lines = md_content.split('\n')
    title = lines[0]

    title = title.replace('#', '').strip()

    title_with_link = "# [{}]({})".format(title, link)

    lines[0] = title_with_link
    return '\n'.join(lines)


def replace_image_path(content, path):
    im_path_token = 'IMG_PATH'
    return content.replace(im_path_token, path)