const WithNumberInputWrapper = (Component) => {
  return function (props) {
    return <Component {...props} />;
  };
};

export default WithNumberInputWrapper;
