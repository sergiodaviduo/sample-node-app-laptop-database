function filterLaptopsByCPU() {
    //get the id of the selected homeworld from the filter dropdown
    var filter = document.getElementById('filter').value
    //construct the URL and redirect to it
    window.location = '/search_laptops_cpu/' + filter
}

function filterLaptopsByGraphics() {
    //get the id of the selected homeworld from the filter dropdown
    var filter = document.getElementById('filter').value
    //construct the URL and redirect to it
    window.location = '/search_laptops_graphics/' + filter
}
