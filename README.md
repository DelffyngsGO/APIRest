# Comparação do Index.js
Na Versão 1, existem quatro pontos principais sem validação adequada: o filtro req.query.concluida, que aceita valores diferentes de true e false; o ID req.params.id, que é convertido com parseInt() sem verificar se é válido; o título req.body.titulo, na rota POST, que verifica apenas se está vazio, mas não valida o tipo nem o tamanho; e os campos titulo e concluida, na rota PUT, que são atualizados diretamente, sem verificar seus tipos e valores.

---

## Caso de vazamento. 

Aqui veremos um caso real de falha de segurança que aconteceu com a empresa britânica TalkTalk, em outubro de 2015.
A empresa sofreu um ataque chamado SQL injection, que explora falhas na maneira como uma aplicação recebe e utiliza dados enviados pelo usuário.
Nesse caso, os atacantes conseguiram acessar informações pessoais de aproximadamente 157 mil clientes, incluindo nomes, endereços, telefones e e-mails. Em mais de 15 mil casos, também houve acesso a dados bancários.

A empresa foi multada em 400 mil libras em 2016 por falhas nas medidas de segurança.
Esse caso se relaciona com a nossa atividade porque demonstra a importância de tratar corretamente as entradas recebidas por uma aplicação. No nosso código em Express, por exemplo, não podemos confiar cegamente em um título, ID ou parâmetro enviado pelo usuário.
Precisamos validar os tipos, verificar os valores permitidos e limitar os tamanhos. Quando trabalhamos com bancos de dados, também devemos utilizar consultas parametrizadas para impedir que entradas maliciosas sejam interpretadas como comandos SQL.

É importante destacar que, no caso da TalkTalk, o problema específico foi SQL injection, e não simplesmente um título sem validação. Porém, os dois exemplos mostram como falhas no tratamento de entradas e outras medidas de segurança podem colocar dados em risco.
A principal lição é que segurança deve ser pensada desde o desenvolvimento da aplicação, e não somente depois que um ataque acontece.