import { useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes";
import { RootState } from "./app/store";
import { useSelector, useDispatch } from "react-redux";
import { checkCookie } from "./app/features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { userInfo, userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userInfo);
    if (!userToken) {
      dispatch(checkCookie());
      if (userToken) {
        navigate("/auth/login");
      }
    }
  }, [dispatch, userToken]);

  return useRoutes(routes);
}

export default App;
