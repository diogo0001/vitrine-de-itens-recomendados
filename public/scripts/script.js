var script = document.createElement('script');
script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
document.getElementsByTagName('head')[0].appendChild(script);

var rec= [];

function X(jsonData){

    console.log('size: '+jsonData.data.widget.size);
    console.log('reference name: '+jsonData.data.reference.item.name);
    console.log('recommendation[1]: '+jsonData.data.recommendation[1].name);

    var size = jsonData.data.widget.size;
    var ref = jsonData.data.reference.item;
    var recommend = jsonData.data.recommendation;
    rec = recommend;

    document.getElementById("size").innerHTML ="Encontramos "+size +" items recomendados para você!";
    document.getElementById("url").href = ref.detailUrl;
    document.getElementById("ref-image").src = "http:"+ref.imageName;
    document.getElementById("reference").innerHTML = limitString(ref.name);
    document.getElementById("price-ref").innerHTML = ref.price;
    document.getElementById("price-ref-parc").innerHTML = removeDot(ref.productInfo.paymentConditions)+"<br>sem juros";
    
    var div = document.getElementById("list");

    // cria a lista dinamicamente, exporta em html para que os estilos sejam aplicados todos pelo index.html
    for (x in recommend){
        var listItem = document.createElement("div");
        var htmlText='';

        htmlText = "<div class=\"card\" onClick=\"clickItem(this.id)\">";
            // htmlText="<a href="+recommend[x].detailUrl+"></a>";
            htmlText += "<img  src=\"http:"+recommend[x].imageName+"\">";
            htmlText += "<p>"+limitString(recommend[x].name)+"</p>";
            htmlText += "<div class=\"price-linear\">";
                htmlText +="<p><strong>De: </strong></p>";
                htmlText += "<h3>"+validatePrice(recommend[x].oldPrice)+"</h3>";
                htmlText += "<div class=\"price-red\"><p><strong>Por: </strong></p>";
                    htmlText += "<h3>"+validatePrice(recommend[x].price)+"</h3></div>";
                htmlText += "<p class=\"price-red\">"+removeDot(recommend[x].productInfo.paymentConditions)+"<br>sem juros</p>";
            htmlText += "</div></div>";

            // class=\"card-img-top\"

        // listItem.className = "item";    
        listItem.id=recommend[x].businessId;
        listItem.innerHTML = htmlText;
        div.appendChild(listItem);
        // console.log("id: "+listItem.id);
    }
}

// limita o tamanho da string para haver um padrão
function limitString(string){
    var shorString = string;
    var length = 95;

    if(string.length>length){
        shorString= string.substring(0, length)+" ...";
    }
    // console.log('string: '+string);
    // console.log('shorString: '+shorString);

    return shorString;
}

// verifica se o valor existe
function validatePrice(price){
    var checkPrice = price;
    
    if(price==null){
        checkPrice ="-";
    }
    return checkPrice;
}

// substitui o ponto do valor por virgula
function removeDot(string){
    var newString = string.replace(/\./g,',');
    return newString;
}

function clickItem(itemId){

    console.log("id: "+itemId);
}