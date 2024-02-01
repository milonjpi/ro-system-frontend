import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useBalanceSheetQuery } from 'store/api/report/reportSlice';
import MainCard from 'ui-component/cards/MainCard';
import BalanceCard from './BalanceCard';
import CardItem from './CardItem';
import { useGetExpenseHeadsQuery } from 'store/api/expenseHead/expenseHeadApi';
import { totalSum } from 'views/utilities/NeedyFunction';

const BalanceSheet = () => {
  // library
  const { data: expenseHeadData } = useGetExpenseHeadsQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenseHeads = expenseHeadData?.expenseHeads || [];
  // end library
  const { data, isLoading } = useBalanceSheetQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const allReports = data?.report;

  // calculation
  const fixedAssets = allReports?.fixedAssets?._sum?.amount || 0;
  const investmentAsset =
    allReports?.investments?.find((el) => !el.isCash)?._sum?.amount || 0;
  const investmentCash =
    allReports?.investments?.find((el) => el.isCash)?._sum?.amount || 0;
  const withdraws = allReports?.withdraws?._sum?.amount || 0;

  // expenses
  const mappedExpenses = allReports?.expenses
    ?.map((el) => {
      const findExpenseHead = allExpenseHeads?.find(
        (exh) => exh.id === el.expenseHeadId
      );
      return {
        expenseHeadId: el.expenseHeadId,
        amount: el._sum?.amount || 0,
        label: findExpenseHead?.label,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
  const totalExpenses = totalSum(mappedExpenses || [], 'amount');
  const equipmentBills = allReports?.bills?._sum?.amount || 0;
  const equipmentBillsPaid = allReports?.bills?._sum?.paidAmount || 0;

  // invoices
  const totalInvoices = allReports?.invoices?._sum?.amount || 0;
  const totalInvoicesPaid = allReports?.invoices?._sum?.paidAmount || 0;

  // assets
  const vouchers = allReports?.vouchers || [];
  const findReceived =
    vouchers?.find((el) => el.type === 'Received')?._sum?.amount || 0;
  const findPaid =
    vouchers?.find((el) => el.type === 'Paid')?._sum?.amount || 0;

  const accountReceivable = totalInvoices - totalInvoicesPaid;
  const accountPayable = equipmentBills - equipmentBillsPaid;
  const advancedReceived = findReceived - totalInvoicesPaid;
  const advancedPaid = findPaid - equipmentBillsPaid;

  // cash and equivalent
  const cashAndEquivalent =
    investmentCash +
    findReceived -
    withdraws -
    totalExpenses -
    equipmentBillsPaid;

  // total asset
  const totalAsset =
    fixedAssets +
    cashAndEquivalent +
    investmentAsset +
    accountReceivable +
    advancedPaid -
    withdraws;

  // equity
  const equity =
    totalAsset -
    ((accountPayable > 0 ? accountPayable : 0) +
      (advancedReceived > 0 ? advancedReceived : 0));

  // profit
  const totalProfit = totalInvoices - totalExpenses - equipmentBills;

  return (
    <MainCard title="Balance Sheet">
      <Container maxWidth="xl" sx={{ mx: 'auto' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <BalanceCard
                  title="Assets"
                  loading={isLoading}
                  value={totalAsset}
                >
                  <CardItem title="Fixed Asset" value={fixedAssets} />
                  <CardItem
                    title="Cash & Equivalent"
                    value={cashAndEquivalent}
                  />
                  <CardItem title="Investments" value={investmentAsset} />
                  <CardItem
                    title="Withdraws"
                    value={withdraws ? `-${withdraws}` : 0}
                  />
                  <CardItem
                    title="Account Receivable"
                    value={accountReceivable > 0 ? accountReceivable : 0}
                  />
                  <CardItem
                    title="Advanced Payment"
                    value={advancedPaid > 0 ? advancedPaid : 0}
                  />
                </BalanceCard>
              </Grid>
              <Grid item xs={12}>
                <BalanceCard
                  title="Liabilities"
                  loading={isLoading}
                  value={
                    (accountPayable > 0 ? accountPayable : 0) +
                    (advancedReceived > 0 ? advancedReceived : 0)
                  }
                >
                  <CardItem
                    title="Account Payable"
                    value={accountPayable > 0 ? accountPayable : 0}
                  />
                  <CardItem
                    title="Advanced Received"
                    value={advancedReceived > 0 ? advancedReceived : 0}
                  />
                </BalanceCard>
              </Grid>
              <Grid item xs={12}>
                <BalanceCard
                  title="Equity"
                  loadItem={1}
                  loading={isLoading}
                  value={equity}
                >
                  <CardItem title="Retained earnings" value={equity} />
                </BalanceCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <BalanceCard
                  title="Incomes"
                  loadItem={1}
                  loading={isLoading}
                  value={totalInvoices}
                >
                  <CardItem title="Sales" value={totalInvoices} />
                </BalanceCard>
              </Grid>
              <Grid item xs={12}>
                <BalanceCard
                  title="Expenses"
                  loading={isLoading}
                  value={totalExpenses + equipmentBills}
                >
                  {mappedExpenses?.map((el) => (
                    <CardItem
                      key={el.expenseHeadId}
                      title={el?.label}
                      value={el?.amount || 0}
                    />
                  ))}
                  <CardItem title="PURCHASE EQUIPMENT" value={equipmentBills} />
                </BalanceCard>
              </Grid>
              <Grid item xs={12}>
                <BalanceCard
                  title="Profit"
                  loadItem={1}
                  loading={isLoading}
                  value={totalProfit}
                >
                  <CardItem title="Net Profit" value={totalProfit} />
                </BalanceCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainCard>
  );
};

export default BalanceSheet;
