$(function() {
    $(".delete-me").on("click", function(event) {
        let id = $(this).data("id");
        $.ajax({
                method: "DELETE",
                url: "/api/burgers/" + id
            })
            .then(function() {
                location.reload();
            })
    })


    $("#addBurger").on("click", function() {

        let newBurger = {
            "burger_name": $("#burger-name").val(),
            "devoured": $("#burger-name").data("devoured")


        };

        $.post("/api/burgers", newBurger).done((response) => {
            location.reload();


        });



    })


    $(".changeBlock").on("click", function() {
        var changeID = $(this).data("id");
        var devoured = $(this).data("devoured");

        var changeBurger = {
            devoured: devoured ? 0 : 1
        };

        $.ajax("/api/burgers/" + changeID, {
            method: "PUT",
            data: changeBurger

        }).done((response) => {
            location.reload();

        })

    })



});