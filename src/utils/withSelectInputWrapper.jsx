const WithSelectInputWrapper = (Component) => {
  return function (props) {
    return <Component {...props} />;
  };
};

export default WithSelectInputWrapper;
