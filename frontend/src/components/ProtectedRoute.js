// В react-router-dom v6 дочерними элементами Routes может быть только Route или React.Fragment
// Пытался сделать так, как было в тренажере с небольшими ухищрениями, нов высегда была ошибка
// Uncaught Error: [ProtectedRoute] is not a <Route> component. All component children of 
// <Routes> must be a <Route> or <React.Fragment>

//Поэтому пришлось реализовать функционал этого компонента прямо в App