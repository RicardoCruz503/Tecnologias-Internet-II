//cod_Biblia_2
//**************************************************************

//Lista de CDs e quantidade de CDs
var listaTests, numTests;

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

//Estabelece a Lista de Testamentos (Coleções de Livros) e respetiva quantidade
function inicBiblia(){
	listaTests=noRaiz("../../Recursos/XML/biblia.xml").childNodes;
	numTests=listaTests.length;
}

//EXTRAÇÃO DOS DADOS XML

//Expressa o nome de um Testamento
function nomeTest(iTest){
	return listaTests[iTest].attributes[0].text;
}
//Expressa o número de Livros num Testamento
function numLivrosTest(iTest){
	return listaTests[iTest].childNodes.length;
}
//Expressa o nome curto de um Livro de um Testamento
function nomeLivroTest(iTest, iLivro){
	return listaTests[iTest].childNodes[iLivro].childNodes[1].text;
}
//Expressa o nome longo de um Livro de um Testamento
function especLivroTest(iTest, iLivro){
	return listaTests[iTest].childNodes[iLivro].childNodes[0].text;
}
//Expressa o número de Capítulos de um Livro de um Testamento
function numCapsLivroTest(iTest, iLivro){
	return listaTests[iTest].childNodes[iLivro].childNodes.length-2;
}
//Expressa o nome de um Capítulo de um Livro de um Testamento
function nomeCapLivroTest(iTest, iLivro, iCap){
	return listaTests[iTest].childNodes[iLivro].childNodes[iCap+2].childNodes[0].text;
}
//Expressa o número de Versículos de um Capítulo de um Livro de um Testamento
function numVerssCapLivroTest(iTest, iLivro, iCap){
	return listaTests[iTest].childNodes[iLivro].childNodes[iCap+2].childNodes.length-1;
}
//Expressa o texto de um Versículo de um Capítulo de um Livro de um Testamento
function txtVersCapLivroTest(iTest, iLivro, iCap, iVers){
	return listaTests[iTest].childNodes[iLivro].childNodes[iCap+2].childNodes[iVers+1].text;
}


//OUTPUTS
//Apresenta um Livro no dispositivo "livroBibl" (NÃO INTERESSA PARA A APP)
function mostraLivroBiblia(iTest, iLivro){
	var  iCap, iVers, numCaps, numVerss, livroBibl, codHTML="";
	livroBibl=document.getElementById("livroBibl");
	numCaps=numCapsLivroTest(iTest, iLivro);
	codHTML+='<div class="nl">'+nomeLivroTest(iTest, iLivro)+'</div>';
	codHTML+='<div class="el">'+especLivroTest(iTest, iLivro)+'</div>';
	for(iCap=0; iCap<numCaps; iCap++){
		codHTML+='<div class="nc">'+nomeCapLivroTest(iTest, iLivro, iCap)+'</div>';
		numVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
		for(iVers=0; iVers<numVerss; iVers++){
			codHTML+=
				'<span class="num"> '+(iVers+1)+': </span>'+
				'<span class="vrs">'+txtVersCapLivroTest(iTest, iLivro, iCap, iVers)+'</span>';
		}
	}
	livroBibl.innerHTML=codHTML;
}

//APP ***************************************************************
//Apresenta um Capítulo no dispositivo contentor "baseCapitulo"
function mostraCapituloBiblia(iTest, iLivro, iCap){
	//número de versículos deste capítulo
	var numVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
	//pega para o objeto contentor
	var baseCapitulo=document.getElementById("baseCapitulo");
	//conteúdo HTML
	var codHTML='<h4>'+nomeCapLivroTest(iTest, iLivro, iCap)+'</h4><p>';
	for(var i=0; i<numVerss; i++){
		codHTML+='<span class="num"> '+(i+1)+': </span>';
		codHTML+='<span class="txt">'+txtVersCapLivroTest(iTest, iLivro, iCap, i)+'</span>';
	}
	codHTML+='</p>';
	baseCapitulo.innerHTML=codHTML;
}
//Definição do Testamento, estabelece a lista de Livros
function defTestam(iTest){
	var ctrlLivro=document.getElementById("ctrlLivro");
	ctrlLivro.innerHTML=codDefTestam(iTest);
	//iniciais
	botInic(iTest);
	identLivro(iTest, 0);
	mostraCapituloBiblia(iTest, 0, 0);
}
function codDefTestam(iTest){
	var i, numLivros, codHTML='<select onchange="defLivro(this, '+iTest+')">';
	numLivros=numLivrosTest(iTest);
	for(i=0; i<numLivros; i++){
		codHTML+='<option>'+nomeLivroTest(iTest, i)+'</option>';
	}
	codHTML+='</select>';
	return codHTML;
}
//Definição do Livro, estabelece a lista de Capítulos
function defLivro(seletor, iTest){
	var ctrlCap=document.getElementById("ctrlCap");
	ctrlCap.innerHTML=codDefLivro(seletor, iTest);
	//iniciais
	identLivro(iTest, seletor.selectedIndex);
	mostraCapituloBiblia(iTest, seletor.selectedIndex, 0);
}
function codDefLivro(seletor, iTest){
	var iCap, codHTML="", iLivro=seletor.selectedIndex;
	var numCaps=numCapsLivroTest(iTest, iLivro);
	for(iCap=0; iCap<numCaps; iCap++)
		codHTML+='<button class="botCap" onclick="mostraCapituloBiblia('+iTest+', '+iLivro+', '+iCap+')">'+(iCap+1)+'</button>';
	return codHTML;
}
//identifica o Livro aberto
function identLivro(iTest, iLivro){
	var nomeLivro=document.getElementById("nomeLivro");
	nomeLivro.innerHTML='<span id="nomeLivro">'+nomeLivroTest(iTest, iLivro)+'</span><br /><span id="especLivro">'+especLivroTest(iTest, iLivro)+'</span>'
}
//Botões iniciais
function botInic(iTest){
	var iCap, codHTML="", numCaps=numCapsLivroTest(iTest, 0);
	for(iCap=0; iCap<numCaps; iCap++)
		codHTML+='<button class="botCap" onclick="mostraCapituloBiblia('+iTest+', 0, '+iCap+')">'+(iCap+1)+'</button>';
	var ctrlCap=document.getElementById("ctrlCap");
	ctrlCap.innerHTML=codHTML;
}
















