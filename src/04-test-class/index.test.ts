import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

import lodash from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(42);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(42);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      account.withdraw(43);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(0);
    expect(() => {
      account.transfer(43, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(1, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(() => {
      account.deposit(1);
    }).not.toThrow();
    expect(account.getBalance()).toBe(43);
  });

  test('should withdraw money', () => {
    expect(() => {
      account.withdraw(41);
    }).not.toThrow();
    expect(account.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(0);
    expect(() => {
      account.transfer(40, account2);
    }).not.toThrow();
    expect(account.getBalance()).toBe(2);
    expect(account2.getBalance()).toBe(40);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);

    const result = await account.fetchBalance();
    expect(result).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
