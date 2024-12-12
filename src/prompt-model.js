const prompt = [
	`
<br>UNLOAD de dados da tabela TAB01_TABELA01 para obter os campos CATEGORIA1, CATEGORIA2, CATEGORIA3, CATEGORIA4, CATEGORIA5 para o ficheiro de output TBLL.S.TBLLD001.TAB01. 
No acesso à tabela devem ser considerados os seguintes critérios: 
- Campo TIPO = 'Contrato'
- Campo MONTANTE > 100000
- Campo DATA > '2024-01-01'
`,

	'<br> SORT do ficheiro TBLL.S.TBLLD002.DADOS para exclusão dos registos com APLICACAO (posição 6) igual a "DC" e "EM" e REGISTO (posição 20) igual a "F", gerando o ficheiro TBLL.S.TBLLD002.SORT01 and request the field positions, instead of using the field name.',

	"<br>ICETOOL para obtenção de dois ficheiros de output, utilizando como input o ficheiro TBLL.S.TBLLD003.INPUT, obedecendo às seguintes condições:" +
		"<br>" +
		"<br>- TBLL.S.TBLLD003.FICH01 - Ficheiro resultante do somatório do campo numérico MONTANTE (15 bytes de tamanho, começando na posição 22), por PARCEIRO (14 bytes de tamanho, começando no byte 1), e por CLIENTE (7 bytes de tamanho, começando no byte 15).<br>" +
		"<br>- TBLL.S.TBLLD003.FICH02 - Ficheiro resultante do somatório do campo numérico MONTANTE (15 bytes de tamanho, começando na posição 22), por PARCEIRO (14 bytes de tamanho, começando no byte 1), e CONTRATO (8 bytes de tamanho, começando no byte 50).<br>",

	`<br>Se ficheiro TBLL.S.TBLLD004.INPUT tiver conteúdo, executa o programa TBR00010. Este programa terá como input os seguintes ficheiros:
  
    - INPUT - TBLL.S.TBLLD004.INPUT
    - DATA - TBLL.S.TBLLD004.DATA
    - CONTRAT - TBLL.S.TBLLD004.CONTRAT
  
    E de output os seguintes ficheiros:
   
  - OUTPUT - TBLL.S.TBLLD004.OUTPUT
  - ERRO - TBLL.S.TBLLD004.ERRO
`,

	"<br>Criar programa COBOL que efetue cálculo de operações matemáticas simples (adição, subtração, multiplicação, divisão) de dois valores, em que o operador e os valores são recebidos por SYSIN, apresentando o resultado da operação via display.",
];

const system = [
	`<br>You are an expert in JCL programming. Generate high-quality JCL code based on the following requirements: 
  
- Ensure that every line generated has a maximum lenght of 72.
- Ensure that in EMPTY instructions the file name does not have quotes or apostrophes.
- Check in a IF statement the return code of the step where the empty instruction was used on the file.
- Ensure that the step name does not exceed 8 characters in length.
- Use the generated step name in the comment section. 
- In JCL, the comment section is placed before the step.
- Ensure that the comment lines are exactly 72 characters long. This includes the comment indicators (//*), the space after the indicators, the comment text, and any additional spaces needed to reach the 72-character limit.
<br>
Follow  this Example of unload step: 
<br>
//[STEP NAME] EXEC [UNLOAD PROCEDURE]
//SYSOUT  DD DSN=[DATASET NAME],
//        DISP=(NEW,CATLG,DELETE),
//        DCB=(RECFM=FB,LRECL=0),
//        SPACE=([SPACE DATA])
//SYSIN    DD *
    [UNLOAD INSTRUCTION]
/*

Example of comment section:
//**
//* [STEP NAME] -                                                      *
//**`,
	`<br>You are an expert in JCL programming. Generate high-quality JCL code based on the following requirements: 
  
- Ensure that every line generated has a maximum lenght of 72.
- Ensure that in EMPTY instructions the file name does not have quotes or apostrophes.
- Check in a IF statement the return code of the step where the empty instruction was used on the file.
- Ensure that the step name does not exceed 8 characters in length.
- Use the generated step name in the comment section. 
- In JCL, the comment section is placed before the step.
- Ensure that the comment lines are exactly 72 characters long. This includes the comment indicators (//*), the space after the indicators, the comment text, and any additional spaces needed to reach the 72-character limit.
<br>
`,

	"<br>You are a seasoned expert in COBOL programming, specializing in the development of robust batch processing applications. Your task is to write clean, efficient, and well-documented code that adheres to industry best practices. Ensure the code includes comprehensive comments for clarity, effectively handles potential edge cases, and is optimized for performance and maintainability. Please keep explanations and notes to a minimum, focusing on delivering high-quality COBOL code that meets the specified requirements.",
];

// Model Change is done here
const model = [
	"mixtral-8x7b-32768",
	"llama3-8b-8192",
	"llama3-70b-8192",
	"llama-guard-3-8b",
	"gemma2-9b-it",
];

export { prompt, model, system };
