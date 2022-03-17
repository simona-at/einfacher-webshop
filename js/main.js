"use strict";

let gesamtsumme = 0;
let itemCount = 0;


$(document).ready(function (){
    $("#bestellen").hide();
    accordion();
    addToCart();
    order();
});


//Accordion-Control
function accordion(){

    let kategorieBtn = $("button.kategorie");

    for(let i of kategorieBtn){
        i.onclick = function (){
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.display === "flex") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "flex";
            }
        }
    }
}


//Items in den Warenkorb hinzufügen
function addToCart(){

    let addBtn = $("input[type=button]");

    for (let i of addBtn) {
        i.onclick = function () {

            let imgSrc = $(i).parent().find("img").attr("src");
            let name = $(i).parent().find("h4").html();
            let price = $(i).parent().find("span").html();
            let anzahl = 1;

            let addItem = true; //Ob Item hinzugefügt werden soll
            let itemsInCart = $("#warenkorb").find("div.col");

            //Alle Items im Warenkorb durchgehen und vergleichen,
            //ob es bereits ein Bild mit der selben src gibt:
            for(let item of itemsInCart){
                let itemImg = $(item).find("img").attr("src");
                if(imgSrc == itemImg){
                    //Es gibt das Item bereits im Warenkorb
                    addItem = false;
                    let anzahl = $(item).find("small").html();
                    anzahl++;
                    $(item).find("small").html(Number(anzahl));
                    itemCount++;
                }
            }

            if(addItem){
                let htmlTag =
                    `<div class="col">
                        <img src="${imgSrc}">
                        <h4>${name}</h4>
                        <p>Preis: <span>${price}</span> €</p>
                        <p>Anzahl: <small>${anzahl}</small> Stück</p>
                      </div>`;
                $("#warenkorb div.floatLeft").append(htmlTag);
                itemCount++;
            }

            //Gesamtsumme hochzählen und aktualisieren:
            gesamtsumme = Number(gesamtsumme) + Number(price);
            $("#sum").html(Number(gesamtsumme));

            //Sobald mehr als 0 Items im Warenkorb sind:
            //Bestellen-Button wieder einblenden und Linie oberhalb der Gesamtsumme hinzufügen
            if(itemCount > 0){
                $("#bestellen").show();
                $("h3").addClass("borderTop");
            }
        }
    }
}


//Bestellen
function order(){
    $("#bestellen").click(function () {
        alert("Du hast " + itemCount + " Artikel um " + gesamtsumme + " € gekauft. " +
            "\nDer Bestellvorgang ist nun abgeschlossen." +
            "\nVielen Dank für deinen Einkauf!");
        $("#warenkorb .floatLeft").empty();
        gesamtsumme = 0;
        $("#sum").html(Number(gesamtsumme));
        $("#bestellen").hide();
        $("h3").removeClass("borderTop");
    });
}