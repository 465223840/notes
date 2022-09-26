function generate(el) {

  let children = getChildren(el);

  let code = `
    _c(${el.tag}),
    ${
      el.attrs.length > 0 ? `${formatProps(el.attrs)}`:'undefined'
    },
    ${
      children ? `, ${children}` : ''
    }
  `
  return code
}

function formatProps(attrs) {
  let attrStr = '';
  for (const key in attrs) {
    let attr = attrs[key];
    if (attr.name === 'style') {
      let styleAttrs = {};
      attr.value.split(';').map(styleAttr => {
        let [key, value] = styleAttr.split(':');
        styleAttrs[key] = value;
      })
      attr.value = styleAttrs;
    }
    attrStr += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${attrStr.slice(0,-1)}}`;
}

function getChildren(el) {
  const children = el.children;
  if (children) {
    return children.map(c => {
      generateChild(c)
    }).join(',');
  }
  return children;
}

function generateChild(node) {
  
}
export {
  generate
}