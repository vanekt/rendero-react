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
      fragment: ({ key }, { renderChildren }) => (
        <Fragment key={key}>{renderChildren()}</Fragment>
      ),
      div: ({ key, ...props }, { renderChildren }) => (
        <div key={key} {...props}>
          {renderChildren()}
        </div>
      ),
      span: ({ key, ...props }, { renderChildren }) => (
        <span key={key} {...props}>
          {renderChildren()}
        </span>
      ),
      ul: ({ key, ...props }, { renderChildren }) => (
        <ul key={key} {...props}>
          {renderChildren()}
        </ul>
      ),
      ol: ({ key, ...props }, { renderChildren }) => (
        <ol key={key} {...props}>
          {renderChildren()}
        </ol>
      ),
      li: ({ key, ...props }, { renderChildren }) => (
        <li key={key} {...props}>
          {renderChildren()}
        </li>
      ),
      if: ({ key, ...props }, { renderChildren }) => (
        <IF key={key} {...props}>
          {renderChildren()}
        </IF>
      ),
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
      react_use_state: ({ key, ...props }, { renderChildren }) => {
        return (
          <ReactUseState key={key} {...props} renderChildren={renderChildren} />
        );
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
