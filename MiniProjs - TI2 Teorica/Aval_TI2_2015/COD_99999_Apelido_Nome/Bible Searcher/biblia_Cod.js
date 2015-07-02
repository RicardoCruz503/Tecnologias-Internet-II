//cod_Biblia_4
//**************************************************************
var bibleJSON=JSON.parse(JSON.stringify(biblia));
var inputSearch="";
//EXTRAÇÃO DOS DADOS JSON
//Expressa o número de Testamentos
function numTests(){
	return bibleJSON.bible.length;
}

//Expressa o nome de um Testamento
function nomeTest(iTest){
	return bibleJSON.bible[iTest].nameTest;
}

//Expressa o número de Livros num Testamento
function numLivrosTest(iTest){
	return bibleJSON.bible[iTest].books.length;
}

//Expressa o nome curto de um Livro de um Testamento
function nomeLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].shortName;
}

//Expressa o nome longo de um Livro de um Testamento
function especLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].longName;
}

//Expressa o número de Capítulos de um Livro de um Testamento
function numCapsLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].chapters.length;
}

//Expressa o nome de um Capítulo de um Livro de um Testamento
function nomeCapLivroTest(iTest, iLivro, iCap){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].title;
}

//Expressa o número de Versículos de um Capítulo de um Livro de um Testamento
function numVerssCapLivroTest(iTest, iLivro, iCap){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].versicles.length;
}

//Expressa o texto de um Versículo de um Capítulo de um Livro de um Testamento
function txtVersCapLivroTest(iTest, iLivro, iCap, iVers){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].versicles[iVers];
}


//Epressa a referência dum versículo
function refVers(iTest, iLivro, iCap, iVers){
	return '<span class="colored">' + nomeLivroTest(iTest, iLivro)+' '+(iCap+1)+':'+(iVers+1) + '</span> - ';
}

//Expressa o número total de versículos

function pesquisar(){
    var start = new Date().getTime();
    var regex=null;
    var txtVers, txtVersFinal="", iTest=0, iLivro=0, iCap=0, iVers=0, nTests=0, nLivros=0, nCaps=0, nVerss=0;
    var codHTML="";
    if($("#radio-restrita").prop("checked")){
        regex = new RegExp(inputSearch.replace(/(\W)/g, "\\$1"), "g"); 
    }
    else{
       regex = new RegExp(inputSearch.replace(/(\W)/g, "\\$1"), "gi"); 
    }
    
	nTests=numTests();
	for(iTest=0; iTest<nTests; iTest++){
		nLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<nLivros; iLivro++){
			nCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<nCaps; iCap++){
				nVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
                for(iVers=0; iVers<nVerss; iVers++){
                    txtVers = txtVersCapLivroTest(iTest, iLivro, iCap, iVers);
                    regexArray = txtVers.match(regex);
                    if(regexArray!= null){
                        txtVersFinal = delimit(txtVersCapLivroTest(iTest, iLivro, iCap, iVers), regex, regexArray);
                        codHTML += '<p>' + refVers(iTest, iLivro, iCap, iVers) + txtVersFinal+ '</p>';
                    }
                }
			}
		}
    }
    console.log("done search");
    if(codHTML=="")
    {
       codHTML += '<p class="center">Não foram encontradas quaisquer ocurrencias da sua pesquisa</p>'
    }
    $('#output-div').html(codHTML);
    
    var end = new Date().getTime();
    var time = end - start;
    var timetype = "ms";
    if(time > 1000){ 
        time /= 1000; 
        timetype = "s";
    }
    displayInfo("<h5>Tempo de execução da pesquisa: " + time + " " + timetype + "</h5>");
    
}

function displayInfo(text){
    $("#time-div").html(text);
    $("#time-div").fadeTo(2000, 100);
    $("#time-div").fadeTo(2000, 0);  
}

function delimit(vers, regex, regexArray){
    var splitArray = vers.split(regex);
    var output = "";
    var j = 0;
    for(var i = 0; i<splitArray.length; i++){
        output+=splitArray[i];
        if(regexArray[i]!=null){
           output += '<b>' + regexArray[i] + '</b>';
        }
    }
    return output;
}

function decision(){
    if($("#inputText").val()!=""){
        pesquisar(); 
    }
    else{
        displayInfo("<h5>Por favor introduza a palavra ou frase que deseja pesquisar</h5>");  
    }
}

//jquery events
$(document).ready(function () {
    $('#radio-restrita').change(function () {
        if ($(this).is(':checked')) {
            $("#radio-lexical").attr("checked", false);
        }
    });

    $('#radio-lexical').change(function () {
        if ($(this).is(':checked')) {
            $("#radio-restrita").attr("checked", false);
        }
    });
    
    $('#inputBtn').click(function () {
        decision();
    });
    
     $('#inputText').on('input',function(e){
        inputSearch = $('#inputText').val();
    });
    
    $('#inputText').keyup(function(e){
        if(e.keyCode == 13) //ENTER
        {
            decision();
        }
    });
});




