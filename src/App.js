import { store, persistor } from "./store";
import Router from "./config/router";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <div className={'p-4 mt-20'}>
      <Router />
    </div>
    </PersistGate>
    </Provider>
  );
}

export default App;