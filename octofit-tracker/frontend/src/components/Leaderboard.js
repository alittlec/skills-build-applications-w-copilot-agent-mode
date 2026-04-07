import ApiDataTableCard from './ApiDataTableCard';

function Leaderboard() {
  return <ApiDataTableCard title="Leaderboard" resourcePath="leaderboards" primaryFields={['name', 'title']} />;
}

export default Leaderboard;