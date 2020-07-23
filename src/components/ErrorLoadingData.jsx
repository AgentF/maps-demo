/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

const DefaultErrorComponent = (error) => (
  <>
    <h1>Error:</h1>
    <p>{error}</p>
  </>
);

const DefaultLoadingComponent = () => (
  <>
    <h1>...Loading...</h1>
  </>
);

const ErrorLoadingData = ({
  error,
  loading,
  DataRender,
  ErrorRender,
  LoadingRender,
}) => {
  return (
    <>
      {error ? (
        <>{ErrorRender(error.message)}</>
      ) : loading ? (
        <>{LoadingRender()}</>
      ) : (
        <>{DataRender()}</>
      )}
    </>
  );
};

ErrorLoadingData.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string.isRequired }).isRequired,
  loading: PropTypes.bool.isRequired,
  DataRender: PropTypes.func.isRequired,
  ErrorRender: PropTypes.func,
  LoadingRender: PropTypes.func,
};

ErrorLoadingData.defaultProps = {
  ErrorRender: DefaultErrorComponent,
  LoadingRender: DefaultLoadingComponent,
};

export { ErrorLoadingData };
