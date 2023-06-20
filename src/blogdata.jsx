const blogdata = [];

blogdata.push({
    title: 'What is React?',
    slug: 'what-is-react',
    content: 'React is the best framework of JavaScript.',
    author: 'Toxe',
    comments: [{
        content: 'This is a comment.',
        author: 'toxe'
    }],
})
blogdata.push({
    title: 'What is Vue?',
    slug: 'what-is-vue',
    content: 'Vue is the best framework of JavaScript.',
    author: 'PeterP',
    comments: [],
})
blogdata.push({
    title: 'What is Angular?',
    slug: 'what-is-angular',
    content: 'Angular is the best framework of JavaScript.',
    author: 'clarkkent',
    comments: [],
})

export { blogdata };