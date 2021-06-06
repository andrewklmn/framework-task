import { createContext, useContext } from './framework';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const ArticlesContext = createContext([]);
export const useArticlesContext = () => useContext(ArticlesContext);

export const SettersContext = createContext({});
export const useSettersContext = () => useContext(SettersContext);
