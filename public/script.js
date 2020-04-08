// Finds all elemets with class equal to 'card'
const cards = document.querySelectorAll('.card') //


/**
 * If any card of the list is clicked, calls a funtion that add a class (active) to the modalOverlay element, i.e., 
 * "opens" the modal area.
 */
for (let card of cards){
    card.addEventListener('click', function () {
        const videoId = card.getAttribute('id')
        window.location.href = `/video?id=${videoId}`
    })
} 
