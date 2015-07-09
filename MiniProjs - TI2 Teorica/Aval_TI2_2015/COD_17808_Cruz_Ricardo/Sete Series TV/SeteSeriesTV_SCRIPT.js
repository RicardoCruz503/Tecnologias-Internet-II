//SeteSeriesTV
//**************************************************************

var listaSeries, numSeries, widthSlide, serieAtual;

//Expressa o nó principal de um documento XML.
//Apenas para uso no browser MSIE !
function noRaiz(fichXML){
	//criação de um objecto ActiveX (Microsoft)
	var oax=new ActiveXObject("Microsoft.XMLDOM");
	//tornar o objeto síncrono e carregá-lo
	oax.async=false; oax.load(fichXML);
	//devolver o nó raíz do XML (tipo XMLDOM node)
	return oax.documentElement;
}

//Estabelece a Lista de Series e respetiva quantidade
function inicSeries(){
	listaSeries=noRaiz("SeteSeriesTV_XML.xml").childNodes;
	numSeries=listaSeries.length;
    $(".slide-div").animate({ width: '20'}, 350);
    $(".slide-div").contents().fadeOut(350);
    $(".slide-div").animate({ opacity: '0'}, 1);
}

function numAttrSerie(iSerie){
    return listaSeries[iSerie].attributes.length;  
}

function numAttrTemp(iSerie, iTemp){
     return listaSeries[iSerie].childNodes[8].childNodes[iTemp].attributes.length;  
}

function numSeries(){
    return listaSeries.childNodes.length;
}

function tituloSerie(iSerie){
	return listaSeries[iSerie].attributes[0].text;
}

function criadorSerie(iSerie){
	return listaSeries[iSerie].attributes[1].text;
}

function datalancSerie(iSerie){
	return listaSeries[iSerie].attributes[2].text;
}

function generoSerie(iSerie){
	return listaSeries[iSerie].attributes[3].text;
}

function capaSerie(iSerie){
	return listaSeries[iSerie].childNodes[0].attributes[0].text;
}

function canaltvSerie(iSerie){
	return listaSeries[iSerie].childNodes[1].text;
}

function linktvSerie(iSerie){
	return listaSeries[iSerie].childNodes[2].text;
}

function elencoSerie(iSerie){
	return listaSeries[iSerie].childNodes[3].text;
}

function wikiSerie(iSerie){
	return listaSeries[iSerie].childNodes[4].text;
}

function youtubeSerie(iSerie){
	return listaSeries[iSerie].childNodes[5].text;
}

function imdbSerie(iSerie){
	return listaSeries[iSerie].childNodes[6].text;
}

function sinopseSerie(iSerie){
	return listaSeries[iSerie].childNodes[7].text;
}

function numTemporadas(iSerie){
    return listaSeries[iSerie].childNodes[8].childNodes.length;
}

function numtemporadaSerie(iSerie, iTemp){
	return listaSeries[iSerie].childNodes[8].childNodes[iTemp].attributes[0].text;
}

function numepitemporadaSerie(iSerie, iTemp){
	return listaSeries[iSerie].childNodes[8].childNodes[iTemp].attributes[1].text;
}

function capatemporadaSerie(iSerie, iTemp){
	return listaSeries[iSerie].childNodes[8].childNodes[iTemp].childNodes[0].attributes[0].text;
}

function notastemporadaSerie(iSerie, iTemp){
	return listaSeries[iSerie].childNodes[8].childNodes[iTemp].childNodes[1].text;
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
    for(var i = 0; i < numSeries; i++){
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

function toJSON(){
    var JSON ='var series = { "series":[';
    for(var i = 0; i<listaSeries.length; i++){
        JSON+='{' + getSerieAttrToJSON(i) + ',';
        JSON+=getSerieNodesToJSON(i);
        JSON+='},';
    }
    JSON = JSON.substring(0,JSON.length-1); 
    JSON+=']};'
    return JSON;
}

function getSerieAttrToJSON(iSerie){
    var JSON='"titulo":"'+tituloSerie(iSerie)+
            '","criador":"'+criadorSerie(iSerie)+
            '","datalanc":"'+datalancSerie(iSerie)+
            '","gen":"'+generoSerie(iSerie)+'"';
    return JSON;
    
}

function getSerieNodesToJSON(iSerie){
    var JSON='';
    for(var i = 0; i<listaSeries[iSerie].childNodes.length; i++){
        var node = listaSeries[iSerie].childNodes[i];
        if(node.nodeName == "capa"){
            JSON+= '"capa":"'+capaSerie(iSerie)+'"';
        }
        else if(node.nodeName == "temporadas"){
            JSON+=getSerieTemporadasToJSON(iSerie);
        }
        else{
            JSON+='"'+node.nodeName+'":"'+listaSeries[iSerie].childNodes[i].text+'"';
        }
        JSON+=',';
    }
    JSON = JSON.substring(0, JSON.length-1);
    
        return JSON;
}

function getSerieTemporadasToJSON(iSerie){
    var JSON ='"temporadas":[';
    
    for(var i = 0; i < numTemporadas(iSerie); i++){
        JSON+='{"numtemp":"'+numtemporadaSerie(iSerie, i)+'",' +
            '"numepi":"'+numepitemporadaSerie(iSerie, i)+'",'+
            '"capa":"'+capatemporadaSerie(iSerie, i)+'",'+
            '"notas":"'+notastemporadaSerie(iSerie, i)+'"},';
    }
    JSON = JSON.substring(0, JSON.length-1);
    JSON+=']';
    return JSON;
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

