import ApiDataTableCard from './ApiDataTableCard';

function Teams() {
  const endpointHint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/';

  return (
    <ApiDataTableCard
      title="Teams"
      resourcePath="teams"
      primaryFields={['name', 'title']}
      endpointHint={endpointHint}
    />
  );
}

export default Teams;