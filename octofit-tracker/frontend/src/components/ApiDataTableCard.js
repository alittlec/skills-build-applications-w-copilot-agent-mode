import { useCallback, useEffect, useMemo, useState } from 'react';

function resolveApiBaseUrl() {
  const explicitBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
  if (explicitBaseUrl) {
    return explicitBaseUrl.replace(/\/+$/, '');
  }

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    const codespaceHostMatch = hostname.match(/^(.*)-3000\.app\.github\.dev$/);

    if (codespaceHostMatch?.[1]) {
      return `https://${codespaceHostMatch[1]}-8000.app.github.dev`;
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }

  return 'http://localhost:8000';
}

function ApiDataTableCard({ title, resourcePath, primaryFields, endpointHint }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = resolveApiBaseUrl();
  const endpoint = `${baseUrl}/api/${resourcePath.replace(/^\/+|\/+$/g, '')}/`;

  const getPrimaryText = useCallback((item) => {
    for (const field of primaryFields) {
      if (item?.[field]) {
        return String(item[field]);
      }
    }
    return 'N/A';
  }, [primaryFields]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    console.log(`${title} endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(`${title} fetched data:`, data);

      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : [];

      setItems(normalized);
    } catch (fetchError) {
      setError(fetchError.message || 'Unknown error');
      console.error(`${title} fetch error:`, fetchError);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      const idText = String(item?.id || item?._id || '').toLowerCase();
      const primaryText = getPrimaryText(item).toLowerCase();
      const summaryText = JSON.stringify(item).toLowerCase();

      return (
        idText.includes(normalizedQuery) ||
        primaryText.includes(normalizedQuery) ||
        summaryText.includes(normalizedQuery)
      );
    });
  }, [getPrimaryText, items, query]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <h2 className="h4 text-primary mb-0">{title}</h2>
          <a className="link-primary fw-semibold" href={endpoint} target="_blank" rel="noreferrer">
            Open REST Endpoint
          </a>
        </div>

        <div className="mb-3">
          <span className="badge text-bg-info">Active API Endpoint</span>
          <code className="ms-2 text-break">{endpoint}</code>
          {endpointHint && (
            <>
              <span className="badge text-bg-secondary ms-2">Codespace Pattern</span>
              <code className="ms-2 text-break">{endpointHint}</code>
            </>
          )}
        </div>

        <form
          className="row g-2 align-items-center mb-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="col-md-8">
            <input
              className="form-control"
              type="search"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-secondary" type="button" onClick={() => setQuery('')}>
              Clear
            </button>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" type="button" onClick={fetchData}>
              Refresh
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger py-2">Failed to load data: {error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle octofit-table">
            <thead className="table-primary">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Summary</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && filteredItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No data available
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    Loading data...
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || index}>
                    <td>{item.id || item._id || '-'}</td>
                    <td className="fw-semibold">{getPrimaryText(item)}</td>
                    <td className="text-truncate octofit-summary-cell">{JSON.stringify(item)}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(item)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 bg-light p-3 rounded border">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default ApiDataTableCard;