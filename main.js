//Global bun variables
var qtyOfSize;
var sizeType;
var flavor1;
var flavor2;
var unitPrice;
var inCart;
var currentCart;
var newtoCart;
var cartCount = 0;

//Function to assign bun attributes for single-size bun selections
$(document).on("click","#single", function(){
    $("#bun-detail-photo").attr("src","./Images/WF original.jpg");
    $(".size-text").html(" ");
    $(".bunPrice").html("$3.50");
    $(".select-flavors-1").hide();
    $(".select-flavors-2").hide();
});

//Function to assign bun attributes for half-dozen size bun selections
$(document).on("click", "#half-dozen", function(){
    $("#bun-detail-photo").attr("src", "./Images/half-dozen.png");
    $(".size-text").html("Six buns are more fun!");
    $(".bunPrice").html("$17");
    $(".select-flavors-1").show();
    $(".select-flavors-2").show();
});

//Function to assign bun attributes for dozen size bun selections
$(document).on("click", "#dozen", function(){
    $("#bun-detail-photo").attr("src", "./Images/dozen box.png");
    $(".size-text").html("Keep a dozen warm in the oven!");
    $(".bunPrice").html("$34");
    $(".select-flavors-1").show();
    $(".select-flavors-2").show();
});

//Function creating bun object
function bun(qtyOfSize, sizeType, flavor1, flavor2, unitPrice){
this.qtyOfSize = qtyOfSize;
this.size = sizeType;
this.flavor1 = flavor1;
this.flavor2 = flavor2;
this.unitPrice = unitPrice;
}

/*Function which - when addToCart button is clicked - creates a new bun object
with the appropriate user-selected attributes, saves to an array, then is transmitted
to localStorage via JSON*/
$(document).on("click","#addToCart", function() {
    qtyOfSize = $("#quantity").val();
    sizeType = $("input:radio[name=size]:checked").val();
    if (sizeType == "single"){
        flavor1 = "";
        flavor2 = "";
    } else {
    flavor1 = $("#flavorSelect1").val();
    flavor2 = $("#flavorSelect2").val();};
    unitPrice = $(".bunPrice").html();
    var selectedBun = new bun(qtyOfSize, sizeType, flavor1, flavor2, unitPrice);
    console.log(selectedBun);
    var newToCart = JSON.parse(localStorage.getItem("inCart")) || [];
    newToCart.push(selectedBun);
    localStorage.setItem("inCart", JSON.stringify(newToCart));
    console.log(newToCart);
});
/* Count of items (item determined by bun size order)*/
$(document).on("click","#addToCart", function() {
    cartCount = cartCount+1;
    $(".cartItems").html(cartCount);
    console.log(cartCount);
})

/*On page load, creates new rows in a table corresponding to the bun items in the
currentCart array, created from the JSON inCart object*/
$(document).ready(function() {
    var currentCart = JSON.parse(localStorage.getItem("inCart"));
    console.log("currentCart:", currentCart);
    var tr;
    for (var i=0; i<currentCart.length; i++) {
            tr = $("<tr/>");
            tr.append("<td>" + currentCart[i].qtyOfSize + " </td>");
            tr.append("<td>" + currentCart[i].size + " </td>");
            tr.append("<td>" + currentCart[i].flavor1 + " </td>");
            tr.append("<td>" + currentCart[i].flavor2 + " </td>");
            tr.append("<td>" + currentCart[i].unitPrice + " </td>");
            tr.append("<button class='remove' id='"+i+"'>Remove</button>");
            $(".cart").append(tr);
        }
/*Function which removes an item from cart-contents and creates a new JSON object in localStorage.
Intent also to change cart counter but not working */
    $(".remove").on("click",function() {
                arrayIndex = parseInt($(this).attr("id"));
                console.log(arrayIndex);
                currentCart.splice(arrayIndex,1);
                console.log("currentCart:", currentCart);
                localStorage.setItem("latestCart", JSON.stringify(currentCart));
                $(this).parent().remove();
                cartCount= cartCount-1;
                $("#cartItems").html(cartCount);
                console.log(cartCount);
            });
});
