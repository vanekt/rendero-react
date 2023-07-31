import React, { Fragment, useState } from "react";
import { IF } from "./components/IF";

function ReactUseState({ getter, setter, initialValue, renderChildren }) {
  const [getterValue, setterValue] = useState(initialValue);

  return renderChildren({
    [getter]: getterValue,
    [setter]: setterValue,
  });
}

function initModule() {
  return {
    name: "react",
    components: {
      null: () => null,
      text_node: ({ value }) => value,
      fragment: (props, { renderChildren }) => (
        <Fragment {...props}>{renderChildren()}</Fragment>
      ),
      div: (props, { renderChildren }) => (
        <div {...props}>{renderChildren()}</div>
      ),
      span: (props, { renderChildren }) => (
        <span {...props}>{renderChildren()}</span>
      ),
      ul: (props, { renderChildren }) => <ul {...props}>{renderChildren()}</ul>,
      ol: (props, { renderChildren }) => <ol {...props}>{renderChildren()}</ol>,
      li: (props, { renderChildren }) => <li {...props}>{renderChildren()}</li>,
      if: (props, { renderChildren }) => <IF {...props}>{renderChildren()}</IF>,
      switch: ({ cases, value, _default }, { render, renderChildren }) => {
        const children = renderChildren();
        const index = cases.findIndex((i) => i === value);
        if (index === -1) {
          return render(
            _default || {
              type: "null",
            }
          );
        }
        return children[index];
      },
      init_var: ({ name, value }, { renderChildren }) =>
        renderChildren({
          [name]: value,
        }),
      react_use_state: (props, { renderChildren }) => {
        return <ReactUseState {...props} renderChildren={renderChildren} />;
      },
      forward_props: ({ getter, ...props }, { children, renderChildren }) =>
        renderChildren(children, {
          [getter]: props,
        }),
      array_map: (
        { template, items },
        { render, replacePlaceholders, vars }
      ) => {
        return replacePlaceholders(items, vars).map((item, idx) =>
          render(
            {
              ...template,
              key: idx,
            },
            {
              idx,
              item,
            }
          )
        );
      },
      react_html: ({ value, style }) => (
        <div style={style} dangerouslySetInnerHTML={{ __html: value }} />
      ),
    },
  };
}

export default initModule;
