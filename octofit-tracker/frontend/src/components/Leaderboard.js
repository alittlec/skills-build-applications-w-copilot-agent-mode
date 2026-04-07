import ApiDataTableCard from './ApiDataTableCard';

function Leaderboard() {
  const endpointHint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/';

  return (
    <ApiDataTableCard
      title="Leaderboard"
      resourcePath="leaderboards"
      primaryFields={['name', 'title']}
      endpointHint={endpointHint}
    />
  );
}

export default Leaderboard;