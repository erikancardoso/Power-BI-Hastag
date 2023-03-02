let 
	Fonte = Csv.Document(File.Contents("D:\01-10Etapas de transformação que você precisa dominar\arquivo vendas por grupo.txt"), [Delimiter=" ", Columns=15, Encoding)
	#"Linhas Principais Removidas" = Table.Skip(Fonte, 6),
	#"Linhas Inferiores Removidas" = Table.RemoveLastN(#"Linhas Principais Removidas", 10),
	#"Cabeçalho Promovidos" = Table.PromoterHeaders(#"Linhas Inferiores removidas", [PromoteAllScalars=true]),
	#"Colunas Removidas" = Table.RemoveColumns(#"Cabeçalhos Promovidaso", {""}),
	#"Linhas Filtradas" = Table.SelectRows(#"Colunas Removidas", each 9[grupo] <> "TOTAL VENDA")),
	#"Primeiros caracteres extraidos" = Table.TransformColumns(#"Linhas Filtradas", {{"grupo", each Text.Start(_, 1), type text}}),
	#"Valor Substituido" = Table.Replace.Value(#" Primeiros caracteres extraidos", "", null, replacer.ReplaceValue, {"grupo"}),
	#"Valor Substituído1" = Table. ReplaceValue(#"Valor Substituido","Par 1- ", "", Replacer.ReplaceText, {"SET"}),
	#"Valor Substituido2" = Table.ReplaceValue(#"Valor Substituido1", " R", "", Replacer.PeplaceText, {"JAN"}),
	#"Valor Substituido3" = Table.ReplaceValue(#"Valor Substituido2", "s/v", "0",Replacer.ReplaceText,{"OUT", "NOV", "DEZ"}),
	#"Preenchido Abaixo" = Table.FillDown(#" Valor Substituido3", {"grupo"}),
	#"Colunas não dinamicas"= Table.UnpivoltOtherColumn(#"Preenchido Abaixo",{"grupo", "ANO"}, "Atributo", "Valor"),
	#"Colunas mescladas" = Table.Combine.Column(#"Colunas não dimanicas", {"Atributo", "ANO"}, Combine.CombineTextByDelimiter("-", QuoteStyle.None), "Data"),
	#"Tipo Alterado" = Table.TransformColumnTypes(#"Colunas mescladas", {{"Data", type date}, {"Valor", types number}})
in

	#"Tipo Alterado"

/*
 estudar Power BI e fazer uns 3 projetos para apresentar 
 requisitos: Excel avançado
*/
