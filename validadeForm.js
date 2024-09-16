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
