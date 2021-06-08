function filterLaptopsByCPU() {
    var filter = document.getElementById('filter').value
    //construct the URL and redirect to it
    window.location = '/search_laptops_cpu/' + filter
}

function filterLaptopsByGraphics() {
    var filter = document.getElementById('filter').value
    //construct the URL and redirect to it
    window.location = '/search_laptops_graphics/' + filter
}
