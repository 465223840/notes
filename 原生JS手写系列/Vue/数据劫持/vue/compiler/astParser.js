{
  /* <div id="app" style="color:red;font-size: 20px;">
      hello {{name}}
      <h1>
        {{name}}
      </h1>
      <ul>
        <li style="color:green">{{age}}</li>
        <li>{{info.job}}</li>
      </ul>
    </div> */
}

// id='app' id="app" id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 标签名 <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// > />
const startTagClose = /^\s*(\/?)>/
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

function parseHTMLToAST(html) {
  let text, root, currentParent, stack = [];
  while (html) {
    let textEnd = html.indexOf('<');

    if (textEnd === 0) {
      const startTagMatch = parseStartTag();

      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      const endTagMatch = html.match(endTag);

      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text)
    }
  }

  function parseStartTag() {
    const start = html.match(startTagOpen);
    let end, attr;
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      //不是结束标签，但匹配到了属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        })
        advance(attr[0].length)
      }
      if (end) {
        advance(end[0].length)
        return match;
      }
    }
  }

  function advance(n) {
    html = html.substring(n);
  }

  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function end(tasName) {
    const element = stack.pop();
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.trim();
    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }
  return root
}


export {
  parseHTMLToAST
}