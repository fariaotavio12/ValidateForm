### 0. Criar o Arquivo createValidators.js

Primeiro, crie um arquivo JavaScript chamado createValidators.js. Esse arquivo será responsável por armazenar as funções de validação, que você poderá usar em qualquer evento de formulário.

### **1. Validação de Campo Obrigatório (required)**

Valida se o campo foi preenchido (não pode ser vazio).

**Exemplo:**

```jsx
{ attributes: ["nomeCompleto"], label: "Nome Completo", validator: "required" }
```

Se o campo "nomeCompleto" estiver vazio, o erro será:

**Mensagem:** "O campo Nome Completo é obrigatório."

---

### **2. Validação de String (string)**

Valida se o campo é uma string e se atende aos requisitos de tamanho mínimo e máximo.

**Parâmetros:**

- `min`: Número mínimo de caracteres permitidos.
- `max`: Número máximo de caracteres permitidos.

**Exemplo:**

```jsx
{ attributes: ["nomeProduto"], label: "Nome do Produto", validator: "string", params: { min: 3, max: 100 } }
```

Se o campo "nomeProduto" tiver menos de 3 caracteres ou mais de 100, as mensagens serão:

- **Mensagem 1:** "O campo Nome do Produto deve ter no mínimo 3 caracteres."
- **Mensagem 2:** "O campo Nome do Produto deve ter no máximo 100 caracteres."

---

### **3. Validação de Números Inteiros (integerOnly)**

Valida se o campo contém apenas números inteiros e se está dentro dos limites definidos.

**Parâmetros:**

- `min`: Valor mínimo permitido.
- `max`: Valor máximo permitido.

**Exemplo:**

```jsx
{ attributes: ["quantidade"], label: "Quantidade", validator: "integerOnly", params: { min: 1, max: 100 } }
```

Se o campo "quantidade" não for um número inteiro ou estiver fora do intervalo, as mensagens serão:

- **Mensagem 1:** "O campo Quantidade deve conter apenas números inteiros."
- **Mensagem 2:** "O campo Quantidade deve ser maior ou igual a 1."
- **Mensagem 3:** "O campo Quantidade deve ser menor ou igual a 100."

---

### **4. Validação de Números Decimais (floatOnly)**

Valida se o campo contém apenas números decimais e se está dentro dos limites definidos.

**Parâmetros:**

- `min`: Valor decimal mínimo permitido.
- `max`: Valor decimal máximo permitido.

**Exemplo:**

```jsx
{ attributes: ["preco"], label: "Preço", validator: "floatOnly", params: { min: 0.01, max: 10000.00 } }
```

Se o campo "preço" não for um número decimal ou estiver fora do intervalo, as mensagens serão:

- **Mensagem 1:** "O campo Preço deve conter apenas números decimais."
- **Mensagem 2:** "O campo Preço deve ser maior ou igual a 0.01."
- **Mensagem 3:** "O campo Preço deve ser menor ou igual a 10000.00."

---

### **5. Validação de Expressão Regular (regex)**

Valida se o campo corresponde a um padrão específico de expressão regular.

**Parâmetros:**

- `pattern`: Expressão regular que o campo deve atender.

**Exemplo:**

```jsx
{ attributes: ["email"], label: "E-mail", validator: "regex", params: { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ } }
```

Se o campo "email" não corresponder ao padrão de um endereço de e-mail válido, a mensagem será:

**Mensagem:** "O campo E-mail está no formato inválido."

---

### **6. Validação de Datas (date)**

Valida se o campo contém uma data válida e se está dentro de um intervalo.

**Parâmetros:**

- `format`: Formato esperado da data (ex.: "dd/MM/yyyy").
- `min`: Data mínima permitida no formato `dd/MM/yyyy`.
- `max`: Data máxima permitida no formato `dd/MM/yyyy`.

**Exemplo:**

```jsx
{ attributes: ["dataEntrega"], label: "Data de Entrega", validator: "date", params: { format: "dd/MM/yyyy", min: "01/01/2023", max: "31/12/2023" } }
```

Se o campo "dataEntrega" estiver fora do intervalo ou no formato incorreto, as mensagens serão:

- **Mensagem 1:** "O campo Data de Entrega deve estar no formato dd/MM/yyyy."
- **Mensagem 2:** "O campo Data de Entrega deve ser posterior a 01/01/2023."
- **Mensagem 3:** "O campo Data de Entrega deve ser anterior a 31/12/2023."

---

### **7. Validação Condicional (requiredOn)**

Valida se o campo é obrigatório com base no valor de outro campo.

**Parâmetros:**

- `field`: Nome do campo dependente.
- `eq`: O campo atual será obrigatório se o valor do campo dependente for igual a `eq`.
- `ne`: O campo atual será obrigatório se o valor do campo dependente for diferente de `ne`.
- `regex`: O campo atual será obrigatório se o valor do campo dependente corresponder à expressão regular `regex`.

