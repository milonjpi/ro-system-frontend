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

// ro management
const RoLibrary = Loadable(
  lazy(() => import('views/pages/RoManagement/RoLibrary'))
);
const RoReport = Loadable(
  lazy(() => import('views/pages/RoManagement/RoReport'))
);

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
// const SalesOrder = Loadable(
//   lazy(() => import('views/pages/SalesManagement/SalesOrder'))
// );
const Invoices = Loadable(
  lazy(() => import('views/pages/SalesManagement/Invoices'))
);
// const CustomInvoices = Loadable(
//   lazy(() => import('views/pages/SalesManagement/CustomInvoices'))
// );

// foc management
// const FocProduct = Loadable(
//   lazy(() => import('views/pages/FocManagement/FocProduct'))
// );
// const FocClient = Loadable(
//   lazy(() => import('views/pages/FocManagement/FocClient'))
// );
// const FocInvoice = Loadable(
//   lazy(() => import('views/pages/FocManagement/FocInvoice'))
// );
// const FocSummary = Loadable(
//   lazy(() => import('views/pages/FocManagement/FocSummary'))
// );

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

// const MakePayment = Loadable(
//   lazy(() => import('views/pages/Financial/MakePayment'))
// );

const FixedAsset = Loadable(
  lazy(() => import('views/pages/Financial/FixedAsset'))
);

const Investment = Loadable(
  lazy(() => import('views/pages/Financial/Investment'))
);

const Withdraw = Loadable(lazy(() => import('views/pages/Financial/Withdraw')));

// store management
// const UnitOfMeasurement = Loadable(
//   lazy(() => import('views/pages/StoreManagement/UnitOfMeasurement'))
// );
// const ItemsName = Loadable(
//   lazy(() => import('views/pages/StoreManagement/ItemsName'))
// );
const Vendors = Loadable(
  lazy(() => import('views/pages/StoreManagement/Vendors'))
);
// const PurchaseBill = Loadable(
//   lazy(() => import('views/pages/StoreManagement/PurchaseBill'))
// );
// const ItemsIn = Loadable(
//   lazy(() => import('views/pages/StoreManagement/ItemsIn'))
// );
// const ItemsOut = Loadable(
//   lazy(() => import('views/pages/StoreManagement/ItemsOut'))
// );
// const StockStatus = Loadable(
//   lazy(() => import('views/pages/StoreManagement/StockStatus'))
// );

// expense management
const ExpenseHeads = Loadable(
  lazy(() => import('views/pages/ExpenseManagement/ExpenseHeads'))
);
const ExpenseSubHeads = Loadable(
  lazy(() => import('views/pages/ExpenseManagement/ExpenseSubHeads'))
);

const AllExpenses = Loadable(
  lazy(() => import('views/pages/ExpenseManagement/AllExpenses'))
);

// Manage distributor
// const Distributors = Loadable(
//   lazy(() => import('views/pages/ManageDistributor/Distributors'))
// );
// const DrProducts = Loadable(
//   lazy(() => import('views/pages/ManageDistributor/DrProducts'))
// );
// const DrInvoices = Loadable(
//   lazy(() => import('views/pages/ManageDistributor/DrInvoices'))
// );
// const DrVouchers = Loadable(
//   lazy(() => import('views/pages/ManageDistributor/DrVouchers'))
// );
// const DrSummary = Loadable(
//   lazy(() => import('views/pages/ManageDistributor/DrSummary'))
// );

// building operation
const OperationExpenses = Loadable(
  lazy(() => import('views/pages/BuildingOperations/OperationExpenses'))
);
const OperationInvestments = Loadable(
  lazy(() => import('views/pages/BuildingOperations/OperationInvestments'))
);
const OperationReports = Loadable(
  lazy(() => import('views/pages/BuildingOperations/OperationReports'))
);
const OperationExpenseSummary = Loadable(
  lazy(() =>
    import(
      'views/pages/BuildingOperations/OperationReports/OperationExpenseSummary'
    )
  )
);
const OperationLibrary = Loadable(
  lazy(() => import('views/pages/BuildingOperations/OperationLibrary'))
);
const BuildingExpenseHead = Loadable(
  lazy(() =>
    import(
      'views/pages/BuildingOperations/OperationLibrary/BuildingExpenseHead'
    )
  )
);
const BuildingVendor = Loadable(
  lazy(() =>
    import('views/pages/BuildingOperations/OperationLibrary/BuildingVendor')
  )
);
const BuildingBrand = Loadable(
  lazy(() =>
    import('views/pages/BuildingOperations/OperationLibrary/BuildingBrand')
  )
);
const BuildingUom = Loadable(
  lazy(() =>
    import('views/pages/BuildingOperations/OperationLibrary/BuildingUom')
  )
);
const BuildingPaymentMethod = Loadable(
  lazy(() =>
    import(
      'views/pages/BuildingOperations/OperationLibrary/BuildingPaymentMethod'
    )
  )
);
const BuildingInvestmentSource = Loadable(
  lazy(() =>
    import(
      'views/pages/BuildingOperations/OperationLibrary/BuildingInvestmentSource'
    )
  )
);

