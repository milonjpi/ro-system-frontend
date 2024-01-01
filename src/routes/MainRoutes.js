import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthenticationRoutes from './AuthenticationRoutes';
// import Expenses from 'views/pages/Expenses';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// pages routing

// customer management
const CustomerGroups = Loadable(
  lazy(() => import('views/pages/CustomerManagement/CustomerGroups'))
);
const AllCustomers = Loadable(
  lazy(() => import('views/pages/CustomerManagement/AllCustomers'))
);

// sales management
const Products = Loadable(
  lazy(() => import('views/pages/SalesManagement/Products'))
);
const SalesOrder = Loadable(
  lazy(() => import('views/pages/SalesManagement/SalesOrder'))
);
const Invoices = Loadable(
  lazy(() => import('views/pages/SalesManagement/Invoices'))
);
const CustomInvoices = Loadable(
  lazy(() => import('views/pages/SalesManagement/CustomInvoices'))
);

// financial
const AccountTypes = Loadable(
  lazy(() => import('views/pages/Financial/AccountTypes'))
);
const AccountHeads = Loadable(
  lazy(() => import('views/pages/Financial/AccountHeads'))
);
const PaymentMethods = Loadable(
  lazy(() => import('views/pages/Financial/PaymentMethods'))
);

const ReceivePayment = Loadable(
  lazy(() => import('views/pages/Financial/ReceivePayment'))
);

const MakePayment = Loadable(
  lazy(() => import('views/pages/Financial/MakePayment'))
);

// store management
const UnitOfMeasurement = Loadable(
  lazy(() => import('views/pages/StoreManagement/UnitOfMeasurement'))
);
const ItemsName = Loadable(
  lazy(() => import('views/pages/StoreManagement/ItemsName'))
);
const Vendors = Loadable(
  lazy(() => import('views/pages/StoreManagement/Vendors'))
);
const PurchaseBill = Loadable(
  lazy(() => import('views/pages/StoreManagement/PurchaseBill'))
);
const ItemsIn = Loadable(
  lazy(() => import('views/pages/StoreManagement/ItemsIn'))
);

// expense management
const ExpenseHeads = Loadable(
  lazy(() => import('views/pages/ExpenseManagement/ExpenseHeads'))
);

// report
const DueReport = Loadable(lazy(() => import('views/pages/Report/DueReport')));
const AdvanceReport = Loadable(
  lazy(() => import('views/pages/Report/AdvanceReport'))
);

// utilities routing

// setting routing
const ManageUser = Loadable(lazy(() => import('views/setting/ManageUser')));
const SingleUser = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser'))
);
const UserInfo = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserInfo'))
);
const UserPermission = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserPermission'))
);

// support routing
const Support = Loadable(lazy(() => import('views/support')));

// Support error routing
const Error404 = Loadable(lazy(() => import('views/Error404')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="dashboard" replace={true} />,
        },
        {
          path: 'dashboard',
          element: <Navigate to="default" replace={true} />,
        },
        {
          path: 'dashboard/default',
          element: <DashboardDefault />,
        },
        {
          path: 'pages',
          children: [
            {
              path: 'client-management',
              children: [
                {
                  path: 'client-groups',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['client-groups']}
                    >
                      <CustomerGroups />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-clients',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['all-clients']}
                    >
                      <AllCustomers />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'sales-management',
              children: [
                {
                  path: 'products',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['products']}
                    >
                      <Products />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'sales-orders',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['sales-orders']}
                    >
                      <SalesOrder />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'invoices',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['invoices']}
                    >
                      <Invoices />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'custom-invoices',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['custom-invoices']}
                    >
                      <CustomInvoices />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'store-management',
              children: [
                {
                  path: 'uom',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['uom']}
                    >
                      <UnitOfMeasurement />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'items-name',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['items-name']}
                    >
                      <ItemsName />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'vendors',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['vendors']}
                    >
                      <Vendors />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'bills',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['bills']}
                    >
                      <PurchaseBill />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'items-in',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['items-in']}
                    >
                      <ItemsIn />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'expense-management',
              children: [
                {
                  path: 'expense-heads',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['expense-heads']}
                    >
                      <ExpenseHeads />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'financial',
              children: [
                {
                  path: 'account-types',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['account-types']}
                    >
                      <AccountTypes />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'account-heads',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['account-heads']}
                    >
                      <AccountHeads />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'payment-methods',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['payment-methods']}
                    >
                      <PaymentMethods />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'receive-payment',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['receive-payment']}
                    >
                      <ReceivePayment />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'make-payment',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['make-payment']}
                    >
                      <MakePayment />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'report',
              children: [
                {
                  path: 'due-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['due-report']}
                    >
                      <DueReport />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'advance-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['due-report']}
                    >
                      <AdvanceReport />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: 'utils',
          children: [
            {
              path: 'setting',
              children: [
                {
                  path: 'manage-user',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['manage-user']}
                    >
                      <ManageUser />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'manage-user/:id',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['manage-user']}
                    >
                      <SingleUser />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <UserInfo />,
                    },
                    {
                      path: 'permission',
                      element: <UserPermission />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'support',
              element: <Support />,
            },
          ],
        },
        {
          path: '/*',
          element: <Error404 />,
        },
      ],
    },
  ],
};

export default MainRoutes;
