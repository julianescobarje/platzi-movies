const API = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		api_key: API_KEY,
	},
})

const IMAGES_W300_URL = 'https://image.tmdb.org/t/p/w300'

async function getTrendingMoviesPreview() {
	const { data } = await API('trending/movie/day')

	const movies = data.results

	trendingMoviesPreviewList.innerHTML = ''

	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${IMAGES_W300_URL}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		trendingMoviesPreviewList.appendChild(movieContainer)
	})
}

async function getCategoriesPreview() {
	const { data } = await API('genre/movie/list')

	const categories = data.genres

	categoriesPreviewList.innerHTML = ''

	categories.forEach(category => {
		const categoryContainer = document.createElement('div')
		categoryContainer.classList.add('category-container')

		const categoryTitle = document.createElement('h3')
		categoryTitle.classList.add('category-title')
		categoryTitle.setAttribute('id', `id${category.id}`)
		categoryTitle.addEventListener('click', () => {
			location.hash = `#category=${category.id}-${category.name}`
		})
		const categoryTitleText = document.createTextNode(category.name)
		categoryTitle.appendChild(categoryTitleText)

		categoryContainer.appendChild(categoryTitle)
		categoriesPreviewList.appendChild(categoryContainer)
	})
}

async function getMoviesByCategory(id) {
	const { data } = await API('discover/movie', {
		params: {
			with_genres: id,
		},
	})

	const movies = data.results

	genericSection.innerHTML = ''

	movies.forEach(movie => {
		const movieContainer = document.createElement('div')
		movieContainer.classList.add('movie-container')

		const movieImg = document.createElement('img')
		movieImg.classList.add('movie-img')
		movieImg.setAttribute('alt', movie.title)
		movieImg.setAttribute('src', `${IMAGES_W300_URL}${movie.poster_path}`)

		movieContainer.appendChild(movieImg)
		genericSection.appendChild(movieContainer)
	})
}
