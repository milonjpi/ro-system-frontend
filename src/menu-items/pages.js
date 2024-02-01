// assets
import {
  IconUsers,
  IconMoneybag,
  IconTrolley,
  IconCashOff,
  IconReport,
  IconShoppingCart,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconMoneybag,
  IconTrolley,
  IconCashOff,
  IconReport,
  IconShoppingCart,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'client-management',
      title: 'Client Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconUsers,
      children: [
        {
          id: 'client-groups',
          title: 'Client Groups',
          type: 'item',
          url: '/pages/client-management/client-groups',
        },
        {
          id: 'all-clients',
          title: 'All Clients',
          type: 'item',
          url: '/pages/client-management/all-clients',
        },
      ],
    },
    {
      id: 'sales-management',
      title: 'Sales Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconShoppingCart,
      children: [
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          url: '/pages/sales-management/products',
        },
        {
          id: 'sales-orders',
          title: 'Sales Orders',
          type: 'item',
          url: '/pages/sales-management/sales-orders',
        },
        {
          id: 'invoices',
          title: 'Invoices',
          type: 'item',
          url: '/pages/sales-management/invoices',
        },
        {
          id: 'custom-invoices',
          title: 'Custom Invoices',
          type: 'item',
          url: '/pages/sales-management/custom-invoices',
        },
      ],
    },

    {
      id: 'financial',
      title: 'Financial',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconMoneybag,
      children: [
        {
          id: 'account-types',
          title: 'Account Types',
          type: 'item',
          url: '/pages/financial/account-types',
        },
        {
          id: 'account-heads',
          title: 'Account Heads',
          type: 'item',
          url: '/pages/financial/account-heads',
        },
        {
          id: 'payment-methods',
          title: 'Payment Methods',
          type: 'item',
          url: '/pages/financial/payment-methods',
        },
        {
          id: 'receive-payment',
          title: 'Receive a Payment',
          type: 'item',
          url: '/pages/financial/receive-payment',
        },
        {
          id: 'make-payment',
          title: 'Make a Payment',
          type: 'item',
          url: '/pages/financial/make-payment',
        },
        {
          id: 'fixed-asset',
          title: 'Fixed Asset',
          type: 'item',
          url: '/pages/financial/fixed-asset',
        },
        {
          id: 'investment',
          title: 'Investment',
          type: 'item',
          url: '/pages/financial/investment',
        },
        {
          id: 'withdraw',
          title: 'Withdraw',
          type: 'item',
          url: '/pages/financial/withdraw',
        },
      ],
    },
    {
      id: 'store-management',
      title: 'Store Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconTrolley,
      children: [
        {
          id: 'uom',
          title: 'Unit of Measurement',
          type: 'item',
          url: '/pages/store-management/uom',
        },
        {
          id: 'items-name',
          title: 'Items Name',
          type: 'item',
          url: '/pages/store-management/items-name',
        },
        {
          id: 'vendors',
          title: 'Vendors',
          type: 'item',
          url: '/pages/store-management/vendors',
        },
        {
          id: 'bills',
          title: 'Bills',
          type: 'item',
          url: '/pages/store-management/bills',
        },
        {
          id: 'items-in',
          title: 'Items (Receive)',
          type: 'item',
          url: '/pages/store-management/items-in',
        },
        {
          id: 'items-out',
          title: 'Items (Delivery)',
          type: 'item',
          url: '/pages/store-management/items-out',
        },
        {
          id: 'stock-status',
          title: 'Stock Status',
          type: 'item',
          url: '/pages/store-management/stock-status',
        },
      ],
    },
    {
      id: 'expense-management',
      title: 'Expense Management',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconCashOff,
      children: [
        {
          id: 'expense-heads',
          title: 'Expense Heads',
          type: 'item',
          url: '/pages/expense-management/expense-heads',
        },
        {
          id: 'all-expenses',
          title: 'All Expenses',
          type: 'item',
          url: '/pages/expense-management/all-expenses',
        },
      ],
    },

    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconReport,
      children: [
        {
          id: 'summary',
          title: 'Summary',
          type: 'item',
          url: '/pages/report/summary',
        },
        {
          id: 'balance-sheet',
          title: 'Balance Sheet',
          type: 'item',
          url: '/pages/report/balance-sheet',
        },
        {
          id: 'due-report',
          title: 'Due Report',
          type: 'item',
          url: '/pages/report/due-report',
        },
        {
          id: 'advance-report',
          title: 'Advance Report',
          type: 'item',
          url: '/pages/report/advance-report',
        },
      ],
    },
  ],
};

export default pages;
