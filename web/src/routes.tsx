import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Logon } from './pages/Logon';
import { Register } from './pages/Register';
import { Landing } from './pages/Landing';
import { CreateIncident } from './pages/CreateIncident';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/app" component={Landing} />
        <Route path="/incidents/new" component={CreateIncident} />
      </Switch>
    </BrowserRouter>
  );
}