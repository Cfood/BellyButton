d3.json('data/samples.json').then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data)
})
