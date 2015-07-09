//SeteSeriesTV
//**************************************************************

var numSeries, widthSlide, serieAtual;
var seriesJSON=JSON.parse(JSON.stringify(series));
//Expressa o nó principal de um documento XML.
//Apenas para uso no browser MSIE !


//Estabelece a Lista de Series e respetiva quantidade
function inicSeries(){
    $(".slide-div").animate({ width: '20'}, 350);
    $(".slide-div").contents().fadeOut(350);
    $(".slide-div").animate({ opacity: '0'}, 1);
}

function numSeries(){
    console.log(seriesJSON.series.length);
    return seriesJSON.series.length;
}

function tituloSerie(iSerie){
    return seriesJSON.series[iSerie].titulo;
}

function criadorSerie(iSerie){
    return seriesJSON.series[iSerie].criador;
}

function datalancSerie(iSerie){
    return seriesJSON.series[iSerie].datalanc;
}

function generoSerie(iSerie){
    return seriesJSON.series[iSerie].gen;
}

function capaSerie(iSerie){
    return seriesJSON.series[iSerie].capa;
}

function canaltvSerie(iSerie){
    return seriesJSON.series[iSerie].canaltv;
}

function linktvSerie(iSerie){
    return seriesJSON.series[iSerie].linkctv;
}

function elencoSerie(iSerie){
    return seriesJSON.series[iSerie].elenco;
}

function wikiSerie(iSerie){
    return seriesJSON.series[iSerie].wiki;
}

function youtubeSerie(iSerie){
    return seriesJSON.series[iSerie].youtube;
}

function imdbSerie(iSerie){
    return seriesJSON.series[iSerie].imdb;
}

function sinopseSerie(iSerie){
    return seriesJSON.series[iSerie].sinopse;
}

function numTemporadas(iSerie){
    return seriesJSON.series[iSerie].temporadas.length;
}

function numtemporadaSerie(iSerie, iTemp){
    return seriesJSON.series[iSerie].temporadas[iTemp].numtemp;
}

function numepitemporadaSerie(iSerie, iTemp){
    return seriesJSON.series[iSerie].temporadas[iTemp].numepi;
}

function capatemporadaSerie(iSerie, iTemp){
    return seriesJSON.series[iSerie].temporadas[iTemp].capa;
}

function notastemporadaSerie(iSerie, iTemp){
    return seriesJSON.series[iSerie].temporadas[iTemp].notas;
}

//EXTRAÇÃO DOS DADOS XML


function startPage(){
    buildPage(0);
    serieAtual = 0;
}

function buildPage(iSerie){
    buildSeries(iSerie);
    buildTemporadas(iSerie);
    buildMasterDiv(iSerie);
    buildInfoSerie(iSerie);
    buildTempInfo(iSerie, 0);
}

function buildMasterDiv(iSerie){
    buildBanner(iSerie);
    buildVideoAndLinks(iSerie);
}

function buildSeries(){
    var codHTML = "";
    for(var i = 0; i < numSeries(); i++){
        codHTML += '<div id="'+ i +'"class="hover-div round-border series-div image-series-div">'+
                '<img class="slide-div-series-image round-border" src="../../Imagens/'+ capaSerie(i) +'">'+
                '<b class="slide-font">' + tituloSerie(i) + '</b>' +
                '</div>';   
    }
    $("#slide-left-div").html(codHTML);
}

function buildTemporadas(iSerie){
    var codHTML ="";
    for(var i = 0; i < numTemporadas(iSerie); i++){
        codHTML+= '<div id="'+ i +'" class="hover-div round-border temp-div image-temp-div">'+
                '<img class="slide-div-temp-image round-border" src="../../Imagens/'+ capatemporadaSerie(iSerie, i) +'">'+
                '<b class="slide-font">Temporada '+ numtemporadaSerie(iSerie, i) +'</b>'+
                '</div>';   
    }
    $("#slide-right-div").html(codHTML);
}

