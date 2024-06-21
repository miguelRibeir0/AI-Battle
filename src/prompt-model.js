const prompt = [
  'Create me a JCL COBOL CODE THAT FOLLOWS THESE INSTRUCTIONS : Prompt 1 [JCL] - UNLOAD à tabela TAB01_TABELA01, com o critério TIPO igual a ‘Contrato’ e MONTANTE superior a 100.000 e data posterior a ‘2024-01-01’, para obter os campos CATEGORIA1, CATEGORIA2, CATEGORIA3, CATEGORIA4, CATEGORIA5, com o nome TBLL.S.TBLLD001.TAB01;',
  'Why is the sky blue?',
  'What is the meaning of life?',
];
const model = [
  'llama3-8b-8192',
  'mixtral-8x7b-32768',
  'gemma-7b-it',
  'llama3-70b-8192',
];
const system =
  'You are an expert in JCL and COBOL programming. Generate high-quality JCL COBOL code based on the following requirements and best practices:\n\n- Ensure the JCL includes necessary job statements, appropriate DD statements, and necessary control statements.\n- The COBOL code should be well-structured, following best practices for readability and maintenance.\n- Include proper error handling and relevant comments for clarity.\n- Optimize the code for performance and resource management.\n- Follow industry standards and guidelines for both JCL and COBOL programming.\n\nOutput only the complete, formatted JCL and COBOL code, ready for execution.';

export { prompt, model, system };
