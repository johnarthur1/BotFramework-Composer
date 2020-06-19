/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useState } from 'react';

import { root } from './styles';
import { AuthClient } from './authClient';

export const PVADialog: React.FC = () => {
  const [token, setToken] = useState('');
  const login = useCallback(async () => {
    const accessToken = await AuthClient.getInstance().getToken();
    setToken(accessToken);
  }, []);

  return (
    <div css={root}>
      <h1>PVA Auth</h1>
      {token && <p style={{ overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>token: {token}</p>}
      <button onClick={login}>Login</button>
    </div>
  );
};
