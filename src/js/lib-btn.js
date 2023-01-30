// import { getTheMoviesTargetInfo } from "./"
// імпортувати інфо по фільму
// як тут використати get-film-card.
function oneCardMarkup(film) {
    return `
<div class="movie-card" ">
    <div class="img-wrapper">
        <img class="movie-card-img" data-id="${film.id}" src="https://image.tmdb.org/t/p/w500${film.posterPath}"
            alt="https://image.tmdb.org/t/p/w500${film.posterPath}"
        onerror="this.onerror=null;this.src='https://i.ibb.co/ZdbF6pS/plug.jpg'" />
    </div>
    
    <div class="card-info">
        <h3 class="card-info__title">${film.title}</h3>
        <p>
            <span class="card-info__genre">
                ${film.genres}
            </span>
            <span class="release-date">
                ${Number.parseInt(film.releaseYear)}
            </span>
            <span class="film-rating">
                ${film.rating}
            </span>
        </p>
    </div>
</div>
`;
}

const watched = document.querySelector('.btn__watched')
const queue = document.querySelector('.btn__queue')

async function loadWatchedMovies() {
    let watchedMoviesIds = localStorage.getItem("watched")
    if (!watchedMoviesIds) { watchedMoviesIds = {} }
    else { watchedMoviesIds = JSON.parse(watchedMoviesIds) }

    try {
        const filmsToRender = await getTheMoviesTargetInfo(watchedMoviesIds)
        const markup = filmsToRender.map(film => {
            return oneCardMarkup (film)
        }).join('');

        const containerMyLibPage = document.querySelector('.film-grid');
        containerMyLibPage.innerHTML = markup
        const message = document.querySelector('.message-wrapper')
        if (containerMyLibPage.childElementCount > 0) {
            message.classList.add('hide-load');
        }
    
    } catch (error) {
        console.log(error)
    }
}

async function loadQueuedMovies() {    
    let queuedMoviesIds = localStorage.getItem("queue")
    if (!queuedMoviesIds) { queuedMoviesIds = {} }
    else { queuedMoviesIds = JSON.parse(queuedMoviesIds) }

    try {
        const filmsToRender = await getTheMoviesTargetInfo(queuedMoviesIds)
        const markup = filmsToRender.map(film => {
            return oneCardMarkup (film)
        }).join('');

        const containerMyLibPage = document.querySelector('.film-grid');
        containerMyLibPage.innerHTML = markup
        const message = document.querySelector('.message-wrapper')
        if (containerMyLibPage.childElementCount > 0) {
            message.classList.add('hide-load');
        }
    } catch (error) {
        console.log(error)
    }
}

function onQueue () {
    watched.classList.remove('active-btn')
    queue.classList.add('active-btn')
    loadQueuedMovies()
}

function onWatched () {
    watched.classList.add('active-btn')
    queue.classList.remove('active-btn')
    loadWatchedMovies()
}

onQueue()
watched.addEventListener('click', onWatched)
queue.addEventListener('click', onQueue)

export { loadQueuedMovies, loadWatchedMovies, }