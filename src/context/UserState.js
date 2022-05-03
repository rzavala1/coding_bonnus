import { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from "./UserReducer";

const UserState = (props) => {
  const initialState = {
    showIframe: false,
  }

  const [globalState, dispatch] = useReducer(UserReducer, initialState);

  const setShowIframe = async (state) => {
    try {
      dispatch({
        type: "READ_IFRAME",
        payload: state,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        showIframe: globalState.showIframe,
        setShowIframe
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export default UserState