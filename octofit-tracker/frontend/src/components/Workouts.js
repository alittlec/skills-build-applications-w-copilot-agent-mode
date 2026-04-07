import ApiDataTableCard from './ApiDataTableCard';

function Workouts() {
  const endpointHint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/';

  return (
    <ApiDataTableCard
      title="Workouts"
      resourcePath="workouts"
      primaryFields={['name', 'title']}
      endpointHint={endpointHint}
    />
  );
}

export default Workouts;