import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterRole: 'all' | 'admin' | 'editor' | 'viewer';
  filterStatus: 'all' | 'active' | 'inactive' | 'pending';

  // Actions
  loadUsers: () => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterRole: (role: 'all' | 'admin' | 'editor' | 'viewer') => void;
  setFilterStatus: (status: 'all' | 'active' | 'inactive' | 'pending') => void;
  setError: (error: string | null) => void;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@papsnet.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    status: 'active',
    lastLogin: '2024-01-20T14:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: ['read', 'write', 'delete', 'admin']
  },
  {
    id: '2',
    email: 'editor@papsnet.com',
    name: 'Content Editor',
    role: 'editor',
    avatar: '/avatars/editor.jpg',
    status: 'active',
    lastLogin: '2024-01-20T12:15:00Z',
    createdAt: '2024-01-05T10:30:00Z',
    permissions: ['read', 'write']
  },
  {
    id: '3',
    email: 'viewer@papsnet.com',
    name: 'John Viewer',
    role: 'viewer',
    status: 'active',
    lastLogin: '2024-01-19T16:45:00Z',
    createdAt: '2024-01-10T14:20:00Z',
    permissions: ['read']
  },
  {
    id: '4',
    email: 'pending@papsnet.com',
    name: 'Pending User',
    role: 'viewer',
    status: 'pending',
    createdAt: '2024-01-19T09:00:00Z',
    permissions: ['read']
  }
];

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filterRole: 'all',
  filterStatus: 'all',

  loadUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Load from localStorage or use mock data
      const savedUsers = localStorage.getItem('admin-users');
      const users = savedUsers ? JSON.parse(savedUsers) : mockUsers;

      set({
        users,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load users',
        isLoading: false
      });
    }
  },

  createUser: async (userData: Omit<User, 'id' | 'createdAt'>) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const { users } = get();
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...users, newUser];

      // Save to localStorage
      localStorage.setItem('admin-users', JSON.stringify(updatedUsers));

      set({
        users: updatedUsers,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create user',
        isLoading: false
      });
    }
  },

  updateUser: async (id: string, updates: Partial<User>) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));

      const { users } = get();
      const updatedUsers = users.map(user =>
        user.id === id ? { ...user, ...updates } : user
      );

      // Save to localStorage
      localStorage.setItem('admin-users', JSON.stringify(updatedUsers));

      set({
        users: updatedUsers,
        selectedUser: updatedUsers.find(user => user.id === id) || null,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update user',
        isLoading: false
      });
    }
  },

  deleteUser: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const { users } = get();
      const updatedUsers = users.filter(user => user.id !== id);

      // Save to localStorage
      localStorage.setItem('admin-users', JSON.stringify(updatedUsers));

      set({
        users: updatedUsers,
        selectedUser: null,
        isLoading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete user',
        isLoading: false
      });
    }
  },

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilterRole: (role: 'all' | 'admin' | 'editor' | 'viewer') => {
    set({ filterRole: role });
  },

  setFilterStatus: (status: 'all' | 'active' | 'inactive' | 'pending') => {
    set({ filterStatus: status });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));