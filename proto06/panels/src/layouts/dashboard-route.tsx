import { Fragment } from 'react';
import { ChooseDashboard } from '../pages';
// import JSXRouteWrapper from '@/routes';
import { compiledRoutes} from '@/routes/compiled_routes';
import { Route, Navigate } from 'react-router-dom';


/**
 * 
 * @access a useContext hook, it is imperative to wrap these inside a JSX Wrapper
 */
function UseDashboardRoute() {
 /**
  * @author <https://github.com/Mattttyyyy>
  * @returns 
  * Sub-Elements of the First-Layer Child of Routes as Route automatically;
  * @description
  * Follow the declaration pattern of the routes in the JSXRouteWrapper
  * @example
  * <Routes>
  *  {FirstInnerRoutePath}
  * </Routes>  
  */

  //  uncomment if needed 
  // const FirstInnerRoutePath = JSXRouteWrapper().routes.map((object)=> object.layout !== "auth" && object.pages.map((value)=> value.hasSubItems && value.subItems?.map((innerValue)=> {
  //   return (
  //     <Route path={innerValue.path} element={ innerValue.element }></Route>
  //   )
  // })));

  const routes = compiledRoutes();
  
  const FirstInnerRoutePath = routes.map((object)=> object.layout !== "auth" && object.pages.map((value)=> value.hasSubItems && value.subItems?.map((innerValue)=> {
    return (
      <Route path={innerValue.path} element={ innerValue.element }></Route>
    )
  })));

  /**
   * @author <https://github.com/Mattttyyyy>
   * @returns 
   * Sub-Elements of the Second-Layer Child of Routes as Route Automatically;
   * @description
   * Follow the declaration pattern of the routes in the JSXRouteWrapper
   * @example
   * <Routes>
   *  {FirstInnerRoutePath}
   *  {SecondInnerRoutePath}
   * </Routes>  
   */
  const SecondInnerRoutePath = routes.map((object)=> object.layout !== "auth" && object.pages.map((value)=> value.hasSubItems && value.subItems?.map((innerValue)=> innerValue.hasSubItems && innerValue.subItems?.map((innerGrandValue)=> {
    return (
      <Route path={innerGrandValue.path} element={innerGrandValue.element}></Route>
    )
  }))));
  
  /**
   * @author <https://github.com/Mattttyyyy>
   * @returns 
   * Sub-Elements of the Third-Layer Child of Routes as Route Automatically;
   * @description
   * Follow the declaration pattern of the routes in the JSXRouteWrapper
   * @example
   * <Routes>
   *  {FirstInnerRoutePath}
   *  {SecondInnerRoutePath}
   *  {ThirdInnerRoutePath}
   * </Routes>  
   */
  const ThirdInnerRoutePath = routes.map((object)=> object.layout !== "auth" && object.pages.map((value)=> value.hasSubItems && value.subItems?.map((innerValue)=> innerValue.hasSubItems && innerValue.subItems?.map((innerGrandValue)=> innerGrandValue.hasSubItems && innerGrandValue.subItems?.map((innerGrandValue2) => {
    return (
      <Route path={innerGrandValue2.path} element={innerGrandValue2.element}></Route>
    )
  })))));
  
  /**
   * @author <https://github.com/Mattttyyyy>
   * @returns 
   * A Route Pack Elements that re-navigates user to "/" when entered an undeclared route 
   * @description
   * Follow the declaration pattern of the routes in the JSXRouteWrapper
   * @example
   * <Routes>
   *  {FirstInnerRoutePath}
   *  {SecondInnerRoutePath}
   *  {ThirdInnerRoutePath}
   *  {UndeclaredRouteReplace}
   * </Routes>  
   */
  const UndeclaredRouteReplace = <Fragment> <Route path="/" element={<ChooseDashboard/>} /> <Route path="*" element={<Navigate to="/" replace />}/> </Fragment>;
  


    return {
        FirstInnerRoutePath,
        SecondInnerRoutePath,
        ThirdInnerRoutePath,
        UndeclaredRouteReplace
    };
}

export default UseDashboardRoute;