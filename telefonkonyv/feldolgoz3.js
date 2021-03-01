$(function(){    
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adatKuld);   
   
    $(".torol").on("click", adatTorol);
});

var telefonkonyvem = [];

function beolvas(){
    $.ajax({
       type: "GET",
       url: "feldolgoz.php",
       success: function (result){
           console.log(result);
           telefonkonyvem = JSON.parse(result);
           console.log(telefonkonyvem);
           kiir();
       },
        error: function(){
            alert: "Hiba az adatok betöltésekor!";
        }
       
    });
}

function adatKuld(){
    var szemely = {
        nev: $("#nev").val(),
        tel: $("#tel").val(),
        kep: $("#kep").val()
    };
    $.ajax({
       type: "POST",
       url: "beir.php",
       data: szemely,
       success: function (ujSzemely){           
           telefonkonyvem.push(JSON.parse(ujSzemely));
           console.log(telefonkonyvem);
           kiir();
       },
        error: function(){
            alert: "Hiba az adatok mentésekor!";
        }
       
    });
}

function adatTorol(){
    
    var ID = $(this).attr("id");
    console.log(ID);
    var aktElem = $(this).closest("div");
    $.ajax({
       type: "DELETE",
       url: "torol.php?ID=" + ID,      
       success: function (ujSzemely){    
           console.log("Megtörtént a törlés");
           aktElem.remove();
       },
        error: function(){
            alert: "Hiba az adatok törlésekor!";
        }
       
    });
}

function kiir(){
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var nev = telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep ;
        console.log(nev);
        var elem = "<div><h2>" + nev + "</h2><p>" + tel + "</p><p>" + kep + "</p><button id='"+ID+"'class='torol'>Töröl</button></div>";
    
        $("article").append(elem);
    }
//    var nev = $("nev").val();
//    var tel = $("tel").val();
//    var kep = $("kep").val();
    
}

