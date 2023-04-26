// Fully working scripts.js file


//minimise querySelectors calls
/**
 * doing querySelector calls in
 */

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    starting.appendChild(element)
}


const queryGlobal = () => {

   const listItems = document.querySelector('[data-list-items]');
   const searchGenres = document.querySelector('[data-search-genres]');
   const seacrhAuthors = document.querySelector('[data-search-authors]');
   const themes = document.querySelector('[data-settings-theme]');
   const dataListButton  = document.querySelector('[data-list-button]');
   const dataListMessgae = document.querySelector('[data-list-message]');
   const dataListActive = document.querySelector('[data-list-active]');
   const dataListBlur = document.querySelector('[data-list-blur]');
   const dataListImage = document.querySelector('[data-list-image]');
   const dataListTitle = document.querySelector('[data-list-title]');
   const dataListSubtitle = document.querySelector('[data-list-subtitle]');
   const dataListDescription = document.querySelector('[data-list-description]');
} 



queryGlobal.listItems.appendChild(starting)

const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

queryGlobal.searchGenres.appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

queryGlobal.seacrhAuthors.appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    queryGlobal.themes.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    queryGlobal.themes.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

queryGlobal. dataListButton .innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
queryGlobal. dataListButton .disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

queryGlobal. dataListButton .innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
//event = declare and give them name and add name
/**
 * eventNames : Name of the event functions
 *  @param {Document}  searchCancel 
 *  @param {Document}  searchOverlay
 *  @param {Document}  settingsCancel
 *  @param {Document}  settingsOverlay
 *  @param {Document}  headerSearch
 *  @param {Document}  searchTitle
 *  @param {Document}  dataListClose
 *  @param {Document}  dataListArchive
 *  @param {Document}  dataHeaderSettings
 *  @param {Document}  dataSettingsForm
 *  @param {Document} dataSearchForm
 */
const eventNames = () => {

    const searchCancel = document.querySelector('[data-search-cancel]')
    const searchOverlay = document.querySelector('[data-search-overlay]')
    const settingsCancel = document.querySelector('[data-settings-cancel]')
    const settingsOverlay = document.querySelector('[data-settings-overlay]')
    const headerSearch = document.querySelector('[data-header-search]')
    const searchTitle =   document.querySelector('[data-search-title]')
    const dataListClose = document.querySelector('[data-list-close]')
    const dataListActive = document.querySelector('[data-list-active]')
    const dataHeaderSettings = document.querySelector('[data-header-settings]')
    const dataSettingsForm = document.querySelector('[data-settings-form]')
    const dataSearchForm =document.querySelector('[data-search-form]')
}

eventNames.searchCancel.addEventListener('click', () => {
    eventNames.searchOverlay.open = false
})

eventNames.settingsCancel.addEventListener('click', () => {
   eventNames.settingsCancel.open = false
})

eventNames.headerSearch.addEventListener('click', () => {
    eventNames.searchOverlay.open = true 
    eventNames.searchTitle.focus()
})

eventNames.dataHeaderSettings.addEventListener('click', () => {
   eventNames.settingsOverlay.open = true 
})
 
eventNames.dataListClose.addEventListener('click', () => {
    eventNames.dataListActive.open = false
})
eventNames.dataSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    eventNames.settingsOverlay.open = false
})

eventNames.dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    //set a global function and store them in
    if (result.length < 1) {
        queryGlobal.dataListButton.classList.add('list__message_show')
    } else {
        queryGlobal.dataListButton.classList.remove('list__message_show')
    }

    queryGlobal.listItems.innerHTML = ''
    const newItems = document.createDocumentFragment()


    //the for-loop, keep

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element) //newItems and loop over result array and keep appending new HTML elemenys
    }

    queryGlobal.listItems.appendChild(newItems)
    queryGlobal.listItems.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    queryGlobal.dataListButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    eventNames.searchOverlay.open = false
})

queryGlobal.dataListButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    queryGlobal.listItems.appendChild(fragment)
    page += 1
})

queryGlobal.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        queryGlobal.dataListActive.open = true
        queryGlobal.dataListBlur.src = active.image
        queryGlobal.dataListImage.src = active.image
        queryGlobal.dataListTitle.innerText = active.title
        queryGlobal.dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        queryGlobal.dataListDescription.innerText = active.description
    }
})