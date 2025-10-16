import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const getRoleBadge = (role: string) => {
    const colors = {
      'student': 'bg-blue-100 text-blue-800',
      'admin_teacher': 'bg-green-100 text-green-800',
      'super_admin': 'bg-purple-100 text-purple-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-3 text-detective-body">Usuario</th>
            <th className="text-left p-3 text-detective-body">Email</th>
            <th className="text-left p-3 text-detective-body">Rol</th>
            <th className="text-left p-3 text-detective-body">Estado</th>
            <th className="text-left p-3 text-detective-body">Fecha Creación</th>
            <th className="text-right p-3 text-detective-body">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3 text-detective-body font-medium">{user.fullName}</td>
              <td className="p-3 text-detective-small">{user.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${getRoleBadge(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="p-3">
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                  {user.status}
                </span>
              </td>
              <td className="p-3 text-detective-small">{user.createdAt}</td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(user.id)} className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button onClick={() => onDelete(user.id)} className="p-2 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
