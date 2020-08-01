export async function client(
    endpoint: RequestInfo,
    { body, ...customConfig }: RequestInit = {}): Promise<Response> {
  const headers = { 'Content-Type': 'application/json' };

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data: Promise<Response> | null = null;
  try {
    const response: Response = await window.fetch(endpoint, config)
    data = await response.json();
    if (response.ok && data !== null) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = (endpoint: RequestInfo, customConfig = {}) => {
  return client(endpoint, {
    ...customConfig,
    method: 'GET'
  });
};

client.post = (endpoint: RequestInfo,
               body: BodyInit | null,customConfig: RequestInit = {}) => {
  return client(endpoint, {
    ...customConfig,
    body
  });
};
