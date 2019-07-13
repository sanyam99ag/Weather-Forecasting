console.log('js file loded')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')

// messageone.textContent = 'helleo'
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loding...'
            messagetwo.textContent = '  '
    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
        response.json().then((data) => {
            if(data.error){
                return messageone.textContent = data.error
            }

            messageone.textContent = data.location
            messagetwo.textContent = data.forecast.Summary
        })
    })
    // console.log(location)
})