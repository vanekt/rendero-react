export function IF({ children, conditions }) {
  return checkConditions(conditions) ? children[0] : children[1];
}

const OPERATIONS = {
  LT: "lt",
  LE: "le",
  EQ: "eq",
  NE: "ne",
  GT: "gt",
  GE: "ge",
  NOT_EMPTY: "not-empty",
  INCLUDES: "includes",
};

function checkConditions(conditions) {
  return conditions
    .map((condition) => {
      switch (condition.type) {
        case "number":
          return checkNumberCondition(condition.props);
        case "string":
          return checkStringCondition(condition.props);
        case "array":
          return checkArrayCondition(condition.props);

        default:
          throw new Error(`Wrong condition type: ${condition.type}`);
      }
    })
    .every((result) => result === true);
}

function checkNumberCondition({ operation, value1, value2 }) {
  switch (operation) {
    case OPERATIONS.LT:
      return value1 < value2;
    case OPERATIONS.LE:
      return value1 <= value2;
    case OPERATIONS.EQ:
      return value1 === value2;
    case OPERATIONS.NE:
      return value1 !== value2;
    case OPERATIONS.GT:
      return value1 > value2;
    case OPERATIONS.GE:
      return value1 >= value2;
    default:
      throw new Error(`Wrong operation type: ${operation}`);
  }
}

function checkStringCondition({ operation, value1, value2 }) {
  switch (operation) {
    case OPERATIONS.NOT_EMPTY:
      return !!value1;
    case OPERATIONS.EQ:
      return value1 === value2;
    default:
      throw new Error(`Wrong operation type: ${operation}`);
  }
}

function checkArrayCondition({ operation, value1, value2 }) {
  switch (operation) {
    case OPERATIONS.INCLUDES:
      return value1.includes(value2);
    default:
      throw new Error(`Wrong operation type: ${operation}`);
  }
}