**Exemplo 1: (obrigatório se o campo dependente for igual a um valor)**

```jsx
{ attributes: ["justificativa"], label: "Justificativa", validator: "requiredOn", params: { field: "aprovacao", eq: "N" } }
```

Se o campo "aprovação" for igual a "N", o campo "justificativa" será obrigatório.

**Exemplo 2: (obrigatório se o campo dependente for diferente de um valor)**

```jsx
{ attributes: ["explicacao"], label: "Explicação", validator: "requiredOn", params: { field: "status", ne: "Aprovado" } }
```

Se o campo "status" for diferente de "Aprovado", o campo "explicação" será obrigatório.

**Exemplo 3: (obrigatório se o campo dependente atender a uma expressão regular)**

```jsx
{ attributes: ["motivo"], label: "Motivo", validator: "requiredOn", params: { field: "resposta", regex: "^(Rejeitado|Pendente)$" } }
```

Se o campo "resposta" for igual a "Rejeitado" ou "Pendente", o campo "motivo" será obrigatório.

---

### **Como adicionar novas validações:**

1. **Defina uma nova função de validação** no formato das funções já existentes (ex.: `required`, `string`, `integerOnly`).
2. **Use `hasOwnProperty`** para verificar a existência de parâmetros opcionais antes de usá-los.
3. **Adicione a validação** à função `getValidacoes` no bloco apropriado de validações.

### Exemplo:

```jsx
function validateForm(form) {
	var state = getValue("WKNumState");
	var completTask = "true".equals(getValue("WKCompletTask")) ? true : false;

	if (completTask) {
		var validacoes = getValidacoes();
		var errorMessages = [];

		validacoes.forEach(function (validacao) {
			if (validacao.state.stateNumber.indexOf(parseInt(state)) !== -1) {
				createValidators(form, validacao.state.validacoes, errorMessages);
			}
		});

		if (errorMessages.length > 0) {
			throw errorMessages.join("\n");
		}
	}
}

function getValidacoes() {
	return [
		{
			state: {
				name: "atividadeSolicitante",
				stateNumber: [4, 0], // Lista de estados para essa validação
				validacoes: [
					{ attributes: ["nomeEmpresaSolicitante"], label: "Empresa", validator: "required" },
					{ attributes: ["nomeSetorSolicitante"], label: "Setor", validator: "required" },
					{ attributes: ["valorEstimado"], label: "Valor Estimado", validator: "required" },
					{ attributes: ["localInform"], label: "local", validator: "required" },
					{ attributes: ["observacao"], label: "Observação", validator: "required" },
					{ attributes: ["nameUserAlcadaN1"], label: "Aprovador N1", validator: "required" },
					{ attributes: ["tipoAcerto"], label: "Tipo de acerto", validator: "required" },
				],
			},
		},
		{
			state: {
				name: "atividadeControladoria",
				stateNumber: [5], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoAnaliseControladoria"], label: "Aprovado", validator: "required" },
					{ attributes: ["observAnaliseControladoria"], label: "Observação", validator: "required" },
				],
			},
		},
		{
			state: {
				name: "Aprovacao N1",
				stateNumber: [28], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN1"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN1"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN1", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Aprovacao N2",
				stateNumber: [13], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN2"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN2"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN2", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Aprovacao N3",
				stateNumber: [19], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN3"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN3"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN3", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Aprovacao N4",
				stateNumber: [27], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN4"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN4"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN4", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Aprovacao N5",
				stateNumber: [15], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN5"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN5"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN5", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Aprovacao N6",
				stateNumber: [25], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovadoN6"], label: "Aprovado", validator: "required" },
					{
						attributes: ["observAprovN6"],
						label: "Observação",
						validator: "requiredOn",
						params: { field: "aprovadoN6", eq: "NAO" },
					},
				],
			},
		},
		{
			state: {
				name: "Atividade contabilidade",
				stateNumber: [49], // Outro grupo de estados
				validacoes: [
					{
						attributes: ["atividadeSeguinte"],
						label: "Atividade Seguinte",
						validator: "required",
					},
					{
						attributes: ["tipoDocumento"],
						label: "Tipo de documento",
						validator: "requiredOn",
						params: { field: "atividadeSeguinte", eq: "Proxima" },
					},
					{
						attributes: ["numberDocumentoProtheus"],
						label: "Numero do documento",
						validator: "requiredOn",
						params: { field: "atividadeSeguinte", eq: "Proxima" },
					},
					{ attributes: ["observDadosContabilidade"], label: "Observação", validator: "required" },
				],
			},
		},
		{
			state: {
				name: "Aprovacao Controladoria",
				stateNumber: [55], // Outro grupo de estados
				validacoes: [
					{ attributes: ["aprovDadosInseridos"], label: "Aprovado", validator: "required" },
					{ attributes: ["observVerificaDados"], label: "Observação", validator: "required" },
				],
			},
		},
	];
}

```

