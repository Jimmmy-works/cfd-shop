export const Validate = (rules, values) => {
  let errorObj = {};
  for (const errorKey in rules) {
    for (const rule of rules[errorKey]) {
      if (rule?.regex instanceof RegExp) {
        if (!rule.regex.test(values[errorKey])) {
          errorObj[errorKey] =
            rule.message || "Xin vui lòng nhập đúng định dạng";
          break;
        }
      }
      if (rule?.required) {
        if (!values[errorKey]?.trim?.()) {
          errorObj[errorKey] = rule.message || "Xin vui lòng điền thông tin";
          break;
        }
      }
    }
  }
  return errorObj;
};
