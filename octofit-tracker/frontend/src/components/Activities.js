import ApiDataTableCard from './ApiDataTableCard';

function Activities() {
  const endpointHint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/';

  return (
    <ApiDataTableCard
      title="Activities"
      resourcePath="activities"
      primaryFields={['name', 'title']}
      endpointHint={endpointHint}
    />
  );
}

export default Activities;