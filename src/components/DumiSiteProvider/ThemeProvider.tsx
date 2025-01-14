import { CustomTokenParams, StyleProvider, ThemeProvider as Provider } from 'antd-style';
import { ReactNode, useCallback } from 'react';

import { useThemeStore } from '../../store/useThemeStore';
import { createCustomToken, getAntdTheme, getCustomStylish } from '../../styles';
import { SiteConfigToken } from '../../types';

export interface ThemeProviderProps {
  token?: Partial<SiteConfigToken>;
  children?: ReactNode;
}

export const ThemeProvider = ({ children, token }: ThemeProviderProps) => {
  const themeMode = useThemeStore((s) => s.themeMode);

  const getCustomToken = useCallback(
    (params: CustomTokenParams) => {
      const base = createCustomToken(params);

      if (token) {
        return { ...base, ...token };
      } else {
        return base;
      }
    },
    [token],
  );

  return (
    <StyleProvider speedy={process.env.NODE_ENV === 'production'} prefix={'site'}>
      <Provider
        prefixCls={'site'}
        themeMode={themeMode}
        theme={getAntdTheme}
        customStylish={getCustomStylish}
        customToken={getCustomToken}
      >
        {children}
      </Provider>
    </StyleProvider>
  );
};
