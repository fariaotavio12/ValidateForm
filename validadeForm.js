export function createValidators(form, validacoes, errorMessages) {
	var context = this;
	validacoes.forEach(function (rule) {
		rule.attributes.forEach(function (attribute) {
			var fieldName = rule.label || attribute;
			context[rule.validator](form, attribute, rule.params, errorMessages, fieldName);
		});
	});
}

export function required(form, field, params, errorMessages, fieldName) {
	var value = form.getValue(field);
	if (value == null || value == undefined || value.trim().length == 0 || "".equals(value.trim())) {
		errorMessages.push("O campo " + fieldName + " é obrigatório.");
	}
}

export function string(form, field, params, errorMessages, fieldName) {
	var value = form.getValue(field);
	if (value != null && value != undefined && typeof value === "string") {
		value = value.trim();
		if (params.max && value.length > params.max) {
			errorMessages.push("O campo " + fieldName + " deve ter no máximo " + params.max + " caracteres.");
		}
		if (params.min && value.length < params.min) {
			errorMessages.push("O campo " + fieldName + " deve ter no mínimo " + params.min + " caracteres.");
		}
	} else {
		errorMessages.push("O campo " + fieldName + " é inválido ou não foi preenchido corretamente.");
	}
}

export function requiredOn(form, field, params, errorMessages, fieldName) {
	var valueDepend = form.getValue(params.field);

	if (params.hasOwnProperty("ne") && valueDepend != params.ne) {
		required(form, field, params, errorMessages, fieldName);
	}

	if (params.hasOwnProperty("eq") && valueDepend == params.eq) {
		required(form, field, params, errorMessages, fieldName);
	}

	if (params.hasOwnProperty("regex")) {
		var regex = new RegExp(params.regex);
		if (regex.test(valueDepend)) {
			required(form, field, params, errorMessages, fieldName);
		}
	}
}

export function integerOnly(form, field, params, errorMessages, fieldName) {
	var value = form.getValue(field);

	if (params !== null && typeof params === "object" && params.hasOwnProperty("skipOnEmpty")) {
		if (value == null || value == undefined || value.trim().length === 0) {
			errorMessages.push(fieldName + " deve conter apenas números inteiros.");
			return;
		}
	}

	var regex = /[^0-9]/g;

	if (regex.test(value)) {
		errorMessages.push(fieldName + " deve conter apenas números inteiros.");
		return;
	}

	if (parseInt(value, 10) != value) {
		errorMessages.push(fieldName + " deve conter apenas números inteiros.");
		return;
	}

	if (params.hasOwnProperty("min") && parseInt(value) < parseInt(params.min)) {
		errorMessages.push(fieldName + " deve ser maior ou igual a " + params.min + ".");
	}

	if (params.hasOwnProperty("max") && parseInt(value) > parseInt(params.max)) {
		errorMessages.push(fieldName + " deve ser menor ou igual a " + params.max + ".");
	}
}

export function floatOnly(form, field, params, errorMessages, fieldName) {
	var value = form.getValue(field);
	var regex = /^[0-9]*\.?[0-9]+$/;

	if (!regex.test(value)) {
		errorMessages.push("O campo " + fieldName + " deve conter apenas números decimais.");
	}

	if (params.min && parseFloat(value) < params.min) {
		errorMessages.push("O campo " + fieldName + " deve ser maior ou igual a " + params.min + ".");
	}

	if (params.max && parseFloat(value) > params.max) {
		errorMessages.push("O campo " + fieldName + " deve ser menor ou igual a " + params.max + ".");
	}
}

export function date(form, field, params, errorMessages, fieldName) {
	var value = form.getValue(field);
	var dateRegex = new RegExp(
		params.format.replace("dd", "\\d{2}").replace("MM", "\\d{2}").replace("yyyy", "\\d{4}")
	);

	if (!dateRegex.test(value)) {
		errorMessages.push("O campo " + fieldName + " deve estar no formato " + params.format + ".");
	}

	var dateValue = new Date(value.split("/").reverse().join("-"));

	if (params.min && new Date(params.min.split("/").reverse().join("-")) > dateValue) {
		errorMessages.push("O campo " + fieldName + " deve ser posterior a " + params.min + ".");
	}

	if (params.max && new Date(params.max.split("/").reverse().join("-")) < dateValue) {
		errorMessages.push("O campo " + fieldName + " deve ser anterior a " + params.max + ".");
	}
}
