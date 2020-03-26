import os, random
# from google.appengine.ext import vendor
# vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib'))
import pronouncing
import arpa_to_ipa


def read_md(path, filename):
    """Read a markdown file"""

    content = open(os.path.join(path, filename), 'r').read()

    try:
        content = content.decode('UTF-8')
    except AttributeError:
        pass

    return content


def sometimes_pronounce(text, odds=(7, 1, 2)):
    """
    Return the words in the text, their ARPAnet pronunciation, or their IPA pronunciation according to the specified odds
    """

    # Get pronunciation
    words = text.split(' ')
    arpa_phones = [pronouncing.phones_for_word(word) for word in words]
    arpa_phones = [arpa for word in arpa_phones for arpa in word]  # Flatten

    # Translate ARPAnet phonemes to IPA representation
    # print(arpa_phones)
    ipa_words = []
    for word in arpa_phones:
        ipa_words.append('')
        for arpa_phone in word.split(' '):
            ipa_words[len(ipa_words) - 1] += (arpa_to_ipa.get_ipa(arpa_phone))

    text_out = []

    for (word, arpa, ipa) in zip(words, arpa_phones, ipa_words):
        text_out.append(random.choices((word, arpa, ipa), odds)[0])

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