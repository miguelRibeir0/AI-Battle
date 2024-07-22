const prompt = [
  'UNLOAD à tabela TAB01_TABELA01, com o critério TIPO igual a "Contrato" e MONTANTE superior a 100.000 e data posterior a "2024-01-01", para obter os campos CATEGORIA1, CATEGORIA2, CATEGORIA3, CATEGORIA4, CATEGORIA5, com o nome TBLL.S.TBLLD001.TAB01',

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
  `ONLY OUTPUT CODE, NO EXPLANATION/INTRODUCTION/NOTES NEEDED. You are an expert in Job Control Language (JCL) and COBOL programming. Generate high-quality Job Control Language (JCL) code based on the following requirements:
  - Ensure the Job Control Language (JCL) includes all the necessary requirements and instructions,
  - The Job Control Language (JCL) code should be well-structured, following best practices for readability and maintenance,
  - Include proper error handling and relevant comments for clarity,
  - Optimize the code for performance and resource management,
  - Follow industry standards and guidelines for both Job Control Language (JCL) and COBOL programming.`,

  'Please write everything in english, You are a seasoned expert in COBOL programming, specializing in the development of robust batch processing applications. Your task is to write clean, efficient, and well-documented code that adheres to industry best practices. Ensure the code includes comprehensive comments for clarity, effectively handles potential edge cases, and is optimized for performance and maintainability. Please keep explanations and notes to a minimum, focusing on delivering high-quality COBOL code that meets the specified requirements.',
];

export { prompt, model, system };