function buildBanner(iSerie){
    var codHTML = '<img id="banner-image" src="../../Imagens/'+capaSerie(iSerie)+'">';
    $("#div-banner").html(codHTML);
    
}

function buildVideoAndLinks(iSerie){
    console.log(youtubeSerie(iSerie));
    var codHTML ='<iframe id="video" src="https://www.youtube.com/embed/'+youtubeSerie(iSerie)+'" allowfullscreen></iframe>' +
                    '<div id="links-div" class="">'+
                    '<a href="'+ wikiSerie(iSerie) +'" target="new"><img class="link-img" src="../../Imagens/wiki.png"></a>'+
                    '<a href="'+ linktvSerie(iSerie) +'" target="new"><img class="link-img" src="../../Imagens/tv.png"></a>'+
                    '<a href="'+ imdbSerie(iSerie) +'" target="new"><img class="link-img" src="../../Imagens/imdb.png"></a>'+
                    '</div>';
    $("#div-video").html(codHTML);
}

function buildInfoSerie(iSerie){
    //#5E6977
    var codHTML = '<p><span class="colored-span">Titulo: </span>'+tituloSerie(iSerie)+'</p>' + 
                  '<p><span class="colored-span">Criador(es): </span>'+criadorSerie(iSerie)+'</p>' +
                  '<p><span class="colored-span">Data Lançamento: </span>'+datalancSerie(iSerie)+'</p>'+
                  '<p><span class="colored-span">Género(s): </span>'+generoSerie(iSerie)+'</p>'+
                  '<p><span class="colored-span">Canal TV: </span>'+canaltvSerie(iSerie)+'</p>'+
                  '<p><span class="colored-span">Elenco: </span>'+elencoSerie(iSerie)+'</p>'+
                  '<p><span class="colored-span">Sinopse: </span>'+sinopseSerie(iSerie)+'</p>';
    
    $("#div-info").html(codHTML);
}  

function buildTempInfo(iSerie, iTemp){
    var temp = numtemporadaSerie(iSerie, iTemp);
    var codHTML ='<div class="float-left"><img id="temp-info-img" class="round-border" src="../../Imagens/'+capatemporadaSerie(iSerie, iTemp)+'"></div>'+
                    '<div class="float-right"><p><span class="colored-span">Temporada: </span>'+temp+'</p> '+
                    '<p><span class="colored-span">Episodios: </span>'+numepitemporadaSerie(iSerie, iTemp)+'</p>' +
                    '<p><span class="colored-span">Notas: </span>'+notastemporadaSerie(iSerie, iTemp)+'</p>' +
                    '</div>';
    
    $("#temp-info").html(codHTML);
}
    
//jquery events
$(document).ready(function () {
    $(".slide-div").hover(
        function(){ //handlerIn
            $(this).animate({ opacity: '100'}, 10);
            $(this).animate({ width: '25%'}, 300);
            $(this).contents().fadeIn(300);
        },
        function(){ //handlerOut
            $(this).animate({ width: '30'}, 200);
            $(this).animate({ opacity: '0'}, 1);
            $(this).contents().fadeOut(200);
        }
    );
    
    $(".slide-div").on("mouseenter", ".hover-div",
        function(){
            var width = $(this).width();
            var height = $(this).height();
            $(this).css("box-shadow", "0 0 0 2px white inset");
        }
    );
    $(".slide-div").on("mouseleave", ".hover-div",
        function(){
            var width = $(this).width();
            var height = $(this).height();
            $(this).css("box-shadow", "none");
        }
    );
    
    $("#slide-left-div").on("click", ".series-div", function(){
        serieAtual =$(this).prop("id"); 
        buildPage($(this).prop("id"));  
        $('html, body').animate({
            scrollTop: $("#top").offset().top
        }, 300);
    });
    
    $("#slide-right-div").on("click", ".temp-div", function(){
        var temp = $(this).prop("id");
        buildTempInfo(serieAtual, temp);
        $('html, body').animate({
            scrollTop: $("#bottom").offset().top
        }, 300);
    });
});

