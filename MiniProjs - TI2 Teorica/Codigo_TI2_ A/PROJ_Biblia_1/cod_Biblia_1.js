//cod_Biblia_1
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
//testa a apresentação de todo o conteúdo (de modo hierárquico)
function mostraBiblia(){
	var iTest, iLivro, iCap, iVers, numLivros, numCaps, numVerss;
	for(iTest=0; iTest<numTests; iTest++){
		document.write('<h2>'+nomeTest(iTest)+'</h2>');
		numLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<numLivros; iLivro++){
			document.write('<h3>'+nomeLivroTest(iTest, iLivro)+'</h3>');
			numCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<numCaps; iCap++){
				document.write('<h4>'+nomeCapLivroTest(iTest, iLivro, iCap)+'</h4>');
				numVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
				for(iVers=0; iVers<numVerss; iVers++){
					document.write(
						'<span> '+
							(iVers+1)+': '+
							txtVersCapLivroTest(iTest, iLivro, iCap, iVers)+
						'</span>'
					);
				}
			}
		}
	}
}
//Apresenta um Livro no dispositivo "livroBibl"
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