// electricity bills
const MeterInfo = Loadable(
  lazy(() => import('views/pages/ElectricityBills/MeterInfo'))
);
const ElectricBills = Loadable(
  lazy(() => import('views/pages/ElectricityBills/ElectricBills'))
);
const ElectricOverview = Loadable(
  lazy(() => import('views/pages/ElectricityBills/ElectricOverview'))
);

// income expense
// const InExCategory = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/InExCategory'))
// );

// const IncomeHead = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/IncomeHead'))
// );

// const ExpenseHead = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/ExpenseHead'))
// );

// const ModeOfPayment = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/ModeOfPayment'))
// );

// const PersonalIncome = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/PersonalIncome'))
// );

// const PersonalExpense = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/PersonalExpense'))
// );

// const InExSummary = Loadable(
//   lazy(() => import('views/pages/IncomeExpense/InExSummary'))
// );

// monthly expense
const MonthlyExpenseOverview = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Overview'))
);
const MonthlyExpenses = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Expenses'))
);
const MonthlyBalance = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/MonthlyBalance'))
);
const OpeningBalance = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/MonthlyBalance/OpeningBalance'))
);
const PresentBalance = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/MonthlyBalance/PresentBalance'))
);
const Source = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/MonthlyBalance/Source'))
);

const MonthlyExpenseReport = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Report'))
);
const MonthlyExpenseReportSummary = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Report/ReportSummary'))
);
const MonthlyHeadWiseReport = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Report/HeadWiseReport'))
);
const MonthlySourceWiseReport = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Report/SourceWiseReport'))
);
const MonthlyExpenseLibrary = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library'))
);
const ExpenseArea = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library/ExpenseArea'))
);
const VehicleList = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library/VehicleList'))
);
const MonthlyExpenseHead = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library/ExpenseHead'))
);
const ExpenseDetail = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library/ExpenseDetail'))
);
const PaymentSource = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Library/PaymentSource'))
);

// zakat
const Zakat = Loadable(lazy(() => import('views/pages/MonthlyExpense/Zakat')));
const ZakatPay = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Zakat/ZakatPay'))
);
const Recipient = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Zakat/Recipient'))
);
const ZakatReport = Loadable(
  lazy(() => import('views/pages/MonthlyExpense/Zakat/ZakatReport'))
);

// jewellery
const Jewelleries = Loadable(
  lazy(() => import('views/pages/GAssets/Jewelleries'))
);
const GoldAsset = Loadable(
  lazy(() => import('views/pages/GAssets/Jewelleries/GoldAsset'))
);
const DiamondAsset = Loadable(
  lazy(() => import('views/pages/GAssets/Jewelleries/DiamondAsset'))
);
const SilverAsset = Loadable(
  lazy(() => import('views/pages/GAssets/Jewelleries/SilverAsset'))
);

// sold jewellery
const SoldJewelleries = Loadable(
  lazy(() => import('views/pages/GAssets/SoldJewelleries'))
);
const SoldDiamondAsset = Loadable(
  lazy(() => import('views/pages/GAssets/SoldJewelleries/SoldDiamondAsset'))
);
const SoldGoldAsset = Loadable(
  lazy(() => import('views/pages/GAssets/SoldJewelleries/SoldGoldAsset'))
);
const SoldSilverAsset = Loadable(
  lazy(() => import('views/pages/GAssets/SoldJewelleries/SoldSilverAsset'))
);

