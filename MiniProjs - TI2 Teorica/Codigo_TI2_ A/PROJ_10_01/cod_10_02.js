//cod_10_02
//**************************************************************
//var discot_JSON=JSON.parse(discot_STR);
var discot_JSON=JSON.parse(JSON.stringify(discot_OBJ));
var numCDs=discot_JSON.discoteca.length;

var ctrl, geral, detalhes;

//Expressa o Título de um CD, sabido o seu índice (no array)
function tituloCD(iCD){
	return discot_JSON.discoteca[iCD].titulo;
}
//Expressa a Autoria de um CD, sabido o seu índice (no array)
function autoriaCD(iCD){
	return discot_JSON.discoteca[iCD].autoria;
}
//Expressa a Editora de um CD, sabido o seu índice (no array)
function editoraCD(iCD){
	return discot_JSON.discoteca[iCD].editora;
}
//Expressa a URL da informação Amazon de um CD, sabido o seu índice (no array)
function urlAmazonCD(iCD){
	return discot_JSON.discoteca[iCD].amazon;
}
function capaMiniCD(iCD){
	return discot_JSON.discoteca[iCD].capa.imagMini;
}
//Expressa o nome do ficheiro da imagem real (grande) da capa
function capaBigCD(iCD){
	return discot_JSON.discoteca[iCD].capa.imagBig;
}
//Expressa o dia da data de lançamento de um CD, sabido o seu índice (no array)
function diaDataLanc(iCD){
	return discot_JSON.discoteca[iCD].datalanc.dia;
}
//Expressa o mês da data de lançamento de um CD, sabido o seu índice (no array)
function mesDataLanc(iCD){
	return discot_JSON.discoteca[iCD].datalanc.mes;
}
//Expressa o ano da data de lançamento de um CD, sabido o seu índice (no array)
function anoDataLanc(iCD){
	return discot_JSON.discoteca[iCD].datalanc.ano;
}
//Expressa o número de discos de um CD, sabido o seu índice (no array)
function numDiscos(iCD){
	return discot_JSON.discoteca[iCD].conteudos.length;
}
//Expressa a referência de cada disco de um CD, sabido o seu índice (no array) e índice do conteúdo (este começa em 0, obviamente)
function refDiscoCD(iCD, iConteudo){
	return discot_JSON.discoteca[iCD].conteudos[iConteudo].disco;
}
//Expressa o número de faixas de um disco de um CD, sabidos os respetivos índices
function numFaixasDisco(iCD, iConteudo){
	return discot_JSON.discoteca[iCD].conteudos[iConteudo].faixas.length;
}
//Expressa o número de uma faixa de um disco de um CD, sabidos os respetivos índices 
function numFaixaDisco(iCD, iConteudo, iFaixa){
	return discot_JSON.discoteca[iCD].conteudos[iConteudo].faixas[iFaixa].num;
}
//Expressa a referência de uma faixa de um disco de um CD, sabidos os respetivos índices 
function refFaixaDisco(iCD, iConteudo, iFaixa){
	return discot_JSON.discoteca[iCD].conteudos[iConteudo].faixas[iFaixa].ref;
}

//TESTES E OUTPUTS *************************************************
function descrCD(iCD){
	var descr="";
	descr+=tituloCD(iCD)+' | ';
	descr+=autoriaCD(iCD)+' | ';
	descr+=editoraCD(iCD)+' | ';
	descr+=diaDataLanc(iCD)+'-'+mesDataLanc(iCD)+'-'+anoDataLanc(iCD)+'<br />';
	return descr;
}
function descrColecaoCDs(){
	for(var i=0; i<numCDs; i++) document.write(descrCD(i));
}

//BROWSER DA COLEÇÃO *********************************************
function inicBrowser(){
	ctrl=document. getElementById("ctrl");
	geral=document. getElementById("geral");
	detalhes=document. getElementById("detalhes");
}
//código para detalhes de um CD
function codDetalhes(iCD){
	var iConteudo, iFaixa, cod='', nCont, nFxs;
	nCont=numDiscos(iCD);
	for(iConteudo=0; iConteudo<nCont; iConteudo++){
		cod+='<h3>Disco '+refDiscoCD(iCD, iConteudo)+':</h3>';
		cod+='<ul>';
		nFxs=numFaixasDisco(iCD, iConteudo);
		for(iFaixa=0; iFaixa<nFxs; iFaixa++){
			cod+='<li>Faixa '+numFaixaDisco(iCD, iConteudo, iFaixa)+': '+refFaixaDisco(iCD, iConteudo, iFaixa)+'</li>';
		}
		cod+='</ul>';
	}
	return cod;
}
//código de informação geral de um CD
function codGeral(iCD){
	var cod='';
	cod+='<img src="../../Recursos/Imagens/'+capaBigCD(iCD)+'" width="250" /><br />';
	cod+='<span class="etk1">título:</span><br /><span class="etk2">'+tituloCD(iCD)+'</span><hr />';
	cod+='<span class="etk1">autoria:</span><br /><span class="etk2">'+autoriaCD(iCD)+'</span><hr />';
	cod+='<span class="etk1">editora:</span><br /><span class="etk2">'+editoraCD(iCD)+'</span><hr />';
	cod+='<span class="etk1">data de lançamento:</span><br /><span class="etk2">'+diaDataLanc(iCD)+'/'+mesDataLanc(iCD)+'/'+anoDataLanc(iCD)+'</span><hr />';
	cod+='<a href="http://'+urlAmazonCD(iCD)+'" target="_blank">ver mais na Amazon...</a>';
	return cod;
}
//código de apresentação de um CD
function mostra(iCD){
	geral.innerHTML=codGeral(iCD);
	detalhes.innerHTML=codDetalhes(iCD);
}















