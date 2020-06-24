/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { 
  Switch, 
  Route, 
  withRouter 
} from 'react-router-dom';

import s from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard'
import Buttons from '../../pages/buttons'
import Charts from '../../pages/charts'
import Maps from '../../pages/google'
import NotFound from '../../pages/notFound'
import Icons from '../../pages/icons'
import Typography from '../../pages/typography'
import Tables from '../../pages/tables'
import Notifications from '../../pages/notifications'
import Posts from '../../pages/posts'
import Profile from '../../pages/profile'
import Privacy from '../../pages/privacy'
import Topbar from '../Topbar/Topbar';
import SellerInfo from '../../pages/seller-info/SellerInfo';
import ImportProducts from '../../pages/products/import-products/ImportProducts';
import ManageProducts from '../../pages/products/manage-products/ManageProducts';
import ManageLivestream from '../../pages/products/manage-livestream/ManageLivestream';
import Orders from '../../pages/order-management/orders/Orders';
import Invoices from '../../pages/order-management/invoices/Invoices';
import Shipments from '../../pages/shipment-management/shipments/Shipments';
import ConfirmCsvProducts from '../../pages/products/import-products/confirm-csv-products/ConfirmCsvProducts';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Topbar />
        <Sidebar />
        <div
          className={cx(s.wrap, {[s.sidebarOpen]: this.state.sidebarOpen})}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path="/app/main" exact component={Dashboard} />
              <Route path="/app/typography" exact component={Typography} />
              <Route path="/app/tables" exact component={Tables} />
              <Route path="/app/posts" component={Posts} />
              <Route path="/app/privacy" exact component={Privacy} />
              <Route path="/app/profile" exact component={Profile} />
              <Route path="/app/notifications" exact component={Notifications} /> 
              <Route path="/app/components/buttons" exact component={Buttons} />
              <Route path="/app/components/charts" exact component={Charts} />
              <Route path="/app/components/icons" exact component={Icons} />
              <Route path="/app/components/maps" exact component={Maps} />

              {/* Seller Profile */}
              <Route path="/app/seller-info" exact component={SellerInfo} />

              {/* Products */}
              <Route path="/app/products/import-products" exact component={ImportProducts} />
              <Route path="/app/products/import-products/confirm-csv-products" exact component={ConfirmCsvProducts} />
              <Route path="/app/products/manage-products" exact component={ManageProducts} />
              <Route path="/app/products/manage-livestream" exact component={ManageLivestream} />

              {/* Order Management */}
              <Route path="/app/order-management/orders" exact component={Orders} />
              <Route path="/app/order-management/invoices" exact component={Invoices} />

              {/* Shipment Management */}
              <Route path="/app/shipment-management/shipments" exact component={Shipments} />

              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