const ZakatCalculation = Loadable(
  lazy(() => import('views/pages/GAssets/ZakatCalculation'))
);
const ZCalculation = Loadable(
  lazy(() => import('views/pages/GAssets/ZakatCalculation/ZCalculation'))
);
const GoldRate = Loadable(
  lazy(() => import('views/pages/GAssets/ZakatCalculation/GoldRate'))
);
const DiamondRate = Loadable(
  lazy(() => import('views/pages/GAssets/ZakatCalculation/DiamondRate'))
);
const SilverRate = Loadable(
  lazy(() => import('views/pages/GAssets/ZakatCalculation/SilverRate'))
);

const GAssetReport = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetReport'))
);
const GAssetSummary = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetReport/GAssetSummary'))
);
const KdmWiseSummary = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetReport/KdmWiseSummary'))
);
const TypeWiseSummary = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetReport/TypeWiseSummary'))
);

const GAssetLibrary = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary'))
);
const JewelleryType = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary/JewelleryType'))
);
const GoldKDM = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary/Carat/GoldKDM'))
);
const DiamondKDM = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary/Carat/DiamondKDM'))
);
const SilverKDM = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary/Carat/SilverKDM'))
);
const JewelleryVendor = Loadable(
  lazy(() => import('views/pages/GAssets/GAssetLibrary/JewelleryVendor'))
);

// report
const DueReport = Loadable(lazy(() => import('views/pages/Report/DueReport')));
const AdvanceReport = Loadable(
  lazy(() => import('views/pages/Report/AdvanceReport'))
);
const BalanceSheet = Loadable(
  lazy(() => import('views/pages/Report/BalanceSheet'))
);
const ReportSummary = Loadable(
  lazy(() => import('views/pages/Report/ReportSummary'))
);
const DailyReport = Loadable(
  lazy(() => import('views/pages/Report/DailyReport'))
);
const ExpenseHeadSummary = Loadable(
  lazy(() => import('views/pages/RoManagement/RoReport/ExpenseHeadSummary'))
);

// payment report
// const PaymentReport = Loadable(
//   lazy(() => import('views/pages/Report/PaymentReport'))
// );
// const PaymentReportSummary = Loadable(
//   lazy(() => import('views/pages/Report/PaymentReport/PaymentReportSummary'))
// );
// const PaymentDueReport = Loadable(
//   lazy(() => import('views/pages/Report/PaymentReport/PaymentDueReport'))
// );
// const PaymentAdvanceReport = Loadable(
//   lazy(() => import('views/pages/Report/PaymentReport/PaymentAdvanceReport'))
// );

// Distribution
// const DistClientList = Loadable(
//   lazy(() => import('views/pages/Distribution/DistClientList'))
// );

// const PurchasedProduct = Loadable(
//   lazy(() => import('views/pages/Distribution/PurchasedProduct'))
// );

// const DistSalesInvoice = Loadable(
//   lazy(() => import('views/pages/Distribution/DistSalesInvoice'))
// );

// const DistReceivePayment = Loadable(
//   lazy(() => import('views/pages/Distribution/DistReceivePayment'))
// );
// const DistExpenses = Loadable(
//   lazy(() => import('views/pages/Distribution/DistExpenses'))
// );
// const DistDueReport = Loadable(
//   lazy(() => import('views/pages/Distribution/DistDueReport'))
// );
// const DistReceivableDue = Loadable(
//   lazy(() => import('views/pages/Distribution/DistDueReport/DistReceivableDue'))
// );
// const DistPayableDue = Loadable(
//   lazy(() => import('views/pages/Distribution/DistDueReport/DistPayableDue'))
// );

