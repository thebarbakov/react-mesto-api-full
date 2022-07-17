// В react-router-dom v6 нет компонента withRouter
// Для того, чтобы получить доступ к объектам роутера в классовых компонентах 
// пришлось создать вот такой компонент

import { useLocation, useNavigate, useParams } from "react-router-dom";
  
  function WithRouter(Component) {
        function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
            {...props}
            router={{ location, navigate, params }}
            />
        );
        }
  
    return ComponentWithRouterProp
    }

export default WithRouter