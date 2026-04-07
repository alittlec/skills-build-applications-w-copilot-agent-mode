import ApiDataTableCard from './ApiDataTableCard';

function Users() {
  const endpointHint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/';

  return (
    <ApiDataTableCard
      title="Users"
      resourcePath="users"
      primaryFields={['name', 'username', 'title']}
      endpointHint={endpointHint}
    />
  );
}

export default Users;