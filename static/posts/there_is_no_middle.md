# There Is No Middle
## July 27, 2019<!----- Conversion time: 2.523 seconds.

For the last few days I’ve been working on a longtime curiosity: spatially visualizing the semantic attributes of words. Lots of work has been done in this topic, and you see the idea explored in corners of study that include linguistics, pure math, and even poetry or the visual arts.

I wanted something that could map words of various meanings to a page’s two dimensions. Moving left or right on the page would _mean _one thing, and up or down mean something else. This would be a tool for spatial poetry. Once I created it, I would start to explore more aesthetic ways of doing the same thing. Computational poetry is a roundabout hobby.

This project, and a ton of the work I’ve been doing for the last few years, makes assumptions about _the vector space model of semantics._ This is a linguistic idea based on theories of distributional semantics that can trace their lineage to the early work of Ludwig Wittgenstein, and equally relate to Hamiltonian vector math. I’ve been planning to write more about the modern history of these linguistic ideas, but I haven’t found a good format for it yet, and honestly I’m no expert in the philosophy.

Famously, in this model, taking the vector for the word ‘king’ and subtracting the ‘queen’ vector gives you essentially the same line as taking the word ‘man’ and subtracting the word ‘woman’. In other words, thinking geometrically, the line between king and queen or the line between man and woman point in the same direction. By doing this, we’ve found the vector space model’s _gender_ _dimension. _And because these are vectors, they have direction, so more specifically we have a line segment pointed from the point _woman_ and going to _man_. By reversing the subtraction, _woman - man_, it points the other way. 

The vector space model of word representation makes the assumption that words can be represented geometrically by their meaning. Each word is a _vector_, which you can think of as a point in space or an array of numbers. Thinking of words this way allows you to perform geometry _on _the words. What does it mean for a word to be _similar_ to another word? Or above it? 

With fast computers and new ideas we can test these kinds of questions, build programs that manipulate words in interesting or clever ways. We use Bayesian math and _neural-autoencoders_ to model vocabulary; essentially getting machines to read the text we give them. We pick apart their brains and look at the models they’ve built for each word. These are our vectors.

I wanted to map across this space, walk from word to word and see what falls in between. After a little tweaking to a program I’d written for a speech processing class, I realized the vector space I constructed didn’t behave quite as expected. What does it mean to be in between ‘housebridge’ and ‘transcendental’? Between words like ‘up’ and ‘down’, can we find a ‘middle’ between them? 

Turns out, there is no middle.These vectors were trained based on co-occurrence expectations, a neural network reading text and building an understanding of words’ linguistic properties based on how words appear in their context. The phrase “the rocket went up” is about as equally likely as “the rocket went down”, but not “the rocket went middle”. So it’s unsurprising to learn that _up _and _down_ are actually the most similar words to each other in this space. There is nothing between them like _middle_. My neural model hasn’t captured that concept yet, at least in this _word_ dimension. 

I found that between most pairs of two words in this space, there are no words in between. So far, I’ve only found a few with ‘interesting’ transitions, but I haven’t made much of an effort to search very hard yet. Here is my first attempt to visualize in one dimension. In this image, moving left is to move closer to the _interloping_ vector, and moving right is to move closer to _queen._





![alt_text](images/There-is0.png "image_tooltip")


What does it mean to be a combination of ‘queen’, a leader, and someone who is ‘interloping’ or temporary? A temporary leader, a regent. When it works it works, it seems. But things become stranger when you add another dimension and make it a plane of transitions between 4 words.



![alt_text](images/There-is1.png "image_tooltip")


Google tells me that a ‘travois’ is a sort of sled pulled by a team of horses or dogs. My theory as to why ‘sample’ is dominating the space is that it’s more similar to the other three words, whereas _hotkey_ is not very similar to the other three.

With basic statistics you can make poems that [read like this one](https://www.alexcalderwood.blog/poetry/From%20a%20Corpus%20of%20Bayesian%20Probabilities), that appear disjointed or manic, as though the writer were constantly shifting what they were trying to say even within the sentence or phrase. With better technologies and more nuanced representation of language, you can explore aesthetic ideas that get at the essence of language, concealing the math while cutting to its core.

I hope that this exploration will lead to some interesting applications for poetry, maybe providing some new tool for art. But I haven’t quite arrived there yet. It opens up a few interesting questions and a few ideas for me to work on before I have to get back to the real world this August. 


<!-- KING - QUEEN = MAN - WOMAN

[https://www.technologyreview.com/s/541356/king-man-woman-queen-the-marvelous-mathematics-of-computational-linguistics/](https://www.technologyreview.com/s/541356/king-man-woman-queen-the-marvelous-mathematics-of-computational-linguistics/)

[https://www.jair.org/index.php/jair/article/view/10640](https://www.jair.org/index.php/jair/article/view/10640)

[https://en.wikipedia.org/wiki/Distributional_semantics](https://en.wikipedia.org/wiki/Distributional_semantics)
-->
