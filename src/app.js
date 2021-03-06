import navigator from './routes/navigations.js'
import * as getNode from './utils/getNode.js'

window.addEventListener(
	'DOMContentLoaded',
	() => {
		navigator()
		window.history.pushState(
			{
				loadUrl: window.location.href,
			},
			null,
			''
		)
	},
	false
)

window.addEventListener(
	'hashchange',
	() => {
		navigator()
	},
	false
)

getNode.searchFormBtn.addEventListener('click', e => {
	e.preventDefault()
	const query = getNode.searchFormInput.value
	window.location.hash = `#search=${query}`
	if (query !== '') {
		window.location.hash = `#search=${query}`
	} else {
		console.log('No hay nada que buscar!')
	}
})

getNode.trendingBtn.addEventListener('click', () => {
	window.location.hash = '#trends'
})

getNode.arrowBtn.addEventListener('click', () => {
	const stateLoad = window.history.state ? window.history.state.loadUrl : ''
	if (stateLoad.includes('#')) {
		window.location.hash = ''
	} else {
		window.history.back()
	}
})

const categoriesNode = [
	getNode.categoriesPreviewList,
	getNode.movieDetailCategoriesList,
]

categoriesNode.forEach(node => {
	node.addEventListener('click', e => {
		const target = e.target
		if (target && target.nodeName === 'H3') {
			const categoryID = target.dataset.categoryid
			const categoryName = target.dataset.categoryname
			window.location.hash = `#category=${categoryID}-${categoryName}`
		}
	})
})

const moviesNode = [
	getNode.trendingMoviesPreviewList,
	getNode.genericSection,
	getNode.relatedMoviesContainer,
]

moviesNode.forEach(node => {
	node.addEventListener('click', e => {
		const target = e.target
		if (target && target.nodeName === 'IMG') {
			const movieID = target.dataset.movieid
			const movieName = target.dataset.moviename.toLowerCase()
			window.location.hash = `#movie=${movieID}-${movieName}`
		}
	})
})
