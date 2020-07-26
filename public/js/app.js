if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register('/serviceWorker.js')
        .then(() => {
            console.log('registered')
        })
        .catch(err => {
            console.log('not registred', err)
        })
}