import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { generateAuthUser, isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';
import { AuthApi, postApi } from 'src/common/apis';
import { ELocalStorageKeys } from 'src/common/enums';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await postApi({ url: AuthApi.login, values: { email, password }, showToast: true });

    if (!res || !res.data) {
      return;
    }
    localStorage.setItem(ELocalStorageKeys.MFA_TOKEN, res.data.tokens.accessToken);

    // setTokenSession(res.data.tokens.accessToken);

    return res.data;
    dispatch({
      type: Types.Login,
      payload: {
        user: res.data.user,
      },
    });
  };

  const validateMfa = async (token: string, email: string) => {
    let accesstoken = localStorage.getItem(ELocalStorageKeys.MFA_TOKEN);

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;

    try {
      const { data } = await axios.post(
        `https://api-staging.bksmygold.com/admin${AuthApi.validate}`,
        {
          token,
          email,
        }
      );
      if (!data || !data.data) {
        return;
      }

      console.log(data.data);
      const user = generateAuthUser(data.data.user);
      console.log('log: suer', user);

      setSession(data.data.tokens.accessToken);

      dispatch({
        type: Types.Login,
        payload: {
          user,
        },
      });
    } catch (error) {
      return error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        validateMfa,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
