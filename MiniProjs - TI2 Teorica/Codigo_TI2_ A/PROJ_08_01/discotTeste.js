//nível 0
{"discoteca":[
]}





















//nível 1
{"discoteca":[
	{
	},
	{
	},
	... etc.
	{
	}
]}




//nível 2
{"discoteca":[
	{
		"titulo":"£",
		"autoria":"£",
		"editora":"£",
		"amazon":"£",
		"datalanc":{"ano":"£", "mes":"£", "dia":"£"},
		"capa":{"imagMini":"£", "imagBig":"£"},
		"conteudos":[
		]
	},
	{
	},
	... etc.
	{
	}
]}
//nível 3
{"discoteca":[
	{
		"titulo":"£",
		"autoria":"£",
		"editora":"£",
		"amazon":"£",
		"datalanc":{"ano":"£", "mes":"£", "dia":"£"},
		"capa":{"imagMini":"£", "imagBig":"£"},
		"conteudos":[
			{
			},
			{
			},
			{
			},
			... etc.
			{
			}
		]
	},
	{
	},
	{
	},
	... etc.
	{
	}
]}
//nível 4
{"discoteca":[
	{
		"titulo":"£",
		"autoria":"£",
		"editora":"£",
		"amazon":"£",
		"datalanc":{"ano":"£", "mes":"£", "dia":"£"},
		"capa":{"imagMini":"£", "imagBig":"£"},
		"conteudos":[
			{
				"disco":"£",
				"faixas":[
				]
			},
			{
			},
			{
			},
			... etc.
			{
			}
		]
	},
	{
	},
	{
	},
	... etc.
	{
	}
]}
//nível 5
{"discoteca":[
	{
		"titulo":"£",
		"autoria":"£",
		"editora":"£",
		"amazon":"£",
		"datalanc":{"ano":"£", "mes":"£", "dia":"£"},
		"capa":{"imagMini":"£", "imagBig":"£"},
		"conteudos":[
			{
				"disco":"£",
				"faixas":[
					{},
					{},
					{},
					... etc.
				],
			},
			{
			},
			{
			},
			... etc.
			{
			}
		]
	},
	{
	},
	{
	},
	... etc.
	{
	}
]}
//nível 6
var discoteca={[
	{
		"titulo":"£",
		"autoria":"£",
		"editora":"£",
		"amazon":"£",
		"datalanc":{"ano":"£", "mes":"£", "dia":"£"},
		"capa":{"imagMini":"£", "imagBig":"£"},
		"conteudos":[
			{
				"disco":"£",
				"faixas":[
					{"num":"£", "ref":"£"},
					{},
					{},
					... etc.
					{}
				]
			},
			{
			},
			{
			},
			... etc.
			{
			}
		]
	},
	{
	},
	{
	},
	... etc.
	{
	}
]}

<!DOCTYPE html>
<html>
<body>

<h2>Create Object from JSON String</h2>

<p id="demo"></p>

<script>
var text = '{"employees":[' +
'{"firstName":"John","lastName":"Doe" },' +
'{"firstName":"Anna","lastName":"Smith" },' +
'{"firstName":"Peter","lastName":"Jones" }]}';

obj = JSON.parse(text);
document.getElementById("demo").innerHTML =
obj.employees[1].firstName + " " + obj.employees[1].lastName;
</script>

</body>
</html>


