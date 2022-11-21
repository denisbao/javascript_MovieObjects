const addMovieBtn = document.getElementById('add-movie-btn')
const searchBtn = document.getElementById('search-btn')

const movies = []

/**
 * It takes a search term as an argument, and if there are no movies, it removes the visible class from
 * the movie list, otherwise it adds the visible class to the movie list, and then it filters the
 * movies based on the search term, and then it loops through the filtered movies and creates a list
 * item for each movie, and then it appends the list item to the movie list
 * @param [searchTerm] - The search term that the user has entered.
 * @returns the value of the variable text.
 */
const renderMovies = (searchTerm = '') => {
  const movieList = document.getElementById('movie-list')

  if (movies.length === 0) {
    movieList.classList.remove('visible')
    return
  } else {
    movieList.classList.add('visible')
  }
  movieList.innerHTML = ''

  const filteredMovies = !searchTerm
    ? movies
    : movies.filter(movie => movie.info.title.includes(searchTerm))

  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li')
    const { info } = movie
    let { getFormattedTitle } = movie
    let text = getFormattedTitle.call(movie) + ' - '

    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + ` ${key}: ${info[key]}`
      }
    }

    movieEl.textContent = text
    movieList.append(movieEl)
  })
}

/**
 * We're creating a new movie object, and pushing it to the movies array
 * @returns the value of the variable newMovie.
 */
const addMovieHandler = () => {
  const title = document.getElementById('title').value
  const extraName = document.getElementById('extra-name').value
  const extraValue = document.getElementById('extra-value').value

  if (extraName.trim() === '' || extraValue.trim() === '') {
    return //Or an alert...
  }

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT'
          return
        }
        this._title = val
      },
      get title() {
        return this._title
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase()
    },
  }
  newMovie.info.title = title

  movies.push(newMovie)
  renderMovies()
}

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value
  renderMovies(filterTerm)
}

addMovieBtn.addEventListener('click', addMovieHandler)
searchBtn.addEventListener('click', searchMovieHandler)
