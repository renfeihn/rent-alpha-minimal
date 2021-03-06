import * as ApiCaller from '../../../util/ApiCaller';

export function getAccounts(page = 0) {
  return ApiCaller.callApi(`account?page=${page}&sort=accountNumber`);
}

export function getAccount(id) {
  return ApiCaller.callApi(`account/${id}?projection=accountBasic`);
}

export function saveAccount(object) {
  return ApiCaller.callApi('account?projection=accountBasic', 'post', object);
}

export function deleteAccount(object) {
  return ApiCaller.callApi(`account/${object.id}`, 'delete');
}

export function findAccountsByAccountNumber(accountNumber = '', page = 0) {
  const sort = '&sort=accountNumber';
  const projection = '&projection=accountMinimal';
  return ApiCaller.callApi(`account/search/findByAccountNumber?accountNumber=${accountNumber}&page=${page}${sort}${projection}`);
}

export function findAccounts(accountNumber = '', lastName = '', street = '', house = '', apartment = '', page = 0) {
  const query = `&accountNumber=${accountNumber}&lastName=${lastName}&street=${street}&house=${house}&apartment=${apartment}`;
  const sort = '&sort=accountNumber';
  const projection = '&projection=accountMinimal';
  return ApiCaller.callApi(`account/search/find?page=${page}${query}${sort}${projection}`);
}

export function getAccountCalculations(accountId, workingPeriodId) {
  return ApiCaller.callApi(`calculation/account?accountId=${accountId}&workingPeriodId=${workingPeriodId}`);
}

export function calculateAccount(accountId, periodStartId, periodEndId) {
  const query = `?accountId=${accountId}&periodStartId=${periodStartId}&periodEndId=${periodEndId}`;
  return ApiCaller.callApi(`calculation/calculate-account${query}`);
}

export function downloadAccountReportUPD(accountId, periodStartId, periodEndId) {
  const query = `?accountId=${accountId}&periodStartId=${periodStartId}&periodEndId=${periodEndId}`;
  return ApiCaller.downloadFile(`report/universal-payment-document${query}`, 'post');
}
