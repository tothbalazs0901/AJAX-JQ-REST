$(function(){    
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adatKuld);      
    //$(".torol").on("click", adatTorol);
    $("article").delegate(".torol", "click", adatTorol);
    $("article").delegate(".szerkeszt", "click", adatSzerkeszt);
    $("#megse").on("click", adatMegse);
    $("#modosit").on("click", adatModosit);
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

function adatSzerkeszt(){
    console.log("Modosít");
    $(".szerkeszt").removeClass("elrejt");
    var index = $(this).attr("id");
    console.log(index);
        $("#id2").val(telefonkonyvem[index].ID);
        $("#nev2").val(telefonkonyvem[index].nev);
        $("#tel2").val(telefonkonyvem[index].tel);
        $("#kep2").val(telefonkonyvem[index].kep);
}

function adatMegse(){
    $(".szerkesztes").addClass("elrejt");
}

function adatModosit(){
    var editSzemely = {
        ID: $("#id2").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    };
    
    console.log("Módosít");
    console.log(editSzemely);
    $.ajax({
       type: "PUT",
       url: "modosit.php",
       data: editSzemely,
       success: function (){
           
            beolvas();
       },
        error: function(){
            alert: "Hiba az adatok mentésekor!";
        }
       
    });
}


function kiir(){
    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        
        let szemely = telefonkonyvem[i];
        let elem = "<div><h2>" + szemely.nev + "</h2><p>" + szemely.tel + "</p><p>" + szemely.kep + "</p><button id='"+
            szemely.ID+"'class='torol'>Töröl</button>\n\<button id=" + i + " class='szerkeszt'>Szerkeszt</button><hr></div>";
    
        $("article").append(elem);
    }
//    var nev = $("nev").val();
//    var tel = $("tel").val();
//    var kep = $("kep").val();
    
}

