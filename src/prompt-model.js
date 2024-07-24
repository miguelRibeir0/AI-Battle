const prompt = [
  `
UNLOAD de dados da tabela TAB01_TABELA01 para obter os campos CATEGORIA1, CATEGORIA2, CATEGORIA3, CATEGORIA4, CATEGORIA5 para o ficheiro de output TBLL.S.TBLLD001.TAB01. 
No acesso à tabela devem ser considerados os seguintes critérios: 
- Campo TIPO = 'Contrato'
- Campo MONTANTE > 100000
- Campo DATA > '2024-01-01'
`,

  'SORT do ficheiro TBLL.S.TBLLD002.DADOS para exclusão dos registos com APLICACAO (posição 6) igual a "DC" e "EM" e REGISTO (posição 20) igual a "F", gerando o ficheiro TBLL.S.TBLLD002.SORT01',

  'ICETOOL para obtenção de dois ficheiros de output, utilizando como input o ficheiro TBLL.S.TBLLD003.INPUT, obedecendo às seguintes condições:\n' +
    'TBLL.S.TBLLD003.FICH01 - Ficheiro resultante do somatório do campo MONTANTE, na posição 22 durante 15, por PARCEIRO, posição 1 durante 14, e CLIENTE, na posição 15 durante 7.\n' +
    'TBLL.S.TBLLD003.FICH02 - Ficheiro resultante do somatório do campo MONTANTE, na posição 22 durante 15, por PARCEIRO, posição 1 durante 14, e CONTRATO, na posição 50 durante 8.\n',

  `Se ficheiro TBLL.S.TBLLD004.INPUT tiver conteúdo, executa o programa TBR00010. Este programa terá como input os seguintes ficheiros:
    INPUT - TBLL.S.TBLLD004.INPUT
    DATA - TBLL.S.TBLLD004.DATA
    CONTRAT - TBLL.S.TBLLD004.CONTRAT
    E de output os seguintes ficheiros:

  OUTPUT - TBLL.S.TBLLD004.OUTPUT
  ERRO - TBLL.S.TBLLD004.ERRO
`,

  'Criar programa que efetue cálculo de operações matemáticas simples (adição, subtração, multiplicação, divisão) de dois valores, em que o operador e os valores são recebidos por SYSIN, apresentando o resultado da operação via display.',
];

const model = [
  'mixtral-8x7b-32768',
  'llama3-8b-8192',
  'gemma-7b-it',
  'llama3-70b-8192',
  'gemma2-9b-it',
];
const system = [
  `You are an expert in JCL programming. Generate high-quality JCL code based on the following requirements: Ensure that every line generated has a maximum lenght of 72.
Ensure that in EMPTY instructions the file name does not have quotes or apostrophes.
Check in a IF statement the return code of the step where the empty instruction was used on the file.
Ensure that the step name does not exceed 8 characters in length.
Use the generated step name in the comment section.
In JCL, for SORT and ICETOOL instructions, request the field positions, instead of using the field name. 
In JCL, the comment section is placed before the step.
Ensure that the comment lines are exactly 72 characters long. This includes the comment indicators (//*), the space after the indicators, the comment text, and any additional spaces needed to reach the 72-character limit.
Follow  this Example of unload step:
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
  'You are an expert in JCL programming. Generate high-quality JCL code based on the following requirements: Ensure that every line generated has a maximum length of 72. Ensure that in EMPTY instructions the file name does not have quotes or apostrophes. Check in an IF statement the return code of the step where the empty instruction was used on the file. Ensure that the step name does not exceed 8 characters in length. Use the generated step name in the comment section. In JCL, for SORT and ICETOOL instructions, request the field positions, instead of using the field name. In JCL, the comment section is placed before the step. Ensure that the comment lines are exactly 72 characters long. This includes the comment indicators (//*), the space after the indicators, the comment text, and any additional spaces needed to reach the 72-character limit.',

  'Please write everything in english, You are a seasoned expert in COBOL programming, specializing in the development of robust batch processing applications. Your task is to write clean, efficient, and well-documented code that adheres to industry best practices. Ensure the code includes comprehensive comments for clarity, effectively handles potential edge cases, and is optimized for performance and maintainability. Please keep explanations and notes to a minimum, focusing on delivering high-quality COBOL code that meets the specified requirements.',
];

export { prompt, model, system };
