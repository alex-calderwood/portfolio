import os, random
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
