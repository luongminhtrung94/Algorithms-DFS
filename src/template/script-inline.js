var arrayOpen = [];
var arrayClose = [];
var step = -1;
var foundEndNode = false;

function DFS(listParentItem, value){
    step++;
    
    var stopRecursion = false;
    $(listParentItem).each(function(key , parentItem){
        //if found end Node crash Loop
        if(stopRecursion){ return false }
        var valueChildItem = $(parentItem).children(".wrap").find("input").val();


        //add item to Open
        if($(parentItem).has("ul")){
            var arr=[];
            $(parentItem).children("ul").children("li").each(function(key , parentItem){
                var valueChildItem = $(parentItem).children(".wrap").find("input").val();
                arr.push(valueChildItem);
            });
            arrayOpen = arr.concat(arrayOpen);
        }
        //add X to Close
        arrayClose.push(valueChildItem);

        //append line in tale
        $(".table > tbody").append(
            templateLineInTable(
                step,
                valueChildItem,
                arrayOpen.join(","),
                arrayClose.join(",")
            )
        );

        //remove X to Open
        arrayOpen.splice(0,1);

        //if found end Node crash loop
        if(valueChildItem == value){
            stopRecursion = true;
            return false;
        }

        if($(parentItem).has("ul")){
            stopRecursion = DFS($(parentItem).children("ul").children("li"), value);
        }
    });

    return stopRecursion;
}


$(".search-value").keypress(function(e) {
    var value = $(this).val();
    $(".table > tbody > tr").remove();
    step= -1;
    if(e.which == 13) {
        if(DFS($("#tree > ul > li"), value) ){
            $(".result").html("had found")
        }else{
            $(".result").html("can not found")
        }
    }
});










$("#tree").on("click" , ".plus",function(){
    var parent = $(this).closest("li");
    if(parent.has("ul").length == 0){
        parent.append(templateChildUl())
    }else{
        parent.children("ul").append(templateChildLi());
    }
});


var dataId = 1;
$("#tree").on("click" , ".minus" , function(){
    var parent = $(this).closest("li");
    if(parent.has("ul").length != 0){
        var child = parent.children("ul").children("li");
        if(child.length > 1){
            child[child.length - 1].remove();
        }else{
            parent.children("ul").remove();
        }
    }
});

function templateChildUl(){
    dataId++;
    return ` <ul>
                <li data-id='${dataId}'>
                    <div class="wrap">
                        <button class="minus" type="button"><i class="fa fa-minus"></i></button>
                        <input type="text">
                        <button class="plus" type="button"><i class="fa fa-plus"></i></button>
                    </div>
                </li>
            </ul>`
}

function templateChildLi(){
    dataId++;
    return `<li data-id='${dataId}'>
                <div class="wrap">
                    <button class="minus" type="button"><i class="fa fa-minus"></i></button>
                    <input type="text">
                    <button class="plus" type="button"><i class="fa fa-plus"></i></button>
                </div>
            </li>`
}

function templateLineInTable(i,X , arrayOpen , arrayClose){
    return `<tr>
                <td>${i}</td>
                <td>${X}</td>
                <td>[${arrayOpen}]</td>
                <td>[${arrayClose}]</td>
            </tr>`
}