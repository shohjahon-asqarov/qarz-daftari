import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Customer, Transaction, User, Notification, AppSettings } from '../types';
import { dummyUser, dummyCustomers, dummyTransactions, dummyNotifications, defaultSettings } from '../data/dummyData';

interface AppContextType extends AppState {
  login: (email: string, password: string) => void;
  logout: () => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'totalDebt' | 'createdAt'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type Action = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: { id: string; updates: Partial<Customer> } }
  | { type: 'DELETE_CUSTOMER'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> };

const initialState: AppState = {
  user: dummyUser, // Auto-login for demo
  customers: dummyCustomers,
  transactions: dummyTransactions,
  isLoading: false,
  notifications: dummyNotifications,
  settings: defaultSettings
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_CUSTOMER':
      return { 
        ...state, 
        customers: [...state.customers, action.payload] 
      };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id 
            ? { ...customer, ...action.payload.updates }
            : customer
        )
      };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
        transactions: state.transactions.filter(transaction => transaction.customerId !== action.payload)
      };
    case 'ADD_TRANSACTION':
      const updatedCustomers = state.customers.map(customer => {
        if (customer.id === action.payload.customerId) {
          const newDebt = action.payload.type === 'debt' 
            ? customer.totalDebt + action.payload.amount
            : customer.totalDebt - action.payload.amount;
          return { ...customer, totalDebt: Math.max(0, newDebt) };
        }
        return customer;
      });
      return {
        ...state,
        customers: updatedCustomers,
        transactions: [...state.transactions, action.payload]
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'LOGIN', payload: dummyUser });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'totalDebt' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      totalDebt: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_CUSTOMER', payload: newCustomer });
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: { id, updates } });
  };

  const deleteCustomer = (id: string) => {
    dispatch({ type: 'DELETE_CUSTOMER', payload: id });
  };

  const markNotificationAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const updateSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        addCustomer,
        addTransaction,
        updateCustomer,
        deleteCustomer,
        markNotificationAsRead,
        updateSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}