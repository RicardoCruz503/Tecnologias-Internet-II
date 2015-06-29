//cod_Biblia_3
//**************************************************************

//Lista de Testamentos e respetiva quantidade
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
//1. Criar um objeto com o atributo "bible"
//2. "bible" é um array de objetos de tipoTestament
//3. cada objeto tipoTestament tem atributos "nameTest" e "books"
//4. "nameTest" é uma string, "books" é um array de tipoBook
//5. cada objeto tipoBook tem tem atributos "shortName", "longName" e "chapters"
//6. "shortName" e "longName" são strings e "chapters" é um array de tipoChapter
//7. cada objeto tipoChapter tem atributos "title" e "versicles"
//8. "title" é uma string e "versicles" é um array de strings

function geraCodJSON(){
	var cod='', codJSON=document.getElementById("codJSON");
	var iTest, iLivro, iCap, iVers, numLivros, numCaps, numVerss;
	//cod+='\n';
	cod+='{"bible":[\n';
	for(iTest=0; iTest<numTests; iTest++){
		cod+='  {\n';
		cod+='    "nameTest":"'+nomeTest(iTest)+'",\n';
		cod+='    "books":[\n';
		numLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<numLivros; iLivro++){
			cod+='      {\n';
			cod+='        "shortName":"'+nomeLivroTest(iTest, iLivro)+'",\n';
			cod+='        "longName":"'+especLivroTest(iTest, iLivro)+'",\n';
			cod+='        "chapters":[\n';
			numCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<numCaps; iCap++){
				cod+='          {\n';
				cod+='            "title":"'+nomeCapLivroTest(iTest, iLivro, iCap)+'",\n';
				cod+='            "versicles":[\n';
				numVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
				for(iVers=0; iVers<numVerss; iVers++){
					if(iVers<numVerss-1)
						cod+='              "'+txtVersCapLivroTest(iTest, iLivro, iCap, iVers)+'",\n';
					else
						cod+='              "'+txtVersCapLivroTest(iTest, iLivro, iCap, iVers)+'"\n';
				}
				cod+='            ]\n';
				if(iCap<numCaps-1) cod+='          },\n';
				else cod+='          }\n';
			}
			cod+='        ]\n';
			if(iLivro<numLivros-1) cod+='      },\n';
			else cod+='      }\n';
		}
		cod+='    ]\n';
		if(iTest<numTests-1) cod+='  },\n';
		else cod+='  }\n';
	}
	cod+=']}\n';
	codJSON.value=cod;
}















