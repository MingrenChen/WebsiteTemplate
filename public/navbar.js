

$('<li>')
    .append(
        $("<a>")
        .attr("href", "/")
        .text(window.requestToJSON)
    )
.appendTo('#right_side');
console.log(window)