// const DistAdvancedReport = Loadable(
//   lazy(() => import('views/pages/Distribution/DistAdvancedReport'))
// );
// const DistAdvReceived = Loadable(
//   lazy(() =>
//     import('views/pages/Distribution/DistAdvancedReport/DistAdvReceived')
//   )
// );
// const DistAdvPaid = Loadable(
//   lazy(() => import('views/pages/Distribution/DistAdvancedReport/DistAdvPaid'))
// );
// const DistSummaryReport = Loadable(
//   lazy(() => import('views/pages/Distribution/DistSummaryReport'))
// );

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
              path: 'ro-management',
              children: [
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
                  path: 'ro-expenses',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['ro-expenses']}
                    >
                      <AllExpenses />
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
                  path: 'fixed-asset',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['fixed-asset']}
                    >
                      <FixedAsset />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'investment',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['investment']}
                    >
                      <Investment />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'withdraw',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['withdraw']}
                    >
                      <Withdraw />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['library']}
                    >
                      <RoLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <AllCustomers />,
                    },
                    {
                      path: 'vendors',
                      element: <Vendors />,
                    },
                    {
                      path: 'client-groups',
                      element: <CustomerGroups />,
                    },
                    {
                      path: 'ro-products',
                      element: <Products />,
                    },
                    {
                      path: 'expense-heads',
                      element: <ExpenseHeads />,
                    },
                    {
                      path: 'expense-details',
                      element: <ExpenseSubHeads />,
                    },
                    {
                      path: 'account-types',
                      element: <AccountTypes />,
                    },
                    {
                      path: 'account-heads',
                      element: <AccountHeads />,
                    },
                    {
                      path: 'payment-methods',
                      element: <PaymentMethods />,
                    },
                  ],
                },
                {
                  path: 'ro-report',
                  element: <RoReport />,
                  children: [
                    {
                      path: '',
                      element: <ReportSummary />,
                    },
                    {
                      path: 'daily-report',
                      element: <DailyReport />,
                    },
                    {
                      path: 'balance-sheet',
                      element: <BalanceSheet />,
                    },
                    {
                      path: 'due-report',
                      element: <DueReport />,
                    },
                    {
                      path: 'advance-report',
                      element: <AdvanceReport />,
                    },
                    {
                      path: 'expense-summary',
                      element: <ExpenseHeadSummary />,
                    },
                  ],
                },
              ],
            },
            // {
            //   path: 'client-management',
            //   children: [
            //     {
            //       path: 'client-groups',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['client-groups']}
            //         >
            //           <CustomerGroups />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'all-clients',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['all-clients']}
            //         >
            //           <AllCustomers />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'sales-management',
            //   children: [
            //     {
            //       path: 'products',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['products']}
            //         >
            //           <Products />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'sales-orders',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['sales-orders']}
            //         >
            //           <SalesOrder />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'invoices',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['invoices']}
            //         >
            //           <Invoices />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'custom-invoices',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['custom-invoices']}
            //         >
            //           <CustomInvoices />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'foc-management',
            //   children: [
            //     {
            //       path: 'foc-products',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['foc-products']}
            //         >
            //           <FocProduct />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'foc-clients',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['foc-clients']}
            //         >
            //           <FocClient />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'foc-invoices',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['foc-invoices']}
            //         >
            //           <FocInvoice />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'foc-summary',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['foc-summary']}
            //         >
            //           <FocSummary />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'store-management',
            //   children: [
            //     {
            //       path: 'uom',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['uom']}
            //         >
            //           <UnitOfMeasurement />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'items-name',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['items-name']}
            //         >
            //           <ItemsName />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'vendors',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['vendors']}
            //         >
            //           <Vendors />
            //         </AuthenticationRoutes>
            //       ),
            //     },

            //     {
            //       path: 'items-in',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['items-in']}
            //         >
            //           <ItemsIn />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'items-out',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['items-out']}
            //         >
            //           <ItemsOut />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'stock-status',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['stock-status']}
            //         >
            //           <StockStatus />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'expense-management',
            //   children: [
            //     {
            //       path: 'expense-heads',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['expense-heads']}
            //         >
            //           <ExpenseHeads />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'all-expenses',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['all-expenses']}
            //         >
            //           <AllExpenses />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'manage-distributor',
            //   children: [
            //     {
            //       path: 'distributors',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['distributors']}
            //         >
            //           <Distributors />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'dr-products',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['dr-products']}
            //         >
            //           <DrProducts />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'dr-invoices',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['dr-invoices']}
            //         >
            //           <DrInvoices />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'dr-vouchers',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['dr-vouchers']}
            //         >
            //           <DrVouchers />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'dr-summary',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['dr-summary']}
            //         >
            //           <DrSummary />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            {
              path: 'building-operations',
              children: [
                {
                  path: 'operation-expenses',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['operation-expenses']}
                    >
                      <OperationExpenses />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'operation-investments',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['operation-investments']}
                    >
                      <OperationInvestments />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'operation-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['operation-report']}
                    >
                      <OperationReports />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <OperationExpenseSummary />,
                    },
                  ],
                },
                {
                  path: 'operation-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['operation-library']}
                    >
                      <OperationLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <BuildingExpenseHead />,
                    },
                    {
                      path: 'vendor',
                      element: <BuildingVendor />,
                    },
                    {
                      path: 'brand',
                      element: <BuildingBrand />,
                    },
                    {
                      path: 'uom',
                      element: <BuildingUom />,
                    },
                    {
                      path: 'payment-method',
                      element: <BuildingPaymentMethod />,
                    },
                    {
                      path: 'investment-source',
                      element: <BuildingInvestmentSource />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'electricity-bills',
              children: [
                {
                  path: 'meter-info',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['meter-info']}
                    >
                      <MeterInfo />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'electric-bills',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['electric-bills']}
                    >
                      <ElectricBills />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'electric-overview',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['electric-overview']}
                    >
                      <ElectricOverview />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            // {
            //   path: 'income-expense',
            //   children: [
            //     {
            //       path: 'income-expense-category',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['income-expense-category']}
            //         >
            //           <InExCategory />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'income-head',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['income-head']}
            //         >
            //           <IncomeHead />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'expense-head',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['expense-head']}
            //         >
            //           <ExpenseHead />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'mode-of-payment',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['mode-of-payment']}
            //         >
            //           <ModeOfPayment />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'personal-income',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['personal-income']}
            //         >
            //           <PersonalIncome />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'personal-expense',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['personal-expense']}
            //         >
            //           <PersonalExpense />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'income-expense-summary',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['income-expense-summary']}
            //         >
            //           <InExSummary />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            {
              path: 'monthly-expense',
              children: [
                {
                  path: 'monthly-expense-overview',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-expense-overview']}
                    >
                      <MonthlyExpenseOverview />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'monthly-expense-list',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-expense-list']}
                    >
                      <MonthlyExpenses />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'monthly-balance',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-balance']}
                    >
                      <MonthlyBalance />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <OpeningBalance />,
                    },
                    {
                      path: 'present',
                      element: <PresentBalance />,
                    },
                    {
                      path: 'source',
                      element: <Source />,
                    },
                  ],
                },
                {
                  path: 'zakat',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['zakat']}
                    >
                      <Zakat />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <ZakatPay />,
                    },
                    {
                      path: 'recipient',
                      element: <Recipient />,
                    },
                    {
                      path: 'report',
                      element: <ZakatReport />,
                    },
                  ],
                },
                {
                  path: 'monthly-expense-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-expense-report']}
                    >
                      <MonthlyExpenseReport />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <MonthlyExpenseReportSummary />,
                    },
                    {
                      path: 'head-wise',
                      element: <MonthlyHeadWiseReport />,
                    },
                    {
                      path: 'source-wise',
                      element: <MonthlySourceWiseReport />,
                    },
                  ],
                },
                {
                  path: 'monthly-expense-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-expense-library']}
                    >
                      <MonthlyExpenseLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <ExpenseArea />,
                    },
                    {
                      path: 'vehicle',
                      element: <VehicleList />,
                    },
                    {
                      path: 'expense-head',
                      element: <MonthlyExpenseHead />,
                    },
                    {
                      path: 'expense-details',
                      element: <ExpenseDetail />,
                    },
                    {
                      path: 'payment-source',
                      element: <PaymentSource />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'g-assets',
              children: [
                {
                  path: 'jewelleries',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['jewelleries']}
                    >
                      <Jewelleries />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <GoldAsset />,
                    },
                    {
                      path: 'diamond',
                      element: <DiamondAsset />,
                    },
                    {
                      path: 'silver',
                      element: <SilverAsset />,
                    },
                  ],
                },
                {
                  path: 'sold-jewelleries',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['sold-jewelleries']}
                    >
                      <SoldJewelleries />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <SoldGoldAsset />,
                    },
                    {
                      path: 'diamond',
                      element: <SoldDiamondAsset />,
                    },
                    {
                      path: 'silver',
                      element: <SoldSilverAsset />,
                    },
                  ],
                },
                {
                  path: 'zakat-calculation',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['zakat-calculation']}
                    >
                      <ZakatCalculation />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <ZCalculation />,
                    },
                    {
                      path: 'gold-rate',
                      element: <GoldRate />,
                    },
                    {
                      path: 'diamond-rate',
                      element: <DiamondRate />,
                    },
                    {
                      path: 'silver-rate',
                      element: <SilverRate />,
                    },
                  ],
                },
                {
                  path: 'g-assets-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['g-assets-report']}
                    >
                      <GAssetReport />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <GAssetSummary />,
                    },
                    {
                      path: 'kdm-wise',
                      element: <KdmWiseSummary />,
                    },
                    {
                      path: 'type-wise',
                      element: <TypeWiseSummary />,
                    },
                  ],
                },
                {
                  path: 'g-assets-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['g-assets-library']}
                    >
                      <GAssetLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <JewelleryType />,
                    },
                    {
                      path: 'gold-kdm',
                      element: <GoldKDM />,
                    },
                    {
                      path: 'diamond-kdm',
                      element: <DiamondKDM />,
                    },
                    {
                      path: 'silver-kdm',
                      element: <SilverKDM />,
                    },
                    {
                      path: 'vendor',
                      element: <JewelleryVendor />,
                    },
                  ],
                },
              ],
            },
            // {
            //   path: 'distribution',
            //   children: [
            //     {
            //       path: 'd-client-list',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-client-list']}
            //           isDistributor={true}
            //         >
            //           <DistClientList />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'd-purchased-product',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-purchased-product']}
            //           isDistributor={true}
            //         >
            //           <PurchasedProduct />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'd-sales-invoice',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-sales-invoice']}
            //           isDistributor={true}
            //         >
            //           <DistSalesInvoice />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'd-receive-payment',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-receive-payment']}
            //           isDistributor={true}
            //         >
            //           <DistReceivePayment />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'd-expense',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-expense']}
            //           isDistributor={true}
            //         >
            //           <DistExpenses />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'd-due-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-due-report']}
            //           isDistributor={true}
            //         >
            //           <DistDueReport />
            //         </AuthenticationRoutes>
            //       ),
            //       children: [
            //         {
            //           path: '',
            //           element: <DistReceivableDue />,
            //         },
            //         {
            //           path: 'payable',
            //           element: <DistPayableDue />,
            //         },
            //       ],
            //     },
            //     {
            //       path: 'd-advance-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-advance-report']}
            //           isDistributor={true}
            //         >
            //           <DistAdvancedReport />
            //         </AuthenticationRoutes>
            //       ),
            //       children: [
            //         {
            //           path: '',
            //           element: <DistAdvReceived />,
            //         },
            //         {
            //           path: 'paid',
            //           element: <DistAdvPaid />,
            //         },
            //       ],
            //     },
            //     {
            //       path: 'd-summary',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['d-summary']}
            //           isDistributor={true}
            //         >
            //           <DistSummaryReport />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'financial',
            //   children: [
            //     {
            //       path: 'account-types',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['account-types']}
            //         >
            //           <AccountTypes />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'account-heads',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['account-heads']}
            //         >
            //           <AccountHeads />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'payment-methods',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['payment-methods']}
            //         >
            //           <PaymentMethods />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'receive-payment',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['receive-payment']}
            //         >
            //           <ReceivePayment />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'make-payment',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['make-payment']}
            //         >
            //           <MakePayment />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'bills',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['bills']}
            //         >
            //           <PurchaseBill />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'fixed-asset',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['fixed-asset']}
            //         >
            //           <FixedAsset />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'investment',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['investment']}
            //         >
            //           <Investment />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'withdraw',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['withdraw']}
            //         >
            //           <Withdraw />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //   ],
            // },
            // {
            //   path: 'report',
            //   children: [
            //     {
            //       path: 'due-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['due-report']}
            //         >
            //           <DueReport />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'balance-sheet',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['balance-sheet']}
            //         >
            //           <BalanceSheet />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'advance-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['due-report']}
            //         >
            //           <AdvanceReport />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'summary',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['summary']}
            //         >
            //           <ReportSummary />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'daily-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['daily-support']}
            //         >
            //           <DailyReport />
            //         </AuthenticationRoutes>
            //       ),
            //     },
            //     {
            //       path: 'payment-report',
            //       element: (
            //         <AuthenticationRoutes
            //           allowedRoles={['super_admin', 'admin']}
            //           allowedCodes={['payment-report']}
            //         >
            //           <PaymentReport />
            //         </AuthenticationRoutes>
            //       ),
            //       children: [
            //         {
            //           path: '',
            //           element: <PaymentReportSummary />,
            //         },
            //         {
            //           path: 'due-payment',
            //           element: <PaymentDueReport />,
            //         },
            //         {
            //           path: 'advance-report',
            //           element: <PaymentAdvanceReport />,
            //         },
            //       ],
            //     },
            //   ],
            // },
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
