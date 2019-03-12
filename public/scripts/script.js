var script = document.createElement('script');
script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
document.getElementsByTagName('head')[0].appendChild(script);

var listItems = [];

// ----------------------- Obtém os dados e cria os elementos --------------------------------- 
const X = (jsonData) =>{
            
        // console.log('size: '+jsonData.data.widget.size);
        // console.log('reference name: '+jsonData.data.reference.item.name);
        // console.log('recommendation[1]: '+jsonData.data.recommendation[1].name);

        var size = jsonData.data.widget.size;
        var ref = jsonData.data.reference.item;
        var recommend = jsonData.data.recommendation;
        listItems = recommend;

        document.getElementById("size").innerHTML ="Encontramos "+size +" items recomendados para você!";
        document.getElementById("url").href = "http:"+ref.detailUrl;
        document.getElementById("ref-image").src = "http:"+ref.imageName;
        document.getElementById("reference").innerHTML = limitString(ref.name);
        document.getElementById("price-ref").innerHTML = ref.price;
        document.getElementById("price-ref-parc").innerHTML = removeDot(ref.productInfo.paymentConditions)+"<br>sem juros";
        document.getElementById("site-link").href = getSiteLink(ref.detailUrl);


        // var div = document.getElementById("list");
        var div = document.querySelector(".pagination");


        for (x in recommend){
            var listItem = document.createElement("div");

            // Não é a forma com a melhor manipulação do DOM, mas o código 
            // acaba sendo muito menor, de mais fácil compreensão da estrutura criada

            var htmlText='';
            htmlText ="<a href=\"http:"+recommend[x].detailUrl+"\" class=\"a\">";
            htmlText += "<div class=\"card\">";
                    htmlText += "<img  src=\"http:"+recommend[x].imageName+"\">";
                    htmlText += "<p>"+limitString(recommend[x].name)+"</p>";
                    htmlText += "<div class=\"price-linear\">";
                        htmlText +="<p><strong>De: </strong></p>";
                        htmlText += "<h3>"+validatePrice(recommend[x].oldPrice)+"</h3>";
                        htmlText += "<div class=\"price-red\"><p><strong>Por: </strong></p>";
                            htmlText += "<h3>"+validatePrice(recommend[x].price)+"</h3></div>";
                        htmlText += "<p class=\"price-red\">"+removeDot(recommend[x].productInfo.paymentConditions)+"<br>sem juros</p>";
            htmlText += "</div></div></a>";

            listItem.className = "item";    
            listItem.id=recommend[x].businessId;
            listItem.innerHTML = htmlText;
            div.appendChild(listItem);
        }
        carouselNav(size);      // chama a função depois de carregar os dados

        document.querySelector(".body").onresize = () =>{
            setBoxSize();    
        }
}
// -------------------------------------------------------------------------------------

// ------------------------- Funções de formatação e validação -------------------------

// limita o tamanho da string para haver um padrão
const limitString = (string) =>{
    var shorString = string;
    var length = 65;

    if(string.length>length){
        shorString= string.substring(0, length-3)+" ...";
    }
    return shorString;
}

// verifica se o valor existe
const validatePrice = (price) =>{
    var checkPrice = price;
    
    if(price==null){
        checkPrice =" -";        // valor não informado
    }
    return checkPrice;
}

// substitui o ponto do valor por virgula
const removeDot = (string) =>{
    return string.replace(/\./g,',');
}

// retorna a url principal
const getSiteLink = (detailUrl) =>{
    var domain = detailUrl.split(".");
    return "http://www."+domain[1]+"."+domain[2]+".br";
}

// itens do menu
const menuFunction = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// -------------------------------------------------------------------------------------

// -------------------------------- Carousel -------------------------------------------

// Navegação dos itens 
const carouselNav = (size) =>{

    var width = document.querySelector('.item');
    width = width.clientWidth;
    var currentItems = setBoxSize();   
    var ident = 0;
    var count = (size/currentItems) -1;

    var slide = 0;

    document.querySelector('.next').addEventListener("click",()=>{
        // currentItems = setBoxSize(); 
        // count = (size/currentItems) -1;
        console.log("\nnext - slide:" +slide);
        console.log("currentItems:" +currentItems);
        console.log("count:" +count);

        if(ident<count){
            ident++;
            slide -= width*currentItems;
            document.getElementById("list").style.marginLeft = slide+'px';
            // document.querySelector('.pagination').animate({'margin-left':+slide+'px'},'500');
            console.log("ident:" +ident);
        }
    })
    document.querySelector('.back').addEventListener("click",()=>{
        // currentItems = setBoxSize(); 
        // count = (width/size) -1;
        console.log("\nback - slide: "+slide);
        console.log("currentItems:" +currentItems);
        console.log("count:" +count);

        if(ident>=1){
            ident--;
            slide += width*currentItems;
            document.getElementById("list").style.marginLeft = slide+'px';
            // document.querySelector('.pagination').animate({'margin-left':+slide+'px'},'500');
        }
    })
}

// Definições de tamanho de tela e da caixa de paginação
const setBoxSize = () =>{

    var width = document.querySelector('.item');
    var boxSize = document.querySelector('.body');       
    var currentItems = 1;   
    width = width.clientWidth;
    boxSize = boxSize.clientWidth;
    boxSize = boxSize - width - 80 -36; // subtrai as margens
    var applyBoxSize = boxSize; 

    // para modificar o tamanho da box
    if(boxSize<width*3 && boxSize>=width*2){
        currentItems = 2;
        applyBoxSize = width*currentItems;
    } else if(boxSize<width*2 && boxSize>=width){
        currentItems = 1;
        applyBoxSize = width*currentItems;
    } else if(boxSize>width*3 && boxSize<=width*4){  // caso extremo
        currentItems = 3;
        applyBoxSize = width*currentItems;
    } else if(boxSize>width*4 ){    // caso extremo
        currentItems = 4;
        applyBoxSize = width*currentItems;
    } else if(boxSize<width){
        currentItems = 1;
        applyBoxSize = width*currentItems;
    }
    
    if(currentItems==1){
        document.getElementById("ref").style.marginLeft = 36+'px';
    } else {
        document.getElementById("ref").style.marginLeft = 10+'px';
    }

    document.querySelector('.position-rec').style.maxWidth = applyBoxSize+'px';  

    console.log("box size: "+boxSize);
    console.log("currentItems: "+currentItems);
    console.log("applyBoxSize: "+applyBoxSize);

    return currentItems;
}


