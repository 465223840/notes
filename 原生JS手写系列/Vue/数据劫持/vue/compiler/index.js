import {
  parseHTMLToAST
} from "./astParser"
import {
  generate
} from "./generate";

function compileToRenderFunction(html) {

  const ast = parseHTMLToAST(html),
    code = generate(ast);
  console.log(code)
}


export {
  compileToRenderFunction
}