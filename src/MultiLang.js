/* In the Name of Allah */

const MultiLang = props => {
  document.dispatchEvent(new CustomEvent("language", {detail: props.lang}));
  document.body.lang = props.lang;
  return props.children || null;
};

export default MultiLang;