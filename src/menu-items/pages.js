// assets
import {
  IconUsers,
  IconMoneybag,
  IconFreeRights,
  IconTrolley,
  IconCashOff,
  IconReport,
  IconShoppingCart,
  IconCoins,
  IconGridGoldenratio,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconMoneybag,
  IconFreeRights,
  IconTrolley,
  IconCashOff,
  IconReport,
  IconShoppingCart,
  IconCoins,
  IconGridGoldenratio,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  access: ['super_admin', 'admin', 'user'],
  children: [
    {
      id: 'client-management',
      title: 'Client Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconUsers,
      access: ['super_admin'],
      children: [
        {
          id: 'client-groups',
          title: 'Client Groups',
          type: 'item',
          url: '/pages/client-management/client-groups',
          access: ['super_admin'],
        },
        {
          id: 'all-clients',
          title: 'All Clients',
          type: 'item',
          url: '/pages/client-management/all-clients',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'sales-management',
      title: 'Sales Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconShoppingCart,
      access: ['super_admin'],
      children: [
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          url: '/pages/sales-management/products',
          access: ['super_admin'],
        },
        {
          id: 'sales-orders',
          title: 'Sales Orders',
          type: 'item',
          url: '/pages/sales-management/sales-orders',
          access: ['super_admin'],
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/pages/sales-management/invoices',
          access: ['super_admin'],
        },
        {
          id: 'custom-invoices',
          title: 'Custom Invoices',
          type: 'item',
          url: '/pages/sales-management/custom-invoices',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'foc-management',
      title: 'FOC Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconFreeRights,
      access: ['super_admin'],
      children: [
        {
          id: 'foc-products',
          title: 'FOC Products',
          type: 'item',
          url: '/pages/foc-management/foc-products',
          access: ['super_admin'],
        },
        {
          id: 'foc-clients',
          title: 'FOC Clients',
          type: 'item',
          url: '/pages/foc-management/foc-clients',
          access: ['super_admin'],
        },
        {
          id: 'foc-invoices',
          title: 'FOC Invoices',
          type: 'item',
          url: '/pages/foc-management/foc-invoices',
          access: ['super_admin'],
        },
        {
          id: 'foc-summary',
          title: 'FOC Summary',
          type: 'item',
          url: '/pages/foc-management/foc-summary',
          access: ['super_admin'],
        },
      ],
    },

    {
      id: 'financial',
      title: 'Financial',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconMoneybag,
      access: ['super_admin'],
      children: [
        {
          id: 'account-types',
          title: 'Account Types',
          type: 'item',
          url: '/pages/financial/account-types',
          access: ['super_admin'],
        },
        {
          id: 'account-heads',
          title: 'Account Heads',
          type: 'item',
          url: '/pages/financial/account-heads',
          access: ['super_admin'],
        },
        {
          id: 'payment-methods',
          title: 'Payment Methods',
          type: 'item',
          url: '/pages/financial/payment-methods',
          access: ['super_admin'],
        },
        {
          id: 'receive-payment',
          title: 'Receive a Payment',
          type: 'item',
          url: '/pages/financial/receive-payment',
          access: ['super_admin'],
        },
        {
          id: 'make-payment',
          title: 'Make a Payment',
          type: 'item',
          url: '/pages/financial/make-payment',
          access: ['super_admin'],
        },
        {
          id: 'bills',
          title: 'Bills',
          type: 'item',
          url: '/pages/financial/bills',
          access: ['super_admin'],
        },
        {
          id: 'fixed-asset',
          title: 'Fixed Asset',
          type: 'item',
          url: '/pages/financial/fixed-asset',
          access: ['super_admin'],
        },
        {
          id: 'investment',
          title: 'Investment',
          type: 'item',
          url: '/pages/financial/investment',
          access: ['super_admin'],
        },
        {
          id: 'withdraw',
          title: 'Withdraw',
          type: 'item',
          url: '/pages/financial/withdraw',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'store-management',
      title: 'Store Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTrolley,
      access: ['super_admin'],
      children: [
        {
          id: 'uom',
          title: 'Unit of Measurement',
          type: 'item',
          url: '/pages/store-management/uom',
          access: ['super_admin'],
        },
        {
          id: 'items-name',
          title: 'Items Name',
          type: 'item',
          url: '/pages/store-management/items-name',
          access: ['super_admin'],
        },
        {
          id: 'vendors',
          title: 'Vendors',
          type: 'item',
          url: '/pages/store-management/vendors',
          access: ['super_admin'],
        },

        {
          id: 'items-in',
          title: 'Items (Receive)',
          type: 'item',
          url: '/pages/store-management/items-in',
          access: ['super_admin'],
        },
        {
          id: 'items-out',
          title: 'Items (Delivery)',
          type: 'item',
          url: '/pages/store-management/items-out',
          access: ['super_admin'],
        },
        {
          id: 'stock-status',
          title: 'Stock Status',
          type: 'item',
          url: '/pages/store-management/stock-status',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'expense-management',
      title: 'Expense Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconCashOff,
      access: ['super_admin'],
      children: [
        {
          id: 'expense-heads',
          title: 'Expense Heads',
          type: 'item',
          url: '/pages/expense-management/expense-heads',
          access: ['super_admin'],
        },
        {
          id: 'all-expenses',
          title: 'All Expenses',
          type: 'item',
          url: '/pages/expense-management/all-expenses',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'income-expense',
      title: 'Income Expense',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconCoins,
      access: ['super_admin'],
      children: [
        {
          id: 'income-expense-category',
          title: 'Category',
          type: 'item',
          url: '/pages/income-expense/income-expense-category',
          access: ['super_admin'],
        },
        {
          id: 'income-head',
          title: 'Income Head',
          type: 'item',
          url: '/pages/income-expense/income-head',
          access: ['super_admin'],
        },
        {
          id: 'expense-head',
          title: 'Expense Head',
          type: 'item',
          url: '/pages/income-expense/expense-head',
          access: ['super_admin'],
        },
        {
          id: 'mode-of-payment',
          title: 'Mode of Payment',
          type: 'item',
          url: '/pages/income-expense/mode-of-payment',
          access: ['super_admin'],
        },
        {
          id: 'personal-income',
          title: 'Income',
          type: 'item',
          url: '/pages/income-expense/personal-income',
          access: ['super_admin'],
        },
        {
          id: 'personal-expense',
          title: 'Expense',
          type: 'item',
          url: '/pages/income-expense/personal-expense',
          access: ['super_admin'],
        },
        {
          id: 'income-expense-summary',
          title: 'Summary',
          type: 'item',
          url: '/pages/income-expense/income-expense-summary',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'distribution',
      title: 'Distribution',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconGridGoldenratio,
      access: ['super_admin'],
      isDistributor: true,
      children: [
        {
          id: 'd-client-list',
          title: 'Client List',
          type: 'item',
          url: '/pages/distribution/d-client-list',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-purchased-product',
          title: 'Purchased Product',
          type: 'item',
          url: '/pages/distribution/d-purchased-product',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-sales-invoice',
          title: 'Sales Invoice',
          type: 'item',
          url: '/pages/distribution/d-sales-invoice',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-receive-payment',
          title: 'Receive a Payment',
          type: 'item',
          url: '/pages/distribution/d-receive-payment',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-expense',
          title: 'Expenses',
          type: 'item',
          url: '/pages/distribution/d-expense',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-due-report',
          title: 'Due Report',
          type: 'item',
          url: '/pages/distribution/d-due-report',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-advance-report',
          title: 'Advance Report',
          type: 'item',
          url: '/pages/distribution/d-advance-report',
          access: ['super_admin'],
          isDistributor: true,
        },
        {
          id: 'd-summary',
          title: 'Summary',
          type: 'item',
          url: '/pages/distribution/d-summary',
          access: ['super_admin'],
          isDistributor: true,
        },
      ],
    },
    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconReport,
      access: ['super_admin'],
      children: [
        {
          id: 'summary',
          title: 'Summary',
          type: 'item',
          url: '/pages/report/summary',
          access: ['super_admin'],
        },
        {
          id: 'daily-report',
          title: 'Daily Report',
          type: 'item',
          url: '/pages/report/daily-report',
          access: ['super_admin'],
        },
        {
          id: 'balance-sheet',
          title: 'Balance Sheet',
          type: 'item',
          url: '/pages/report/balance-sheet',
          access: ['super_admin'],
        },
        {
          id: 'due-report',
          title: 'Due Report',
          type: 'item',
          url: '/pages/report/due-report',
          access: ['super_admin'],
        },
        {
          id: 'advance-report',
          title: 'Advance Report',
          type: 'item',
          url: '/pages/report/advance-report',
          access: ['super_admin'],
        },
        {
          id: 'donation-report',
          title: 'Donation Report',
          type: 'item',
          url: '/pages/report/donation-report',
          access: ['super_admin'],
        },
        {
          id: 'payment-report',
          title: 'Payment Report',
          type: 'item',
          url: '/pages/report/payment-report',
          access: ['super_admin'],
        },
      ],
    },
  ],
};

export default pages;
