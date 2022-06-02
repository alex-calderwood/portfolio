import os, random, re
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


def sometimes_pronounce(text, odds=(7, 10, 20)):
    """
    Return the words in the text, their ARPAnet pronunciation, or their IPA pronunciation according to the specified odds
    """
    
    DOT = '~DOT~'
    text = text.replace('.', f' {DOT} ')
    words = text.split(' ')

    # Get pronunciation
    replacement = lambda word: word.replace(DOT, 'dot')
    arpa_phones = [pronouncing.phones_for_word(replacement(word)) for word in words]
    arpa_phones = [arpa[0] if arpa else '' for arpa in arpa_phones] # Only take the first pronunciaton

    # Translate ARPAnet phonemes to IPA representation
    ipa_words = []
    for word in arpa_phones:
        ipa_words.append('')
        for arpa_phone in word.split(' '):
            ipa = arpa_to_ipa.get_ipa(arpa_phone)
            ipa_words[len(ipa_words) - 1] += ipa if ipa else ''

    text_out = []

    for (word, arpa, ipa) in zip(words, arpa_phones, ipa_words):
        chosen = random.choices((word, arpa, ipa), odds)[0]
        text_out.append(chosen if chosen else word)

    pronounced = ' '.join(text_out)
    pronounced = re.sub(f' ?{DOT} ?', '.', pronounced)
    return pronounced


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