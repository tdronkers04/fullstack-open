const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  let likes = 0;
  blogPosts.forEach(post => likes += post.likes)
  return likes
}

const favoriteBlog = (blogPosts) => {
  let maxLikes = blogPosts.filter(post => {
    return post.likes === Math.max(...blogPosts.map(post => post.likes))
  })
  let {title, author, likes} = maxLikes[0]
  return {title, author, likes}
}

const mostBlogs = (blogPosts) => {
  let authorOutput = {}
  blogPosts.forEach(post => {
    let author = post.author
    !authorOutput[author] ? authorOutput[author] = 1 : authorOutput[author] += 1
  })
  let [max] = Object.entries(authorOutput).filter((author, _, array) => {
      return author[1] === Math.max(...array.map(entry => entry[1]))
    })
  return {author: max[0], blogs: max[1]}
}

const mostLikes = (blogPosts) => {
  let authorLikes = {}
  blogPosts.forEach(post => {
    let author = post.author
    !authorLikes[author] ? authorLikes[author] = post.likes : authorLikes[author] += post.likes
  })
  let [max] = Object.entries(authorLikes).filter((author, _, array) => {
      return author[1] === Math.max(...array.map(entry => entry[1]))
    })
  return {author: max[0], likes: max[1]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}