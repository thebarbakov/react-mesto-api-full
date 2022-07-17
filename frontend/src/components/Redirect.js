// В react-router-dom v6 нет компонента Redirect
// Для того, чтобы Route "/"  в app отрабатывал нормально пришлось создать вот такой компонент

import React from "react";
import { useNavigate } from "react-router-dom";

export function Redirect(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    navigation(props.to);
  });

  return <></>;
}
